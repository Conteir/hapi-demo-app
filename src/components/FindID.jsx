import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { enviroments } from '../config.ts';
import HTMLRender from './htmlRenderComponent.jsx';
import { Spinner } from 'reactstrap';

export const FindID = class FindID extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSpinner: false,
      url: '',
      response: '',
      id: '',
      records: [],
      enviroment: 'prod'
    };

  }
  mySubmitHandler = (event) => {
    event.preventDefault();

    this.setState({ response: '' });

    const enviroment = this.state.enviroment;
    let setEnviroments = enviroments.find(o => o.id === enviroment);

    let url = setEnviroments.url
    let key = setEnviroments.key
    url += this.state.id;


    this.setState({ url: url });
    this.setState({ showSpinner: true });

    fetch(url,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Ocp-Apim-Subscription-Key': key
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.responseHandler(data);
        this.setState({ showSpinner: false });
      }, () => this.setState({ showSpinner: false }))

      ;
  }
  
  ChangeHandlerEnviroment = (event) => {
    // sets 'this.state.environment' to the selected in the 'select' box environment as string
    // (one of the 'prod', 'qa', ...)
    this.setState({
      enviroment: event.target.value
    });
  }

  responseHandler = (data) => {
    if (data) {
      this.setState({
        response: JSON.stringify(data, null, 2)
      });
    }
  }

  ChangeHandlerId = (event) => {
    this.setState({
      id: event.target.value
    });
  }
  render() {
    return (
      <div>
          <div 
            style={{backgroundColor: '#FCA903'}}
            className="jumbotron text-center">
              <h1>Get ID</h1>
              <p>Get API ID for contenttypes Retningslinjer, Pakkeforløp, Veiledere etc</p>
          </div>

          <div className="getidpage">
              <div className="container">

                  <form onSubmit={this.mySubmitHandler}>

                    <div className="form-group">
                      <select name="enviroment" id="enviroment"
                        onChange={evt => this.ChangeHandlerEnviroment(evt)}
                      >

                        <option value="prod">Production</option>
                        <option value="test-bt">Test BT</option>
                        <option value="test-st">Test ST</option>
                        <option value="qa">QA</option>

                      </select>
                    </div>

                    <div className="row">
                      <div className="col">
                        <p>Please provide content type for the API ID search</p>
                      </div>
                    </div>

                    <div className="form-group">
                      <select name="id" id="id"
                        onChange={evt => this.ChangeHandlerId(evt)}
                      >
                        <option value="" select="default">Choose content type</option>
                        <option value="retningslinjer">Retningslinjer</option>
                        <option value="pakkeforlop">Pakkerforløp (feil i innholdstype)</option>
                        <option value="nasjonal-veileder">Veiledere</option>
                        <option value="artikler">Artikler</option>
                      </select>
                    </div>


                    <div className="form-group">
                      <input
                        type='submit'
                        value="Search"
                        disabled={!(this.state.id)}
                      />
                    </div>
                    {this.state.showSpinner ? <Spinner color="success" /> : null}

                  </form>
              </div>

              <div>
                <HTMLRender data={this.state.response} />
              </div>

              <div>
                <pre>
                  <h4>
                    {this.state.url}
                  </h4>
                </pre>
              </div>
         </div>
    </div>
    )

  }

}

export default FindID;