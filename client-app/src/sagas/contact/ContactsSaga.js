import { put, call } from 'redux-saga/effects';
import ContactsAPI from '../../api/contact/ContactsAPI';
import AuthAPI from "../../api/general/AuthAPI";
import { authSaga} from '../general/AuthSaga';

export function* fetchContactsSaga({filters, extraFilters, sorts, pagination}) {
    try {
        //yield call(authSaga);
        const contacts = yield call(ContactsAPI.fetchContacts, {filters, extraFilters, sorts, pagination});
        yield put({ type: 'FETCH_CONTACTS_SUCCESS', contacts })
    } catch (error) {
        yield put({ type: 'FETCH_CONTACTS_ERROR', error });
    }
}

export function* deleteContactSaga({ id }) {
    try {
        yield call(ContactsAPI.deleteContact, id);
        yield put({ type: 'DELETE_CONTACT_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_CONTACT_ERROR', error });
    }
}

export function* deleteSelectedContactsSaga({ contactIds }) {
    try {
        yield call(ContactsAPI.deleteContacts, contactIds);
        yield put({ type: 'DELETE_CONTACT_SUCCESS', contactIds });
    } catch (error) {
        yield put({ type: 'DELETE_CONTACT_ERROR', error });
    }
}