import {useState} from "react";
import UserService from "../modelService/UserService";
import RedirectService from "../RedirectService";
import UserRoleEnum from "../../enum/UserRoleEnum";

const LoginService = () => {
    const initialData = {
        'email': null,
        'password': null,
    }

    const [formData, setFormData] = useState(initialData);
    const userService = new UserService();
    const redirectService = new RedirectService();

    const handleInputChange = async (event) => {
        const {name, value} = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = await userService.login(formData);

        if(data){
            let user = JSON.parse(localStorage.getItem('user'));
            let roleName = user.role.name;

            if(roleName === UserRoleEnum.BUSINESS){
                redirectService.toBusinessMainPage();
            }else{
                redirectService.toHomePage();
            }
        }
    };

    return {formData, handleInputChange, handleSubmit};
}

export default LoginService;