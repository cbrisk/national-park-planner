import React from 'react';
import Redirect from '../components/redirect';

export default function Home(props) {

  if (!props.token) return <Redirect to="sign-up" />;
  return (
    <>
      <main className="home">
        <div className="d-flex justify-content-between p-3">
          <a href="#"><i className="fas fa-home home-icon medium-blue"></i></a>
          <i className="fas fa-sign-out-alt home-icon medium-blue" onClick={props.signOut}></i>
        </div>
        <div className="d-flex flex-column align-items-center">
          <h3 className="my-4 medium-blue">
            Welcome
          </h3>
          <h4 className="margin-bottom medium-blue">
            Start planning your visit now!
          </h4>
          <button type="button" className="btn mb-5 dark-blue btn-padding btn-width">
            <a href='#all-parks'>
              View all National Parks
            </a>
          </button>
          <button type="button" className="btn margin-bottom dark-blue btn-width">
            <a href='#state-form'>
              View National Parks by State
            </a>
          </button>
        </div>
      </main>
    </>
  );
}
