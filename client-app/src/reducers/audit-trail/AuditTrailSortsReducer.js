export default (state = [], action) => {
    switch(action.type) {
        case 'SET_AUDIT_TRAIL_SORTS':
            if(state.length === 3) state.pop();

            return [
                {
                    field: action.field,
                    order: action.order,
                },
                ...state,
            ];
        default:
            return state;
    }
};
