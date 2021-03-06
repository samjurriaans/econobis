import axios from 'axios';

const URL_PRODUCTION_PROJECT = `${URL_API}/api/production-project`;

export default {
    fetchProductionProject: id => {
        const requestUrl = `${URL_PRODUCTION_PROJECT}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateProductionProject: (id, data) => {
        const requestUrl = `${URL_PRODUCTION_PROJECT}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeProductionProject: data => {
        const requestUrl = `${URL_PRODUCTION_PROJECT}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteProductionProject: id => {
        const requestUrl = `${URL_PRODUCTION_PROJECT}/${id}/delete`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    fetchObligationNumbers: id => {
        const requestUrl = `${URL_PRODUCTION_PROJECT}/${id}/obligation-numbers`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
