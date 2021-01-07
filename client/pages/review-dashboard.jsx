import React from 'react';
import NavBar from '../components/navbar';

export default class ReviewDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkName: '',
      isLoading: true
    };
  }

  componentDidMount() {
    const { parkCode } = this.props;
    fetch(`/api/parks/parkCode/${parkCode}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          parkName: data.fullName,
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const spinner = this.state.isLoading ? 'spinner-border blue' : 'spinner-border blue d-none';
    const className = this.state.isLoading
      ? 'div-height d-flex flex-column px-3 py-4 d-none'
      : 'div-height d-flex flex-column px-3 py-4';
    let parkName;
    if (this.state.parkName) {
      parkName = this.state.parkName;
    }

    return (
      <main className="light-blue pb-3">
        <NavBar signOut={this.props.signOut}/>
        <div className="mt-3 mb-5 text-center">
          <h3 className="blue review-title">{parkName}</h3>
          <h5 className="blue">Review Dashboard</h5>
        </div>
        <div className="d-flex justify-content-center">
          <div className={spinner} role="status"></div>
        </div>
        <div className={className}>
          <div className="d-flex flex-column align-items-center justify-content-around div-height">
            <a href={`#new-review?parkCode=${this.props.parkCode}`} className="py-2 dark-blue margin-bottom btn-width rounded text-center">
              Write a new Review
            </a>
            <a href={`#reviews?parkCode=${this.props.parkCode}`} className="py-2 dark-blue btn-width rounded text-center">
              View Reviews
            </a>
          </div>
        </div>
      </main>
    );
  }
}
