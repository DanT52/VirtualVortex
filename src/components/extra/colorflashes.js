import { Flex, useInterval } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TERM } from "../../lib/routes";

export default function ColorFlashes({ delay=20, colors=false }){

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    useInterval(() => colorChange(), delay);
    
    const [color, setColor] = useState("black");

    function colorChange(){
        if (colors){
            setColor(getRandomColor)
        }
        else{
            if (color === "white"){
                setColor("black")
            } else {
                setColor("white")
                
            }
        }

    }

    return(
        <Flex
        flexDirection="column"
        backgroundColor={color}
        justifyContent="center"
        alignItems="center"
        width="100wh"
        height="100vh"
        as={Link}
        to={TERM}
        >  
        
        </Flex>
    );
}
