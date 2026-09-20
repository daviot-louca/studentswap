import { AppRouter } from "./router";
import { AuthProvider } from "./providers/AuthProvider";
import { SocketProvider } from "./providers/SocketProvider";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRouter />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;