import { ChakraProvider } from "@chakra-ui/react"
import { router } from "lib/routes";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}


