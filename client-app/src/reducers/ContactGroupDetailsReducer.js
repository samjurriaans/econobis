export default function (state= {}, action) {
    switch(action.type) {
        case 'FETCH_CONTACT_GROUP_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.contactGroupDetails,
            };
        case 'UPDATE_CONTACT_GROUP_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.contactGroupDetails,
            };
        default:
            return state;
    }
}