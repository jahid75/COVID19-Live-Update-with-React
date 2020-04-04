import React, {Component} from "react";
import CountriesTable from "./apps/CountriesTable";
import WorldInfo from "./apps/WorldInfo";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>COVID-19 CORONAVIRUS PANDEMIC</h2>
                </div>
                <WorldInfo />
                <CountriesTable/>
                <footer>
                    <p>Made with <span className="material-icons"
                                       aria-hidden="true">favorite</span> React | Contributed by <a
                        href="https://niamul.me">Niamul</a></p>
                    <p>API &amp; Resources used from <a target="_blank" rel="nofollow" href="https://github.com/novelcovid/api">NovelCOVID/API</a>. Thanks everyone for
                        providing us this great opportunity.</p>
                </footer>
            </div>
        );
    }
}

export default App;
