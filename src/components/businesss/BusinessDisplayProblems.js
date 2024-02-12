import React from 'react';
import moment from 'moment/moment';
import BusinessDisplayProblemsService from '../../service/business/BusinessDisplayProblemsService';

const BusinessDisplayProblems = ({ gymId }) => {
    const { problems, resolveProblem } = BusinessDisplayProblemsService(gymId);

    return (
        <div className="mt-3">
            <div className="row align-items-center mb-3">
                <div className="col-md-9">
                    <h3>Problems</h3>
                </div>
            </div>
            <hr />
            <div className="row">
                {problems.map((problem, index) => (
                    <div key={problem.id} className="col-md-6 mb-3">
                        <div className="card custom-card-styles">
                            <div className="card-body">
                                <h5 className="card-title">{problem.heading}</h5>
                                <p className="card-text">{problem.reason}</p>
                                <button
                                    onClick={() => resolveProblem(problem)}
                                    className="btn card-button rounded-4"
                                >
                                    Mark as Resolved
                                </button>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">
                                    Reported by {problem.reporter.first_name}{' '}
                                    {problem.reporter.last_name}{' '}
                                    {moment(problem.created_at).fromNow()}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessDisplayProblems;
