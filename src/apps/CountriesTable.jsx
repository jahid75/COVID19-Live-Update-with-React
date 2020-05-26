import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import api_info from "../api_info";

const getMonth = m => {
    let months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[m];
};

class CountriesTable extends Component {
    state = {
        summary: []
    };

    componentDidMount() {
        axios.get(api_info.api_url).then(res => {
            let summary = res.data;
            let countries = summary.map(c => {
                let updated = new Date( c.updated );
                let day = updated.getDate();
                let month = getMonth(updated.getMonth());
                let hours = updated.getHours();
                let minutes = "0" + updated.getMinutes();
                let ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12;
                let updated_at = month + ' ' + day + ', ' +hours + ':' + minutes.substr(-2) + ampm;
                let newCountry = {
                    country: c.country,
                    flag: c.country.flag,
                    cases: c.cases,
                    todayCases: c.todayCases,
                    deaths: c.deaths,
                    todayDeaths: c.todayDeaths,
                    recovered: c.recovered,
                    active: c.active,
                    critical: c.critical,
                    updated: updated_at
                };
                return newCountry;
            });
            this.setState({ summary: countries });
        });
    }

    render() {
        let { summary } = this.state;
        return (
            <div className="table_container">
            {summary.length ? (
                <MaterialTable
                    title="Country wise COVID-19 Coronavirus updates!"
                    columns={[
                        { title: "Country", field: "country" },
                        {
                            title: "Total Cases",
                            field: "cases",
                            type: "numeric"
                        },
                        {
                            title: "Cases Today",
                            field: "todayCases",
                            type: "numeric"
                        },
                        {
                            title: "Deaths Today",
                            field: "todayDeaths",
                            type: "numeric",
                            cellStyle: { color: "#ff0000" }
                        },
                        { title: "Total Deaths", field: "deaths", type: "numeric" },
                        {
                            title: "Recovered",
                            field: "recovered",
                            type: "numeric"
                        },
                        {
                            title: "Active Cases",
                            field: "active",
                            type: "numeric"
                        },
                        {
                            title: "Critical Cases",
                            field: "critical",
                            type: "numeric"
                        },
                        {
                            title: "LastUpdate",
                            field: "updated",
                            sorting: false,
                            cellStyle: { fontWeight: 'normal', fontSize: '0.88rem'}
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
                    <p>Please wait, while we are loading...</p>
                </div>
            )}
        </div>);
    }
}

export default CountriesTable;