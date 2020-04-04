import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import "./App.css";

const api_url = "https://api.covid19api.com/summary";

class App extends Component {
  state = {
    summary: []
  };

  componentDidMount() {
    axios.get(api_url).then(res => {
      let summary = res.data.Countries;
      this.setState({ summary });
    });
  }

  render() {
    let { summary } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Check the COVID 19 Live status here!</h2>
        </div>
        <div className="table_container">
          {summary.length ? (
            <MaterialTable
              title="Corona Virus Live Update!"
              columns={[
                { title: "Country", field: "Country" },
                {
                  title: "TotalConfirmed",
                  field: "TotalConfirmed",
                  type: "numeric",
                  defaultSort: "desc"
                },
                {
                  title: "NewConfirmed",
                  field: "NewConfirmed",
                  type: "numeric"
                },
                {
                  title: "NewDeaths",
                  field: "NewDeaths",
                  type: "numeric",
                  cellStyle: { color: "#ff0000" }
                },
                { title: "TotalDeaths", field: "TotalDeaths", type: "numeric" },
                {
                  title: "NewRecovered",
                  field: "NewRecovered",
                  type: "numeric"
                },

                {
                  title: "TotalRecovered",
                  field: "TotalRecovered",
                  type: "numeric"
                }
              ]}
              data={summary.filter(item => item.Country !== "")}
              options={{
                paging: false,
                pageSize: 100,
                draggable: false,
                exportButton: true,
                headerStyle: {
                  backgroundColor: "#0dafad",
                  color: "#FFF"
                }
              }}
            />
          ) : (
            <div className="text-center not_found">
              <p>Please wait, loading...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
