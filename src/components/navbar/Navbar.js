import { Flex, Link, Button, Box } from "@chakra-ui/react";
import Loading from "components/extra/loading";
import { useAuth, useLogout } from "hooks/auth";
import { ROOT, TERM } from "lib/routes";
import { useState } from "react";

import { Link as RouterLink} from "react-router-dom";

export default function Navbar() {
    const {logout, isLoading} = useLogout();
    const {user, isLoading: userLoading} = useAuth();
    if (userLoading){
        return <Loading/>
      }

    
    

  
    

    return(
        <Flex
        shadow="sm"
        pos="fixed"
        width="full"
        borderTop="6px solid"
        borderTopColor="purple.500"
        height="16"
        zIndex="3"
        justify="center"
        bg="#050E14"
        
        >
            <Flex px="4" w="full" align="center" maxW="1200px">

                
                <Link as={RouterLink} to={ROOT} color="purple.500"  fontWeight="bold">
                    home
                </Link>
                

                <Link as={RouterLink} to={TERM} mx="30px" color="purple.500"  fontWeight="bold">
                    terminal
                </Link>

                 {(!userLoading && user) &&<Button
                    ml="auto"
                    colorScheme="purple"
                    size="sm"
                    onClick={logout}
                    
                    
                     
                    >
                        Logout
                    </Button>
                }

            </Flex>
        </Flex>
    )

}