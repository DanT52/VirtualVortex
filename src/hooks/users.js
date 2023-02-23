import { useToast } from "@chakra-ui/react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

export function useGetGame( username) {

   

    const q = doc(db, "gamestuff", username)

    const [data, isLoading] = useDocumentData(q);

    

    return {data, isLoading};

}

export function useSaveSnakeHs(){
    const toast = useToast();

    async function saveSnakeHs(score, username) {

        

        await updateDoc(doc(db, "gamestuff", username), {
            snakeHighScore: score
        });
        toast({
            title: "New HighScore!",
            isClosable: true,
            position: "top",
            duration: 5000,
        })

    }
    return {saveSnakeHs}
}