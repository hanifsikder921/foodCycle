import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserTransectionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Your Transaction History
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Loading transactions...
        </p>
      ) : isError ? (
        <p className="text-center text-red-500">
          Failed to load transactions: {error.message}
        </p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven't made any transactions yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base font-semibold text-base-content">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Methode</th>
                <th>Status</th>
                <th>Purpose</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={tx._id}
                  className="dark:text-white"
                >
                  <th>{index + 1}</th>
                  <td className="break-all text-blue-600 dark:text-green-400">
                    {tx.transactionId}
                  </td>
                  <td>${tx.amount}</td>
                  <td>{tx.paymentMethode}</td>
                  <td>
                    <span
                      className={`badge ${
                        tx.status === "completed"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td>{tx.purpose}</td>
                  <td>{new Date(tx.paymentDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTransectionHistory;
