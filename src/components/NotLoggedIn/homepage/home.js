import { Button, Flex, Text, Code, Image, background} from "@chakra-ui/react";
import image from "images/background.jpg"
import { LOGIN, SNAKE, TERM } from "lib/routes";
import { Link } from "react-router-dom";

export default function Root(){

    return(
        <Flex
        flexDirection="column"
        backgroundColor="#08151F"
        justifyContent="center"
        alignItems="center"
        width="100wh"
        height="100vh"
        >  
        <Image src={image}></Image>

            <Flex mb="80" flexDirection="row">
                <Button
                    mx="5" 
                    variant="solid"
                    colorScheme="purple"
                    as={Link}
                    to={SNAKE}
                
                >
                    <Code variant ="solid" colorScheme="purple">Snake Game </Code>
                </Button>
                <Button
                    mx="5" 
                    variant="solid"
                    colorScheme="purple"
                    px="10"
                    as={Link}
                    to={TERM}
                
                >
                    <Code variant ="solid" colorScheme="purple">Terminal</Code>
                </Button>
                <Button
                    mx="5" 
                    variant="solid"
                    colorScheme="purple"
                    as={Link}
                    to={LOGIN}
                
                >
                    <Code variant ="solid" colorScheme="purple">Login</Code>
                </Button>

                

            </Flex>
        </Flex>
    )
}