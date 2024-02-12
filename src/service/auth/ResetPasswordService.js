import {useState} from "react";
import UserService from "../modelService/UserService";
import RedirectService from "../RedirectService";

const ResetPasswordService = () => {
    const resolveInitialData = () => {
        const searchParams = new URLSearchParams(window.location.search);
        let token = searchParams.get('resetToken');
        let email = searchParams.get('email');

        return {
            'email': email,
            'password': null,
            'password_confirmation': null,
            'token': token,
        }
    }

    const [formData, setFormData] = useState(resolveInitialData);
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

        if(formData.password !== formData.password_confirmation){
            alert('Passwords do not match!');
            return;
        }

        let message = await userService.resetPassword(formData);

        if(message){
            redirectService.toLogin(message, true);
        }
    };

    return {formData, handleInputChange, handleSubmit};
}

export default ResetPasswordService;