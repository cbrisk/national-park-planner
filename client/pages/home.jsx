import React from 'react';

export default function Home(props) {
  return (
    <>
      <main className="home">
        <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
        <div className="d-flex flex-column align-items-center">
          <h3 className="my-4 medium-blue">
            Welcome
          </h3>
          <h4 className="margin-bottom medium-blue">
            Start planning your visit now!
          </h4>
          <button type="button" className="btn mb-5 dark-blue btn-padding">
            <a href='#all-parks'>
              View all National Parks
            </a>
          </button>
          <button type="button" className="btn margin-bottom dark-blue">
            <a href='#state-form'>
              View National Parks by State
            </a>
          </button>
        </div>
      </main>
    </>
  );
}
