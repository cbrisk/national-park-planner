import React from 'react';

function Park(props) {
  const { fullName, states, images } = props.park;
  console.log(images);
  let element;
  if (images.length) {
    element = <img src={images[0].url} className="parkImg"></img>
  } else {
    element = <span>No image found</span>
  }

  return (
    <li className="list-group-item white">
      <div className="d-flex justify-content-between">
        <span>{fullName}</span>
        <span>{states}</span>
      </div>
      <div>
        {element}
        <i className="fas fa-chevron-right size2"></i>
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
          parks: data.data,
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render () {
    return (
      <main className="other">
        <h3></h3>
        <ul className="list-group">
          {
            this.state.parks.map(park => {
              return (
                <Park
                  key={park.id}
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
