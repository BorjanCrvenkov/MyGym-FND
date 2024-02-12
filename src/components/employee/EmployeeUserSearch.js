
const EmployeeUserSearch = ({search}) => {
    return (
        <>
            <span className='col-5'></span>
            <div className='col-7 row' style={{'margin-top': '-50px', height: '35px'}}>
                <span className='col-4'></span>
                <div className='col-5'>
                    <input
                        type='text'
                        className='form-control rounded-4'
                        placeholder='Search for user'
                        onChange={(e) => search(e.target.value)}
                        id='search'
                    />
                </div>
                <button className='btn btn-secondary col-3 rounded-4' style={{height: '45px'}} onClick={() => search('')}>Clear</button>
            </div>
        </>
    )
}

export default EmployeeUserSearch;