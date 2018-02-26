export const fetchProductionProject = (id) => {
    return {
        type: 'FETCH_PRODUCTION_PROJECT',
        id,
    };
};

export const clearProductionProject = () => {
    return {
        type: 'CLEAR_PRODUCTION_PROJECT'
    };
};

export const newValueCourse = (valueCourse) => {
    return {
        type: 'NEW_VALUE_COURSE',
        valueCourse,
    };
};

export const updateValueCourse = (valueCourse) => {
    return {
        type: 'UPDATE_VALUE_COURSE',
        valueCourse,
    };
};

export const deleteValueCourse = (id) => {
    return {
        type: 'DELETE_VALUE_COURSE',
        id,
    };
};
