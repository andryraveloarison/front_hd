import React from 'react';
import StatLast from '@/components/dashboard/StatLast';
import StatUser from '@/components/dashboard/StatUser';
import StatCurrent from '@/components/dashboard/StatCurrent';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import { reportService } from '@/_services';
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
        <div className="Dashboard p-10 ml-[200px] mt-[40px] mr-[40px] w-[87.78%]"style={{ position:'relative' }}>

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