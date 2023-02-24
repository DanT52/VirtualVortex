import { Box } from "@chakra-ui/react";
import HighScore from "./highScore";

export default function HighScores( { usersGameData }){
    console.log(usersGameData)

 


    return(
        <Box px="4" align="center">
            {usersGameData.map((post, index) => <HighScore key={index} number={index+1} user={post} />)}
        </Box>
    )
}