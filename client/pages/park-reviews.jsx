import React from 'react';
import NavBar from '../components/navbar';

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
    let element;
    if (this.state.reviews.length) {
      parkName = this.state.reviews[0].parkName;
      element = this.state.reviews.map((review, index) => {
        return (
          <li className="list-group-item itinerary-item" key={index}>
            <h5 className="medium-blue">{review.userFullName}</h5>
            <p>{review.content}</p>
          </li>
        );
      });
    } else {
      element = <span className="text-center">No reviews found for this park</span>;
    }

    return (
      <main className="light-blue">
        <NavBar signOut={this.props.signOut} />
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
              { element }
            </ul>
          </div>
        </div>
      </main>
    );
  }
}
