import { collection, addDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"
import {db} from "./firebase.js"

//creo la funcion para registrar datos en firebase
export const registrar = async(objeto)=>{
    let Docref = await addDoc(collection(db,"mascotas"),objeto)
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
    qSnap.forEach(i => {
        lista.push({...i.doc(),id:id.doc})
    });
    //retorno la lista con los datos
    return lista

}

export const actualizar = async(objeto,id)=>{
    let ref = collection(db,"mascotas", id)
    let up = await updateDoc(ref,objeto)
}