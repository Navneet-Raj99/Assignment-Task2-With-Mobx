import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Container/Login';
import Signup from './Container/Signup';
import Home from './Container/Home';
import StudentDisplay from './Container/StudentDisplay';
import StudentIndivisual from './Container/StudentIndivisual';
import AddStudent from './Container/AddStudent';
import PaginatedStudentDisplay from './Container/PaginatedStudentDisplay';
import TableView from './Container/TableView';
import Studentstate from './Context/Studentstate';

function App() {
  return (
    
    <Studentstate>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/particularstudent/:id" exact element={<StudentIndivisual />} />
          <Route path="/student" exact element={<StudentDisplay />} />
          <Route path='/addstudent' exact element={<AddStudent />} />
          <Route path='/paginated' exact element={<PaginatedStudentDisplay />} />
          <Route path='/tableview' exact element={<TableView />} />
        </Routes>
      </Router>
    </Studentstate>
  );
}

export default App;
