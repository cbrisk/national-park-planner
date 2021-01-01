import React from 'react';

function Activity(props) {
  const { name, id } = props.activity;

  const handleChange = event => {
    const { checked } = event.target;
    props.onCheck({ name, checked });
  };
  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value={name} id={id} onChange={handleChange}></input>
      <label className="form-check-label" htmlFor={id}>
        {name}
      </label>
    </div>
  );
}

export default class ParkActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      park: null,
      isLoading: true,
      itinerary: []
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCheck(activity) {
    const itinerary = activity.checked
      ? this.state.itinerary.concat(activity.name)
      : this.state.itinerary.filter(activity => activity !== activity.name);
    this.setState({
      itinerary: itinerary
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = { itinerary: this.state.itinerary, parkCode: this.props.parkCode, userId: 1 };
    fetch('/api/parks/itineraries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .catch(error => {
        console.error('Error:', error);
      });
    location.hash = '#itineraries';
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

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const className = this.state.isLoading ? 'park-info px-3 py-4 d-none' : 'park-info px-3 py-4';
    let fullName;
    let element;
    if (this.state.park) {
      const activities = this.state.park.activities;
      fullName = this.state.park.fullName;
      element = activities.map(activity => {
        return (
          <Activity
            key={activity.id}
            activity={activity}
            onCheck={this.handleCheck}
          />
        );
      });
    }

    return (
      <main className="light-blue pb-3">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="m-3 text-center">
          <h3 className="blue title">{fullName}</h3>
          <h5 className="blue">Things to do</h5>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <h6>Add to Itinerary:</h6>
          <form onSubmit={this.handleSubmit}>
            {element}
            <div className="d-flex justify-content-center">
              <button className="btn dark-blue my-3" type="submit">
                Create Itinerary
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
