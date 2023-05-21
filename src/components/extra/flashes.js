import { Flex, useInterval } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TERM } from "../../lib/routes";

export default function Flashes(){

    useInterval(() => colorChange(), 30);
    
    const [color, setColor] = useState("black");

    function colorChange(){
        if (color === "white"){
            setColor("black")
        } else {
            setColor("white")
            
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
