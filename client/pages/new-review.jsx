import React from 'react';

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
    location.hash = '#';
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
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const className = this.state.isLoading
      ? 'park-info d-flex justify-content-center rounded d-none'
      : 'park-info d-flex justify-content-center rounded';
    let parkName;
    if (this.state.parkName) {
      parkName = this.state.parkName;
    }

    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <h3 className="pb-3 text-center blue review-title">New Review</h3>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <form className="d-flex flex-column align-items-center form-width" onSubmit={this.handleSubmit}>
            <label className="form-label py-3">{this.state.parkName}</label>
            <textarea className="form-control mb-4" name="review" onChange={this.handleChange}></textarea>
            <div>
              <button className="btn dark-blue mb-5" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
