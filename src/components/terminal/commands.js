import { changeLog, coinFlipResponse, eightBallResponse, helpCommand } from "./longCmdResponses"

export const cmds = {
    echo: {
      description: 'Echo a passed string.',
      usage: 'echo <string>',
      fn: (...args) => {
        console.log(args)

        return args.join(' ')
        }
    },
    help: {
        fn: () => helpCommand
    },
    changelog: {
        fn: () => changeLog
    },
    coinflip: {
        fn: () => coinFlipResponse()
    },
    eightball: {
        fn: (...args) => eightBallResponse(args.join(' '))
    }
    
    
    
  }

