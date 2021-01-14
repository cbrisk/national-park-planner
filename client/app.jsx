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
import SignIn from './pages/sign-in';
import Redirect from './components/redirect';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      token: null,
      isAuthorizing: true
    };
    this.updateUser = this.updateUser.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    const localStorage = window.localStorage.getItem('jwt');
    const token = localStorage || null;
    this.setState({
      token,
      isAuthorizing: false
    });
    window.addEventListener('hashchange', event => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  updateUser(token) {
    window.localStorage.setItem('jwt', token);
    this.setState({
      token
    });
  }

  signOut() {
    window.localStorage.removeItem('jwt');
    this.setState({
      token: null
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home token={this.state.token} signOut={this.signOut}/>;
    } else if (route.path === 'sign-up') {
      return <SignUp token={this.state.token} updateUser={this.updateUser}/>;
    } else if (route.path === 'sign-in') {
      return <SignIn token={this.state.token} updateUser={this.updateUser} />;
    } else if (!this.state.token) {
      return <Redirect to="sign-in" />;
    } else if (route.path === 'all-parks') {
      return <ParkList path={this.state.route.path} signOut={this.signOut}/>;
    } else if (route.path === 'state-form') {
      return <StateForm signOut={this.signOut}/>;
    } else if (route.path === 'parks-by-state') {
      const stateCode = route.params.get('stateCode');
      return <ParkList stateCode={stateCode} path={this.state.route.path} signOut={this.signOut}/>;
    } else if (route.path === 'parks/activities') {
      const parkCode = route.params.get('parkCode');
      return <ParkActivities token={this.state.token} parkCode={parkCode} signOut={this.signOut}/>;
    } else if (route.path === 'parks') {
      const parkCode = route.params.get('parkCode');
      const tab = route.params.get('tab');
      return <ParkDetails token={this.state.token} parkCode={parkCode} tab={tab} path={`#parks?parkCode=${parkCode}`} signOut={this.signOut}/>;
    } else if (route.path === 'itineraries') {
      return <ItineraryList token={this.state.token} signOut={this.signOut}/>;
    } else if (route.path === 'itinerariesById') {
      const itineraryId = route.params.get('id');
      return <Itinerary token={this.state.token} itineraryId={itineraryId} signOut={this.signOut}/>;
    } else if (route.path === 'review-dashboard') {
      const parkCode = route.params.get('parkCode');
      return <ReviewDashboard parkCode={parkCode} signOut={this.signOut}/>;
    } else if (route.path === 'new-review') {
      const parkCode = route.params.get('parkCode');
      return <NewReview token={this.state.token} parkCode={parkCode} signOut={this.signOut}/>;
    } else if (route.path === 'reviews') {
      const parkCode = route.params.get('parkCode');
      return <ParkReviews parkCode={parkCode} signOut={this.signOut}/>;
    } else if (route.path === 'parks-reviewed') {
      return <ParksReviewedList signOut={this.signOut}/>;
    } else if (route.path === 'parks-visited') {
      return <VisitedList token={this.state.token} signOut={this.signOut}/>;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    return (
      <div className="custom-container">
        <Header />
        { this.renderPage() }
        <Footer token={this.state.token}/>
      </div>
    );
  }
}
