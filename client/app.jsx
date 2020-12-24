import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import ParkList from './pages/park-list';
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
      return <Home />
    } else if (route.path === 'all-parks') {
      return <ParkList/>
    }
  }

  render() {
    return (
      <>
        <Header />
        { this.renderPage() }
        <Footer />
      </>
    );
  }
}
