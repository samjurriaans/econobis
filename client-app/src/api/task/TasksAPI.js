import axios from 'axios';

const URL_API = process.env.URL_API;

export default {
    fetchTasks: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_API}/api/task/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    getAmountActive: () => {
        const requestUrl = `${URL_API}/api/task/amount-active`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    fetchTasksCalendarEvents: (startDate, endDate) => {
        const requestUrl = `${URL_API}/api/task/calendar`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                startDate,
                endDate,
            },
        });
    },
};