import { Flex } from "@chakra-ui/react"
import Navbar from "components/navbar/Navbar"
import { ROOT } from "lib/routes"
import React from "react"
import Terminal from "react-console-emulator"
import { useNavigate } from "react-router-dom"
import { VirtualWelcome } from "./longCmdResponses"



const cmds = {
    echo: {
      description: 'Echo a passed string.',
      usage: 'echo <string>',
      fn: (...args) => args.join(' ')
    },
    
    
  }

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
              description: "Clears the terminal",
              usage: "clear",
              fn: () => {
                terminal.current.clearStdout();
              }
              
            },
            home: {
              
              fn: async () => {
                
                navigate(ROOT)
                return `ok`
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
            messageStyle={{ color: '#C280FF' , fontWeight: 'normal', paddingLeft: null}}
            scrollBehavior='auto'
            noDefaults
          />
          </Flex>

        </>
        )
      
}