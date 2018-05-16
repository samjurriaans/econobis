import { put, call } from 'redux-saga/effects';
import OrdersAPI from '../../api/order/OrdersAPI';
import OrderDetailsAPI from '../../api/order/OrderDetailsAPI';

export function* fetchOrdersSaga({filters,sorts, pagination, administrationId}) {
    try {
        const orders = yield call(OrdersAPI.fetchOrders, {filters, sorts, pagination, administrationId});
        yield put({ type: 'FETCH_ORDERS_SUCCESS', orders });
    } catch (error) {
        yield put({ type: 'FETCH_ORDERS_ERROR', error });
    }
}

export function* deleteOrderSaga({ id }) {
    try {
        yield call(OrderDetailsAPI.deleteOrder, id);
        yield put({ type: 'DELETE_ORDER_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_ORDER_ERROR', error });
    }
}