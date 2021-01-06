import React from 'react';
import NavBar from '../components/navbar';
import Redirect from '../components/redirect';

export default function Home(props) {

  if (!props.token) return <Redirect to="sign-up" />;
  return (
    <>
      <main className="home">
        <NavBar signOut={props.signOut}/>
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
