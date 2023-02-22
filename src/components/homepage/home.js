import { Button, Flex, Text, Code, Image, background, AspectRatio} from "@chakra-ui/react";
import Loading from "components/extra/loading";
import { useAuth, useLogout } from "hooks/auth";
import image from "images/background.jpg"
import { LOGIN, SNAKE, TERM } from "lib/routes";
import { Link } from "react-router-dom";

export default function Root(){
    const {logout, isLoading} = useLogout();
    const {user, isLoading: userLoading} = useAuth();
    if (userLoading){
        return <Loading/>
      }

    return(
        <Flex
        flexDirection="column"
        backgroundColor="#08151F"
        justifyContent="center"
        alignItems="center"
        width="100wh"
        height="100vh"
        >  
        
        <Image mt="20" src={image} objectFit="cover"></Image>
        

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


                {(!userLoading && !user) &&<Button
                    mx="5" 
                    variant="solid"
                    colorScheme="purple"
                    as={Link}
                    to={LOGIN}
                
                >
                    <Code variant ="solid" colorScheme="purple"> Login</Code>
                </Button>
                }

                {(!userLoading && user) &&<Button
                    mx="5" 
                    variant="solid"
                    colorScheme="purple"
                    onClick={logout}
                
                >
                    <Code variant ="solid" colorScheme="purple"> Logout</Code>
                </Button>
                }

                

            </Flex>
        </Flex>
    )
}