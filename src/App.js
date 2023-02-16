import { ChakraProvider } from "@chakra-ui/react"
import Term from "./components/terminal/term";

export default function App() {
  return (
    <ChakraProvider>
      <Term/>
    </ChakraProvider>
  );
}


