
const MemberDisplayGymWorkingTimes = ({parsedWorkingTimes}) =>{
    return (
        <div className='mt-3 rounded-4'>
            <h3>Gym Working Times</h3>
            <hr/>
            <table className="table table-bordered table-hover">
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

export default MemberDisplayGymWorkingTimes;