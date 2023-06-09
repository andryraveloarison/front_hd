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
        <div className="User bg-gray p-4 h-full">
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
                                <th scope="col" className="px-4 py-2">
                                    <span className="sr-only">Edit</span>
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
                                            ><Link to={`/superAdmin/user/edit/${user.id}`}>Edit</Link></td>

                                        </tr>
                                    ))
                                }
                        </tbody>
                    </table>
    
    </div>
    );
};

export default User;


