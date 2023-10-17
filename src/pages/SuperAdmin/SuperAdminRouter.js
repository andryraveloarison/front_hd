import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Error from '../../_utils/Error';


import { ALayout,AHeaderLayout, Dashboard } from '../../pages/SuperAdmin'
import { User,UserAdd,UserEdit } from '../../pages/SuperAdmin/User'
import { Ticket,TicketCurrent } from '../../pages/SuperAdmin/Ticket'
import { Chat } from '../../pages/SuperAdmin/Chat';



const SuperAdminRouter = () => {
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
                <Route path="current" element={<TicketCurrent/>}/> 
            </Route> 
                    
            <Route path="*" element={<Error/>}/>

          </Route>
          
            <Route path="chat">
                  <Route path="index" element={<Chat/>}/>
            </Route>   
          
        </Routes>
        </div>
    );
};

export default SuperAdminRouter;