import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api/axiosConfig";
import "../App.css";

const SearchForm = () => {
  const [system, setSystem] = useState("ALM");
  const [systems, setSystems] = useState([]);
  const [division, setDivision] = useState("BMW");
  const [divisions, setDivisions] = useState([]);
  const [table, setTable] = useState("TAT_RELEASES");
  const [tables, setTables] = useState([]);
  const [columnValue, setColumnValue] = useState("");
  const [filterType, setFilterType] = useState("GREATER_THAN");
  const [filterTypes, setFilterTypes] = useState([]);
  const [column, setColumn] = useState("");
  const [serverResponse, setServerResponse] = useState(null);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [filters, setFilters] = useState([]);
  const [isAddingFilter, setIsAddingFilter] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "system") setSystem(value);
    if (name === "division") setDivision(value);
    if (name === "table") setTable(value);
    if (name === "column") setColumn(value);
    if (name === "columnValue") setColumnValue(value);
    if (name === "filterType") setFilterType(value);
  };

  const handleAddFilter = () => {
    const newFilter = {
      column,
      filterType,
      columnValue,
    };

    setFilters([...filters, newFilter]);

    setColumn("");
    setFilterType("GREATER_THAN");
    setColumnValue("");
    setIsAddingFilter(false);
  };

  const handleFilterChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFilters = [...filters];
    updatedFilters[index][name] = value;
    setFilters(updatedFilters);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchData = [
      {
        column: "REL_ID",
        columnValue: "1003",
        filterType: ["GREATER_THAN"],
        ...filters,
      },
    ];

    const searchParams = {
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

  const getDivisions = async () => {
    try {
      const response = await api.get("/filters/division");
      return response.data;
    } catch (error) {
      console.error('Eroare la obținerea diviziilor:', error);
      throw error;
    }
  };
  
  const getFilterTypes = async () => {
    try {
      const response = await api.get("filters/filterType");
      return response.data;
    } catch (error) {
      console.error('Eroare la obținerea tipurilor de filtru:', error);
      throw error;
    }
  };
  
  const getSystems = async () => {
    try {
      const response = await api.get("filters/system");
      return response.data;
    } catch (error) {
      console.error('Eroare la obținerea sistemelor:', error);
      throw error;
    }
  };
  
  const getTables = async () => {
    try {
      const response = await api.get("/filters/table");
      return response.data;
    } catch (error) {
      console.error('Eroare la obținerea tabelelor:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    getSystems()
      .then((system) => setSystems(system))
      .catch((error) => console.error('Eroare la obținerea diviziilor:', error));
  
    getDivisions()
      .then((divisionData) => setDivisions(divisionData))
      .catch((error) => console.error('Eroare la obținerea diviziilor:', error));
  
    getFilterTypes()
      .then((filterTypeData) => setFilterTypes(filterTypeData))
      .catch((error) => console.error('Eroare la obținerea tipurilor de filtru:', error));
  
    getTables()
      .then((tableData) => setTables(tableData))
      .catch((error) => console.error('Eroare la obținerea tabelelor:', error));
  }, []);
  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Archived Data</h2>
          <form onSubmit={handleSubmit}>
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
              {systems.map((sys) => (
                <option key={sys} value={sys}>
                  {sys}
                </option>
              ))}
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
                {divisions.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
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
                {tables.map((table) => (
                  <option key={table} value={table}>
                    {table}
                  </option>
                ))}
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
              <label htmlFor="filterType">Filter type:</label>
              <select
                className="form-control"
                id="filterType"
                name="filterType"
                value={filterType}
                onChange={handleChange}
              >
                {filterTypes.map((filterType) => (
                  <option key={filterType} value={filterType}>
                    {filterType}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-space" >
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
            <hr />
            </div>
            {filters.map((filter, index) => (
              <div key={index}>
                <div className="form-group">
                  <label htmlFor="column">Column:</label>
                  <select
                    className="form-control"
                    id="column"
                    name="column"
                    value={filter.column}
                    onChange={(e) => handleFilterChange(e, index)}
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
                <div className="form-group">
                  <label htmlFor="filterType">Filter type:</label>
                  <select
                    className="form-control"
                    id="filterType"
                    name="filterType"
                    value={filterType}
                    onChange={handleChange}
                  >
                    {filterTypes.map((filterType) => (
                      <option key={filterType} value={filterType}>
                        {filterType}
                      </option>
                    ))}
                </select>
                </div>
                <div className="form-group">
                  <label htmlFor="columnValue">Column value:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="columnValue"
                    name="columnValue"
                    value={filter.columnValue}
                    onChange={(e) => handleFilterChange(e, index)}
                  />
                </div>
                {index < filters.length - 1 && <hr />}
              </div>
            ))}
            <div className="form-space" />
            {isAddingFilter ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddFilter}
              >
                Add Filter
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onMouseDown={() => setIsAddingFilter(true)}
              >
                Add Filter
              </button>
            )}
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
