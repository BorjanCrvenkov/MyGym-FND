import BusinessDisplayReviewsService from "../../service/business/BusinessDisplayReviewsService";
import moment from "moment";
import MemberReviewModalForm from "./MemberReviewModalForm";
import StarRating from "../StarRating";
import ReviewFilters from "../businesss/ReviewFilters";
import ReviewSorts from "../businesss/ReviewSorts";

const MemberDisplayReviews = ({gym}) => {
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
    } = BusinessDisplayReviewsService(gym.id);

    let location = window.location;
    const queryParams = new URLSearchParams(location.search);

    if(gym.id !== Number.parseInt(queryParams.get('gymId'))){
        refreshData()
    }

    let loggedInUserId = JSON.parse(localStorage.getItem('user')).id;

    return (
        <div className='mt-3 row'>
            <div className='col-3'>
                <button className='btn regular-button rounded-4' onClick={displayFilters}>{showFilter ? 'Hide' : 'Show'} filter
                    options
                </button>
            </div>
            <div className='col-3'>
                <button className='btn regular-button rounded-4' onClick={displaySorts}>{showSorts ? 'Hide' : 'Show'} sorting options
                </button>
            </div>
            <div className='col-3'>

            </div>
            {/*{*/}
            {/*     gym.can_leave_review &&*/}
                <div className='col-3'>
                    <MemberReviewModalForm gymId={gym.id} refreshData={refreshData}/>
                </div>
            {/*}*/}
            <div>
                {
                    showFilter &&
                    <ReviewFilters
                        reviewFilters={reviewFilters}
                        handleFilterInputChange={handleFilterInputChange}
                        resetFilters={resetFilters}
                        filterReviews={filterReviews}/>
                }
            </div>
            <div>
                {
                    showSorts &&
                    <ReviewSorts
                        handleSortInputChange={handleSortInputChange}
                        reviewSorts={reviewSorts}
                        sortReviews={sortReviews}
                    />
                }
            </div>
            <hr className='mt-2'/>
            <div className='overflow-auto' style={{height: '460px'}}>
                {
                    filteredReviews.map(review => (
                        <div className='card mt-2 custom-card-styles rounded-4'>
                            <div className="row">
                                <img src={review.reviewer.image.link} className='col-3 rounded-4' style={{height: '170px', width: '200px'}}/>
                                <div className="card-body col-7">
                                    <div className='row'>
                                        <h5 className='col-2 card-title'>Rating:</h5>
                                        <div className='col-6' style={{'margin-left': '-35px', 'margin-top': '-2px'}}>
                                            <StarRating value={review.rating} color={'#202020'}/>
                                        </div>
                                    </div>
                                    <h5 className="card-title">Review:</h5>
                                    <p>{review.body}</p>
                                    {
                                        loggedInUserId === review.reviewer_id
                                        &&
                                        <MemberReviewModalForm gymId={gym.id} refreshData={refreshData} review={review}/>
                                    }
                                </div>
                            </div>
                            <div className="card-footer row">
                                <small className="text-muted col-5">Posted
                                    by {review.reviewer.username} {moment(review.created_at).fromNow()}</small>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MemberDisplayReviews;