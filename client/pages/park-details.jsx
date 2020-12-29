import React from 'react';

export default class ParkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      park: null,
      isLoading: true
    };
  }

  componentDidMount() {
    const { parkCode } = this.props;
    fetch(`/api/parks/${parkCode}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          park: data.data[0],
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const { description, weatherInfo, images, fullName, states } = this.props.park;
    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="d-flex justify-content-between py-3">
          <h3 className="blue">{fullName}</h3>
          <h3 className="blue">{states}</h3>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="messages-tab" data-bs-toggle="tab" href="#messages" role="tab" aria-controls="messages" aria-selected="false">Messages</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="settings-tab" data-bs-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false">Settings</a>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
          <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
          <div class="tab-pane" id="messages" role="tabpanel" aria-labelledby="messages-tab">...</div>
          <div class="tab-pane" id="settings" role="tabpanel" aria-labelledby="settings-tab">...</div>
        </div>
      </main>
    );
  }
}
