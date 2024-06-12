//importo las funciones de promesa
import {  registrar,obtener_datos,actualizar,Eliminar } from "./promesa.js"
window.addEventListener("load",()=>{
    //creo listeners con las funciones
    document.getElementById("btnEnviar").addEventListener("click",validacion);
    cargar_datos()
    document.getElementById("btnActualizar").addEventListener("click",actualizar_datos)
    document.getElementById("btnfondo").addEventListener("click",cambiar_Contraste)
    document.getElementById("btnfuente").addEventListener("click",cambiar_Fuente)
})


// esta funcion valida todos los campos y cuando se encuentra validados registra
const validacion = ()=>{
    //valido cada campos evitando que se encuentren vacio
    let a = validar_Vacio("nombre_duenio")
    let b = validar_Vacio("apellido_duenio")
    let c =validar_Vacio("nombre_mascota")
    let d = validar_Vacio("correo")
    let e = validar_Vacio("rut")
    let f = validar_Vacio("problema")
    let g = validar_Vacio("consulta")
    let h = validar_radio("tipo")
    //sumo los numeros de las variables retornadas en la funcion validar_vacio y validar_radio
    let suma = a+b+c+d+e+f+g+h
    //creo una condicional que si suma es igual a 0, se regitre la consulta, de caso contrario muestra un alert
    if(suma === 0){
        registrar_consulta()
    }
    else{
        alert("Debe rellenar los campos")
    }
}

//esta funcion valida el radio
const validar_radio = (nombre)=>{
    //recupero el elemento de parrafo
    let eParrafo = document.getElementById("p"+nombre);
    //creo una condicional la cual verifica si el input radio de nombre "tipo" se encuentra marcado
    //si se encuentra marcado retorna una 0
    //si no se encuentra marcado retorna un 1  cambia el display del parrafo a "block" para que se visualice
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
    //recupero el elemento
    let elemento = document.getElementById(idCampo);
    //Recupero valor del campo
    let valor = elemento.value;
    //recupero el <p> debajo del input
    let eParrafo = document.getElementById("p"+idCampo);
    //uso trim() el cual elimina los espacios, y si el campo no contiene nada se cambia el display del parrafo 
    //y se pone el borde del input en rojo para informar que campos faltan por rellenar
    //en caso contrario (el campo si tenga un valor) el borde del input se cambia a verde

    if(valor.trim()==""){
        elemento.style.borderColor = "red";
        eParrafo.style.display = "block";
        //si se encuentra vacio retorna un 1
        return 1
    }else{
        elemento.style.borderColor = "green";
        eParrafo.style.display = "none";
        //si no se encuentra vacio retorna un 0
        return 0
    }
}

//cambiar fondo
const cambiar_Contraste =()=>{
    //obtengo el body
    let eBody = document.body;
    //obtengo el valor del color de fondo actual
    let fondo = eBody.style.backgroundColor;
    //creo una condicional que verifica si el fondo es blanco
    //en caso de ser blanco cambia el fondo a negro y el color de las letras a blanco
    //en caso de no ser blanco cambia el fondo a blanco y las letras a negro
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
    //obtengo el body
    let eBody = document.body;
    //obtengo el valor del tamaño de letras actual
    let letra = eBody.style.fontSize;
    //creo una condicional la cual comprueba que si e ltamaño de la letra esta al 100% lo cambia a 150%
    //si el tamaño no es 100% lo cambia a 100%
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
    //envio el objeto a registrar (promesa)
    registrar(objeto).then(()=>{
        //si se ejecuta la funcion muestro un alert
        alert("Se registro con exito")
        //cargo los datos nuevamente (utilizando la funcion cargar_datos)
        cargar_datos()
        //reinicio el formulario
        document.getElementById("form").reset()
    }).catch((error)=>{
        //si no se ejecuta la funcion muestro en la consola un mensaje y el error
        console.log("hay campos vacios")
        console.log(error)
    })

}

const cargar_datos = ()=>{
    //obtengo lo registrado
    obtener_datos().then((datos)=>{
        //una vez obtengo lo regitrado creo una variable ""
        let tabla = ""
        //utilizo el forEach para acceder a los elementos del array (datos)
        datos.forEach((p)=>{
            //creo una tabla agregando los datos mediante el indice p
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
        //agrego la tabla utilizando innerHTML 
        document.getElementById("CuerpoTabla").innerHTML = tabla;
        //utilizo el forEach para acceder a los elementos del array (datos)
        datos.forEach((p)=>{
            //obtengo el elemento del boton actualizar que hay en cada registro
            let elemento = document.getElementById("UPD"+p.id);
            //creo un listener que al precionar actualizar envia los datos cargados(seleccionados) al formulario 
            //y "esconde el boton enviar" y "aparece los botones actualizar y cancelar", esto se logra cambiando el display.
            elemento.addEventListener("click",()=>{
                document.getElementById("nombre_duenio").value = p.Nombre_duenio;
                document.getElementById("apellido_duenio").value = p.Apellido_duenio;
                document.getElementById("nombre_mascota").value = p.Nombre_mascota;
                document.getElementById("correo").value = p.Correo;
                document.getElementById("rut").value = p.Rut;
                document.getElementById("problema").value = p.Problema;
                document.getElementById("consulta").value = p.Consulta;
                document.getElementById("btnActualizar").value = p.id;
                document.getElementById("btnEnviar").style.display = "none"
                document.getElementById("btnActualizar").style.display = "inline"
                document.getElementById("btnCancelar").style.display = "inline" 
                //este listener al precionar cancelar reinicia el formulario y cambia los display de los botones
                document.getElementById("btnCancelar").addEventListener("click",()=>{
                    document.getElementById("form").reset()
                    document.getElementById("btnEnviar").style.display = "inline"
                    document.getElementById("btnActualizar").style.display = "none"
                    document.getElementById("btnCancelar").style.display = "none"

                })
            })
            //creo un listener que al presionar en eliminar pregunta si deseamos eliminar a ese usuario (registro)
            document.getElementById("DEL"+p.id).addEventListener("click",()=>{
                if(confirm("Desea eliminar los registros de: \n"+p.Nombre_duenio+" y "+p.Nombre_mascota)){
                    // si damos a confirmar utiliza la funcion eliminar
                    Eliminar(p.id).then(()=>{
                        //si la funcion se ejecuta con exito envia un alert y carga los datos nuevamente (utilizando la funcion cargar_datos)
                        alert("Se elimino con exito")
                        cargar_datos()
                    }).catch((error2)=>{
                        console.log(error2)
                    })
                }
                else{
                    //si no damos a confirmar muestra un mensaje en la consola
                    console.log("Cancelaste la eliminacion")
                }
            })
        })
    })
}

const actualizar_datos = ()=>{
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
    let id = document.getElementById("btnActualizar").value;
    //envio el objeto y el id a la funcion actualizar
    actualizar(objeto,id).then(()=>{
        //si se ejecuta con exito muestra un alert y carga los datos nuevamente (utilizando la funcion cargar_datos)
        alert("se actualizo con exito")
        cargar_datos()
    }).catch((error1)=>{
        //si no se ejecuta correctamente muestra en la consola un mensaje con el error
        console.log(error1)
    })
}
