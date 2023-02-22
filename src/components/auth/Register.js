import { Box, Center, FormLabel, Heading, Input, FormControl, FormErrorMessage, Button,
    Link, Text

} from "@chakra-ui/react";

import { Link as RouterLink} from "react-router-dom";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate, usernameValidate } from "utils/form-validate";
import Navbar from "components/navbar/Navbar";
import { LOGIN, ROOT } from "lib/routes";
import { useRegister } from "hooks/auth";

export default function Register() {

    const { register :signup, isLoading} = useRegister();
    
    const {register, handleSubmit, formState: {errors}} = useForm();


    async function handleRegister(data){
        
        const succeeded = await signup({
            username: data.username,
            email: data.email, 
            password: data.password, 
            redirectTo: ROOT
        });

        
    }

    





    return (
        <Box
        backgroundColor="#08151F"
        width="100wh"
        height="100vh">
            <Navbar/>
    <Center w="100%" h ="100vh">
        <Box mx="1" maxW="md" p="9" borderWidth="3px" borderRadius="lg" borderColor="purple.300">
            <Heading mb="4" size="lg" textAlign="center" color="purple.400">
                Register
            </Heading>

            <form onSubmit={handleSubmit(handleRegister)}>

                 <FormControl isInvalid={errors.username} py="2">
                    <FormLabel color="white">Username</FormLabel>
                    <Input placeholder="username" 
                    focusBorderColor="purple.500"
                    color="white"
                    {...register('username', usernameValidate)}/>
                    <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>

                </FormControl>

                <FormControl isInvalid={errors.email} py="2">
                    <FormLabel color="white">Email</FormLabel>
                    <Input focusBorderColor="purple.500"
                    color="white" type="email" placeholder="user@email.com" 
                    {...register('email', emailValidate)}/>
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>

                </FormControl>

                <FormControl isInvalid={errors.password} py="2">
                    <FormLabel color="white">Password</FormLabel>
                    <Input focusBorderColor="purple.500"
                    color="white" type="password" placeholder="password123" {...register('password', passwordValidate)}/>
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>

                </FormControl>

                <Button mt="4" type="submit" colorScheme="purple" size="md" w="full"
                 //isLoading={true}
                 loadingText="Signing up"> 
                    Register
                </Button>

            </form>
            <Text fontSize="xlg" align="center" mt="6" color="white">
                If you have an account, {" "}

                <Link 
                as={RouterLink}
                to={LOGIN} 
                color="purple.500" 
                fontWeight="medium"
                textDecor="underline"
                _hover={{ background: "blue.100"}}

                >Log in</Link>
                {" "} 

            </Text>

        </Box>
    </Center>
    </Box>
)}