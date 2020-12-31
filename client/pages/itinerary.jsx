import React from 'react';

function ItineraryItem(props) {
  const { itineraryItemId, thingToDo, completed } = props.activity;

  const handleChange = event => {
    const { checked } = event.target;
    props.onCheck({ thingToDo , checked });
  };

  // handleChange(itineraryItemId) {
  //   const index = this.state.todos.findIndex(todo => todo.todoId === todoId);
  //   const isCompleted = this.state.todos[index].isCompleted;
  //   const newStatus = { isCompleted: !isCompleted };

  //   fetch(`api/todos/${todoId}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newStatus)
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       const copyTodos = this.state.todos.slice();
  //       copyTodos[index] = data;
  //       this.setState({
  //         todos: copyTodos
  //       });
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  }

  return (
    <li className="list-group-item">
      <div className="form-check">
        <input
          id={itineraryItemId}
          type="checkbox"
          name={thingToDo}
          checked={isCompleted}
          className="form-check-input"
          onChange={handleChange(itineraryItemId)} />
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
    const userId = 1;
    fetch(`/api/parks/itinerariesById/${userId}`)
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
    let element;
    if (this.state.itinerary.length) {
      const activities = this.state.itinerary;
      fullName = this.state.itinerary[0].parkName;
      element = activities.map(activity => {
        return (
          <ItineraryItem
            key={activity.itineraryItemId}
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
          <ul>
            {element}
          </ul>
        </div>
      </main>
    );
  }
}
