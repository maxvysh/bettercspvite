import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ClassScreen from "./ClassScreen";
import SelectCS from "./SelectCS";

const App = () => {
  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path ="/selectcs" element={<SelectCS />} />
          <Route path="/classes" element={<ClassScreen />} />
        </Routes>
      </Router>
    </>
  )
}

export default App