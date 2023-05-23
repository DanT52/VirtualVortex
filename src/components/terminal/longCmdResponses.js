import {  formatDistanceToNow } from "date-fns"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "lib/firebase"
import ColorFlashes from "../extra/colorflashes"
import { getGameData } from "./gamecmds"


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
--- List of Commands ---
 
Navigation: home, snake, snakelb, login, logout

Fun Commands: 
- echo: Repeats what you type. Usage: echo <your text>
- cat: Sends a cat.
- eightball: Answers your question. Usage: eightball <your question>
- coinflip: Flips a coin.
- snakehs: Displays your snake highscore. Usage: snakehs or snakehs <username>
- weather: Shows weather. Usage: weather <cityname/zipcode>

Vortex Coins: 
- balance: Displays your Vortex coins. Usage: balance or balance <username>
- search: Searches for Vortex coins. Usage: search <park/abandoned-mine>
- gamble: Gambles your Vortex coins. Usage: gamble <amount/all>

Other Commands:
- clear: Clears terminal.
- changelog: Displays the changelog.

`

export const changeLog = `
v1.0 (2/20/2023): Launched terminal, snake game, login/register/logout.
v1.1 (2/22/2023): Snake highscores now saved when logged in.
v1.2 (2/24/2023): Added snake leaderboard.
v1.2.1 (2/27/2023): Introduced Vortex coins with 'balance' and 'search park' commands.
v1.2.2 (3/6/2023): Added 'gamble' command.
v1.2.3 (5/21/2023): Introduced 'search abandoned-mine' and 'weather' commands.
`

export async function weatherInfo(location){
    let url = "";
    
    // Check if location is a zipcode (assuming US zip codes which are 5 digits long)
    if (/^\d{5}$/.test(location)) {
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=08e3376ddbf462cca0498dec33003971&units=imperial`;
    } else { // otherwise assume it's a city name
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=08e3376ddbf462cca0498dec33003971&units=imperial`;
    }

    let response = await fetch(url);

    if (response.ok) { // if HTTP-status is 200-299
        let json = await response.json();

        let weatherDescription = json.weather[0].description;
        let temp = json.main.temp;
        let feelsLike = json.main.feels_like;
        let tempMin = json.main.temp_min;
        let tempMax = json.main.temp_max;
        let humidity = json.main.humidity;
        let windSpeed = json.wind.speed;
        let city = json.name;
        let country = json.sys.country;

        let weatherInfo = `Weather in ${city}, ${country}: ${weatherDescription}. 
            Temperature: ${temp}°F (feels like ${feelsLike}°F). 
            The high today will be ${tempMax}°F with a low of ${tempMin}°F. 
            Humidity is at ${humidity}%. Wind speed is ${windSpeed} mph.`;

        return weatherInfo;
    } else {
        console.log("HTTP-Error: " + response.status);
        return "City not found, \n command useage:\nweather cityname \n weather USzipcode"
    }
}

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

export async function getSnakeHs(username, isCurrentuser){
    const data = await getGameData(username)

    if (data === 0 && !isCurrentuser){
        return `user @${username} was not found...`
    }

    

    const highscore = data.snakeHighScore
    const date = data.snakeHsTime


    if (isCurrentuser){
        return `Your Snake highscore is: ${highscore}. \n You set this highscore ${formatDistanceToNow(date)} ago.`
    }else{
        return `@${username}'s highscore is ${highscore}. \n they set this highscore ${formatDistanceToNow(date)} ago.`
    }

    

    
}

export async function longSearchResponse(username, place, data){
    let text =""
    let response = {}

    const parkResponses = [
        {
            "response": "As you search the park, you stumble upon an old coin pile buried in the dirt. \n You have gained 10 Vortex coin!",
            "balanceChange": 10,
            "searchAgain": false
        },
        {
            "response": "You search the park, but it seems someone beat you to it. There are no coins to be found here.",
            "balanceChange": 0,
            "searchAgain": false
        },
        {
            "response": "You search the park and find a shiny object lying on the ground. It's 5 Vortex coins! You gain 2 coins.",
            "balanceChange": 5,
            "searchAgain": false
        },
        {
            "response": "As you search the park, you spot a squirrel running off with something shiny in its mouth. You chase after it and retrieve 3 Vortex coins.",
            "balanceChange": 3,
            "searchAgain": false
        },
        {
            "response": "You search the park and find a vending machine. You decide to try your luck and put in a coin. To your surprise, it spits out 4 Vortex coins as change!,\n This makes you happy and gives you energy to search again.",
            "balanceChange": 4,
            "searchAgain": true
        },
        {
            "response": "As you search the park, you see a group of people playing frisbee. You join in and have a blast, but unfortunately don't find any Vortex coins this time.",
            "balanceChange": 0,
            "searchAgain": false
        },
        {
            "response": "You search the park and come across a fountain. You toss a coin in for good luck and make a wish. To your amazement, a Vortex coin pops out of the water! You gain 1 coin.",
            "balanceChange": 1,
            "searchAgain": false
        },
        
        
        
    ]
    
    const parkResponsesBad = [
        {
            "response": "As you are searching you stumble and fall breaking your leg and ending up in the hospital\n you pay 10 vortex coins",
            "balanceChange": 10,
            "jailTime": 30,
            "jailTimeMsg": "Your Leg is broken and you are in the hospital..."
        },
        {
            "response": "As you search the park you get involved in a fight, in the confusion you are arrested and fined 5 vortex coins",
            "balanceChange": 5,
            "jailTime": 20,
            "jailTimeMsg": "You are in jail for getting into a fight at the park"
        },
        {
            "response": "As you search the park you are spotted going off a trail by a park ranger.\n You are fined 1 vortex coin.",
            "balanceChange": 1,
            "jailTime": 0,
            "jailTimeMsg": "na"
        },
        {
            "response": "As you are searching the park, you get chased by a dog, you get away but are now very tired.",
            "balanceChange": 0,
            "jailTime": 10,
            "jailTimeMsg": "You got chased by a dog at the park and are very tired"
        },
    ]
    const mineResponses = [
        {
            "response": "As you delve into the mine, you discover a hidden chest filled with ancient coins. \n You have gained 50 Vortex coins!",
            "balanceChange": 50,
            "searchAgain": false
        },
        {
            "response": "You explore the mine, but it's been picked clean. No Vortex coins in sight.",
            "balanceChange": 0,
            "searchAgain": false
        },
        {
            "response": "Navigating through the mine, your torch glimmers off something shiny. It's a pile of 15 Vortex coins!",
            "balanceChange": 15,
            "searchAgain": false
        },
        {
            "response": "In the eerie silence of the mine, you notice a glinting rock. It's a raw Vortex ore worth 10 coins.",
            "balanceChange": 10,
            "searchAgain": false
        },
        {
            "response": "You venture into a previously collapsed area of the mine, and find 5 Vortex coins amidst the debris. There might be more, prompting you to search again.",
            "balanceChange": 5,
            "searchAgain": true
        },
    ]
    
    const mineResponsesBad = [
        {
            "response": "As you delve deeper into the mine, a sudden cave-in traps you. \n You have to pay 20 Vortex coins for a rescue operation.",
            "balanceChange": 20,
            "jailTime": 60,
            "jailTimeMsg": "You're trapped in a mine cave-in and waiting for rescue..."
        },
        {
            "response": "While exploring, you encounter a terrifying creature. In your haste to escape, you drop 10 Vortex coins.",
            "balanceChange": 10,
            "jailTime": 30,
            "jailTimeMsg": "You ran away from a creature in the mine, and are hiding to recover."
        },
        {
            "response": "As you navigate the mine, you fall into a hidden pit. It takes some time and 5 Vortex coins to get out.",
            "balanceChange": 5,
            "jailTime": 15,
            "jailTimeMsg": "You fell into a pit in the mine and need time to climb out."
        },
    ]


    if (place === "abandoned-mine") {

        if (Math.random() > 0.3){
            response = pickresponse(mineResponses);
            let lastSearched = (!response.searchAgain ? Date.now() : 0);
            let vortexCoins = data.vortexCoins + response.balanceChange;
    
            await updateDoc(doc(db, "gamestuff", username), {
                lastsearched: lastSearched,
                vortexCoins: vortexCoins,
            });
            text = response.response;
    
        } else {
            response = pickresponse(mineResponsesBad);
            
            let currentDate = Date.now();
            let vortexCoins = data.vortexCoins - response.balanceChange;
            let jailTime =  currentDate + (60000 * response.jailTime);
            
            await updateDoc(doc(db, "gamestuff", username), {
                lastsearched: Date.now(),
                vortexCoins: vortexCoins,
                islockeduntill: jailTime,
                isLockedReason: response.jailTimeMsg,
            });
            text = response.response;
        }
    } 
    else if(place === "park"){

        if (Math.floor(Math.random()*10) > 1){
            response = pickresponse(parkResponses)
            let lastSearched = (!response.searchAgain ? Date.now() : 0)
            let vortexCoins = data.vortexCoins + response.balanceChange

            await updateDoc(doc(db, "gamestuff", username), {
                lastsearched: lastSearched,
                vortexCoins: vortexCoins,
            });
            text = response.response

        }else{
            response = pickresponse(parkResponsesBad)
            
            let currentDate = Date.now()
            let vortexCoins = data.vortexCoins - response.balanceChange
            let jailTime =  currentDate+ (60000*response.jailTime)
            
            await updateDoc(doc(db, "gamestuff", username), {
                lastsearched: Date.now(),
                vortexCoins: vortexCoins,
                islockeduntill: jailTime,
                isLockedReason: response.jailTimeMsg,
            });
            text = response.response
            
        }
        
        

        

    }else{
        text = `Sorry but ${place} is not a location avalible to search...`
    }
    return text
}

export async function longGambleResponse(username, gambleAmount, data){
    let text = ""
    let response = {}
    let vortexCoins = data.vortexCoins
    const gambleResponses = [
        {
            "win": true,
            "double": true,
            "message": "you won",
        },
        {
            "win": false,
            "double": true,
            "message": "You lost",
        }
    ]

    response = pickresponse(gambleResponses);
    
    let amount = (response.double) ? gambleAmount : response.amount * gambleAmount;

    let newBalance = (response.win) ? vortexCoins + amount : vortexCoins - amount;

    text = (response.win) ? `${response.message}! \n + ${amount} vortex coins!` : `${response.message}! \n  -${amount} vortex coins ...  `
    console.log("text set")
    await updateDoc(doc(db, "gamestuff", username), {
        vortexCoins: newBalance,
    });
    return text;

}

export function colorFlashes(args){
    let colors = false

    if (args[0] == null){
        args[0] = 30
    }

    if ( !(args[0] > 1 && args[0] < 10000) ) {
        return "bad delay"
    }
    if (args[1] === 'c'){
        colors = true
    }

    return(
        <ColorFlashes delay={args[0]} colors={colors}/>
    )
    


    
}