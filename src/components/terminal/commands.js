
import { changeLog, coinFlipResponse, colorFlashes, eightBallResponse, helpCommand, weatherInfo } from "./longCmdResponses"

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
    commands: {
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
    },
    blind: {
        fn:(...args) => colorFlashes(args)
    },
    weather: {
        fn: async(...args) => {
            return await weatherInfo(args.join(' '))
            
        }
            
    },
    
    
    
    
  }

