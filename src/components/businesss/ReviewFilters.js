import React from 'react';

const ReviewFilters = ({reviewFilters, handleFilterInputChange, resetFilters, filterReviews}) => {
    return (
        <div className="row mt-3" id="filters">
            <div className="col-md-12">
                <h5>Filters</h5>
                <hr/>
                <div className="row">
                    <div className="col-md-1 mt-2">
                        <h6>Rating</h6>
                    </div>
                    <div className="col-md-5">
                        <input
                            className="form-control rounded-4"
                            name="min_rating"
                            type="number"
                            min={0}
                            max={5}
                            placeholder="Min rating"
                            value={reviewFilters.min_rating || ''}
                            onChange={handleFilterInputChange}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className="form-control rounded-4"
                            name="max_rating"
                            type="number"
                            min={0}
                            max={5}
                            placeholder="Max rating"
                            value={reviewFilters.max_rating || ''}
                            onChange={handleFilterInputChange}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <button className="btn btn-secondary rounded-4" onClick={resetFilters} style={{
                            'border': 'none',
                            'padding': '10px 20px',
                            'border-radius': '5px',
                            'cursor': 'pointer',
                        }}>
                            Reset Filters
                        </button>
                    </div>
                    <div className="col-md-7">
                    </div>
                    <div className="col-md-2">
                        <button className="btn regular-button rounded-4" onClick={filterReviews}>
                            Filter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewFilters;
