import ReviewService from "../modelService/ReviewService";
import {useEffect, useState} from "react";

const MemberReviewsTabService = (userId) => {
    const reviewService = new ReviewService();
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        let filters = {
            reviewer_id: userId,
        }

        let includes = [
            'gym',
        ];

        return await reviewService.index(filters, null, includes);
    }

    const fetchAndSetReviews = async () => {
        const reviewsData = await fetchReviews();
        setReviews(reviewsData);
    };

    useEffect(() => {
        fetchAndSetReviews();
    }, [userId]);

    const refreshData = async () => {
        await fetchAndSetReviews();
    };

    return {
        reviews,
        refreshData,
    };
}

export default MemberReviewsTabService;