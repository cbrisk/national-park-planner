import React from 'react';

export default function Footer(props) {
  const className = props.token ? 'py-3 dark-blue a-footer' : 'py-3 dark-blue a-footer hidden';

  return (
    <footer className="d-flex justify-content-around dark-blue">
      <a className={className} href="#parks-reviewed">Reviews</a>
      <a className={className} href="#itineraries">Itineraries</a>
      <a className={className} href="#parks-visited">Visited</a>
    </footer>
  );
}
