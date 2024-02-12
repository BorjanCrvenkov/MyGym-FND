import React from 'react';
import BusinessDisplayExpensesService from '../../service/business/BusinessDisplayExpensesService';
import ExpenseStatusEnum from '../../enum/ExpenseStatusEnum';
import ExpenseModalForm from './ExpenseModalForm';
import ExpenseTypeModalForm from './ExpenseTypeModalForm';

const BusinessDisplayExpenses = ({ gymId }) => {
    const {
        expenses,
        refreshData,
        markAsPaid,
        expenseTypes,
    } = BusinessDisplayExpensesService(gymId);

    return (
        <div className="mt-3" style={{ height: '530px' }}>
            <div className="row align-items-center mb-3">
                <div className="col-md-9">
                    <h3>Expenses</h3>
                </div>
                <div className="col-md-3 text-md-end">
                    <ExpenseModalForm gymId={gymId} refreshData={refreshData} expenseTypes={expenseTypes} />
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 overflow-auto" style={{ maxHeight: '460px' }}>
                {expenses.map((expense) => (
                    <div key={expense.id} className="col">
                        <div className={`card ${expense.status === ExpenseStatusEnum.PAID ? 'bg-success' : 'bg-danger'}`}>
                            <div className="card-body">
                                <h5 className="card-title">{expense.name}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item custom-card-styles">
                                    Status: {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                                </li>
                                {expense.status === ExpenseStatusEnum.PAID && (
                                    <li className="list-group-item custom-card-styles">Paid at: {expense.paid_at}</li>
                                )}
                                <div className='list-group-item custom-card-styles'>
                                    {expense.status !== ExpenseStatusEnum.PAID && (
                                        <button
                                            className="btn card-button rounded-4"
                                            onClick={() => markAsPaid(expense.id)}
                                            style={{'margin-right': '20px'}}
                                        >
                                            Mark as Paid
                                        </button>
                                    )}
                                    <ExpenseModalForm gymId={gymId} refreshData={refreshData} expenseTypes={expenseTypes} expense={expense}/>
                                </div>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessDisplayExpenses;
