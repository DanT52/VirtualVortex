import { Box, Center, Heading, Stack, Text } from "@chakra-ui/react";
import Loading from "components/extra/loading";
import Navbar from "components/navbar/Navbar";
import { useSnakehighscores } from "hooks/snakeLeaders";
import HighScores from "./highScores";

export default function SnakeLB(){

    const { usersGameData, isLoading } = useSnakehighscores();
    
    if(isLoading){
        return(
            <Loading/>
        )
    }
    
    return (
        
        <Box
            backgroundColor="#08151F"
            width="100wh"
            height="100vh"> 
            <Navbar/>
            
            <Center w="100%" h ="100vh">
                <Box mx="1" maxW="md" p="9" borderWidth="2px" borderRadius="lg" borderColor="purple.300">
                <Stack>


                <Heading mb="4" size="md" textAlign="center" color="purple.200">
                Snake High Scores:
            </Heading>
                <HighScores usersGameData={usersGameData}/>
                </Stack>
                </Box>



            </Center>
            
            
            
            </Box>
    )

}