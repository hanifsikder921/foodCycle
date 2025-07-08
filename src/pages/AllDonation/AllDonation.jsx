import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import moment from 'moment';



const AllDonation = () => {
  const [donations, setDonations] = useState([]);
  const axios = useAxios();


  useEffect(() => {
    axios
      .get(`/donations?status=Verified`)
      .then((res) => setDonations(res.data))
      .catch((err) => console.error(err));
  }, [axios]);

 
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>SL.</th>
            <th>Food Name</th>
            <th>Pickup Location</th>
            <th>Expire Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={donation._id}>
              <th>{index + 1}</th>
              <td>{donation.title}</td>
              <td>{donation.location}</td>
              <td>{moment(donation.pickupDate).format("DD-MMM-YYYY")}</td>
              <td>{donation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDonation;
