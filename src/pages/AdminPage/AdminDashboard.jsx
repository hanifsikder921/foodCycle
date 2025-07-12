import React from "react";

import CharityRequestStats from "../Status/CharityRequestStats";
import DonationStats from "../Status/DonationStats";
import UserStats from "../Status/UserStats";

const AdminDashboard = () => {
  const commonStyle = `text-lg font-semibold text-gray-800 dark:text-white mb-4`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-xl">
      <div className="max-w-7xl mx-auto">
        <div>
          <h3 className={commonStyle}>User Stats</h3>
          <UserStats />
        </div>

        <div className="my-8">
          <h3 className={commonStyle}> Charity Stats</h3>
          <CharityRequestStats />
        </div>

        <div>
          <h3 className={commonStyle}> Donation Stats</h3>
          <DonationStats />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
