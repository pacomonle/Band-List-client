import { SocketProvider } from "./context/SocketContext";
import HomePage from "./pages/HomePage";




function App() {

  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  )
}

export default App;
