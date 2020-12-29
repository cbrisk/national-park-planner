import React from 'react';

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
    <div>
      <p date-view="description"></p>
      <p date-view="weather"></p>
      <ul date-view="images">
        {
          images.map((image, index) => {
            return (
              <li key={index}>
                <img src={image.url} alt="Park image failed to load"/>
              </li>
            );
          })
        }
      </ul>
    </div>
  }

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const { description, weatherInfo, images, fullName, states } = this.state.park;
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
        <div className="park-info rounded">
          <div className="d-flex justify-content-center my-4">
            <a className="nav-link tab active" href={`${this.state.path}?tab=description`}>Description</a>
            <a className="nav-link tab" href={`${this.state.path}?tab=weather`}>Weather</a>
            <a className="nav-link tab" href={`${this.state.path}?tab=photos`}>Photos</a>
          </div>
        </div>
      </main>
    );
  }
}
