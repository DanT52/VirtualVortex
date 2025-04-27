# Virtual Vortex

Virtual Vortex is an online playground app.

check it out here at [virtualvortex]([https://virtualvortex.net/](https://virtualvortex-eff1f.web.app/))
<p float="left">
  <img src="https://i.imgur.com/SJupqax.png" width="300" />
  <img src="https://i.imgur.com/FB41tg1.png" width="300" /> 
  <img src="https://i.imgur.com/quBoe3L.png" width="300" />
</p>

## Created With:
- Reactjs 
    - this app was built with reactjs
    - react router is used for navigation
- Firebase auth and firestore
    - used for authenticated
    - snake game hiscores leaderboard
    - storing vortex coin data
- Chakra UI
    - Used for most ui elemnets excluding snake game.

## Main Features:
- login system
    - login or sign up with email and password.
- snake game
    - play a simple javascript snake game.
    - highscores are saved if you are logged in.
- linux terminal emulator
    - features several fun commands eg.
    - Vortex Coins
    - Weather Command

## Commands for Terminal Emulator

Here is a list of commands you can use in the terminal emulator:

### Navigate Commands

- `home`
- `snake`
- `snakelb`
- `login`
- `logout`

### Fun Commands

| Command  | Description                     | Usage                                  |
|----------|---------------------------------|----------------------------------------|
| `echo`   | Echoes your input back to you   | `echo <your message>`                  |
| `cat`    | Sends a cat                     | `cat`                                  |
| `8ball`  | Answers your question           | `8ball <your question>`                |
| `coinflip`| Flips a coin                   | `coinflip`                             |
| `snakehs` | Tells you your snake highscore | `snakehs`, `snakehs <username>`        |
| `weather` | Shows weather in city/zipcode  | `weather <cityname/zipcode>`           |

### Vortex Coins

- `balance`: Shows how much vortex coins you have
- `balance <username>`: Shows how much vortex coins someone else has.
- `search park` or `search abandoned-mine`: Search for vortex coins at a park or abandoned mine.
- `gamble <amount>` or `gamble all`: Gamble your vortex coins for a chance to have more or lose them.

### Other Commands

- `clear`: Clears terminal
- `changelog`: Shows change log



## known issues

The snake game can be buggy. Eg. quickly doing two inputs will cause one to not register.
