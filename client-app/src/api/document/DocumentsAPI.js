import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_DOCUMENT = `${URL_API}/api/document`;

export default {
    fetchDocuments: ({pagination}) => {
        const requestUrl = `${URL_DOCUMENT}/grid`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },
};