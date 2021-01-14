import React from 'react';
import NavBar from '../components/navbar';

function Park(props) {
  const { fullName, states, images } = props.park;
  let element;
  if (images.length) {
    element = <img src={images[0].url} className="photos" alt="Park image failed to load"></img>;
  } else {
    element = <span className="text-danger my-2">No image found</span>;
  }

  return (
    <a href={`#parks?parkCode=${props.parkCode}&tab=description`} className="margin-a mb-2">
      <li className="list-group-item park-items rounded">
        <div className="d-flex justify-content-between py-3">
          <span className="blue">{fullName}</span>
          <span className="blue">{states}</span>
        </div>
        <div className="d-flex align-items-center pt-3 pb-4">
          {element}
          <i className="fas fa-chevron-right blue park-icon"></i>
        </div>
      </li>
    </a>
  );
}

export default class ParkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parks: [],
      isLoading: true,
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { stateCode, path } = this.props;
    const url = path === 'all-parks' ? '/api/parks' : `/api/parks/stateCode/${stateCode}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          parks: data.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    });
  }

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue mb-4' : 'spinner-border blue d-none';
    const display = this.props.stateCode ? `Parks in ${this.props.stateCode.toUpperCase()}` : 'All Parks';
    const search = this.state.parks.filter(park => park.fullName.toLowerCase().includes(this.state.search.toLowerCase()));
    return (
      <main className="light-blue">
        <NavBar signOut={this.props.signOut} />
        <h3 className="pb-3 text-center blue">{display}</h3>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <input type="text" value={this.state.search} onChange={this.handleChange} className="blue search rounded" placeholder="Search here"/>
        </div>
        <ul className="list-group">
          {
            search.map(park => {
              return (
                <Park
                  key={park.parkCode}
                  parkCode={park.parkCode}
                  park={park}
                />
              );
            })
          }
        </ul>
      </main>
    );
  }
}
