import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api/axiosConfig";
import "../App.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: "SEARCH",
      system: "ALM",
      division: "BMW",
      table: "TAT_RELEASES",
      column: "",
      columnValue: "",
      filterType: "GREATER_THAN",
      serverResponse: null,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
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
      const response = await api.post("/search", searchParams);
      this.setState({ serverResponse: response.data });
      console.log("Răspuns de la server:", response.data);
      console.log(searchParams);
    } catch (error) {
      console.error("Eroare de la server:", error);
      console.log(searchParams);
    }
  };

  handleSubmitExcel = async (e) => {
    e.preventDefault();
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
      this.setState({ serverResponse: excelResponse.data });
      console.log("Răspuns de la server:", excelResponse.data);
      console.log(searchParams);
    } catch (error) {
      console.error("Eroare de la server:", error);
      console.log(searchParams);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>Archived Data</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="searchType">Search type:</label>
                <select
                  className="form-control"
                  id="searchType"
                  name="searchType"
                  value={this.state.searchType}
                  onChange={this.handleChange}
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
                  value={this.state.system}
                  onChange={this.handleChange}
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
                  value={this.state.division}
                  onChange={this.handleChange}
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
                  value={this.state.table}
                  onChange={this.handleChange}
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
                  value={this.state.column}
                  onChange={this.handleChange}
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
                  value={this.state.columnValue}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-space" />
              <div className="form-group">
                <label htmlFor="filterType">Filter type:</label>
                <select
                  className="form-control"
                  id="filterType"
                  name="filterType"
                  value={this.state.filterType}
                  onChange={this.handleChange}
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
            {this.state.serverResponse && (
              <div className="server-response custom-server-response">
                <p>{this.state.serverResponse}</p>
              </div>
            )}
            <button
              onClick={this.handleSubmitExcel}
              className="btn btn-primary search-button"
            >
              Download data
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForm;
