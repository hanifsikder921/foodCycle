import React from 'react';

import Logo from "../../assets/logo.png";
import { Link } from 'react-router';

const FoodCycleLogo = () => {
    return (
         <Link to="/">
          <img className="w-25" src={Logo} alt="" />
        </Link>
    );
};

export default FoodCycleLogo;