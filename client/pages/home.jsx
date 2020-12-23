import React from 'react';

export default function Home(props) {
  return (
    <>
      <main className="bgimage">
        <div className="d-flex flex-column align-items-center">
          <h3 className="my-2">
            Welcome
          </h3>
          <h4 className="mb-5">
            Start planning your visit now!
          </h4>
          <button type="button" className="btn mb-3 dark">>
            View all National Parks
          </button>
          <button type="button" className="btn mb-3 dark">>
            View National Parks by State
          </button>
        </div>
      </main>
    </>
  );
}
