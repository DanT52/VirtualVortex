import { Box, Center, FormLabel, Heading, Input, FormControl, FormErrorMessage, Button,
    Link, Text

} from "@chakra-ui/react";
import { Link as RouterLink} from "react-router-dom";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "utils/form-validate";
import { REGISTER, ROOT } from "lib/routes";
import Navbar from "components/navbar/Navbar";
import { useLogin } from "hooks/auth";

export default function Login() {
    const { login, isLoading} = useLogin();
    
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    

    async function handleLogin(data){
        
        const succeeded = await login({email: data.email, password: data.password, redirectTo: ROOT});

        if (succeeded) reset();
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
                Log In
            </Heading>

            <form onSubmit={handleSubmit(handleLogin)}>
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
                 loadingText="Logging In"> 
                    Log In
                </Button>

            </form>
            <Text fontSize="xlg" align="center" mt="6" color="white">
                Make an account, {" "}

                <Link 
                as={RouterLink}
                to={REGISTER} 
                color="purple.500" 
                fontWeight="medium"
                textDecor="underline"
                _hover={{ background: "blue.100"}}

                >Register</Link>
                {" "} now!

            </Text>

        </Box>
    </Center>
    </Box>
)}