import React from 'react';

function Activity(props) {
  const { name, id } = props.activity;

  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value={activity.name} id={activity.id}></input>
      <label class="form-check-label" htmlFor={activity.id}>
        {activity.name}
      </label>
    </div>
  );
}

export default class ParkActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      park: '',
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

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const className = this.state.isLoading ? "park-info d-none" : "park-info";
    const { activities, fullName } = this.state.park;
    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="m-3 text-center">
          <h3 className="blue title">{fullName}</h3>
          <h5 className="blue">Things to do</h5>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <h4>Add to Itinerary:</h4>
          <form>
            {
              activities.map(activity => {
                return (
                  <Activity
                    key={activity.id}
                    activity={activity}
                  />
                );
              })
            }
          </form>
        </div>
      </main>
    );
  }
}
