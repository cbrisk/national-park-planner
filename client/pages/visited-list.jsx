import React from 'react';
import NavBar from '../components/navbar';

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
    const className = this.state.isLoading ? 'park-info py-3 d-none rounded' : 'park-info py-3 rounded';
    let element;
    if (this.state.parksVisited.length) {
      element = this.state.parksVisited.map((park, index) => {
        return (
          <a href={`#parks?parkCode=${park.parkCode}&tab=description`} key={index}>
            <li className="list-group-item itinerary-item d-flex justify-content-between blue py-4" >
              {park.parkName}
              <div className="d-flex align-items-center">
                <i className="fas fa-chevron-right blue"></i>
              </div>
            </li>
          </a>
        );
      });
    } else {
      element = <span className="text-center">No parks have been visited</span>;
    }
    return (
      <main className="light-blue pb-3">
        <NavBar signOut={this.props.signOut} />
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
