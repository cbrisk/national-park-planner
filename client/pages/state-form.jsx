import React from 'react';

export default class StateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    location.hash = `#parks-by-state?stateCode=${this.state.value}`;
  }

  render() {
    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <h3 className="pb-3 text-center blue">Parks by State</h3>
        <div className="state-form d-flex justify-content-center rounded">
          <form className="d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
            <select required value={this.state.value} className="form-select my-5 medium-blue select-state" onChange={this.handleChange}>
              <option value="" disabled>Choose a State</option>
              <option value="al">AL</option>
              <option value="ak">AK</option>
              <option value="az">AZ</option>
              <option value="ar">AR</option>
              <option value="ca">CA</option>
              <option value="co">CO</option>
              <option value="ct">CT</option>
              <option value="de">DE</option>
              <option value="fl">FL</option>
              <option value="ga">GA</option>
              <option value="hi">HI</option>
              <option value="id">ID</option>
              <option value="il">IL</option>
              <option value="in">IN</option>
              <option value="ia">IA</option>
              <option value="ks">KS</option>
              <option value="ky">KY</option>
              <option value="la">LA</option>
              <option value="me">ME</option>
              <option value="md">MD</option>
              <option value="ma">MA</option>
              <option value="mi">MI</option>
              <option value="mn">MN</option>
              <option value="ms">MS</option>
              <option value="mo">MO</option>
              <option value="mt">MT</option>
              <option value="ne">NE</option>
              <option value="nv">NV</option>
              <option value="nh">NH</option>
              <option value="nj">NJ</option>
              <option value="nm">NM</option>
              <option value="ny">NY</option>
              <option value="nc">NC</option>
              <option value="nd">ND</option>
              <option value="oh">OH</option>
              <option value="ok">OK</option>
              <option value="or">OR</option>
              <option value="pa">PA</option>
              <option value="ri">RI</option>
              <option value="sc">SC</option>
              <option value="sd">SD</option>
              <option value="tn">TN</option>
              <option value="tx">TX</option>
              <option value="ut">UT</option>
              <option value="vt">VT</option>
              <option value="va">VA</option>
              <option value="wa">WA</option>
              <option value="wv">WV</option>
              <option value="wi">WI</option>
              <option value="wy">WY</option>
            </select>
            <div>
              <button className="btn dark-blue mb-5" type="submit">
                View Parks
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
