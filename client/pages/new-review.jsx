import React from 'react';
import NavBar from '../components/navbar';

export default class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      parkName: '',
      isLoading: true
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
    const body = { parkCode: this.props.parkCode, content: this.state.value };
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.token
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
    const { parkCode } = this.props;
    fetch(`/api/parks/parkCode/${parkCode}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          parkName: data.fullName,
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const spinner = this.state.isLoading ? 'spinner-border mb-3 blue' : 'spinner-border mb-3 blue d-none';
    const className = this.state.isLoading
      ? 'park-info d-flex justify-content-center rounded d-none'
      : 'park-info d-flex justify-content-center rounded';

    return (
      <main className="light-blue">
        <NavBar signOut={this.props.signOut} />
        <h3 className="pb-3 text-center blue review-title">New Review</h3>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <form className="d-flex flex-column align-items-center form-width" onSubmit={this.handleSubmit}>
            <label className="form-label py-3">{this.state.parkName}</label>
            <textarea required className="form-control mb-4" name="review" placeholder="Type review here" onChange={this.handleChange}></textarea>
            <div>
              <button className="py-2 text-center border-0 rounded dark-blue mb-5" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
