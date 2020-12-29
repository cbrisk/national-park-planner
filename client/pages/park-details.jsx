import React from 'react';
import parseRoute from '../lib/parse-route';

export default class ParkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      park: '',
      isLoading: true,
      path: ''
    };
  }

  componentDidMount() {
    const { parkCode } = this.props;
    fetch(`/api/parks/parkCode/${parkCode}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          park: data.data[0],
          isLoading: false,
          path: window.location.hash
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  renderPage() {
    const { description, weatherInfo, images } = this.state.park;
    const { route } = this.props;
    if (route.params.get('tab') === 'description') {
      return (
      <p className="mx-3">{description}</p>
      );
    } else if (route.params.get('tab') === 'weather') {
      return (
        <p className="mx-3">{weatherInfo}</p>
      );
    } else if (route.params.get('tab') === 'photos' && images.length) {
      return (
        <ul>
          {
            images.map((image, index) => {
              return (
                <li key={index} className="pb-3">
                  <img src={image.url} className="park-img" alt="Park image failed to load" />
                </li>
              );
            })
          }
        </ul>
      );
    } else if (route.params.get('tab') === 'photos' && !images.length) {
      return <span className="text-danger my-2">No image found</span>
    }
  }

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const className = this.state.isLoading ? "park-info rounded d-none" : "park-info rounded";
    const { fullName, states } = this.state.park;
    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="d-flex justify-content-between py-3 mx-3">
          <h3 className="blue title">{fullName}</h3>
          <h3 className="blue title">{states}</h3>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <div className="d-flex justify-content-center my-4">
            <a className="nav-link tab active" href={`${this.state.path}&tab=description`}>Description</a>
            <a className="nav-link tab" href={`${this.state.path}&tab=weather`}>Weather</a>
            <a className="nav-link tab" href={`${this.state.path}&tab=photos`}>Photos</a>
          </div>
          {this.renderPage()}
        </div>

      </main>
    );
  }
}
