import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import ParkList from './pages/park-list';
import StateForm from './pages/state-form';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    } else if (route.path === 'all-parks') {
      return <ParkList display='All Parks'/>;
    } else if (route.path === 'state-form') {
      return <StateForm/>
    } //else if (route.path === 'parks-by-state') {
      //return <ParkList display='' />;
    //}
  }

  render() {
    return (
      <div className="custom-container">
        <Header />
        { this.renderPage() }
        <Footer />
      </div>
    );
  }
}
