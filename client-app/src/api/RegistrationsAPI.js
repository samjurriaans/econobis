import axios from 'axios';

const URL_API = process.env.URL_API;

export default {
    fetchRegistrations: ({ filters, sorts }) => {
        const requestUrl = `${URL_API}/api/registrations/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        })
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
                console.log(error);
            }
        );
    },
};