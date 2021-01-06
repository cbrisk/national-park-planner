import React from 'react';
import Redirect from '../components/redirect';

export default class SignUp extends React.Component {
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
    fetch('/api/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(data => {
        const { token } = data;
        this.props.updateUser(token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    if (this.props.token) return <Redirect to="" />;
    return (
      <main className="light-blue">
        <h3 className="py-3 text-center blue">Register</h3>
        <div className="state-form d-flex justify-content-center rounded">
          <form className="d-flex flex-column align-items-center pt-3" onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input required id="name" type="text" name="name" onChange={this.handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input required id="username" type="text" name="username" onChange={this.handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input required id="password" type="password" name="password" onChange={this.handleChange} className="form-control" />
            </div>
            <div>
              <button className="btn dark-blue mb-2" type="submit">
                Register
              </button>
            </div>
            <div className="pb-4">
              <a href="#sign-in" className="text-decoration-none text-primary">Already have an account? Sign In</a>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
