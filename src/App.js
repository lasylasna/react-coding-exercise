import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from './context/GlobalState';
import Home from './components/Home'
import AddEditForm from './components/headerComponent/AddEditForm';
function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<AddEditForm />} />
          <Route path="/edit/:id" element={<AddEditForm />} />
        </Routes>
      </Router>

    </GlobalProvider>
  );
}

export default App;
