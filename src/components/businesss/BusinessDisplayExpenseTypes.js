import React from 'react';
import BusinessDisplayExpenseTypesService from '../../service/business/BusinessDisplayExpenseTypesService';
import ExpenseTypeModalForm from './ExpenseTypeModalForm';

const BusinessDisplayExpenseTypes = ({ gymId }) => {
    const { expenseTypes, refreshData } = BusinessDisplayExpenseTypesService(gymId);

    return (
        <div className="mt-3" style={{ height: '530px' }}>
            <div className="row align-items-center mb-3">
                <div className="col-md-9">
                    <h3>Expense Types</h3>
                </div>
                <div className="col-md-3 text-md-end" style={{'margin-left': '-45px'}}>
                    <ExpenseTypeModalForm gymId={gymId} refreshData={refreshData} />
                </div>
            </div>
            <hr />
            <div className="row row-cols-1 row-cols-md-2 g-3 overflow-auto" style={{ maxHeight: '470px' }}>
                {expenseTypes.map((expenseType) => (
                    <div key={expenseType.id} className="col">
                        <div className="card custom-card-styles">
                            <div className="card-body">
                                <h5 className="card-title">{expenseType.name}</h5>
                                <p className="card-text">{expenseType.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item" style={{'background-color': '#202020', color: '#decd80'}}>Recurring: {expenseType.recurring ? 'Yes' : 'No'}</li>
                                {expenseType.recurring && (
                                    <>
                                        <li className="list-group-item" style={{'background-color': '#202020', color: '#decd80'}}>
                                            Recurring every: {expenseType.recurring_every_number_of_days} days
                                        </li>
                                        <li className="list-group-item" style={{'background-color': '#202020', color: '#decd80'}}>
                                            Next recurring date: {expenseType.next_recurring_date}
                                        </li>
                                    </>
                                )}
                                <li className="list-group-item" style={{'background-color': '#202020', color: '#decd80'}}>Cost: ${expenseType.cost}</li>
                            </ul>
                            <div className="card-body">
                                <ExpenseTypeModalForm
                                    expenseType={expenseType}
                                    gymId={gymId}
                                    refreshData={refreshData}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessDisplayExpenseTypes;
