import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Error from '@/_utils/Error';


import { ALayout, Dashboard } from '@/pages/Admin'
import { User,UserAdd,UserEdit } from '@/pages/Admin/User'
import { Ticket,TicketEdit } from '@/pages/Admin/Ticket'



const AdminRouter = () => {
    return (
        <div>
        <Routes>
          <Route element={<ALayout/>}>
            
            <Route index element={<Dashboard/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="user">
                <Route path="index" element={<User/>}/>
                <Route path="add" element={<UserAdd/>}/>
                <Route path="edit/:uid" element={<UserEdit/>}/> 
            </Route> 
            <Route path="ticket">
                <Route path="index" element={<Ticket/>}/>
                <Route path="edit" element={<TicketEdit/>}/> 
            </Route> 
            

            <Route path="*" element={<Error/>}/>

          </Route>
        </Routes>
        </div>
    );
};

export default AdminRouter;