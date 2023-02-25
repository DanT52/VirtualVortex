import { Box, Code, Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";

export default function HighScore({ number, user }){
    const{ snakeHighScore: score, username, snakeHsTime: date} = user

    if (score ===0){
        return " "
    }
    
    return (
        <Box px="4" py="2" maxW="660px" mx="auto" textAlign="left">
            <Flex pb="2">
                <Text as="b" color="blue.100">{number}.</Text>
                
                <Box flex="1" ml="4">
                    <Flex borderBottom="1px solid" borderColor="purple.500" pb="2">
                        <Box >
                            
                            
                            <Code as='b'colorScheme="purple" variant="solid">@{username}: </Code> <Text fontSize="xl" color="purple.100" as="b">{score}</Text>
                        </Box>
                    </Flex>
                    <Box pt="2" fontSize="sm">
                    <Text fontSize="xs" color="gray.500">
                            
                            {formatDistanceToNow(date)} ago
                        </Text>
                        
                    </Box>
                </Box>

            </Flex>

        </Box>
    )
}