import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/").then((res) => setMessage(res.data));
  }, []);

  return (
    <div>
      <h1>Kids Game Exploration System</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
