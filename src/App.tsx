import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Component
import AuthContainer from 'pages/auth';
import TodoContainer from 'pages/todo';
import Layout from 'component/Layout';

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          retry: false,
          suspense: true,
          staleTime: 1000 * 5,
          cacheTime: 0,
        },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
