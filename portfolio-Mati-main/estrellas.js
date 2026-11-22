/* =========================================================
   Fondo animado: nebulosa + eclipse + estrellas
   - Fijo detrás de todo el sitio
   - Parallax con el mouse (compu) y con el scroll (celular)
   - Estrellas fugaces cada tanto
   - Liviano: menos estrellas en celular, se pausa si la pestaña no está visible
   - Respeta "reducir movimiento" del sistema (queda quieto)
   ========================================================= */
(function () {
    const NARANJA = "255, 95, 31";
    const canvas = document.createElement("canvas");
    canvas.id = "fondo-estrellas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");

    const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const esCelular = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let ancho = 0, alto = 0, estrellas = [], fugaz = null;
    let mouseX = 0, mouseY = 0, suaveX = 0, suaveY = 0, tiempo = 0, corriendo = true;

    function crearEstrellas() {
        const densidad = esCelular ? 9000 : 6500;          // px² por estrella
        const cantidad = Math.min(320, Math.round((ancho * alto) / densidad));
        estrellas = [];
        for (let i = 0; i < cantidad; i++) {
            const capa = 1 + Math.floor(Math.random() * 3);  // 1 lejos, 3 cerca
            estrellas.push({
                x: Math.random() * ancho,
                y: Math.random() * alto,
                capa,
                fase: Math.random() * Math.PI * 2,
                naranja: capa === 3 && Math.random() < 0.25
            });
        }
    }

    /* ---------- Eclipse (se dibuja una vez y se reutiliza) ---------- */
    let eclipse = null, eclipseX = 0, eclipseY = 0, eclipseR = 0;
    function crearEclipse() {
        eclipseR = esCelular ? Math.min(ancho, alto) * 0.22 : Math.min(ancho, alto) * 0.24;
        eclipseX = esCelular ? ancho * 0.78 : ancho * 0.8;
        eclipseY = esCelular ? alto * 0.22 : alto * 0.42;
        const tam = Math.ceil(eclipseR * 4.4);
        eclipse = document.createElement("canvas");
        eclipse.width = tam * dpr;
        eclipse.height = tam * dpr;
        const e = eclipse.getContext("2d");
        e.scale(dpr, dpr);
        const c = tam / 2, r = eclipseR;
        // halo exterior
        const halo = e.createRadialGradient(c, c, r * 0.9, c, c, r * 2.1);
        halo.addColorStop(0, `rgba(${NARANJA}, 0.35)`);
        halo.addColorStop(0.35, `rgba(${NARANJA}, 0.12)`);
        halo.addColorStop(1, `rgba(${NARANJA}, 0)`);
        e.fillStyle = halo;
        e.fillRect(0, 0, tam, tam);
        // anillo de luz
        e.shadowColor = `rgb(${NARANJA})`;
        e.shadowBlur = r * 0.35;
        e.strokeStyle = "rgba(255, 140, 70, 0.95)";
        e.lineWidth = Math.max(2, r * 0.025);
        e.beginPath();
        e.arc(c, c, r, 0, Math.PI * 2);
        e.stroke();
        e.shadowBlur = 0;
        // planeta oscuro, apenas corrido para dar efecto de luz de costado
        e.fillStyle = "#000";
        e.beginPath();
        e.arc(c - r * 0.05, c + r * 0.03, r * 0.985, 0, Math.PI * 2);
        e.fill();
    }

    /* ---------- Nebulosa ---------- */
    function nube(x, y, radio, color, alfa) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, radio);
        g.addColorStop(0, `rgba(${color}, ${alfa})`);
        g.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(x - radio, y - radio, radio * 2, radio * 2);
    }
    function dibujarNebulosa(scroll) {
        const k = tiempo * 0.003, m = Math.max(ancho, alto), sy = scroll * 0.03;
        nube(ancho * (0.22 + 0.06 * Math.sin(k)), alto * (0.3 + 0.05 * Math.cos(k * 1.3)) - sy, m * 0.42, NARANJA, 0.16);
        nube(ancho * (0.7 + 0.05 * Math.cos(k * 0.8)), alto * (0.75 + 0.06 * Math.sin(k)) - sy, m * 0.45, "140, 70, 220", 0.15);
        nube(ancho * (0.5 + 0.08 * Math.sin(k * 0.6)), alto * (0.08 + 0.04 * Math.sin(k * 1.7)) - sy, m * 0.28, "255, 140, 60", 0.09);
    }
    function dibujarEclipse(scroll) {
        if (!eclipse) return;
        const pulso = 0.82 + 0.18 * Math.sin(tiempo * 0.02);
        const tam = eclipse.width / dpr;
        ctx.globalAlpha = pulso;
        ctx.drawImage(eclipse, eclipseX - tam / 2, eclipseY - tam / 2 - scroll * 0.02, tam, tam);
        ctx.globalAlpha = 1;
    }

    function ajustarTamano() {
        ancho = window.innerWidth;
        alto = window.innerHeight;
        canvas.width = ancho * dpr;
        canvas.height = alto * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        crearEstrellas();
        crearEclipse();
        if (reducirMovimiento) dibujar(false);
    }

    function dibujarFugaz() {
        if (!fugaz && Math.random() < (esCelular ? 0.004 : 0.006)) {
            fugaz = { x: Math.random() * ancho * 0.7, y: Math.random() * alto * 0.4, avance: 0 };
        }
        if (!fugaz) return;
        fugaz.avance += 10;
        const x1 = fugaz.x + fugaz.avance, y1 = fugaz.y + fugaz.avance * 0.45;
        const x2 = x1 - 130, y2 = y1 - 58;
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `rgba(${NARANJA}, 1)`);
        grad.addColorStop(1, `rgba(${NARANJA}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        if (x2 > ancho || y2 > alto) fugaz = null;
    }

    function dibujar(animar) {
        ctx.clearRect(0, 0, ancho, alto);
        // Movimiento suave hacia la posición del mouse
        suaveX += (mouseX - suaveX) * 0.05;
        suaveY += (mouseY - suaveY) * 0.05;
        const scroll = window.scrollY;
        dibujarNebulosa(scroll);

        for (const e of estrellas) {
            const k = e.capa;
            // Parallax: las capas cercanas se mueven más
            let x = e.x - suaveX * k * 0.012;
            let y = e.y - suaveY * k * 0.012 - scroll * k * 0.04;
            if (animar) e.y += 0.03 * k;                     // deriva lenta hacia abajo
            x = ((x % ancho) + ancho) % ancho;
            y = ((y % alto) + alto) % alto;

            const brillo = 0.45 + 0.55 * Math.abs(Math.sin(tiempo * 0.015 + e.fase));
            ctx.fillStyle = e.naranja
                ? `rgba(${NARANJA}, ${brillo})`
                : `rgba(255, 255, 255, ${brillo * (0.35 + k * 0.2)})`;
            ctx.beginPath();
            ctx.arc(x, y, k * 0.55, 0, Math.PI * 2);
            ctx.fill();
        }
        dibujarEclipse(scroll);           // el planeta tapa las estrellas que tiene detrás
        if (animar) dibujarFugaz();
    }

    function bucle() {
        if (!corriendo) return;
        tiempo++;
        dibujar(true);
        requestAnimationFrame(bucle);
    }

    window.addEventListener("resize", ajustarTamano);
    window.addEventListener("mousemove", e => {
        mouseX = e.clientX - ancho / 2;
        mouseY = e.clientY - alto / 2;
    }, { passive: true });
    document.addEventListener("visibilitychange", () => {
        corriendo = !document.hidden && !reducirMovimiento;
        if (corriendo) requestAnimationFrame(bucle);
    });
    if (reducirMovimiento) window.addEventListener("scroll", () => dibujar(false), { passive: true });

    ajustarTamano();
    if (!reducirMovimiento) requestAnimationFrame(bucle);
})();
