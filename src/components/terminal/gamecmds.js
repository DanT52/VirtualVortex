import { doc, getDoc } from "firebase/firestore";
import { db } from "lib/firebase";


export async function getGameData(username){

    const q = doc(db, "gamestuff", username)

    const docSnap = await getDoc(q)

    if (docSnap.exists()) {
        return docSnap.data()
    }else{
        return 0;
    }



}