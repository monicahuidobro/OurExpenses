
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
const tranID = document.getElementById('tranID');
const tranUsuario = document.getElementById('tranUsuario');
const tranTipo = document.getElementById('tranTipo');
const tranCategoria = document.getElementById('tranCategoria');
const tranCantidad = document.getElementById('tranCantidad');
const tranReparto = document.getElementById('tranReparto');

let unaiAlquiler=document.getElementById('unaiAlquiler');
let unaiCompra=document.getElementById('unaiCompra');
let unaiLuz=document.getElementById('unaiLuz');
let unaiAgua=document.getElementById('unaiAgua');
let unaiInternet=document.getElementById('unaiInternet');
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
let monicaTransferencias=document.getElementById('monicaTransferencias');


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
  
  tranID.innerText = cuentaTransacciones;
  tranUsuario.innerText = usuario;
  tranTipo.innerText = tipo;
  tranCategoria.innerText = categoria;
  tranCantidad.innerHTML = cantidad;
  tranReparto.innerText = reparto;

  cuentaTransacciones++;

  arrTransacciones.push(transaccion);
  console.log(transaccion);

  unaiAlquiler.innerText = sumaPagosPorCategoria ('unai', 'gasto', 'alquiler');
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
  unaiTransferencias.innerText = sumaGastosPorUsuario ('unai', 'transferencia');

});

