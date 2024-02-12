import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UserService from "./modelService/UserService";
import axios from "../repository/axiosAPI";
import { saveAs } from 'file-saver';

const ViewProfileService = () => {
    const {id} = useParams();
    const userService = new UserService();

    const fetchUser = async () => {
        if (id == null) {
            return null;
        }

        return await userService.show(id);
    }

    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchAndSetUser = async () => {
            const userData = await fetchUser();
            setUser(userData);
        };
        fetchAndSetUser();

    }, []);

    return {
        user,
    };
}

export default ViewProfileService;