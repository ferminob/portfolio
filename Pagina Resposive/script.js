var input_nombre = document.getElementById("nombre");
var input_email = document.getElementById("email");
var input_pc = document.getElementById("pc");
var input_boton = document.getElementById("botonEnviar");
var formulario = document.getElementById("formu");

formulario.addEventListener("submit", function(event) {
  event.preventDefault(); 

  var valor_nombre = input_nombre.value.trim();
  var valor_email = input_email.value.trim();
  var valor_pc = input_pc.value;

  if (!formulario.checkValidity() || valor_pc === "") {
    formulario.reportValidity();
    return;
  }

  document.getElementById("nombre-placeholder").textContent = valor_nombre;
  document.getElementById("pc-placeholder").textContent = valor_pc;
  document.getElementById("mail-placeholder").textContent = valor_email;

  var elemento_feedback = document.getElementById("feedback");
  elemento_feedback.classList.remove("oculto");

  elemento_feedback.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('CTA').addEventListener('click', () => {
  document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' });
});
