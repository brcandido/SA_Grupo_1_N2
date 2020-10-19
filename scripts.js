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


//CRUD para funcionario do estabelecimento
function cadastraUsuario(password = senha.value, confirmaPassword = confirmaSenha.value) {
  function Login(login, password, address, name, status = false) {
    this.login = login
    this.password = password
    this.address = address
    this.name = name
    this.status = status
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

function validateLogin() {
  let userLogin = document.getElementById("email_login");
  let passwordLogin = document.getElementById("senha_login");

  if (userLogin.value != "" && passwordLogin.value != "") {
    let arrayCadastros = JSON.parse(localStorage.getItem('arrayCadastros'));
    let check = arrayCadastros.map(item => item.login);

    if (check.includes(userLogin.value)) {
      let indexUsuario = check.indexOf(userLogin.value);
      if (passwordLogin.value == arrayCadastros[indexUsuario].password) {
        console.log("Sucesso");
        arrayCadastros[indexUsuario].status = true
        localStorage.setItem('arrayCadastros', JSON.stringify(arrayCadastros))
      } else {
        alert("Senha Incorreta");
      }
    } else {
      alert("Usuário Incorreto");
    }
  } else {
    alert("Insira seu login e senha!")
  }
  userLogin.value = "";
  passwordLogin.value = "";
}



//CRUD para serviço
let checkin = document.getElementById("dataCheckIn")
let checkout = document.getElementById("dataCheckOut")
let quartosDuplos = document.getElementById("quartosDuplos")
let quartosTriplos = document.getElementById("quartosTriplos")
let cafe = document.getElementsByName("cafe")
let vaga = document.getElementsByName("vaga")
let obs = document.getElementById("obs")

const reservas = []
const estruturaQuartos = {
  duplos: [{
      num: "101",
      reservas: []
    },
    {
      num: "103",
      reservas: []
    },
    {
      num: "105",
      reservas: []
    },
    {
      num: "107",
      reservas: []
    }
  ],
  triplos: [{
      num: "102",
      reservas: []
    },
    {
      num: "104",
      reservas: []
    },
    {
      num: "106",
      reservas: []
    },
    {
      num: "108",
      reservas: []
    }
  ]
}

function comparaDatas(data1, data2) {
  let partes1 = data1.split("-")
  data1 = new Date(partes1[0], partes1[1] - 1, partes1[2])
  let partes2 = data2.split("-")
  data2 = new Date(partes2[0], partes2[1] - 1, partes2[2])
  return data1 >= data2 ? true : false
}

function cadastraReserva() {
  function Reserva(id, checkin, checkout, quartosDuplos, quartosTriplos, cafe, garagem, obs) {
    this.id = id
    this.checkin = checkin
    this.checkout = checkout
    this.quartosDuplos = quartosDuplos
    this.quartosTriplos = quartosTriplos
    this.cafe = cafe
    this.garagem = garagem
    this.obs = obs
  }

  let quartos = JSON.parse(localStorage.getItem('arrayQuartos')) ? JSON.parse(localStorage.getItem('arrayQuartos')) : estruturaQuartos

  let id = ''
  JSON.parse(localStorage.getItem('arrayCadastros')).forEach(element => {
    if (element.status) {
      id = element.login
    }
  })

  let opcaoCafe = ''
  cafe.forEach(element => {
    if (element.checked) {
      opcaoCafe = element.value
    }
  })

  let opcaoVaga = ''
  vaga.forEach(element => {
    if (element.checked) {
      opcaoVaga = element.value
    }
  })

  let duplos = Number(quartosDuplos.value)
  let triplos = Number(quartosTriplos.value)


  if (dataCheckOut.value > dataCheckIn.value && duplos > 0 || triplos > 0) {
    let reserva = new Reserva(id, dataCheckIn.value, dataCheckOut.value, duplos, triplos, opcaoCafe, opcaoVaga, obs.value)
    console.log(reserva)

    loop1:
      for (let h = 0; h < reserva.quartosDuplos; h++) {
        loop2: for (let i = 0; i < quartos.duplos.length; i++) {
          if (quartos.duplos[i].reservas.length > 0) {
            if (!quartos.duplos[i].reservas.some(element => element.checkin === reserva.checkin) && !quartos.duplos[i].reservas.some(element => element.checkout === reserva.checkout)) {
              for (let j = 0; j < quartos.duplos[i].reservas.length; j++) {
                if (comparaDatas(reserva.checkin, quartos.duplos[i].reservas[j].checkout) || comparaDatas(quartos.duplos[i].reservas[j].checkin, reserva.checkout)) {
                  quartos.duplos[i].reservas.push(reserva)
                  console.log(quartos.duplos[i].reservas)
                  break loop2;
                } else if (i === quartos.duplos.length - 1) {
                  alert("Não há quartos duplos disponíveis nesta data.")
                  break loop1;
                }
              }
            }
          } else {
            quartos.duplos[i].reservas.push(reserva)
            break;
          }
        }
      }

    loop3:
      for (let h = 0; h < reserva.quartosTriplos; h++) {
        loop4: for (let i = 0; i < quartos.triplos.length; i++) {
          if (quartos.triplos[i].reservas.length > 0) {
            if (!quartos.triplos[i].reservas.some(element => element.checkin === reserva.checkin) && !quartos.triplos[i].reservas.some(element => element.checkout === reserva.checkout)) {
              for (let j = 0; j < quartos.triplos[i].reservas.length; j++) {
                if (comparaDatas(reserva.checkin, quartos.triplos[i].reservas[j].checkout) || comparaDatas(quartos.triplos[i].reservas[j].checkin, reserva.checkout)) {
                  quartos.triplos[i].reservas.push(reserva)
                  console.log(quartos.triplos[i].reservas)
                  break loop4;
                } else if (i === quartos.triplos.length - 1) {
                  alert("Não há quartos triplos disponíveis nesta data.")
                  break loop3;
                }
              }
            }
          } else {
            quartos.triplos[i].reservas.push(reserva)
            break;
          }
        }
      }
    localStorage.setItem('arrayQuartos', JSON.stringify(quartos))
  }
}