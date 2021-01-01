import React from 'react';

export default class ParkReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      parkName: '',
      isLoading: true
    };
  }

  componentDidMount() {
    const { parkCode } = this.props;
    fetch(``)
      .then(response => response.json())
      .then(data => {
        this.setState({
          reviews: data,
          parkName: data,
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

    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <h3 className="pb-3 text-center blue">{}</h3>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <div className="mb-4">
            <ul className="list-group">
              {
                this.state.itineraries.map((park, index) => {
                  return (
                    <li className="list-group-item itinerary-item d-flex justify-content-between blue" key={index}>
                      {park.parkName}
                      <div className="d-flex align-items-center">
                        <a href={`#itinerariesById?id=${park.itineraryId}`}><i className="fas fa-chevron-right blue"></i></a>
                      </div>
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
