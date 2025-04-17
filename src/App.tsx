import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './components/layout';
import Home from './routes/home';
import Profile from './routes/profile';
import Login from './routes/login';
import CreateAccount from './routes/create-account';
import styled, { createGlobalStyle } from 'styled-components';
import reset from "styled-reset";
import LoadingScreen from './components/loading-screen';

import { auth } from './routes/firebase';
import ProtectedRoute from './routes/protected-route';

const Wrapper = styled.div`
  height: 100vh;                          /* 화면 전체 높이를 기준으로 중앙 정렬 */ 
  display: flex;
  justify-content: center;                /* 수평 중앙 */
  align-items: center;                    /* 수직 중앙 */
  flex-direction: column;
  margin: 0 auto;                         /* 화면 가운데로 */
  padding: 50px 0px;
`;

const router = createBrowserRouter([
  {
    path:"/",
    element:
    /*
      <Layout />,
    */
    <Wrapper>
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    </Wrapper>,  
    children: [
      {
        path: "",
        element: 
       /*  
        <ProtectedRoute>
          <Home />
        </ProtectedRoute> 
        */
        <Home />
      },
      {
        path: "profile",
        element:
        /* 
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
        */
        <Profile />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path:"/create-account",
    element: <CreateAccount />
  }
]);

const GlobalStyles = createGlobalStyle`
   ${reset};
   * {
     box-sizing: border-box;
   }
   body {
     background-color: black;
     color:white;
     font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   }
 `;

function App() {

  const [isLoading, setLoading] = useState(true);
  const init = async() => {
    
    await auth.authStateReady();
              // Firebase가 쿠키와 토큰을 읽고 백엔드와 소통해서 로그인여부를 확인하는 동안 기다림
    setLoading(false);
  };

  useEffect(()=>{
    init();
  },[]);
   
  return <>
    <GlobalStyles />
    {isLoading ? <LoadingScreen /> : <RouterProvider router = {router} />}
  </>;
}

export default App
