import React from 'react';
import NavBar from '../components/navbar';

export default class ParkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      park: [],
      visited: false,
      isLoading: true
    };
    this.handleClick = this.handleClick.bind(this);
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
        return fetch(`/api/visited/${parkCode}`, {
          headers: {
            'X-Access-Token': this.props.token
          }
        })
          .then(response => response.json())
          .then(data => {
            if (data.length) {
              this.setState({
                visited: true
              });
            }
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleClick() {
    const { parkCode } = this.props;
    fetch(`/api/visited/${parkCode}`, {
      method: 'POST',
      headers: {
        'X-Access-Token': this.props.token
      }
    })
      .then(() => {
        this.setState({
          visited: true
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getClass(tab) {
    const tabSelected = this.props.tab;
    const className = tab === tabSelected ? 'nav-link tab active-tab text-center blue' : 'nav-link tab text-center blue';
    return className;
  }

  renderPage() {
    const { description, weatherInfo, images } = this.state.park;
    const tabSelected = this.props.tab;
    if (tabSelected === 'description') {
      return (
      <p className="mx-3 pb-3">{description}</p>
      );
    } else if (tabSelected === 'weather') {
      return (
        <p className="mx-3 pb-3">{weatherInfo}</p>
      );
    } else if (tabSelected === 'photos') {
      if (!images) {
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
    const className = this.state.isLoading ? 'd-none park-buttons' : 'park-buttons';
    const { fullName, states } = this.state.park;
    const path = this.props.path;
    let visited;
    let disabled;
    let classButton;
    if (this.state.visited) {
      visited = '✔ Visited!';
      disabled = true;
      classButton = 'visited-blue text-center border-0 btn-width-sm py-2 rounded';
    } else {
      visited = 'Mark as visited';
      disabled = false;
      classButton = 'dark-blue text-center border-0 btn-width-sm py-2 rounded';
    }
    return (
      <main className="light-blue pb-3">
        <NavBar signOut={this.props.signOut} />
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-between py-3 mx-4 mb-3 form-width overflow-hidden">
            <h3 className="blue title">{fullName}</h3>
            <h3 className="blue title">{states}</h3>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <div className="mx-2 mb-4 d-flex justify-content-between">
            <a href={`#parks/activities?parkCode=${this.props.parkCode}`} className="dark-blue text-center btn-width-sm py-2 rounded">
              Things to do
            </a>
            <a href={`#review-dashboard?parkCode=${this.props.parkCode}`} className="dark-blue text-center btn-width-sm py-2 rounded">
              Reviews
            </a>
            <button type="button" disabled={disabled} onClick={this.handleClick} className={classButton}>
                { visited }
            </button>
          </div>
          <div className="park-details rounded-bottom">
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
