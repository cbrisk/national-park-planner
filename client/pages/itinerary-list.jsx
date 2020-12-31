import React from 'react';

export default class ItineraryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      itineraries: []
    };
  }

  componentDidMount() {
    const userId = 1;
    fetch(`/api/parks/itineraries/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          itineraries: data
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render () {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const className = this.state.isLoading ? 'park-info py-3 d-none' : 'park-info py-3';
    return (
      <main className="light-blue pb-3">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="d-flex justify-content-center py-3 mx-4 mb-3">
          <h3 className="blue itinerary-title">Itineraries</h3>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <div className="mb-4">
            <ul className="list-group">
              {
                this.state.itineraries.map((park, index) => {
                  return (
                    <li className="list-group-item itinerary-item d-flex justify-content-between" key={index}>
                      {park.parkName}
                      <a href={`#itinerariesById?id=${park.itineraryId}`}><i className="fas fa-chevron-right blue"></i></a>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
      </main >
    );
  }
}
