import { Flex, Link, Button} from "@chakra-ui/react";
import Loading from "components/extra/loading";
import { useAuth, useLogout } from "hooks/auth";
import { LOGIN, ROOT, SNAKE, SNAKELB, TERM } from "lib/routes";
import { useLocation } from "react-router-dom";


import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
    const {logout} = useLogout();
    const {user, isLoading: userLoading} = useAuth();
    const location = useLocation();
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

                
                <Link as={RouterLink} to={ROOT} mr="30px"  color="purple.500"  fontWeight="bold">
                    Home
                </Link>
                

                <Link as={RouterLink} to={TERM} mr="30px" color="purple.500"  fontWeight="bold">
                    Terminal
                </Link>
                {(location.pathname === SNAKELB) && 
                <Link as={RouterLink} to={SNAKE} mr="30px" color="purple.500"  fontWeight="bold">
                    Snake Game
                </Link>}

                 {(!userLoading && user) &&<Button
                    ml="auto"
                    colorScheme="purple"
                    size="sm"
                    onClick={logout}
                    
                    
                     
                    >
                        Logout
                    </Button>
                }
                {(!userLoading && !user && location.pathname !== LOGIN) &&<Button
                    ml="auto"
                    colorScheme="purple"
                    size="sm"
                    as={ RouterLink }
                    to={LOGIN}
                    
                    
                     
                    >
                        Login
                    </Button>
                }

            </Flex>
        </Flex>
    )

}