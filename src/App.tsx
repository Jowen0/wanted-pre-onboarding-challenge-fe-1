import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Component
import AuthContainer from 'pages/auth';
import TodoContainer from 'pages/todo';
import Layout from 'component/Layout';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to={"/login"} />} />
        <Route path='/login' element={<AuthContainer />} />
        <Route path='/todo' element={<Layout />} >
          <Route path='/todo' element={<TodoContainer />} >
            <Route path=':id' element={<TodoContainer />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
