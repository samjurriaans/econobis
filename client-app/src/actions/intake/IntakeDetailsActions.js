export const fetchIntakeDetails = (payload) => {
    return {
        type: 'FETCH_INTAKE_DETAILS',
        payload
    }
};

export const updateIntake = (intake) => {
    return {
        type: 'UPDATE_INTAKE',
        intake
    }
};

export const deleteIntake = (id) => {
    return {
        type: 'DELETE_INTAKE',
        id
    }
};

export const newIntakeMeasureRequested = (intakeId, measureId) => {
    return {
        type: 'NEW_INTAKE_MEASURE_REQUESTED',
        intakeId, measureId,
    };
};

export const deleteIntakeMeasureRequested = (intakeId, measureId) => {
    return {
        type: 'DELETE_INTAKE_MEASURE_REQUESTED',
        intakeId, measureId,
    };
};
