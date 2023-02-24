import { collection, limit, orderBy, query } from "firebase/firestore";
import { db } from "lib/firebase";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";


export function useSnakehighscores(){
    
    const q = query(collection(db, "gamestuff" ), orderBy("snakeHighScore", "desc"), limit(20))
    const [usersGameData, isLoading, error ] = useCollectionDataOnce(q)
    if (error) throw error;

    return {usersGameData, isLoading};
}