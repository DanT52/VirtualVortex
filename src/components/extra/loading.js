import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading(){
    return (
        <Flex
        flexDirection="column"
        backgroundColor="#08151F"
        justifyContent="center"
        alignItems="center"
        width="100wh"
        height="100vh"
        >  
        <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='purple.500'
  size='xl'
/>
        </Flex>
    )
}