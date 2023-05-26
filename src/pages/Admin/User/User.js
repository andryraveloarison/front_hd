import React from 'react';
import { Link } from 'react-router-dom';
import { userService } from '@/_services';
import { useQuery } from 'react-query';


const User = () => {

    const { isLoading, isError, data: users = [], error } = useQuery(
        'users',
        () => userService.getAllUsers().then ((res)=> res.data.user)
      );


      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>{error.message}</div>;

    return (
        <div className="User"> 
            Liste utilisateur
            {/* <button onClick={()=>marcel(4)}> User 4</button> */}
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>nom</th>
                    <th>email</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => (
                        <tr key={user.id}>
                            <td><Link to={`/admin/user/edit/${user.id}`}>{user.id}</Link></td>
                            <td>{user.nom}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    );
};

export default User;