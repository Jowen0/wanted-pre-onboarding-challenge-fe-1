import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Auth from 'pages/auth';
import TodoContainer from 'pages/todo';
import Layout from 'pages/common/component/Layout';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Auth />} />
        <Route path='/' element={<Layout />} >
          <Route path='/' element={<Navigate to={"/login"} />} />
          <Route path='/todo' element={<TodoContainer />} >
            <Route path=':id' element={<TodoContainer />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
