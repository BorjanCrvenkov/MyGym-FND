
const BusinessDisplayWorkingTimes = ({parsedWorkingTimes}) => {
    return (
        <div className='mt-3 row'>
            <h3 className='col-9'>Working hours</h3>
            <hr/>
            <table className="table table-bordered table-hover" style={{'width': '1900px','margin-left': '20px'}}>
                <thead>
                <tr>
                    <th scope="col" style={{'background-color': '#202020', color: '#decd80'}}>Day</th>
                    <th scope="col" style={{'background-color': '#202020', color: '#decd80'}}>Opening time</th>
                    <th scope="col" style={{'background-color': '#202020', color: '#decd80'}}>Closing time</th>
                </tr>
                </thead>
                <tbody>
                {parsedWorkingTimes.map(({day, start_time, end_time}) => (
                    <tr>
                        <th style={{'background-color': '#202020', color: '#decd80'}} scope="row">{day}</th>
                        <td style={{'background-color': '#202020', color: '#decd80'}}>{start_time || '/'}</td>
                        <td style={{'background-color': '#202020', color: '#decd80'}}>{end_time || '/'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default BusinessDisplayWorkingTimes;