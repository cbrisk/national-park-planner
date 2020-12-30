import React from 'react';

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
    const { activities } = this.state.park;
    return (
      <main className="light-blue">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="d-flex justify-content-between py-3 mx-4 mb-3">
          <h3 className="blue title">{fullName}</h3>
          <h3 className="blue title">{states}</h3>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>

        </div>
      );
  }
}
