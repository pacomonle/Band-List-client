import { SocketProvider } from "./context/SocketContext";
import HomePage from "./pages/HomePage";
import React from 'react'



function App() {

  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  )
}

export default App;
