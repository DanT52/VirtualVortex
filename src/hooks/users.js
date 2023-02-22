import { doc, getDoc } from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";

export async function getGame(username) {

    const docRef = doc(db, "gamestuff", username);
    const docSnap = await getDoc(docRef);
    

    

    return docSnap.data();

}