import React from 'react';

export default function NavBar(props) {
  return (
    <div className="d-flex justify-content-between p-3">
      <a href="#"><i className="fas fa-home home-icon medium-blue"></i></a>
      <i className="fas fa-sign-out-alt home-icon medium-blue" onClick={props.signOut}></i>
    </div>
  );
}
