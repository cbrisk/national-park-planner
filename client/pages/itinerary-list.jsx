import React from 'react';

export default class ItineraryList extends React.Component {



  render () {
    return (
      <main className="light-blue pb-3">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="d-flex justify-content-between py-3 mx-4 mb-3">
          <h3 className="blue title">{fullName}</h3>
          <h3 className="blue title">{states}</h3>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className="park-info">
          <div className="d-flex justify-content-center mb-4">

          </div>
        </div>
      </main >
    );
  }
}
