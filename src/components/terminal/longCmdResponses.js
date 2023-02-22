export const VirtualWelcome = [
    " __   ___     _             ___   __       _           ",
    " \\ \\ / (_)_ _| |_ _  _ __ _| \\ \\ / /__ _ _| |_ _____ __",
    "  \\ V /| | '_|  _| || / _` | |\\ V / _ \\ '_|  _/ -_) \\ /",
    "   \\_/ |_|_|  \\__|\\_,_\\__,_|_| \\_/\\___/_|  \\__\\___/_\\_\\ ",
    "...",
    "Welcome to VirtualVortex! Terminal ꩜",
    "Try writing 'help' if you are confused.",
    "...",


]

export const helpCommand = ` 
List of Commands:
---
Navigate commands: home, snake, login, logout
---
Fun commands:
command | what it does          | usage
---
echo 
cat     | sends a cat
eightball   | answers your question | 8ball <your question>
coinflip| flips a coin
---
Other:
---
clear | clear terminal
changlog
---

`

export const changeLog = `

2/19/2023

commands created


`

export async function getCat() { //get cat
    const res = await fetch('https://api.thecatapi.com/v1/images/search')
    const resp = await res.json()
    return resp[0].url
  }

function pickresponse(array){
    const one = array[Math.floor(Math.random() * array.length)];
    return one;
}

export function catResponse(){
    const responses = [
        "Heres a cat!",
        "Meow!",
        "Heres a cat picture!",
        "Meow, Meow!",

    ]

    return pickresponse(responses)


}

export function coinFlipResponse(){
    const responses = [
        "The coin is flipping... \n It lands Heads!",
        "Tails!",
        "Heads!",
        "The coin is flipping... \n It lands Tails!",
        "Heads... why is it always heads...",
        "Tails!",
        "Heads!",
        "I lost my coin sorry!"
    ]

    if (Math.floor(Math.random() * 50)=== 33){
        return "The coin lands on its side... how is that possible"
    }

    return pickresponse(responses)
}

export function eightBallResponse(question){
    const responses = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes, definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."]

    return ` \n...\nYour question: ${question}\n...\n8ball answer: ${pickresponse(responses)}`
}