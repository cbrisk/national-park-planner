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
          <a href='#all-parks' className="mb-5 text-center dark-blue btn-width p-2 rounded">
            View all National Parks
          </a>
          <a href='#state-form' className="mb-5 text-center dark-blue btn-width p-2 rounded">
            View National Parks by State
          </a>
        </div>
      </main>
    </>
  );
}
