import React, {useRef,useEffect,useState} from 'react';
import { userService } from '@/_services';


const Dashboard = () => {

    const [users,setUsers] = useState([])
    const flag = useRef(false)

    useEffect (()=>{

        if(flag.current === false){

            userService.getUserConnected()
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => console.log(err))
        }

        return () => flag.current = true
        
    },[])


    return (
        <div className="Dashboard">
            Ici la dashboard {users.nom}
        </div>
    );
};

export default Dashboard;