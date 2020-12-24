import React from 'react';

function Park(props) {
  const { fullName, states, images } = props.park;
  let element;
  if (images.length) {
    element = <img src={images[0].url} className="parkImg" alt="Park image failed to load "></img>
  } else {
    element = <span className="text-danger">No image found</span>
  }

  return (
    <li className="list-group-item white">
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
      parks: []
    };
  }

  componentDidMount() {
    fetch('/api/parks')
      .then(response => response.json())
      .then(data => {
        this.setState({
          parks: data.data
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render () {
    let display;
    if (this.props.path === 'all-parks') {
      display = 'All Parks';
    }
    return (
      <main className="light">
        <a href="#" data-view=""><i className="fas fa-home size1 medium"></i></a>
        <h3 className="pb-3 text-center blue">{display}</h3>
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
