import MemberReviewsTabService from "../../service/member/MemberReviewsTabService";
import StarRating from "../StarRating";
import MemberReviewModalForm from "./MemberReviewModalForm";
import React from "react";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import ReviewService from "../../service/modelService/ReviewService";
import moment from "moment/moment";

const MemberReviewsTab = ({userId}) => {
    if (!userId) {
        return <div>Loading</div>;
    }

    const {
        reviews,
        refreshData,
    } = MemberReviewsTabService(userId);

    return (
        <div className='row mt-2'>
            <h3>Reviews</h3>
            <hr/>
            {
                reviews.map(review => (
                    <div className="card col-4 mb-3 custom-card-styles rounded-4" style={{width: '550px', 'margin-left': '40px'}}>
                        <div className="card-body">
                            <h5 className="card-title">Gym: {review?.gym?.name}</h5>
                            <StarRating value={review.rating} color='#202020'/>
                            <p className="card-text">{review.body}</p>
                            <div className='row'>
                                <div className='col-5'>
                                    <MemberReviewModalForm gymId={review?.gym?.id} refreshData={refreshData}
                                                           review={review}/>
                                </div>
                                <span className='col-2'></span>
                                <div className='col-5 row'>
                                    <DeleteConfirmationModal id={review.id} service={new ReviewService()}
                                                             text={'review'} refreshData={refreshData}/>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <p className="card-text"><small className="text-muted">Posted: {moment(review.created_at).fromNow()}</small></p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default MemberReviewsTab;