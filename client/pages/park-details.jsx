import React from 'react';

export default class ParkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      park: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const { parkCode } = this.props;
    fetch(`/api/parks/parkCode/${parkCode}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          park: data,
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getClass(tab) {
    const tabSelected = this.props.tab;
    const className = tab === tabSelected ? 'nav-link tab active-tab text-center' : 'nav-link tab text-center';
    return className;
  }

  renderPage() {
    const { description, weatherInfo, images } = this.state.park;
    const tabSelected = this.props.tab;
    if (tabSelected === 'description') {
      return (
      <p className="mx-3">{description}</p>
      );
    } else if (tabSelected === 'weather') {
      return (
        <p className="mx-3">{weatherInfo}</p>
      );
    } else if (tabSelected === 'photos') {
      if (!images.length) {
        return <span className="text-danger my-2">No image found</span>;
      }
      return (
        <ul className="px-0">
          {
            images.map((image, index) => {
              return (
                <li key={index} className="pb-3">
                  <img src={image.url} className="photos" alt="Park image failed to load" />
                </li>
              );
            })
          }
        </ul>
      );
    }
  }

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const className = this.state.isLoading ? 'd-none' : '';
    const { fullName, states } = this.state.park;
    const path = this.props.path;
    return (
      <main className="light-blue pb-3">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="d-flex justify-content-between py-3 mx-4 mb-3">
          <h3 className="blue title">{fullName}</h3>
          <h3 className="blue title">{states}</h3>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <div className="mx-4 mb-4 d-flex justify-content-between">
            <button type="button" className="btn dark-blue btn-width-sm">
              <a href={`#parks/activities?parkCode=${this.props.parkCode}`}>
                Things to do
              </a>
            </button>
            <button type="button" className="btn dark-blue btn-width-sm">
              <a href={`#review-dashboard?parkCode=${this.props.parkCode}`}>
                Reviews
              </a>
            </button>
          </div>
          <div className="park-details">
            <div className="d-flex justify-content-center mb-4">
              <a className={this.getClass('description')} href={`${path}&tab=description`}>Description</a>
              <a className={this.getClass('weather')} href={`${path}&tab=weather`}>Weather</a>
              <a className={this.getClass('photos')} href={`${path}&tab=photos`}>Photos</a>
            </div>
            {this.renderPage()}
          </div>
        </div>
      </main>
    );
  }
}
