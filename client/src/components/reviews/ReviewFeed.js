import React, { Component } from "react";
import PropTypes from "prop-types";
import ReviewItem from "./ReviewItem";

class ReviewFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      reviewsPerPage: 5
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  render() {
    const { reviews } = this.props;
    const { currentPage, reviewsPerPage } = this.state;

    const indexOfLastreview = currentPage * reviewsPerPage;
    const indexOfFirstreview = indexOfLastreview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstreview, indexOfLastreview);

    const renderReviews = currentReviews.map(review => {
      return <ReviewItem key={review._id} review={review} />;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className="page-item page-link"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        {renderReviews}

        <ul className="pagination" id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}

ReviewFeed.propTypes = {
  reviews: PropTypes.array.isRequired
};
export default ReviewFeed;
