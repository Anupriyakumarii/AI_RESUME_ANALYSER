import { useState } from "react";
import "./App.css";
import ResumeAnalyzer from "./ResumeAnalyzer";

function App() {
  const [count, setCount] = useState(0);

  return <ResumeAnalyzer></ResumeAnalyzer>;
}

export default App;
