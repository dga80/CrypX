const criptoSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda')
const formulario = document.querySelector('#formulario');
//Promise que descarga las criptomonedas
const obtenerCriptomonedas = c => new Promise (resolve =>{
    resolve(c)
})
const objBusqueda = {
    moneda: '',
    criptomoneda: '',
}

document.addEventListener('DOMContentLoaded', ()=>{
    consultarCripto();
    formulario.addEventListener('submit', submitFormulario);
    criptoSelect.addEventListener('change', leerValor)
    monedaSelect.addEventListener('change', leerValor)
})

function consultarCripto(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(url)
        .then (response => response.json())
        .then (result => obtenerCriptomonedas(result.Data)) // creamos el Promise y lo declaramos al ppio
        .then ( c => selectCriptomonedas(c))
}

function selectCriptomonedas(c){
    c.forEach( cripto =>{
        const {FullName, Name} = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptoSelect.appendChild(option);
    })
}
function leerValor(e){
    objBusqueda[e.target.name]= e.target.value;


  console.log(objBusqueda)
}
function submitFormulario(e){
    e.preventDefault();

    //validar formulario
    const {moneda, criptomoneda} = objBusqueda;

    if (moneda === '' || criptomoneda === '') {
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }
}

function mostrarAlerta(msg){
    console.log(msg)
}



