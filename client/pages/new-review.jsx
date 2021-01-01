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
    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <h3 className="pb-3 text-center blue">New Review</h3>
        <div className="state-form d-flex justify-content-center rounded">
          <form className="d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
            <label className="form-label">{this.state.parkName}</label>
            <textarea className="form-control" name="review"></textarea>
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
