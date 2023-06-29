import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Error from '@/_utils/Error';


import { ALayout, Dashboard, Ticket } from '@/pages/Admin'
import { Chat } from '@/pages/Admin/Chat';



const AdminRouter = () => {
    return (
        <div>
        <Routes>
          <Route element={<ALayout/>}>

            <Route index element={<Dashboard/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="ticket" element={<Ticket/>}/>
            <Route path="*" element={<Error/>}/>

          </Route>
            <Route path="chat">
                  <Route path="index" element={<Chat/>}/>
            </Route>   
          
        </Routes>
        </div>
    );
};

export default AdminRouter;