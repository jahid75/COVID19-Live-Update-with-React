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
          <h2>COVID-19 CORONAVIRUS PANDEMIC</h2>
        </div>
        <div className="table_container">
          {summary.length ? (
            <MaterialTable
              title="COVID-19 Coronavirus updates!"
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
          <footer>
              <p>Made with React <span className="material-icons MuiIcon-root" aria-hidden="true">favorite</span> | Contributed by <a
                  href="https://niamul.me">Niamul</a></p>
              <p>API used from <a href="https://covid19api.com">covid19api.com</a>, thanks <a href="https://twitter.com/ksredelinghuys">Kyle Redelinghuys</a>. Data is sourced from <a
                  href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins CSSE</a>. Thanks everyone for providing us this great opportunity.</p>
          </footer>
      </div>
    );
  }
}

export default App;
