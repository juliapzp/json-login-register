const campoLogin = document.getElementById("login")
const campoSenha = document.getElementById("password")
const campoNovoLogin = document.getElementById("novoLogin")
const campoNovaSenha = document.getElementById("novaSenha")
const campoRepSenha = document.getElementById("repSenha")
let usuarios = [];

function voltarLogin() {
    window.location.href = "../index.html"
}

function login() {
    let login = campoLogin.value;
    let senha = campoSenha.value;
    let mensagem = "";
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
    if (bancoDeDados == null) {
        mensagem = "Nenhum usuário cadastrado até o momento";
    } else {
        let loginValido = false;
        for (let usuario of bancoDeDados) {
            if (usuario.login == login && usuario.senha == senha) {
                localStorage.setItem("logado", JSON.stringify(usuario));
                window.location.href = "logado/home.html";
                loginValido = true;
                break;
            }
        }
        if (!loginValido) {
            mensagem = "Usuário ou senha incorreta!";
        }
    }
    if (mensagem !== "") {
        alert(mensagem);
    }
}
function cadastra() {
    if (campoNovaSenha.value == campoRepSenha.value) {
        const usuario = {
            login: campoNovoLogin.value,
            senha: campoNovaSenha.value
        };
        let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
        if (bancoDeDados == null) {
            bancoDeDados = [];
        }
        if (verificaSeExiste(campoNovoLogin.value, bancoDeDados)) {
            alert("Esse login já está cadastrado!");
        } 
        else {
            bancoDeDados.push(usuario);
            localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados));
            campoNovoLogin.value = "";
            campoNovaSenha.value = "";
            campoRepSenha.value = "";
        }
    } 
    else {
        alert("As senhas são diferentes!");
    }
}

function verificaSeExiste(login, banco) {
    for (usuario of banco) {
        if (login == usuario.login) {
            return true;
        }
    }
    return false;
}