import React from 'react';

export default class ReviewDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkName: '',
      isLoading: true
    }
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
    const className = this.state.isLoading ? 'park-info px-3 py-4 d-none' : 'park-info px-3 py-4';
    let parkName;
    if (this.state.parkName) {
      parkName = this.state.parkName;
    }

    return (
      <main className="light-blue pb-3">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="mt-3 mb-5 text-center">
          <h3 className="blue review-title">{parkName}</h3>
          <h5 className="blue">Review Dashboard</h5>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <div className="d-flex flex-column align-items-center">
            <button type="button" className="btn dark-blue">
              <a href={`#new-review?parkCode=${this.props.parkCode}`}>
                Write a new Review
              </a>
            </button>
          </div>
        </div>
      </main>
    );
  }
}
