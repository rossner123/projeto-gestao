const form = document.querySelector(".container");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmar-senha");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (senha.value !== confirmarSenha.value) {
    alert("As senhas não coincidem!");
  } else {
    const usuario = document.getElementById("nome");
    localStorage.setItem("usuario", usuario.value);
    location.href = "projetos.html";
  }
});
