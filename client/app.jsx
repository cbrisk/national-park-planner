import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import ParkList from './pages/park-list';
import StateForm from './pages/state-form';
import ParkDetails from './pages/park-details';
import ParkActivities from './pages/park-activities';
import ItineraryList from './pages/itinerary-list';
import Itinerary from './pages/itinerary';
import ReviewDashboard from './pages/review-dashboard';
import NewReview from './pages/new-review';
import ParkReviews from './pages/park-reviews';
import parseRoute from './lib/parse-route';
import ParksReviewedList from './pages/parks-reviewed-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      stateCode: ''
    };
    this.getStateCode = this.getStateCode.bind(this);
  }

  getStateCode(code) {
    this.setState({
      stateCode: code
    });
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
      return <ParkList path={this.state.route.path}/>;
    } else if (route.path === 'state-form') {
      return <StateForm getState={this.getStateCode} />;
    } else if (route.path === 'parks-by-state') {
      return <ParkList stateCode={this.state.stateCode} path={this.state.route.path}/>;
    } else if (route.path === 'parks/activities') {
      const parkCode = route.params.get('parkCode');
      return <ParkActivities parkCode={parkCode} />;
    } else if (route.path === 'parks') {
      const parkCode = route.params.get('parkCode');
      const tab = route.params.get('tab');
      return <ParkDetails parkCode={parkCode} tab={tab} path={`#parks?parkCode=${parkCode}`}/>;
    } else if (route.path === 'itineraries') {
      return <ItineraryList/>;
    } else if (route.path === 'itinerariesById') {
      const itineraryId = route.params.get('id');
      return <Itinerary itineraryId={itineraryId}/>;
    } else if (route.path === 'review-dashboard') {
      const parkCode = route.params.get('parkCode');
      return <ReviewDashboard parkCode={parkCode} />;
    } else if (route.path === 'new-review') {
      const parkCode = route.params.get('parkCode');
      return <NewReview parkCode={parkCode} />;
    } else if (route.path === 'reviews') {
      const parkCode = route.params.get('parkCode');
      return <ParkReviews parkCode={parkCode} />;
    } else if (route.path === 'parks-reviewed') {
      return <ParksReviewedList/>;
    }
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
