import { useToast } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "lib/firebase";
import { ROOT } from "lib/routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignOut } from 'react-firebase-hooks/auth';


export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function login({ email, password, redirectTo = ROOT }) {
      setLoading(true);
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        navigate(redirectTo);
      } catch (error) {
        toast({
          title: "Logging in failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        setLoading(false);
        return false;

      } 
        setLoading(false);
        return true;
      
    }
  
    return { login, isLoading };
  }


  export function useLogout() {
    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast();
    const navigate = useNavigate();
    

    async function logout() {
      if(await signOut()) {
        toast({
          title: "You have Logged out",
          status: "warning",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        navigate(ROOT);

      }//else show error

    }

    return {logout, isLoading};
  }