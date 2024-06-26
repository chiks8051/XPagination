import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const maxRecords = 10;

  const startIndex = (currentPage -1 ) * 10 ;
  const paginatedArray = tableData.slice(startIndex , startIndex + maxRecords);

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setTableData(response.data);
    } catch (error) {
        alert("Failed to fetch data");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(tableData.length / maxRecords));
  }, [tableData]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  console.log(totalPage);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedArray.length > 0 ? (
            paginatedArray.map((item) => (
              <tr key={item.id} style={{padding:'5px'}}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage}</span>
      <button onClick={handleNext} disabled={currentPage === totalPage}>
        Next
      </button>
    </div>
  );
};

export default Table;
