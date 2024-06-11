import { obtener_datos, registrar } from "./promesa.js"
window.addEventListener("load",()=>{
    //creo listeners con las funciones
})

//validar
const validar = (valor)=>{
    if(valor.trim()==""){
        
    }

}

//cambiar fondo
const cambiar_contraste = ()=>{
    
}
//cambiar fuente


//creo una funcion flecha de registro
const registrar_consulta = ()=>{
    //obtengo los datos del formulario
    let nNombre_duenio = document.getElementById("nombre_duenio")
    let nApellido_duenio = document.getElementById("apellido_duenio")
    let nNombre_mascota = document.getElementById("nombre_mascota")
    let nCorreo = document.getElementById("correo")
    let nRut = document.getElementById("rut")
    let nTipo = document.querySelector("input[name='tipo']:checked")
    let nProblema = document.getElementById("problema")
    let nConsulta = document.getElementById("consulta")
    //console.log()
    //convierto los datos obtenidos en valores
    let vNombre_duenio = nNombre_duenio.value 
    let vApellido_duenio = nApellido_duenio.value
    let vNombre_mascota = nNombre_mascota.value
    let vCorreo = nCorreo.value
    let vRut = nRut.value
    let vTipo = nTipo
    let vProblema = nProblema.value
    let vConsulta = nConsulta.value
    //creo un objeto con los valores
    let objeto = {Nombre_duenio:vNombre_duenio,Apellido_duenio:vApellido_duenio,Nombre_mascota:vNombre_mascota,Correo:vCorreo,Rut:vRut,Tipo:vTipo,Problema:vProblema,Consulta:vConsulta}
    console.log(objeto)
    registrar(objeto).then(()=>{
        alert("Se registro con exito")
    }).catch((error)=>{
        console.log(error)
    })

}

const cargar_datos = ()=>{
    let datos = obtener_datos()
    datos.forEach(element => {
        tabla = ""
    });
}