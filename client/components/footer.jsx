import React from 'react';

export default function Footer(props) {
  return (
    <footer className="d-flex justify-content-around dark-blue">
      <a className="py-3 dark a-footer" href="#review-dashboard">Reviews</a>
      <a className="py-3 dark a-footer" href="#itineraries">Itineraries</a>
      <a className="py-3 dark a-footer" href="#">Visited</a>
    </footer>
  );
}
