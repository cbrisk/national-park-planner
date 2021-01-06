import React from 'react';

export default class VisitedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      parksVisited: []
    };
  }

  componentDidMount() {
    fetch('/api/visited', {
      headers: {
        'X-Access-Token': this.props.token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          parksVisited: data,
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
    let element;
    if (this.state.parksVisited.length) {
      element = this.state.parksVisited.map((park, index) => {
        return (
          <li className="list-group-item itinerary-item d-flex justify-content-between blue" key={index}>
            {park.parkName}
            <div className="d-flex align-items-center">
              <a href={`#parks?parkCode=${park.parkCode}&tab=description`}><i className="fas fa-chevron-right blue"></i></a>
            </div>
          </li>
        );
      });
    } else {
      element = <span className="text-center">No parks have been visited</span>;
    }
    return (
      <main className="light-blue pb-3">
        <div className="d-flex justify-content-between p-3">
          <a href="#"><i className="fas fa-home home-icon medium-blue"></i></a>
          <i className="fas fa-sign-out-alt home-icon medium-blue" onClick={this.props.signOut}></i>
        </div>
        <div className="d-flex justify-content-center py-3 mx-4">
          <h3 className="blue itinerary-title">Parks Visited</h3>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <div className="mb-4">
            <ul className="list-group">
              {element}
            </ul>
          </div>
        </div>
      </main >
    );
  }
}
