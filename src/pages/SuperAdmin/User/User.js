import React from 'react';
import { Link } from 'react-router-dom';
import { userService } from '@/_services';
import { useQuery } from 'react-query';
import { roleService } from '@/_services';


const User = () => {

    const { isLoading, isError, data: users = [], error } = useQuery(
        'users',
        () => userService.getAllUsers().then ((res)=> res.data.users)
      );


      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>{error.message}</div>;


    const action = (statuRoleId, roleId) => {
        if(roleId === 2){
            roleService.setAdmin(statuRoleId).then(res => {
                window.location.reload();        
            })
            
        }else(
            roleService.setUser(statuRoleId).then(res => {
                window.location.reload();        
            })
        )
    }

    const supprimer = (statuRoleId) => {
       
            userService.deleteUser(statuRoleId).then(res => {
                window.location.reload();        
            })
        
    }


    return (
        <div className="User p-4 h-full ml-[190px] mt-[90px] mr-[30px]" style={{ position:'relative' }} >
        <h1 className="text-2xl font-bold mb-4">Liste Utilisateur</h1>
                    <table className="w-full">
                        <thead>
                        <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">                               
                                
                                <th className="px-4 py-2">
                                    Id
                                </th>
                                <th className="px-4 py-2">
                                    Nom
                                </th>
                                <th className="px-4 py-2">
                                    email
                                </th>
                                <th className="px-4 py-2">
                                    role
                                </th>
                                <th className="px-4 py-2">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white ">
                                {
                                    users.map(user => (
                                        <tr key={user.id } className="hover:bg-white dark:hover:bg-gray-100">
                                            <td className="px-4 py-2 text-center"
                                            >{user.id}</td>
                                            <td className="px-4 py-2 text-center"
                                            >{user.nom}</td>
                                            <td className="px-4 py-2 text-center"
                                            >{user.email}</td>
                                            <td className="px-4 py-2 text-center"
                                            >{roleService.getRole(user.userRole)}</td>
                                            <td className="px-4 py-2 text-center"
                                            >
                                            <button
                                                onClick={() => action(user.statuRoleId, user.userRole)}
                                                className="bg-blue-500 text-white font-bold rounded mr-2 text-base w-[100px] h-[30px]" // Ajoutez les classes de dimensionnement ici
                                                >
                                                {roleService.getAction(user.userRole)} 
                                            </button>
                                            <button
                                                onClick={() => supprimer(user.statuRoleId)}
                                                className="bg-red-500 text-white font-bold rounded w-[100px] h-[30px]" // Ajoutez les classes de dimensionnement ici
                                                data-te-ripple-init
                                            >
                                                supprimer
                                            </button>
                                            </td>

                                        </tr>
                                    ))
                                }
                        </tbody>
                    </table>
    
    </div>
    );
};

export default User;


