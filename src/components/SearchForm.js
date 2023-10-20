import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api/axiosConfig";
import "../App.css";

const SearchForm = () => {
  const [searchType, setSearchType] = useState("SEARCH");
  const [system, setSystem] = useState("ALM");
  const [division, setDivision] = useState("BMW");
  const [table, setTable] = useState("TAT_RELEASES");
  const [column, setColumn] = useState("");
  const [columnValue, setColumnValue] = useState("");
  const [filterType, setFilterType] = useState("GREATER_THAN");
  const [serverResponse, setServerResponse] = useState(null);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchType") setSearchType(value);
    if (name === "system") setSystem(value);
    if (name === "division") setDivision(value);
    if (name === "table") setTable(value);
    if (name === "column") setColumn(value);
    if (name === "columnValue") setColumnValue(value);
    if (name === "filterType") setFilterType(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchData = [
      {
        column: "REL_ID",
        columnValue: "1003",
        filterType: ["GREATER_THAN"],
      },
    ];

    const searchParams = {
      searchType: searchType,
      system: system,
      division: division,
      table: table,
      searchData: searchData,
    };

    try {
      const response = await api.post("/search", searchParams);
      setServerResponse(response.data);
      console.log("Răspuns de la server:", response.data);
      console.log(searchParams);

      setShowDownloadButton(true);
    } catch (error) {
      console.error("Eroare de la server:", error);
      console.log(searchParams);
    }
  };

  const handleDownloadExcel = async () => {
    const searchData = [
      {
        column: "REL_ID",
        columnValue: "1003",
        filterType: ["GREATER_THAN"],
      },
    ];

    const searchParams = {
      searchType: "SEARCH",
      system: "ALM",
      division: "BMW",
      table: "TAT_RELEASES",
      searchData: searchData,
    };

    try {
      const excelResponse = await api.post("/search/excel", searchParams);
      setServerResponse(excelResponse.data);
      console.log("Răspuns de la server:", excelResponse.data);
      console.log(searchParams);
    } catch (error) {
      console.error("Eroare de la server:", error);
      console.log(searchParams);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Archived Data</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="searchType">Search type:</label>
              <select
                className="form-control"
                id="searchType"
                name="searchType"
                value={searchType}
                onChange={handleChange}
              >
                <option value="SEARCH">SEARCH</option>
                <option value="COUNT">COUNT</option>
              </select>
            </div>
            <div className="form-space" />
            <div className="form-group">
              <label htmlFor="system">System:</label>
              <select
                className="form-control"
                id="system"
                name="system"
                value={system}
                onChange={handleChange}
              >
                <option value="ALM">ALM</option>
                <option value="OCTANE">OCTANE</option>
              </select>
            </div>
            <div className="form-space" />
            <div className="form-group">
              <label htmlFor="division">Division:</label>
              <select
                className="form-control"
                id="division"
                name="division"
                value={division}
                onChange={handleChange}
              >
                <option value="BMW">BMW</option>
                <option value="BBA">BBA</option>
                <option value="MOTORRAD">MOTORRAD</option>
              </select>
            </div>
            <div className="form-space" />
            <div className="form-group">
              <label htmlFor="table">Table:</label>
              <select
                className="form-control"
                id="table"
                name="table"
                value={table}
                onChange={handleChange}
              >
                <option value="TAT_RELEASES">TAT_RELEASES</option>
                <option value="TAT_STEP">TAT_STEP</option>
              </select>
            </div>
            <div className="form-space" />
            <div className="form-group">
              <label htmlFor="column">Column:</label>
              <select
                className="form-control"
                id="column"
                name="column"
                value={column}
                onChange={handleChange}
              >
                <option value="REL_ID">REL_ID</option>
                <option value="ASSIGNED_ECU">ASSIGNED_ECU</option>
                <option value="LEAKMODEL">LEAKMODEL</option>
                <option value="INVOLVED_ISTEP">INVOLVED_ISTEP</option>
                <option value="FACE">FACE</option>
                <option value="CREATE_TIME">CREATE_TIME</option>
                <option value="TARGET_SET">TARGET_SET</option>
              </select>
            </div>
            <div className="form-space" />
            <div className="form-group">
              <label htmlFor="columnValue">Column value:</label>
              <input
                type="text"
                className="form-control"
                id="columnValue"
                name="columnValue"
                value={columnValue}
                onChange={handleChange}
              />
            </div>
            <div className="form-space" />
            <div className="form-group">
              <label htmlFor="filterType">Filter type:</label>
              <select
                className="form-control"
                id="filterType"
                name="filterType"
                value={filterType}
                onChange={handleChange}
              >
                <option value="GREATER_THAN">GREATER_THAN</option>
                <option value="GREATER_LENGTH">GREATER_LENGTH</option>
                <option value="FIND_TEXT">FIND_TEXT</option>
                <option value="BEFORE_DATE">BEFORE_DATE</option>
                <option value="AFTER_DATE">AFTER_DATE</option>
              </select>
            </div>
            <div className="form-space" />
            <button type="submit" className="btn btn-primary search-button">
              Search
            </button>
          </form>
          {serverResponse && (
            <div className="server-response custom-server-response">
              <p>{serverResponse}</p>
            </div>
          )}
          {showDownloadButton && (
            <button
              onClick={handleDownloadExcel}
              className="btn btn-primary search-button"
            >
              Download data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
