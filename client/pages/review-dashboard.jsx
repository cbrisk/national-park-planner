import React from 'react';

export default function ReviewDashboard(props) {
  return (
    <main className="light-blue pb-3">
      <a href="#"><i className="fas fa-home home-icon medium-blue m-3"></i></a>
      <div className="mt-3 mb-5 text-center">
        <h3 className="blue review-title">Review Dashboard</h3>
      </div>
      <div className='park-info py-3'>
        <div className="d-flex flex-column align-items-center">
          <button type="button" className="btn dark-blue">
            <a href='new-review'>
              Write a new Review
                </a>
          </button>
        </div>
      </div>
    </main>
  );
}
