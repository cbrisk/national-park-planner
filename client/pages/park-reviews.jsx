import React from 'react';

export default class ParkReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const { parkCode } = this.props;
    fetch(`api/reviews/${parkCode}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          reviews: data,
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const className = this.state.isLoading ? 'park-info py-3 d-none' : 'park-info py-3';
    let parkName;
    if (this.state.reviews.length) {
      parkName = this.state.reviews[0].parkName;
    }
    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="m-3 text-center">
          <h3 className="blue title">{parkName}</h3>
          <h5 className="blue">Reviews</h5>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <div className="mb-4">
            <ul className="list-group">
              {
                this.state.reviews.map((review, index) => {
                  return (
                    <li className="list-group-item itinerary-item" key={index}>
                      <h5 className="medium-blue">{review.name}</h5>
                      <p>{review.content}</p>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
      </main>
    );
  }
}
