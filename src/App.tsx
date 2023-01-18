import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Type
import { PAGE_URL } from 'type/common';

// Component
import AuthContainer from 'pages/auth';
import TodoContainer from 'pages/todo';
import Layout from 'component/Layout';
import NotFound from 'pages/error/NotFound';

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          retry: false,
          suspense: true,
          staleTime: 1000 * 5,
          cacheTime: 0,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          refetchOnReconnect: false,
        },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='*' element={<Navigate to={PAGE_URL.NOT_FOUND} />} />
          <Route path='/' element={<Navigate to={PAGE_URL.LOGIN} />} />
          <Route path={PAGE_URL.NOT_FOUND} element={<NotFound />} />
          <Route path={PAGE_URL.LOGIN} element={<AuthContainer />} />
          <Route path={PAGE_URL.TODO} element={<Layout />} >
            <Route path={PAGE_URL.TODO} element={<TodoContainer />} >
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
