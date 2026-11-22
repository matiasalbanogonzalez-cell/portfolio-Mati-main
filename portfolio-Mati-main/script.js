let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    if (!skills) return; // en project.html no existe la sección
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        const clases = ["javascript", "htmlcss", "photoshop", "wordpress", "drupal", "ia",
                        "comunicacion", "trabajo", "creatividad", "dedicacion", "proyect"];
        clases.forEach((c, i) => { if (habilidades[i]) habilidades[i].classList.add(c); });
    }
}


//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
} 
/* =========================================================
   EMAIL
   En la compu, "mailto:" no hace nada si no hay un programa de
   correo instalado. Por eso en la compu abrimos Gmail en una
   pestaña nueva (y copiamos el email); en el celular usamos
   mailto:, que abre la app de correo.
   ========================================================= */
const MI_EMAIL = "matiasalbanogonzalez@gmail.com";
const esCelularEmail = window.matchMedia("(pointer: coarse)").matches;

function avisoEmail(texto) {
    let t = document.getElementById("aviso-email");
    if (!t) {
        t = document.createElement("div");
        t.id = "aviso-email";
        t.setAttribute("role", "status");
        document.body.appendChild(t);
    }
    t.textContent = texto;
    t.classList.add("visible");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("visible"), 3500);
}

function abrirEmail(asunto = "", cuerpo = "") {
    if (esCelularEmail) {
        window.location.href = `mailto:${MI_EMAIL}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
        return;
    }
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${MI_EMAIL}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    window.open(gmail, "_blank", "noopener");
    if (navigator.clipboard) {
        navigator.clipboard.writeText(MI_EMAIL).catch(() => {});
    }
    avisoEmail("Se abrió Gmail en otra pestaña. También copié mi email: " + MI_EMAIL);
}

document.addEventListener("click", e => {
    const link = e.target.closest('a[href^="mailto:"]');
    if (!link || esCelularEmail) return;   // en el celular, el mailto normal
    e.preventDefault();
    abrirEmail("Contacto desde el portfolio");
});
