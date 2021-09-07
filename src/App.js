import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FindID } from './components/FindID.jsx';
import { SearchInHAPI } from './components/SearchInHAPI.jsx';
import { EPJSimulator } from './components/EPJSimulator.jsx';
import Nav from 'react-bootstrap/Nav';


export const App = class App extends React.Component {
  
  
  render() {

    return (
      <div className="App">

        <Router>
          <div>
            {/* Set defaultActiveKey to the current 'rest' path in order to
              switch the Nav tab to the current selected page */}
            <Nav variant="tabs" defaultActiveKey={window.location.pathname}>

                <Nav.Link href="/epjsimulator">EPJ-simulator</Nav.Link>
                <Nav.Link href="/">Søk i HAPI</Nav.Link>
                <Nav.Link href="/finnid">Finn ID</Nav.Link>
             
                

            </Nav>

            <Switch>
                <Route exact path="/" >
                  <SearchInHAPI/>
                </Route>

                <Route path="/finnid" component={FindID}>
                  <FindID />
                </Route>

                <Route path="/epjsimulator" component={EPJSimulator}>
                  <EPJSimulator />
                </Route>

            </Switch>

          </div>
        </Router>
      </div>
    )
  }
}

export default App;