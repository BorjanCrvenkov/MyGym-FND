import React from 'react';
import Form from 'react-bootstrap/Form';

const ReviewSorts = ({ handleSortInputChange, reviewSorts }) => {
    return (
        <div className="row mt-3">
            <div className="col-md-12">
                <h5>Sorts</h5>
                <hr />
                <div className="row">
                    <div className="col-1" style={{'margin-top': '23px'}}>
                        <h6>Date</h6>
                    </div>
                    <div className="col-md-4">
                        <Form className="row">
                            <Form.Label className="col-md-4">Ascending</Form.Label>
                            <Form.Check
                                type="switch"
                                id="date"
                                className="col-md-1"
                                name="date_ascending"
                                checked={reviewSorts.date_ascending}
                                onChange={handleSortInputChange}
                            />
                            <Form.Label className="col-md-4" style={{ marginLeft: '-20px' }}>Descending</Form.Label>
                        </Form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-1" style={{'margin-top': '23px'}}>
                        <h6>Rating</h6>
                    </div>
                    <div className="col-md-4">
                        <Form className="row">
                            <Form.Label className="col-md-4">Ascending</Form.Label>
                            <Form.Check
                                type="switch"
                                id="rating"
                                className="col-md-1"
                                name="rating_ascending"
                                checked={reviewSorts.rating_ascending}
                                onChange={handleSortInputChange}
                            />
                            <Form.Label className="col-md-4" style={{ marginLeft: '-20px' }}>Descending</Form.Label>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSorts;
