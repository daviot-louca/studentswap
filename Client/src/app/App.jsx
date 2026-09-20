import { AppRouter } from "./router";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { SocketProvider } from "./providers/SocketProvider.jsx";

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