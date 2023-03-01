import { formatDistance, formatDistanceStrict, sub, subMinutes } from "date-fns"
import { getGameData } from "./gamecmds"
import { longSearchResponse } from "./longCmdResponses"

export async function getVortexCoins(username, isCurrentuser){
    const data = await getGameData(username)
    let text =""

    if (data === 0 && !isCurrentuser){
        return `user @${username} was not found...`
    }

    

    const vortexCoins = data.vortexCoins
    


    if (isCurrentuser){
        text =`Vortex Coin Wallet: \n----\n | Balance: ${vortexCoins} Vortex Coins |\n ----`
        if (vortexCoins === 0){
            text = text + "\n To gain coins try the following commands search"
            
        }
        return text
    }else{
        return `@${username}'s balance is ${vortexCoins} VortexCoins...`
    }
}

export async function searchVortexCoins(username, args){
    let text =""
    if (!args[0]){
        text = `You need to provide a place to search... \n Ex: \n search park\n...\n avalible places to search:\n
        park, (more to be added)\n...\n good luck searching...`
        return text

    }
    const data = await getGameData(username)
    const lastSearched = data.lastsearched
    const inJail = data.islockeduntill
    const jailReason = data.isLockedReason
    const currentDate = Date.now()
   
    

    if (inJail > currentDate){
        text = `You cannot search as:\n ${jailReason}\n you can search again in ${formatDistanceStrict(currentDate, inJail)}.`
    }
    else if (lastSearched > subMinutes(currentDate, 5)){
        text = `You just searched...\n you are tired\n please wait ${formatDistanceStrict(lastSearched, subMinutes(currentDate, 5))}.`

    }else{
        text = await longSearchResponse(username, args[0], data)
    }

   

    

    return text

}
