import React from 'react';

export default class ParksReviewedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      parksReviewed: []
    };
  }

  componentDidMount() {
    fetch(`/api/reviews`)
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json()
            .then(data => {
              this.setState({
                parksReviewed: data,
                isLoading: false
              });
            });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const className = this.state.isLoading ? 'park-info py-3 d-none' : 'park-info py-3';
    let element;
    if (this.state.reviews.length) {
      element = this.state.parksReviewed.map((park, index) => {
        return (
          <li className="list-group-item itinerary-item d-flex justify-content-between blue" key={index}>
            {park.parkName}
            <div className="d-flex align-items-center">
              <a href={`#reviews?parkCode=${park.parkCode}`}><i className="fas fa-chevron-right blue"></i></a>
            </div>
          </li>
        );
      });
    } else {
      element = <span className="text-center">No reviews found for any parks</span>;
    }
    return (
      <main className="light-blue pb-3">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="d-flex justify-content-center py-3 mx-4">
          <h3 className="blue itinerary-title">Parks Reviewed</h3>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <div className="mb-4">
            <ul className="list-group">
              { element }
            </ul>
          </div>
        </div>
      </main >
    );
  }
}
