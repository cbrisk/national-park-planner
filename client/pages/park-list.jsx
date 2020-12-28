import React from 'react';

function Park(props) {
  const { fullName, states, images } = props.park;
  let element;
  if (images.length) {
    element = <img src={images[0].url} className="park-img" alt="Park image failed to load "></img>;
  } else {
    element = <span className="text-danger my-2">No image found</span>;
  }

  return (
    <li className="list-group-item park-items">
      <div className="d-flex justify-content-between py-3">
        <span className="blue">{fullName}</span>
        <span className="blue">{states}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        {element}
        <i className="fas fa-chevron-right blue"></i>
      </div>
    </li>
  );
}

export default class ParkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parks: [],
      spinner: 'spinner-border medium-blue',
      display: ''
    };
  }

  componentDidMount() {
    const { stateCode, path } = this.props;
    let url;
    if (path === 'all-parks') {
      url = '/api/parks';
    } else if (path === 'parks-by-state') {
      url = `/api/parks/${stateCode}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          parks: data.data,
          spinner: 'spinner-border medium-blue d-none'
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    if (stateCode) {
      this.setState({
        display: `Parks in ${stateCode.toUpperCase()}`
      });
    } else {
      this.setState({
        display: 'All Parks'
      });
    }
  }

  render() {
    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <h3 className="pb-3 text-center blue">{this.state.display}</h3>
        <div className="d-flex justify-content-center">
          <div className={this.state.spinner} role="status"></div>
        </div>
        <ul className="list-group">
          {
            this.state.parks.map(park => {
              return (
                <Park
                  key={park.parkCode}
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
