const form = document.querySelector(".container");
const google = document.getElementById("google")
const facebook = document.getElementById("facebook")
const github = document.getElementById("github")

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const usuario = document.getElementById("usuarioInput").value;
  localStorage.setItem("usuario", usuario);
  location.href = "projetos.html";
});

google.addEventListener("click", (event) => {
  event.preventDefault()
  const usuario = document.getElementById("usuarioInput").value;
  localStorage.setItem("usuario", usuario);
  location.href = "projetos.html"
})

facebook.addEventListener("click", (event) => {
  event.preventDefault()
  const usuario = document.getElementById("usuarioInput").value;
  localStorage.setItem("usuario", usuario);
  location.href = "projetos.html"
})

github.addEventListener("click", (event) => {
  event.preventDefault()
  const usuario = document.getElementById("usuarioInput").value;
  localStorage.setItem("usuario", usuario);
  location.href = "projetos.html"
})
