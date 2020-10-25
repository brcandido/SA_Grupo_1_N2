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
let cliente = document.getElementById("cliente")

const reservas = []


function comparaDatas(data1, data2) {
  let partes1 = data1.split("-")
  data1 = new Date(partes1[0], partes1[1] - 1, partes1[2])
  let partes2 = data2.split("-")
  data2 = new Date(partes2[0], partes2[1] - 1, partes2[2])
  return data1 >= data2 ? true : false
}

function geraID() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

function cadastraReserva() {
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
  function Reserva(cliente, checkin, checkout, quartosDuplos, quartosTriplos, cafe, garagem, obs) {
    this.id = geraID()
    this.cliente = cliente
    this.checkin = checkin
    this.checkout = checkout
    this.quartosDuplos = quartosDuplos
    this.quartosTriplos = quartosTriplos
    this.cafe = cafe
    this.garagem = garagem
    this.obs = obs
  }

  let quartos = JSON.parse(localStorage.getItem('arrayQuartos')) ? JSON.parse(localStorage.getItem('arrayQuartos')) : estruturaQuartos

  let cliente = ''
  JSON.parse(localStorage.getItem('arrayCadastros')).forEach(element => {
    if (element.status) {
      cliente = element.login
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

  if (dataCheckOut.value > dataCheckIn.value && (duplos > 0 || triplos > 0)) {
    let reserva = new Reserva(cliente, dataCheckIn.value, dataCheckOut.value, duplos, triplos, opcaoCafe, opcaoVaga, obs.value)
    // console.log(reserva)
    alocaQuartos(quartos.duplos, 'quartosDuplos', reserva)
    alocaQuartos(quartos.triplos, 'quartosTriplos', reserva)
    localStorage.setItem('arrayQuartos', JSON.stringify(quartos))
  }

  function alocaQuartos(arrayQuartos, numQuartos, reserva) {
    if (reserva[numQuartos] <= arrayQuartos.map(element => element.reservas).filter(element => {
        if (!element[0] || comparaDatas(reserva.checkin, element[0].checkout) || comparaDatas(element[0].checkin, reserva.checkout)) {
          return true
        }
      }).length) {
      let count = 0
      for (let i = 0; i < reserva[numQuartos]; i++) {
        for (let j = 0; j < arrayQuartos.length; j++) {
          if (arrayQuartos[j].reservas.length > 0 && count < reserva[numQuartos]) {
            if (!arrayQuartos[j].reservas.some(element => element.id === reserva.id)) {
              for (let k = 0; k < arrayQuartos[j].reservas.length; k++) {
                if (comparaDatas(reserva.checkin, arrayQuartos[j].reservas[k].checkout) || comparaDatas(arrayQuartos[j].reservas[k].checkin, reserva.checkout)) {
                  arrayQuartos[j].reservas.push(reserva)
                  count++
                }
              }
            }
          } else if (count < reserva[numQuartos]) {
            arrayQuartos[j].reservas.push(reserva)
            count++
          }
        }
        if (count == 0) {
          alert(`nao tem quarto`)
          break
        }
      }
    } else {
      if (numQuartos === 'quartosDuplos') {
        alert(`Não possuímos ${reserva[numQuartos]} quartos duplos para esta data`)
      } else {
        alert(`Não possuímos ${reserva[numQuartos]} quartos triplos para esta data`)
      }
    }
  }

}

let dataInicial = document.getElementById('dataInicial')
let dataFinal = document.getElementById('dataFinal')
let tipoQuarto = document.getElementById('tipoQuarto')


function buscaReserva(){
  let arrayQuartos = JSON.parse(localStorage.getItem('arrayQuartos'))
  let reservas = []
  if(tipoQuarto.value === 'duplo'){
    percorreQuartos(arrayQuartos.duplos)
  }
  else if(tipoQuarto.value === 'triplo'){
    percorreQuartos(arrayQuartos.triplos)
  }else{
    percorreQuartos(arrayQuartos.duplos)
    percorreQuartos(arrayQuartos.triplos)
  }
  function percorreQuartos(arrayQuartos){
    for (let i = 0; i <arrayQuartos.length ; i++){
      if(arrayQuartos[i].reservas.length > 0){
        for (let j = 0; j < arrayQuartos[i].reservas.length; j++){
          if (arrayQuartos[i].reservas[j].cliente === cliente.value && comparaDatas(arrayQuartos[i].reservas[j].checkin, dataInicial.value) && comparaDatas(dataFinal.value, arrayQuartos[i].reservas[j].checkin)){
            arrayQuartos[i].reservas[j].num = arrayQuartos[i].num
            reservas.push(arrayQuartos[i].reservas[j])  
          }
        }
      }
    }
  }
  
  console.log(reservas)
  return reservas
}