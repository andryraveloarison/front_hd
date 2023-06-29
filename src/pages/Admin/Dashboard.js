import React from 'react';
import StatLast from '@/components/dashboard/StatLast';
import StatUser from '@/components/dashboard/StatUser';
import StatCurrent from '@/components/dashboard/StatCurrent';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import { reportService } from '@/_services';
import { useQuery } from 'react-query';

const Dashboard = () => {
  const user = useSelector(selectUser);

  const { isLoading, error, data: statAll = [] } = useQuery('statAll', () =>
    reportService.getStatAll().then((res) => res.data)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="Dashboard p-10 ml-[225px] mt-[70px] mr-[30px]" style={{ position: 'relative' }}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">


      </div>

      <div className="bg-white p-4 mt-10 rounded shadow">
        <StatLast />
      </div>

      <div className="flex flex-wrap mt-10">
        <div className="bg-white p-4 pb-8 mb-4 rounded shadow w-full md:w-2/3 xl:w-3/4">
          <StatUser />
        </div>
        <div className="bg-white p-4 mb-4 rounded shadow w-full md:w-1/3 xl:w-1/4">
          <StatCurrent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
