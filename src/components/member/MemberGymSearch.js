import React from 'react';

const MemberGymSearch = ({ search }) => {
    return (
        <div className="row">
            <div className="col-md-5 mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control rounded-4"
                        placeholder="Search for gym"
                        onChange={(e) => search(e.target.value)}
                        id="search"
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary rounded-4"
                            style={{'border': 'none', 'padding': '10px 20px', 'border-radius': '5px', 'cursor': 'pointer'}}
                            type="button"
                            onClick={() => search('')}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberGymSearch;
