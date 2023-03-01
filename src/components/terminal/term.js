import { Flex } from "@chakra-ui/react"
import Loading from "components/extra/loading"

import { useAuth, useLogout } from "hooks/auth"
import { useGetGame } from "hooks/users"
import { LOGIN, ROOT, SNAKE, SNAKELB } from "lib/routes"
import React from "react"
import Terminal from "react-console-emulator"
import { useNavigate } from "react-router-dom"
import { cmds } from "./commands"
import { catResponse, getCat, getSnakeHs, SnakeScoreResponse, VirtualWelcome } from "./longCmdResponses"
import { getVortexCoins, searchVortexCoins } from "./vortexcoins"



export default function Term(){
  const terminal = React.createRef();
  const navigate =useNavigate();
  const {logout} = useLogout();
  const {user, isLoading: userLoading} = useAuth();
  
  let prompt = (`${user?.username}@VV:~$ `)

  if (userLoading){
    return <Loading/>
  }
  
  
  //const [prompt, setPrompt] = React.useState('you@/ashterm:~$ ')

  //setPrompt(`VirtualVortex@${user?.username}:~$ `)
  if (!user){
    prompt ="you@VirtualVortex:~$ "
    
  }
  
    
        return (
        <>
        <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="#08151F"
      justifyContent="center"
      alignItems="center"

      
    >
        
          <Terminal
            ref={terminal}
            welcomeMessage={VirtualWelcome}

            commands={{
              clear: {
              fn: () => {
                terminal.current.clearStdout();
              }
              
            },
            home: {
              
              fn: async () => {
                
                navigate(ROOT)
                return 
              }
            
            },
            snake: {
              
              fn: async () => {
                
                navigate(SNAKE)
                return 
              }
            
            },
            snakelb: {
              
              fn: async () => {
                
                navigate(SNAKELB)
                return 
              }
            
            },
            login: {
              
              fn: async () => {

                if (!user){
                
                  navigate(LOGIN)
                }else{
                  return "You are already Logged in ^_^"
                }
              }
            
            },
            cat: {
              fn: async () => {
                const url = await getCat()
                terminal.current.pushToStdout(
                  <img src={url} width="500px" height="380px" alt="cat"></img>

                )
                console.log(catResponse())
                return catResponse();

              }
            },
            logout: {
              fn: ()=> {
                if (user){
                  logout()
                }else{
                  return "You need to be logged in to logout ^_^"
                }
                
              }
            },
            snakehs: {
              fn: async (...args) => {
                let text =""
                if (args[0]){
                  text = await getSnakeHs(args[0], 0)
                }
                else if (!user){
                  return "please login, to save and veiw highscores."
                }else{
                  text = await getSnakeHs(user.username, 1)
                }

                return text
              }
          },
          balance: {
            fn: async (...args) => {
              let text =""
              if (args[0]){
                text = await getVortexCoins(args[0], 0)
              }
              else if (!user){
                return "please login, to access vortex coins"
              }else{
                text = await getVortexCoins(user.username, 1)
              }

              return text
            }
        },
        search: {
          fn: async (...args) => {
            let text =""
            if (!user){
              return "please login to access vortex coins"
            }else{
              terminal.current.pushToStdout("...")
              text = await searchVortexCoins(user.username, args)
            }

            return text
          }
      },
            
            ...cmds
          }}
            
            promptLabel={prompt}

            style={{
                backgroundColor:"#08151F",
                minHeight: "100%",
                maxHeight: "100vh",
                overflow: 'auto',
                height: '100%',
                width: '100%',
            }}
            
            
            
            
            styleEchoBack='fullInherit'
            contentStyle={{ color: '#ffb86c' , fontWeight: 'normal', paddingLeft: null}} // Text colour
            promptLabelStyle={{ color: '#ff5555' , fontWeight:'bold'}} // Prompt label colour
            inputTextStyle={{ color: '#8be9fd' , fontWeight: 'normal'}}
            messageStyle={{ color: '#C298FF' , fontWeight: 'normal', paddingLeft: null}}
            scrollBehavior='auto'
            noDefaults
          />
          </Flex>

        </>
        )
      
}