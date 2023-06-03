//import logo from '@/logo.svg';
import '@/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PublicRouter from '@/pages/Public/PublicRouter';
import AdminRouter from '@/pages/Admin/AdminRouter';
import AuthRouter from '@/pages/Auth/AuthRouter';
import SuperAdminRouter from '@/pages/SuperAdmin/SuperAdminRouter';
import UserGuard from './_helpers/UserGuard';
import AdminGuard from './_helpers/AdminGuard';
import NotAuthGuard from './_helpers/NotAuthGuard';
import ClientRouter from './pages/Client/ClientRouter';
import SuperAdminGuard from './_helpers/SuperAdminGuard';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={
            <NotAuthGuard>
                <PublicRouter/>
            </NotAuthGuard>
        
            }/>  

          <Route path="/superadmin/*" element={
            <SuperAdminGuard>
                <SuperAdminRouter/>
            </SuperAdminGuard> 
          }/>


          <Route path="/admin/*" element={
            <AdminGuard>
                <AdminRouter/>
            </AdminGuard> 
          }/>

          <Route path="/user/*" element={
            <UserGuard>
                <ClientRouter/>
            </UserGuard> 
          }/>


          <Route path="/auth/*" element={<AuthRouter/>}/>
        </Routes>
                
      </BrowserRouter>
    </div>
  );
}

export default App;
