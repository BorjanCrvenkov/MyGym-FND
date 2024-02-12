import React from 'react';

const GymFilters = ({ gymFilters, handleFilterInputChange, resetFilters, filterGyms }) => {
    return (
        <div className="row mt-4 rounded-4" id="filters">
            <div className="col-12">
                <h4>Filters</h4>
                <hr />
            </div>
            <div className="col-md-4 mb-3">
                <label htmlFor="min_rating">Minimum Rating</label>
                <input
                    className="form-control rounded-4"
                    name="min_rating"
                    type="number"
                    min={0}
                    max={5}
                    step={0.5}
                    placeholder="Minimum rating"
                    value={gymFilters.min_rating || ''}
                    onChange={handleFilterInputChange}
                />
            </div>
            <div className="col-md-4 mb-3">
                <label htmlFor="max_rating">Maximum Rating</label>
                <input
                    className="form-control rounded-4"
                    name="max_rating"
                    type="number"
                    min={0}
                    max={5}
                    step={0.5}
                    placeholder="Maximum rating"
                    value={gymFilters.max_rating || ''}
                    onChange={handleFilterInputChange}
                />
            </div>
            <div className="col-md-4 d-flex align-items-end justify-content-md-end mb-3">
                <button className="btn btn-secondary mr-2 rounded-4" onClick={resetFilters} style={{
                    'border': 'none',
                    'padding': '10px 20px',
                    'border-radius': '5px',
                    'cursor': 'pointer',
                }}>
                    Reset Filters
                </button>
                <button className="btn regular-button rounded-4" onClick={filterGyms}>
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default GymFilters;
