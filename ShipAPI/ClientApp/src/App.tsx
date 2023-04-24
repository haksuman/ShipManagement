import { BrowserRouter, Routes } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>{routes}</BrowserRouter>
    </div>
  );
}

export default App;
