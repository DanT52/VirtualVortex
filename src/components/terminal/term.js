import { Flex } from "@chakra-ui/react"
import Navbar from "components/navbar/Navbar"
import { LOGIN, ROOT, SNAKE } from "lib/routes"
import React from "react"
import Terminal from "react-console-emulator"
import { useNavigate } from "react-router-dom"
import { cmds } from "./commands"
import { catResponse, getCat, VirtualWelcome } from "./longCmdResponses"



export default function Term(){
  const terminal = React.createRef();
  const navigate =useNavigate();
    
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
            login: {
              
              fn: async () => {
                
                navigate(LOGIN)
                return 
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
            ...cmds
          }}
            
            promptLabel={'me@VirtualVortex:~$'}

            style={{
                backgroundColor:"#08151F",
                minHeight: "100%",
                maxHeight: "100vh",
                overflow: 'auto',
                height: '100%',
                width: '100%',
            }}
            disableOnProcess={true}
            autoFocus
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