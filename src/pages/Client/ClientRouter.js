import React from 'react';
import {Routes, Route} from 'react-router-dom'


import { Layout, Home, Service, Contact, Ticket,Chat } from '@/pages/Client'
import Error from '@/_utils/Error';


const ClientRouter = () => {
    return (
        <div>
        <Routes>
          <Route element={<Layout/>}>

            <Route index element={<Home/>}/>

            <Route path="/home" element={<Home/>}/>
            <Route path="/service" element={<Service/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/ticket" element={<Ticket/>}/>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="*" element={<Error/>}/>

          </Route>

        </Routes>
        </div>
    );
};

export default ClientRouter;