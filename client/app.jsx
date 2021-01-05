import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import parseRoute from './lib/parse-route';
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
import ParksReviewedList from './pages/parks-reviewed-list';
import VisitedList from './pages/visited-list';
import SignUp from './pages/sign-up';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null
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
      return <Home user={this.state.user}/>;
    } else if (route.path === 'sign-up') {
      return <SignUp/>;
    } else if (route.path === 'all-parks') {
      return <ParkList path={this.state.route.path}/>;
    } else if (route.path === 'state-form') {
      return <StateForm />;
    } else if (route.path === 'parks-by-state') {
      const stateCode = route.params.get('stateCode');
      return <ParkList stateCode={stateCode} path={this.state.route.path}/>;
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
    } else if (route.path === 'parks-visited') {
      return <VisitedList/>;
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
