import React from "react";
import Form from "react-bootstrap/Form";
import BusinessDisplayReportsService from "../../service/business/BusinessDisplayReportsService";

const BusinessDisplayReports = ({gymId}) => {
    const {
        handleInputChange,
        formErrors,
        generateGeneralReport,
        generateMembershipsReport,
        generateSessionsReport,
        generateFinanceReport,
    } = BusinessDisplayReportsService(gymId)

    return (
        <div className='mt-3'>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            name='start_date'
                            onChange={handleInputChange}
                        />
                        {formErrors.start_date && (
                            <Form.Text className="text-danger">{formErrors.start_date}</Form.Text>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="endDate"
                            name='end_date'
                            onChange={handleInputChange}
                        />
                        {formErrors.end_date && (
                            <Form.Text className="text-danger">{formErrors.end_date}</Form.Text>
                        )}
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md-3">
                    <div className="card custom-card-styles">
                        <div className="card-body">
                            <h5 className="card-title">General Report</h5>
                            <button className="btn card-button rounded-4" onClick={(e) => generateGeneralReport(e)}>Generate</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card custom-card-styles">
                        <div className="card-body">
                            <h5 className="card-title">Finance Report</h5>
                            <button className="btn card-button rounded-4" onClick={(e) => generateFinanceReport(e)}>Generate
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card custom-card-styles">
                        <div className="card-body">
                            <h5 className="card-title">Memberships Report</h5>
                            <button className="btn card-button rounded-4" onClick={(e) => generateMembershipsReport(e)}>Generate
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card custom-card-styles">
                        <div className="card-body">
                            <h5 className="card-title">Sessions Report</h5>
                            <button className="btn card-button rounded-4" onClick={(e) => generateSessionsReport(e)}>Generate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessDisplayReports;