
class transaccionClass {
  constructor (idTrans, usuario, tipo, categoria, cantidad, reparto) {
    this._idTrans = idTrans;
    this._usuario = usuario;
    this._tipo = tipo;
    this._categoria = categoria;
    this._cantidad = cantidad;
    this._reparto = reparto;
  }

  get usuario () {
    return this._usuario;
  }
  get tipo () {
    return this._tipo;
  }
  get categoria () {
    return this._categoria;
  }
  get cantidad () {
    return this._cantidad;
  }
  get reparto () {
    return this._reparto;
  }

}

let arrTransacciones = [];
let cuentaTransacciones = 0;

const form = document.getElementById('nuevaTransaccion');

let mensajeGuardado=document.getElementById('mensajeGuardado');

let unaiAlquiler=0;
let unaiCompra=0;
let unaiLuz=0;
let unaiAgua=0;
let unaiInternet=0;

var resumenUnai = document.getElementById('resumenUnai');

var chart = new Chart(resumenUnai, {
  type: 'doughnut',
  data:{
  datasets: [{
    data: [unaiAlquiler, unaiCompra, unaiLuz, unaiAgua, unaiInternet],
    backgroundColor: ['#42a5f5', 'red', 'green','blue','violet'],
    label: 'Comparacion de navegadores'}],
  labels: ['Alquiler','Compra','Luz','Agua','Internet']},
  options: {responsive: true}
});


/*
let unaiLimpieza=document.getElementById('unaiLimpieza');
let unaiOtros=document.getElementById('unaiOtros');
let unaiTotal=document.getElementById('unaiTotal');
let monicaAlquiler=document.getElementById('monicaAlquiler');
let monicaCompra=document.getElementById('monicaCompra');
let monicaLuz=document.getElementById('monicaLuz');
let monicaAgua=document.getElementById('monicaAgua');
let monicaInternet=document.getElementById('monicaInternet');
let monicaLimpieza=document.getElementById('monicaLimpieza');
let monicaOtros=document.getElementById('monicaOtros');
let monicaTotal=document.getElementById('monicaTotal');

let unaiGastos=document.getElementById('unaiGastos');
let monicaGastos=document.getElementById('monicaGastos');
let unaiTransferencias=document.getElementById('unaiTransferencias');
let monicaTransferencias=document.getElementById('monicaTransferencias');*/


sumaPagosPorCategoria = (usuario, tipo, categoria) => {
  let sumaPagos = 0;
  for (let i = 0; i < arrTransacciones.length; i++){
    if (arrTransacciones[i].categoria === categoria && arrTransacciones[i].usuario === usuario && arrTransacciones[i].tipo === tipo){
      sumaPagos = sumaPagos + arrTransacciones[i].cantidad;
    }
  }
  return sumaPagos;
}

sumaPagosPorUsuario = (usuario, tipo) => {
  let sumaPagos = 0;
  for (let i = 0; i < arrTransacciones.length; i++){
    if (arrTransacciones[i].usuario === usuario && arrTransacciones[i].tipo === tipo){
      sumaPagos = sumaPagos + arrTransacciones[i].cantidad;
    }
  }
  return sumaPagos;
}

sumaGastosPorUsuario = (usuario, tipo) => {
  let sumaGastos = 0;

  for (let i = 0; i < arrTransacciones.length; i++){
    if (arrTransacciones[i].reparto === usuario && arrTransacciones[i].tipo === tipo){
      sumaGastos = sumaGastos + arrTransacciones[i].cantidad;
    }  else if (arrTransacciones[i].reparto === "ambos" && arrTransacciones[i].tipo === tipo) {
      sumaGastos = sumaGastos + arrTransacciones[i].cantidad/2;
    }
  }
  return sumaGastos;
}



form.addEventListener('submit', (event) => {
  event.preventDefault();

  const usuario = form.elements.usuario.value;
  const tipo = form.elements.tipo.value;
  const categoria = form.elements.categoria.value;
  const cantidad = parseFloat(form.elements.cantidad.value);
  const reparto = form.elements.reparto.value;

  const transaccion = new transaccionClass(cuentaTransacciones ,usuario, tipo, categoria, cantidad, reparto);
  
  mensajeGuardado.innerHTML = `Se ha guardado correctamente la transacción tipo ${tipo} de ${usuario} para ${reparto}, con valor de ${cantidad}€!`;

  cuentaTransacciones++;

  arrTransacciones.push(transaccion);

  unaiAlquiler = sumaPagosPorCategoria ('unai', 'gasto', 'alquiler');
  unaiCompra = sumaPagosPorCategoria ('unai', 'gasto', 'compra');
  unaiAgua = sumaPagosPorCategoria ('unai', 'gasto', 'agua');
  unaiInternet = sumaPagosPorCategoria ('unai', 'gasto', 'internet');
  unaiLuz = sumaPagosPorCategoria ('unai', 'gasto', 'luz');

  console.log(unaiAgua);

  chart.data.datasets[0].data = [unaiAlquiler, unaiCompra, unaiLuz, unaiAgua, unaiInternet];
  chart.update();

  /*unaiAlquiler.innerText = sumaPagosPorCategoria ('unai', 'gasto', 'alquiler');
  unaiCompra.innerText = sumaPagosPorCategoria ('unai', 'gasto', 'compra');
  unaiLuz.innerText = sumaPagosPorCategoria ('unai', 'gasto', 'luz');
  unaiAgua.innerText = sumaPagosPorCategoria ('unai', 'gasto', 'agua');
  unaiInternet.innerText = sumaPagosPorCategoria ('unai', 'gasto', 'internet');
  unaiLimpieza.innerText = sumaPagosPorCategoria ('unai', 'gasto', 'limpieza');
  unaiOtros.innerText = sumaPagosPorCategoria ('unai', 'gasto', 'otros');
  unaiTotal.innerText = sumaPagosPorUsuario ('unai', 'gasto');

  monicaAlquiler.innerText = sumaPagosPorCategoria ('monica', 'gasto', 'alquiler');
  monicaCompra.innerText = sumaPagosPorCategoria ('monica', 'gasto', 'compra');
  monicaLuz.innerText = sumaPagosPorCategoria ('monica', 'gasto', 'luz');
  monicaAgua.innerText = sumaPagosPorCategoria ('monica', 'gasto', 'agua');
  monicaInternet.innerText = sumaPagosPorCategoria ('monica', 'gasto', 'internet');
  monicaLimpieza.innerText = sumaPagosPorCategoria ('monica', 'gasto', 'limpieza');
  monicaOtros.innerText = sumaPagosPorCategoria ('monica', 'gasto', 'otros');
  monicaTotal.innerText = sumaPagosPorUsuario ('monica', 'gasto');

  monicaGastos.innerText = sumaGastosPorUsuario ('monica', 'gasto');
  unaiGastos.innerText = sumaGastosPorUsuario ('unai', 'gasto');
  monicaTransferencias.innerText = sumaGastosPorUsuario ('monica', 'transferencia');
  unaiTransferencias.innerText = sumaGastosPorUsuario ('unai', 'transferencia');*/

   
});


const buttonPagPrincipal = document.getElementById('pagPrincipal');
const buttonPagResumen = document.getElementById('pagResumen');
const paginaPrincipal = document.getElementById('paginaPrincipal');
const paginaResumen = document.getElementById('paginaResumen');

paginaPrincipal.style.display = 'block';
paginaResumen.style.display = 'none';

buttonPagPrincipal.onclick = () => {
  paginaPrincipal.style.display = 'block';
  paginaResumen.style.display = 'none';
  buttonPagPrincipal.style.backgroundColor = '#884825'
  buttonPagPrincipal.style.color = '#ffffff'
  buttonPagResumen.style.backgroundColor = '#ffffff'
  buttonPagResumen.style.color = '#884825'

}

buttonPagResumen.onclick = () => {
  paginaResumen.style.display = 'block';
  paginaPrincipal.style.display = 'none';
  buttonPagResumen.style.backgroundColor = '#884825'
  buttonPagResumen.style.color = '#ffffff'
  buttonPagPrincipal.style.backgroundColor = '#ffffff'
  buttonPagPrincipal.style.color = '#884825'
}






