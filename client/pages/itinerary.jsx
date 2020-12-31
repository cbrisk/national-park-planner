import React from 'react';

function ItineraryItem(props) {
  const { itineraryItemId, thingToDo, completed } = props.activity;

  return (
    <li className="list-group-item border-0 py-1">
      <div className="form-check">
        <input
          id={itineraryItemId}
          type="checkbox"
          name={thingToDo}
          defaultChecked={completed}
          className="form-check-input"/>
        <label className="form-check-label" htmlFor={itineraryItemId}>
          {thingToDo}
        </label>
      </div>
    </li>
  );
}

export default class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      itinerary: []
    };
  }

  componentDidMount() {
    const { itineraryId } = this.props;
    fetch(`/api/parks/itinerariesById/${itineraryId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          itinerary: data
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const className = this.state.isLoading ? 'park-info py-3 d-none' : 'park-info py-3';
    let parkName;
    const activities = this.state.itinerary;
    if (this.state.itinerary.length) {
      parkName = this.state.itinerary[0].parkName;
    }

    return (
      <main className="light-blue pb-3">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="m-3 text-center">
          <h3 className="blue title">{parkName}</h3>
          <h5 className="blue">Itinerary</h5>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <ul className="px-0">
            {
              activities.map(activity => {
                return (
                  <ItineraryItem
                    key={activity.itineraryItemId}
                    activity={activity}
                  />
                );
              })
            }
          </ul>
        </div>
      </main>
    );
  }
}
