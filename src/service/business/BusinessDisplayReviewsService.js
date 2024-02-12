import {useEffect, useState} from 'react';
import ReviewService from "../modelService/ReviewService";

const BusinessDisplayReviewsService = (gymId) => {
    const reviewService = new ReviewService();
    const [showFilter, setShowFilter] = useState(false);
    const [showSorts, setShowSorts] = useState(false);
    const [reviewFilters, setReviewFilters] = useState({
        min_rating: null,
        max_rating: null,
    });

    const [reviewSorts, setReviewSorts] = useState({
        date_ascending: false,
        rating_ascending: false,
    });

    const fetchReviews = async () => {
        let requestFilters = {
            'gym_id': gymId,
        }

        let includes = [
            'reviewer'
        ];

        return await reviewService.index(requestFilters, null, includes);
    }

    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);

    const fetchAndSetReviews = async () => {
        const reviewsData = await fetchReviews();
        setReviews(reviewsData);
        setFilteredReviews(reviewsData)
    };

    useEffect(() => {
        fetchAndSetReviews();
    }, []);

    const refreshData = async () => {
        await fetchAndSetReviews();
    };

    const displayFilters = () => {
        setShowFilter(!showFilter)
    }

    const handleFilterInputChange = (e) => {
        const {name, value} = e.target;
        setReviewFilters((filters) => ({
            ...filters,
            [name]: value,
        }));
    };

    const filterReviews = () => {
        let result = filteredReviews;

        if (reviewFilters.min_rating) {
            result = result.filter(review => (
                review.rating >= reviewFilters.min_rating
            ));
        }

        if (reviewFilters.max_rating) {
            result = result.filter(review => (
                review.rating <= reviewFilters.max_rating
            ));
        }

        setFilteredReviews(result);
    }

    const resetFilters = () => {
        setReviewFilters({
            min_rating: null,
            max_rating: null,
        })

        setFilteredReviews(reviews)
    }

    const displaySorts = () => {
        setShowSorts(!showSorts)
    }

    const handleSortInputChange = (e) => {
        const name = e.target.name;
        setReviewSorts((sorts) => ({
            ...sorts,
            [name]: !reviewSorts[name],
        }));

        sortReviews()
    };

    const sortReviews = () => {
        let result = filteredReviews;

        result.sort(function (r1, r2) {
            let r1CreatedAt = new Date(r1.created_at);
            let r2CreatedAt = new Date(r2.created_at);

            return reviewSorts.date_ascending ?
                r1CreatedAt - r2CreatedAt
                :
                r2CreatedAt - r1CreatedAt
        })

        result.sort(function (r1, r2) {
            return reviewSorts.rating_ascending ?
                r1.rating - r2.rating
                :
                r2.rating - r1.rating
        })

        setFilteredReviews(result);
    }

    return {
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
    };
};

export default BusinessDisplayReviewsService;