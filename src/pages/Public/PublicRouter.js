import React from 'react';
import {Routes, Route} from 'react-router-dom'


import { Layout, Home, Service, Contact, Login , UserAdd} from '../../pages/Public'
import Error from '../../_utils/Error';


const PublicRouter = () => {

    return (
        <div>
        <Routes>
          <Route element={<Layout/>}>

            <Route index element={<Home/>}/>

            <Route path="/home" element={<Home/>}/>
            <Route path="/service" element={<Service/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signUp" element={<UserAdd/>}/>

           <Route path="*" element={<Error/>}/>

          </Route>
        </Routes>
        </div>
    );
};

export default PublicRouter;