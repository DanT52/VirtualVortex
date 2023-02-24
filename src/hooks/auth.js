import { useToast } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "lib/firebase";
import { ROOT } from "lib/routes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import isUsernameExists from "utils/isUsernameExists";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";


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
    const [signOut, isLoading] = useSignOut(auth);
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    

    async function logout() {
      if(await signOut()) {
        toast({
          title: "You have Logged out",
          status: "warning",
          isClosable: true,
          position: "top",
          duration: 5000,
        });

        if (location.pathname === ROOT){
          setTimeout(function(){
            navigate(0)
            }, 700);
        }else{
          navigate(ROOT);

        }
        

      }//else show error

    }

    return {logout, isLoading};
  }

  export function useRegister(){

    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function register({
       username,
       email,
       password,
       redirectTo =ROOT,
      }) {
        setLoading(true);
        const usernameExists = await isUsernameExists(username.toLowerCase());
  
        if (usernameExists) {
          toast({
            title: "Username already exists",
            status: "error",
            isClosable: true,
            position: "top",
            duration: 5000,
  
          });
          setLoading(false);
          
        }else{
          try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            
            await setDoc(doc(db, "users", res.user.uid), {
              id: res.user.uid,
              username: username.toLowerCase(),
              date: Date.now(),
            });

            await setDoc(doc(db, "gamestuff", username.toLowerCase()), {
              username: username.toLowerCase(),
              vortexCoins: 0,
              snakeHighScore: 0,
              timesPlayedSnake: 0,
              lastworked: 0,
              lastrobbed: 0,
              notes: [],
            })
  
            toast({
              title: "Account created",
              description: "You are now logged in",
              status: "success",
              isClosable: true,
              position: "top",
              duration: 5000,
            });
  
            navigate(redirectTo);
  
          } catch (error){
            toast({
              title: "Signing up failed",
              description: error.message,
              status: "error",
              isClosable: true,
              position: "top",
              duration: 5000,
            });
  
  
          } finally{
            setLoading(false)
          }
        }
  
      }
  
  
    return{register, isLoading};
  
  }

  export function useAuth() {

    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(()=>{
      async function fetchData() {
        setLoading(true);
        const ref = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(ref);
        setUser(docSnap.data())
        setLoading(false);

      }

      if (!authLoading) {
        if(authUser) fetchData();
        else setLoading(false);
      }
    }, [authUser, authLoading])

    return {user, isLoading, error };

}