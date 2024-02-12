import {useState} from 'react';
import UserService from "./modelService/UserService";
import UserTypeEnum from "../enum/UserTypeEnum";

const EditProfileFormService = (user, userType) => {
    const userService = new UserService();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState(resolveInitialData());

    function resolveInitialData() {
        if (userType === UserTypeEnum.MEMBER) {
            return {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                bio: user.bio,
                date_of_birth: user.date_of_birth,
                image: null,
                user_type: UserTypeEnum.MEMBER
            };
        }else if(userType === UserTypeEnum.BUSINESS){
            return {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                bio: user.bio,
                date_of_birth: user.date_of_birth,
                image: null,
                identification_file: null,
                user_type: UserTypeEnum.BUSINESS
            };
        }
    }


    const handleInputChange = async (event) => {
        const {name, value} = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const fileChange = (event) => {
        event.preventDefault();

        let name = event.target.name;
        formData[name] = event.target.files[0];
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response = await userService.update(user.id, JSON.stringify(formData));

        if(response){
            handleClose();
            window.location.reload(false);
        }
    };

    return {
        show,
        handleShow,
        handleClose,
        handleSubmit,
        formData,
        handleInputChange,
        imageChange: fileChange,
    };
};

export default EditProfileFormService;