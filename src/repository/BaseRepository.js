import axios from "./axiosAPI";
import DisplayNotificationService from "../service/DisplayNotificationService";

export default class BaseRepository {
    constructor(path) {
        this.path = path;
        this.notificationService = new DisplayNotificationService();
    }

    async index(filters, sorts, includes) {
        let path = this.path;

        let requestParams = this.getRequestParams(filters, sorts, includes)

        path += requestParams;

        try {
            const response = await axios.get(path)

            return response.data.data;
        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    }

    async show(id, includes = null) {
        let path = this.path + '/' + id;

        let requestParams = this.getRequestParams(null, null, includes);

        path += requestParams;

        try {
            const response = await axios.get(path)

            return response.data.data;
        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    };

    getRequestParams(filters, sorts, includes) {
        let params = '';
        let filtersParam = '';
        let sortsParam = '';
        let includeParam = '';

        if (filters != null) {
            Object.keys(filters).forEach(function (key) {
                filtersParam += "filter[" + key + "]=" + filters[key] + "&";
            });

            filtersParam = filtersParam.substring(0, filtersParam.length - 1);

            if (sorts || includes) {
                filtersParam += '&'
            }

            params += filtersParam;
        }

        if (sorts != null) {
            sortsParam = 'sort=';

            for (let i = 0; i < sorts.length; i++) {
                if (i !== 0) {
                    sortsParam += ','
                }

                sortsParam += sorts[i];
            }

            if (includes) {
                sortsParam += '&'
            }
            params += sortsParam
        }

        if (includes != null) {
            includeParam = 'include=';

            for (let i = 0; i < includes.length; i++) {
                if (i !== 0) {
                    includeParam += ','
                }

                includeParam += includes[i];
            }
            params += includeParam
        }

        if (params.length > 1) {
            params = "?" + params
        }

        return params;
    }

    async update(id, data) {
        try {
            const response = await axios.put(this.path + '/' + id, data);

            return response.data.data;
        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    };

    async deleteModel(id) {
        try {
            await axios.delete(this.path + '/' + id);
        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    };

    async store(data) {
        try {
            const response = await axios.post(this.path, data);

            return response.data.data;
        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    }

    displayErrorMessages(error) {
        let message = error.response.data.meta.message;

        let errorMessages = message.split('.');

        for (let i = 0; i < errorMessages.length - 1; i++) {
            this.notificationService.showErrorNotification(errorMessages[i]);
        }
    }
}