import React, { Component } from "react";
import axios from "axios";
import api_info from "../api_info";

class WorldInfo extends Component{
    state = {
        summary: { cases: 0, deaths: 0, recovered: 0}
    };

    componentDidMount() {
        axios.get(api_info.api_all).then(res => {
            let summary = res.data;
            this.setState({ summary });
        });
    }

    render() {
        let { summary } = this.state;
        return (
            <div className="world_info_wrapper">
                <div className="row world_info_head">
                    <h2>Worldwide Coronavirus Cases</h2>
                </div>
                <div className="world_info row">
                    <div className="col-3 text-center">
                        <div className="n_icon icon_cases">
                            <span className="material-icons"aria-hidden="true">supervisor_account</span>
                        </div>
                        <h3>Total Cases</h3>
                        <p className="total_cases">{ (summary.cases).toLocaleString() }</p>
                    </div>
                    <div className="col-3 text-center">
                        <div className="n_icon icon_deaths">
                            <span className="material-icons"aria-hidden="true">highlight_off</span>
                        </div>
                        <h3>Total Deaths</h3>
                        <p className="total_death">{(summary.deaths).toLocaleString()}</p>
                    </div>
                    <div className="col-3 text-center">
                        <div className="n_icon icon_recovered">
                            <span className="material-icons"aria-hidden="true">how_to_reg</span>
                        </div>
                        <h3>Total Recovered</h3>
                        <p className="total_recovered">{(summary.recovered).toLocaleString()}</p>
                    </div>
                </div>
            </div>

        );
    }
}

export default WorldInfo;