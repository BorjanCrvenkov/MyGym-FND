import BusinessDisplayReviewsService from "../../service/business/BusinessDisplayReviewsService";
import moment from "moment";
import ReviewFilters from "./ReviewFilters";
import ReviewSorts from "./ReviewSorts";
import StarRating from "../StarRating";

const BusinessDisplayReviews = ({gymId}) => {
    const {
        filteredReviews,
        refreshData,
        showFilter,
        displayFilters,
        handleFilterInputChange,
        reviewFilters,
        filterReviews,
        resetFilters,
        showSorts,
        displaySorts,
        handleSortInputChange,
        reviewSorts,
        sortReviews,
    } = BusinessDisplayReviewsService(gymId);

    return (
        <div className='mt-3 row'>
            <h3 className='col-8'>Reviews</h3>
            <div className='col-2 text-md-end' style={{'margin-right': '-80px'}}>
                <button className='btn regular-button rounded-4' onClick={displayFilters}>{showFilter ? 'Hide' : 'Show'} filter
                    options
                </button>
            </div>
            <div className='col-2 text-md-end' style={{'margin-right': '-180px'}}>
                <button className='btn regular-button rounded-4' onClick={displaySorts}>{showSorts ? 'Hide' : 'Show'} sorting options
                </button>
            </div>
            <div className='row'>
                <div className='col-6'>
                    {
                        showFilter &&
                        <ReviewFilters
                            reviewFilters={reviewFilters}
                            handleFilterInputChange={handleFilterInputChange}
                            resetFilters={resetFilters}
                            filterReviews={filterReviews}/>
                    }
                </div>
                <div className='col-6'>
                    {
                        showSorts &&
                        <ReviewSorts
                            handleSortInputChange={handleSortInputChange}
                            reviewSorts={reviewSorts}
                            sortReviews={sortReviews}
                        />
                    }
                </div>
            </div>
            <hr className='mt-3'/>
            <div className='overflow-auto' style={{height: '460px'}}>
                {
                    filteredReviews.map(review => (
                        <div className='card mt-3 custom-card-styles'>
                            <div className="row">
                                <img src={review.reviewer.image.link} className='col-2' style={{width: '220px', height: '200px'}}/>
                                <div className="card-body col-8">
                                    <h5 className="card-title">Rating:</h5>
                                    <StarRating value={review.rating} color={'#202020'}/>
                                    <h5 className="card-title">Review:</h5>
                                    <p>{review.body}</p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">{moment(review.created_at).fromNow()}</small>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default BusinessDisplayReviews;