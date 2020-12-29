import React from 'react';

function Park(props) {
  const { fullName, states, images } = props.park;
  let element;
  if (images.length) {
    element = <img src={images[0].url} className="park-img" alt="Park image failed to load"></img>;
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
        <a href={`#parks?parkCode=${props.parkCode}`}><i className="fas fa-chevron-right blue"></i></a>
      </div>
    </li>
  );
}

export default class ParkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parks: [],
      isLoading: true
    };
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

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const display = this.props.stateCode ? `Parks in ${this.props.stateCode.toUpperCase()}` : 'All Parks';
    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <h3 className="pb-3 text-center blue">{display}</h3>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <ul className="list-group">
          {
            this.state.parks.map(park => {
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
