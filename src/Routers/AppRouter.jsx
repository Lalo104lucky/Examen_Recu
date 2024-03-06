import React, { useContext } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SingInPage from '../modules/auth/SingInPage';
import AuthContext from '../config/context/auth-context';
import AdminLayouts from '../modules/auth/admin/AdminLayouts';
import UserPage from '../modules/auth/admin/users/UserPage';

const AppRouter = () => {
  const {user} = useContext(AuthContext);
  const rol = localStorage.getItem('rol');
  const router = createBrowserRouter(
    createRoutesFromElements(
        <>
          {
            user.signed && rol == "ADMIN_ROLE"? (
              <>
                  <Route path='/' element={<AdminLayouts/>} >
                    <Route path='admin' element={<>ADMIN</>} />
                    <Route path='products' element={<> PRODUCTOS </>} />
                  </Route>
                </>
                ) : user.signed && rol == "USER_ROLE" ?(<>
                    <Route path='/' element={<AdminLayouts/>} >
                    <Route path='users' element={<UserPage/>} />
                    <Route path='products' element={<> PRODUCTOS </>} />
                  </Route>
                </>
                ) : user.signed && rol == "CLIENT_ROLE" ?(<>
                  <Route path='/' element={<AdminLayouts/>} >
                  <Route path='client' element={<UserPage/>} />
                  <Route path='products' element={<> PRODUCTOS </>} />
                </Route>
              </>) : (<Route path='/' element={<SingInPage/>} />)  
          }
        <Route path='/*' element={<>404 Not Found</>}/>
      </> 
    )
  )
  return <RouterProvider router={router}/>; 
};

export default AppRouter;