import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../../components/Loading/Loading';
import UserDashBoard from '../UserPage/UserDashBoard';
import ResurantDashBord from '../../RestaurantPage/ResurantDashBord';
import AdminDashboard from '../../AdminPage/AdminDashboard';
import Forbidden from './../../Forbidden/Forbidden';
import CharityDashbord from '../../CharityPage/CharityDashbord';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if(role === 'user'){
        return <UserDashBoard></UserDashBoard>
    }
    else if(role === 'restaurant'){
        return <ResurantDashBord></ResurantDashBord>
    }
    else if(role ==='admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else if(role ==='charity'){
        return <CharityDashbord></CharityDashbord>
    }
    else {                                                                                                                                  
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;