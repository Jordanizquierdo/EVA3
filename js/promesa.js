import {db} from "./firebase.js"
import {addDoc,collection,getDocs,doc,updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


//creo la funcion para registrar datos en firebase
export const registrar = async(objeto)=>{
    const docRef = await addDoc(collection(db,"mascotas"), objeto)
}

//creo la funcion para obtener los datos de firebase
export const obtener_datos = async()=>{
    //creo la ruta
    let ref = collection(db, "mascotas")
    //obtengo una captura de la bd
    let qSnap = await getDocs(ref)
    //creo una lista para agregar los datos
    let lista = []
    //agrego los datos a la lista
    qSnap.forEach((i) => {
        lista.push({...i.data(),id:i.id})
    });
    //retorno la lista con los datos
    return lista

}           
//creo la funcion para actualizar, obtengo del script el objeto con los nuevos datos y el id
export const actualizar = async(objeto,id)=>{
    //creo una variable con la ruta y el id
    const ref = doc(db,"mascotas",id);
    //utilizo una funcion de firebase en la cual ingreso por parametros la referencia y el objeto
    await updateDoc(ref,objeto);
}
//creo una funcion para eliminar, ingreso por parametros el id
export const Eliminar = async(id)=>{
    //creo una variable con la ruta y el id
    const ref = doc(db,"mascotas",id);
    //utilizo una funcion de firebase en la cual ingreso por parametros la referencia
    await deleteDoc(ref);
}