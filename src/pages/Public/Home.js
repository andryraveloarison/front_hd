import React from 'react';
import Avatar from '../../assets/help.avif'



const Home = () => {

    return (
        <div className='items-center justify-center flex ml-10'>
            <div>
            <h1 className="text-2xl font-bold mb-4" >Bienvenue</h1>
            <h1 className="text-2xl font-bold mb-4" > sur le site HelpDesk de l'ARMP</h1>
            </div>
           
            <div className='justify-end '>
                <img src={Avatar} alt="HelpDesk" className='w-[900px]'  />
            </div>
        </div>
    );
};

export default Home;