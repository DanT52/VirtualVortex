import { Flex, Link, Button, Box } from "@chakra-ui/react";
import { useLogout } from "hooks/auth";
import { ROOT, TERM } from "lib/routes";

import { Link as RouterLink} from "react-router-dom";

export default function Navbar() {
    const {logout, isLoading} = useLogout();
    

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

                <Button
                    ml="auto"
                    colorScheme="purple"
                    size="sm"
                    onClick={logout}
                    
                     
                    >
                        Logout
                    </Button>
            </Flex>
        </Flex>
    )

}