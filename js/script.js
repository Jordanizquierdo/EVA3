import {  registrar,obtener_datos,actualizar,Eliminar } from "./promesa.js"
window.addEventListener("load",()=>{
    //creo listeners con las funciones
    document.getElementById("btnEnviar").addEventListener("click",validacion);
    cargar_datos()
    document.getElementById("btnActualizar").addEventListener("click",actualizar_datos)
    document.getElementById("btnfondo").addEventListener("click",cambiar_Contraste)
    document.getElementById("btnfuente").addEventListener("click",cambiar_Fuente)
    // document.getElementById("btnEliminar").addEventListener("click",eliminar_dato)
})


// esta funcion valida todos los campos y cuando se encuentra validados registra
const validacion = ()=>{
    let a = validar_Vacio("nombre_duenio")
    let b = validar_Vacio("apellido_duenio")
    let c =validar_Vacio("nombre_mascota")
    let d = validar_Vacio("correo")
    let e = validar_Vacio("rut")
    let f = validar_Vacio("problema")
    let g = validar_Vacio("consulta")
    let h = validar_radio("tipo")
    let suma = a+b+c+d+e+f+g+h
    if(suma === 0){
        registrar_consulta()
    }
    else{
        alert("Debe rellenar los campos")
    }
}
//esta funcion valida el radio
const validar_radio = (nombre)=>{
    let elemento = document.getElementsByName(nombre)
    let eParrafo = document.getElementById("p"+nombre);
    if (document.querySelector('input[name="tipo"]:checked')) {
        eParrafo.style.display = "none";
        return 0 
    } else {
        eParrafo.style.display = "block";
        return 1
    }
}
//esta funcion valida campos vacios
const validar_Vacio =(idCampo)=>{
    //REcupera el elemento
    let elemento = document.getElementById(idCampo);
    //Recuperar valor del campo
    let valor = elemento.value;
    let eParrafo = document.getElementById("p"+idCampo);
    if(valor.trim()==""){
        elemento.style.borderColor = "red";
        eParrafo.style.display = "block";
        return 1
    }else{
        elemento.style.borderColor = "green";
        eParrafo.style.display = "none";
        return 0
    }
}

//cambiar fondo
const cambiar_Contraste =()=>{
    let eBody = document.body;
    let fondo = eBody.style.backgroundColor;
    if(fondo == "white"){
        eBody.style.backgroundColor = "black";
        eBody.style.color = "white"

    }else{
        eBody.style.backgroundColor = "white";
        eBody.style.color = "black"
    }
}
    

//cambiar fuente
const cambiar_Fuente =()=>{
    let eBody = document.body;
    let letra = eBody.style.fontSize;
    if(letra == "100%"){
        eBody.style.fontSize = "150%"

    }else{
         eBody.style.fontSize = "100%"
    }
}




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
    //convierto los datos obtenidos en valores
    let vNombre_duenio = nNombre_duenio.value 
    let vApellido_duenio = nApellido_duenio.value
    let vNombre_mascota = nNombre_mascota.value
    let vCorreo = nCorreo.value
    let vRut = nRut.value
    let vTipo = nTipo.value 
    let vProblema = nProblema.value
    let vConsulta = nConsulta.value
    //creo un objeto con los valores
    let objeto = {Nombre_duenio:vNombre_duenio,Apellido_duenio:vApellido_duenio,Nombre_mascota:vNombre_mascota,Correo:vCorreo,Rut:vRut,Tipo:vTipo,Problema:vProblema,Consulta:vConsulta}
    console.log(objeto)
    registrar(objeto).then(()=>{
        alert("Se registro con exito")
    }).catch((error)=>{
        console.log("hay campos vacios")
        console.log(error)
    })

}

const cargar_datos = ()=>{
    //obtengo lo registrado
    obtener_datos().then((datos)=>{
        let tabla = ""
        datos.forEach((p)=>{
            tabla += "<tr>"
            tabla += "<td>"+p.Nombre_duenio+"</td>"
            tabla += "<td>"+p.Apellido_duenio+"</td>"
            tabla += "<td>"+p.Nombre_mascota+"</td>"
            tabla += "<td>"+p.Correo+"</td>"
            tabla += "<td>"+p.Rut+"</td>"
            tabla += "<td>"+p.Tipo+"</td>"
            tabla += "<td>"+p.Problema+"</td>"
            tabla += "<td>"+p.Consulta+"</td>"
            tabla += "<td><button id='UPD"+p.id+"'>Actualizar</button></td>"
            tabla += "<td><button id='DEL"+p.id+"'>Eliminar</button></td>"
            tabla += "</tr>"
        })
        document.getElementById("CuerpoTabla").innerHTML = tabla;
        datos.forEach((p)=>{
            let elemento = document.getElementById("UPD"+p.id);
            elemento.addEventListener("click",()=>{
                document.getElementById("nombre_duenio").value = p.Nombre_duenio;
                document.getElementById("apellido_duenio").value = p.Apellido_duenio;
                document.getElementById("nombre_mascota").value = p.Nombre_mascota;
                document.getElementById("correo").value = p.Correo;
                document.getElementById("rut").value = p.Rut;
                document.getElementById("btnActualizar").value = p.id;
                document.getElementById("btnEliminar").value = p.id;
                //terminar
                let radio = document.querySelector("input[name='tipo']")
                radio.click()
                //
                document.getElementById("problema").value = p.Problema;
                document.getElementById("consulta").value = p.Consulta;
                document.getElementById("btnEnviar").style.display = "none"
                document.getElementById("btnActualizar").style.display = "inline"
                document.getElementById("btnCancelar").style.display = "inline"
                //esta funcion "esconde el boton enviar" y "aparece los botones actualizar y cancelar", esto se logra cambiando el display.
                document.getElementById("btnCancelar").addEventListener("click",()=>{
                    document.getElementById("form").reset()
                    document.getElementById("btnEnviar").style.display = "inline"
                    document.getElementById("btnActualizar").style.display = "none"
                    document.getElementById("btnCancelar").style.display = "none"

                })
            })
            document.getElementById("DEL"+p.id).addEventListener("click",()=>{
                if(confirm("Desea eliminara: \n"+p.id)){
                    console.log("Eliminar")
                    Eliminar(p.id).then(()=>{
                        alert("Se elimino con exito")
                        cargar_datos()
                    })
                }
            })
        })
    })
}

const actualizar_datos = ()=>{
    let nNombre_duenio = document.getElementById("nombre_duenio")
    let nApellido_duenio = document.getElementById("apellido_duenio")
    let nNombre_mascota = document.getElementById("nombre_mascota")
    let nCorreo = document.getElementById("correo")
    let nRut = document.getElementById("rut")
    let nTipo = document.querySelector("input[name='tipo']:checked")
    let nProblema = document.getElementById("problema")
    let nConsulta = document.getElementById("consulta")
    //convierto los datos obtenidos en valores
    let vNombre_duenio = nNombre_duenio.value 
    let vApellido_duenio = nApellido_duenio.value
    let vNombre_mascota = nNombre_mascota.value
    let vCorreo = nCorreo.value
    let vRut = nRut.value
    let vTipo = nTipo.value 
    let vProblema = nProblema.value
    let vConsulta = nConsulta.value
    //creo un objeto con los valores
    let objeto = {Nombre_duenio:vNombre_duenio,Apellido_duenio:vApellido_duenio,Nombre_mascota:vNombre_mascota,Correo:vCorreo,Rut:vRut,Tipo:vTipo,Problema:vProblema,Consulta:vConsulta}
    let id = document.getElementById("btnActualizar").value;
    //envio el objeto y el id
    actualizar(objeto,id).then(()=>{
        alert("se actualizo con exito")
        cargar_datos()
    }).catch((error1)=>{
        console.log(error1)
    })
}
