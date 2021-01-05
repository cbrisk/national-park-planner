import React from 'react';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(() => {
        location.hash = `#reviews?parkCode=${this.props.parkCode}`;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  componentDidMount() {
    window.location.hash =
  }

  render() {
    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <h3 className="pb-3 text-center blue">Parks by State</h3>
        <div className="state-form d-flex justify-content-center rounded">
          <form className="d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>

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
