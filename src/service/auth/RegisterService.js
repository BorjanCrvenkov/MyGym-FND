import {useState} from 'react';
import UserTypeEnum from "../../enum/UserTypeEnum";
import UserService from "../modelService/UserService";
import RedirectService from "../RedirectService";

const RegisterService = (memberRegistration) => {

    const initialData = resolveInitialData();

    const [formData, setFormData] = useState(initialData);
    const [validFields, setValidFields] = useState({});

    const userService = new UserService();
    const redirectService = new RedirectService();

    function resolveInitialData() {
        return memberRegistration
            ? {
                first_name: null,
                last_name: null,
                email: null,
                password: null,
                username: null,
                date_of_birth: null,
                bio: null,
                image: null,
                user_type: UserTypeEnum.MEMBER
            }
            : {
                first_name: null,
                last_name: null,
                email: null,
                password: null,
                date_of_birth: null,
                image: null,
                identification_file: null,
                user_type: UserTypeEnum.BUSINESS
            };
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

        updateValidFields(name, value);
    };

    const updateValidFields = (name, value, customValue = null) => {
        let valueToBeSet = customValue ?? (value != null && value.trim() !== '');

        setValidFields((prevValidFields) => ({
            ...prevValidFields,
            [name]: valueToBeSet
        }));
    }

    const fileChange = (event) => {
        event.preventDefault();

        let name = event.target.name;
        formData[name] = event.target.files[0];
console.log(formData);
        // setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     [name]: file
        // }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response = await userService.register(formData);

        if(response){
            redirectService.toLogin();
        }
    };

    const getFieldClassName = (fieldName) => {
        if (validFields[fieldName]) {
            return 'form-control is-valid';
        }

        if (validFields[fieldName] === false) {
            return 'form-control is-invalid';
        }

        return 'form-control';
    };

    return {formData, handleInputChange, fileChange, handleSubmit, getFieldClassName};
};

export default RegisterService;