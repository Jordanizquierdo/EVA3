import {db} from "./firebase.js"
import {addDoc,collection,getDocs,doc,updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


//creo la funcion para registrar datos en firebase
export const registrar = async(objeto)=>{
    console.log(objeto)
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

export const actualizar = async(objeto,id)=>{
    const ref = doc(db,"mascotas",id);
    await updateDoc(ref,objeto);
}

export const Eliminar = async(id)=>{
    const ref = doc(db,"mascotas",id);
    await deleteDoc(ref);
}