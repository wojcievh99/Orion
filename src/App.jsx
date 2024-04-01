import Home from "./pages/Home";
import Register from "./pages/authetication/Register";

import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function App() {

  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? <Home/> : <Register/>}
    </div>
  );
}

export default App
