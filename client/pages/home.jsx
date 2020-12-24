import React from 'react';

export default function Home(props) {
  return (
    <>
      <main className="home">
        <a href="#" data-view=""><i className="fas fa-home size1"></i></a>
        <div className="d-flex flex-column align-items-center">
          <h3 className="my-4 medium">
            Welcome
          </h3>
          <h4 className="margin medium">
            Start planning your visit now!
          </h4>
          <button type="button" className="btn mb-5 dark padding">
            <a href='#all-parks'>
              View all National Parks
            </a>
          </button>
          <button type="button" className="btn margin dark">
            View National Parks by State
          </button>
        </div>
      </main>
    </>
  );
}
