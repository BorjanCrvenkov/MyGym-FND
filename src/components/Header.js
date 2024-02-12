import UserRoleEnum from "../enum/UserRoleEnum";

const Header = () => {
    let roleName = '';

    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        roleName = user.role.name;
    }

    let myAccountLinkPrefix = 'member';

    if (roleName === UserRoleEnum.BUSINESS) {
        myAccountLinkPrefix = 'business';
    } else if (roleName === UserRoleEnum.EMPLOYEE) {
        myAccountLinkPrefix = 'employee'
    }

    return (
            <nav className="navbar navbar-expand-lg" style={{'width': '1900px'}}>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {
                            localStorage.getItem('token') &&
                            <li className="nav-item">
                                <a className="nav-link navbar-link" href="/gyms">Home</a>
                            </li>
                        }
                        {
                            localStorage.getItem('token') &&
                        <li className="nav-item">
                            <a className="nav-link navbar-link" href={'/'+ myAccountLinkPrefix + '/users/view/' + user.id}>My account</a>
                        </li>
                        }
                    </ul>
                    <div className="navbar-nav ms-auto">
                        <ul className="navbar-nav" style={{'margin-right': '10px'}}>
                            {
                                !localStorage.getItem('token') &&
                                <li className="nav-item">
                                    <a className="nav-link navbar-link" href="/login">Login</a>
                                </li>
                            }
                            {
                                !localStorage.getItem('token') &&
                                <li className="nav-item">
                                    <a className="nav-link navbar-link" href="/register">Register</a>
                                </li>
                            }
                            {
                                localStorage.getItem('token') &&
                                <li className="nav-item">
                                    <a className="nav-link navbar-link" href="/logout">Logout</a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
    );
}

export default Header;