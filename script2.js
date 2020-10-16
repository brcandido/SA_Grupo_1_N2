let username = document.getElementById('login')
let senha = document.getElementById('senha')
let confirmaSenha = document.getElementById('confirmaSenha')
let endereco = document.getElementById('endereco')
let nome = document.getElementById('nome')

const cadastros = []

function limpaCampos() {
  username.value = null
  senha.value = null
  confirmaSenha.value = null
  endereco.value = null
  nome.value = null
}

function cadastraUsuario(password = senha.value, confirmaPassword = confirmaSenha.value) {
  function Login(login, password, address, name) {
    this.login = login
    this.password = password
    this.address = address
    this.name = name
  }

  if (username.value && senha.value) {
    if (password === confirmaPassword) {
      let cadastro = new Login(username.value, senha.value, endereco.value, nome.value)

      if (localStorage.getItem('arrayCadastros')) {
        let arrayCadastros = JSON.parse(localStorage.getItem('arrayCadastros'))
        let check = arrayCadastros.map(item => item.login)
        if (check.includes(cadastro.login)) {
          return alert('O nome de usuario está indisponivel')
        } else {
          arrayCadastros.push(cadastro)
          localStorage.setItem('arrayCadastros', JSON.stringify(arrayCadastros))
          limpaCampos()
        }
      } else {
        cadastros.push(cadastro)
        localStorage.setItem('arrayCadastros', JSON.stringify(cadastros))
        limpaCampos()
      }
    } else {
      confirmaSenha.value = null
      return alert('As senhas não coincidem')
    }
  } else {
    return alert('Favor preencher todos os campos do cadastro')
  }
}

function buscaUsuario() {
  let arrayCadastros = JSON.parse(localStorage.getItem('arrayCadastros'))
  let flag = true
  let cadastro = arrayCadastros.filter(element => {
    if (element.login === username.value) {
      flag = false
      return element
    }
  });
  if (flag) {
    return alert('Este usuário não foi cadastrado')
  }
  return cadastro
}

function atualizarCadastroUsuario() {
  let arrayCadastros = JSON.parse(localStorage.getItem('arrayCadastros'))
  let usuario = arrayCadastros.findIndex(element => element.login === buscaUsuario()[0].login)
  if (senha.value) arrayCadastros[usuario].password = senha.value;
  if (endereco.value) arrayCadastros[usuario].address = endereco.value;
  if (nome.value) arrayCadastros[usuario].name = nome.value;
  localStorage.setItem('arrayCadastros', JSON.stringify(arrayCadastros))
  limpaCampos()
}

function apagaUsuario() {
  let arrayCadastros = JSON.parse(localStorage.getItem('arrayCadastros'))
  let usuario = arrayCadastros.findIndex(element => element.login === buscaUsuario()[0].login)
  delete arrayCadastros[usuario]
  let organizaArray = arrayCadastros.filter(element => element)
  localStorage.setItem('arrayCadastros', JSON.stringify(organizaArray))
  limpaCampos()
}

function validateLogin(){
  let userLogin = document.getElementById("email_login");
  let passwordLogin = document.getElementById("senha_login");
                  
  if (userLogin.value != "" && passwordLogin.value != "") {
    let arrayCadastros = JSON.parse(localStorage.getItem('arrayCadastros'));
    let check = arrayCadastros.map(item => item.login);

    if (check.includes(userLogin.value)) {
      let indexUsuario = check.indexOf(userLogin.value);
      if(passwordLogin.value == arrayCadastros[indexUsuario].password){
        console.log("Sucesso");
      }
      else{
        alert("Senha Incorreta");
      } 
    }
    else{
      alert("Usuário Incorreto");
    }
  }
  else{
    alert("Insira seu login e senha!")
  }  
  userLogin.value = "";
  passwordLogin.value = "";
}

