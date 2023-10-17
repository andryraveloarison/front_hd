import React from 'react';
import StatLast from '../../components/dashboard/StatLast';
import StatUser from '../../components/dashboard/StatUser';
import StatCurrent from '../../components/dashboard/StatCurrent';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import { reportService } from '../../_services';
import { useQuery } from 'react-query';
  
 


const Dashboard = () => {

    const user = useSelector(selectUser)

    const { Loading, Error, data: statAll = [],error } = useQuery('statAll', () =>
    reportService.getStatAll().then((res) => res.data)
  );

    if (Loading) {
        return <div>Loading...</div>;
    }
    if (Error) {
        return <div>{error}</div>;

    }
    return (
        <div className="Dashboard p-10 ml-[225px] mt-[70px] mr-[30px]"style={{ position:'relative' }}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <div className="bg-white p-4 rounded shadow h-[150px]">
                <div className=' pt-4'>
                    <p className="mb-2">Nombre total des tickets</p>
                    <h1 className="text-4xl font-bold">{statAll.nbTicket}</h1>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow h-[150px]">
                <div className=' pt-4'>
                    <p className="mb-2">Nombre total des tickets actifs</p>
                    <h1 className="text-4xl font-bold">{statAll.nbActif}</h1>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow h-[150px]">
                <div className=' pt-4'>
                    <p className="mb-2">Nombre total des tickets résolus</p>
                    <p className="text-4xl font-bold ">{statAll.nbResolu}</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow h-[150px]">
                <div className=' pt-4'>
                    <p className="mb-2">Nombre total des tickets supprimés</p>
                    <h1 className="text-4xl font-bold">{statAll.nbSupprimer}</h1>
                </div>
            </div>
        </div>

        <div className="bg-white p-4 mt-10 rounded shadow h-[450px]">
            <StatLast />
        </div>


        <div className="flex ">
            <div className="bg-white p-4 pb-8 mt-7 rounded shadow w-[65%]">
                <StatUser />
            </div>
            <div className="bg-white p-4 mt-7 ml-10 rounded shadow w-[38%]">
                <StatCurrent />
            </div>
        </div>

        </div>
    );
};

export default Dashboard;