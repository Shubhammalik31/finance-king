import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FinancialPage.css";

const FinancialPage = () => {
  const [financialData, setFinancialData] = useState([]);
  const [filter, setFilter] = useState("Withdraw");
  const id = localStorage.getItem("site");

  useEffect(() => {
    if (id) {
      axios
        .get(`https://rajjiowin-backend.vercel.app/financial/${id}`)
        .then((response) => {
          console.log("API response:", response.data);
          setFinancialData(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the financial data!",
            error
          );
        });
    }
  }, [id]);

  const getStatus = (transaction) => {
    if (transaction.type === "recharge") {
      return transaction.paid ? "Recharged successfully" : "In processing";
    } else if (transaction.type === "withdraw") {
      return transaction.paid ? "Successful payment" : "In processing";
    } else if (transaction.type === "other") {
      return transaction.paid ? "Referral reward" : "In processing";
    } else {
      return "Unknown status";
    }
  };

  const filteredData = financialData.filter((transaction) => {
    return transaction.type.toLowerCase() === filter.toLowerCase();
  });

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="financial-page">
      <h3>Transactions</h3>
      <div className="transaction-types">
        <button
          className={`transaction-type ${filter === "Other" ? "active" : ""}`}
          onClick={() => handleFilterChange("Other")}
        >
          Other
        </button>
        <button
          className={`transaction-type ${
            filter === "Recharge" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("Recharge")}
        >
          Recharge
        </button>
        <button
          className={`transaction-type ${
            filter === "Withdraw" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("Withdraw")}
        >
          Withdraw
        </button>
      </div>
      <div className="transactions-list">
        {filteredData.length > 0 ? (
          filteredData.map((transaction, index) => (
            <div key={index} className="transaction">
              <p className="transaction-status">{getStatus(transaction)}</p>
              <p className="transaction-date">
                {new Date(transaction.date).toLocaleString()}
              </p>
              <p className="transaction-amount">{transaction.amount}</p>
            </div>
          ))
        ) : (
          <p>No transactions available</p>
        )}
      </div>
    </div>
  );
};

export default FinancialPage;
