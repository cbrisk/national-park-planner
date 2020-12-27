import React from 'react';

export default function Footer(props) {
  return (
    <footer className="d-flex justify-content-around dark-blue">
      <a className="py-3 dark a-footer" href="#" data-view="">Reviews</a>
      <a className="py-3 dark a-footer" href="#" data-view="">Itineraries</a>
      <a className="py-3 dark a-footer" href="#" data-view="">Visited</a>
    </footer>
  );
}
