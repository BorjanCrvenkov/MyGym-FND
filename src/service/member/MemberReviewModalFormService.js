import React, {useState} from "react";
import ReviewService from "../modelService/ReviewService";
import ReviewTypeEnum from "../../enum/ReviewTypeEnum";
import {FaStar} from "react-icons/fa";

const MemberReviewModalFormService = (gymId, refreshData, review) => {
    const reviewService = new ReviewService();
    const [show, setShow] = useState(false);

    const resolveInitialFormData = () => {
        return review ? {
                rating: review.rating,
                body: review.body,
                model_id: gymId,
                model_type: ReviewTypeEnum.GYM_REVIEW,
            }
            :
            {
                rating: null,
                body: null,
                model_id: gymId,
                model_type: ReviewTypeEnum.GYM_REVIEW,
            }
    }

    const [formData, setFormData] = useState(resolveInitialFormData);

    const [formErrors, setFormErrors] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (formData.rating === null || formData.rating > 5 || formData.rating < 0) {
            errors.rating = 'The rating must be between 0 and 5'
        }

        if (formData.body === null || formData.body.trim() === '') {
            errors.body = 'Body is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return
        }

        if (review) {
            await reviewService.update(review.id, JSON.stringify(formData))
        } else {
            await reviewService.store(formData)
        }

        await refreshData()
        handleClose();
    };

    const [hoveredRating, setHoveredRating] = useState(0);

    const handleStarHover = (value) => {
        setHoveredRating(value);
    };

    const handleStarClick = (value) => {
        formData.rating = value;
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    const displayRatingStars = () => {
        return (
            <div>
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;

                    return (
                        <FaStar
                            key={index}
                            color={(starValue <= hoveredRating || starValue <= formData.rating) ? '#ffc107' : '#e4e5e9'}
                            style={{marginRight: '5px', fontSize: '24px', cursor: 'pointer'}}
                            onMouseEnter={() => handleStarHover(starValue)}
                            onMouseLeave={handleStarLeave}
                            onClick={() => handleStarClick(starValue)}
                        />
                    );
                })}
            </div>
        );
    }

    return {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
        displayRatingStars,
    }
};

export default MemberReviewModalFormService;