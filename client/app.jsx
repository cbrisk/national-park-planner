import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';

renderPage() {
  return <Home />;
}

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        { this.renderPage()}
        <Footer />
      </>
    );
  }
}
