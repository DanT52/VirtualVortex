import { Box, Button, Code, Container, Flex, Stack, Text } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import "./App.css"
import AppleLogo from "./applePixels.png"
import Monitor from "./oldMonitor.png"
import { useInterval } from "@chakra-ui/react"
import Navbar from "components/navbar/Navbar"
import Loading from "components/extra/loading"
import { useAuth } from "hooks/auth"
import { getGame } from "hooks/users"

const canvasX = 1000
const canvasY = 1000
const initialSnake = [ [ 4, 10 ], [ 4, 10 ] ]
const initialApple = [ 14, 10 ]
const scale = 50
const timeDelay = 60

export default function Snake() {
	const canvasRef = useRef()
	const [ snake, setSnake ] = useState(initialSnake)
	const [ apple, setApple ] = useState(initialApple)
	const [ direction, setDirection ] = useState([ 0, -1 ])
	const [ delay, setDelay ] = useState()
	const [ gameOver, setGameOver ] = useState(false)
	const [ score, setScore ] = useState(0)
    const [ gamestarted, setGameStarted ] = useState(false)
	//const {user, isLoading: userLoading} = useAuth();
	
	
	

	
	/*
	const { snakeHighScore } = getGame(user?.username)
	console.log("snakeHighScore"); */
	

	

	useInterval(() => runGame(), delay)

	useEffect(
		() => {
			let fruit = document.getElementById("fruit")
			if (canvasRef.current) {
				const canvas = canvasRef.current
				const ctx = canvas.getContext("2d")
				if (ctx) {
					ctx.setTransform(scale, 0, 0, scale, 0, 0)
					ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
					ctx.fillStyle = "#de5cf2"
					snake.forEach(([ x, y ]) => ctx.fillRect(x, y, 1, 1))
					ctx.drawImage(fruit, apple[0], apple[1], 1, 1)
				}
			}
		},
		[ snake, apple, gameOver ]
	)

	function handleSetScore() {
		if (score > Number(localStorage.getItem("snakeScore"))) {
			localStorage.setItem("snakeScore", JSON.stringify(score))
		}
	}

	function play() {
		setSnake(initialSnake)
		setApple(initialApple)
		setDirection([ 1, 0 ])
		setDelay(timeDelay)
		setScore(0)
		setGameOver(false)
        setGameStarted(true)
	}

	function checkCollision(head) {
		for (let i = 0; i < head.length; i++) {
			if (head[i] < 0 || head[i] * scale >= canvasX) return true
		}
		for (const s of snake) {
			if (head[0] === s[0] && head[1] === s[1]) return true
		}
		return false
	}

	function appleAte(newSnake) {
		let coord = apple.map(() => Math.floor(Math.random() * canvasX / scale))
		if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
			let newApple = coord
			setScore(score + 1)
			setApple(newApple)
			return true
		}
		return false
	}

	function runGame() {
		const newSnake = [ ...snake ]
		const newSnakeHead = [ newSnake[0][0] + direction[0], newSnake[0][1] + direction[1] ]
		newSnake.unshift(newSnakeHead)
		if (checkCollision(newSnakeHead) && gamestarted) {
			setDelay(null)
			setGameOver(true)
			handleSetScore()
		}
		if (!appleAte(newSnake)) {
			newSnake.pop()
		}
		setSnake(newSnake)
	}

	function changeDirection(e) {
		switch (e.key) {
			case "ArrowLeft":
				setDirection([ -1, 0 ])
				break
			case "ArrowUp":
				setDirection([ 0, -1 ])
				break
			case "ArrowRight":
				setDirection([ 1, 0 ])
				break
			case "ArrowDown":
				setDirection([ 0, 1 ])
				break
            case "a":
				setDirection([ -1, 0 ])
				break
			case "w":
				setDirection([ 0, -1 ])
				break
			case "d":
				setDirection([ 1, 0 ])
				break
			case "s":
				setDirection([ 0, 1 ])
				break
		}
	}

 

    /*if (userLoading){
		return <Loading/>
	}
	if (user){
		//let { snakeHighScore } = getGame(user.username)
		console.log(user.username)
		//console.log(snakeHighScore)
	}*/
	
	
	
    

	return (
        <>
        
        
        <Navbar/>

        <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="#08151F"
      justifyContent="center"
      alignItems="center"
    >
        
        
  
        
        <div onKeyDown={(e) => changeDirection(e)}>
			<img id="fruit" src={AppleLogo} alt="fruit" width="50" />
		


			
             
            
            <Container>
			<canvas 
            style={{
                border: "3px solid white"
            }}
                className="playArea" ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
            </Container> 
            



			
            <Stack
            flexDir="column"
            mt="40"
            justifyContent="center"
            alignItems="center"
            >
                
                {gameOver &&
            <Text as="b" fontSize="4xl" color="white">Game Over!</Text>}
            
            </Stack>
            
            

            {gamestarted &&
            
            <Flex
                justifyContent="center"
                mt="60">
			<Box mt="100px"
            
            >
                <Code variant="solid" colorScheme="purple"><Text fontSize="md" as="b">Score: {score}</Text></Code>
            </Box>
            
            </Flex> }

            <Stack
                flexDir="column"
                my="5"
                justifyContent="center"
                alignItems="center"
                >

            <Button colorScheme="purple" onClick={play}>
                {!gamestarted ? "Play" : !gameOver ? "Restart" :"Play again"}
            </Button>

            </Stack>

            
            </div>
            </Flex>
            </>
		
        
	)
}

