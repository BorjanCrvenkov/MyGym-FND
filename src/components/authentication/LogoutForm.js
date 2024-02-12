import BaseService from "../../service/BaseService";
import RedirectService from "../../service/RedirectService";

const LogoutForm = () => {
    new BaseService().removeTokenFromLocalStorage();
    new RedirectService().toLogin();

    return (
        <div>
            <p>Logging out</p>
        </div>
    );
}

export default LogoutForm;