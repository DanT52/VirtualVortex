import Terminal from "react-console-emulator"

const commands = {
    echo: {
      description: 'Echo a passed string.',
      usage: 'echo <string>',
      fn: (...args) => args.join(' ')
    }
  }

export default function(Term){
    
        return (
          <Terminal
            commands={commands}
            welcomeMessage={'Welcome to the React terminal!'}
            promptLabel={'me@React:~$'}
          />
        )
      
}