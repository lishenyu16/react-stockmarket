import { logoutSaga, authSaga,authSigninSaga } from './auth'
import { placeOrderSaga} from './stocks'
import { getMarketStocksSaga,getStockDetailSaga} from './market'
import { getUserStocksSaga, getUserBuyingPowerSaga, getTotalValueSaga, getUserHomeStocksSaga, getUserOrdersSaga } from './portfolio'
import { takeEvery } from 'redux-saga/effects'

export function* watchAuth() {
    yield takeEvery('logout_saga', logoutSaga)
    yield takeEvery('auth_saga', authSaga)
    yield takeEvery('auth_signin_saga', authSigninSaga)
}
export function* watchStocks() {
    yield takeEvery('placeOrder_saga', placeOrderSaga)
}
export function* watchMarket() {
    yield takeEvery('getMarketStocks_saga', getMarketStocksSaga)
    yield takeEvery('getStockDetail_saga', getStockDetailSaga)
}
export function* watchPortfolio() {
    yield takeEvery('getUserStocks_saga', getUserStocksSaga)
    yield takeEvery('getUserBuyingPower_saga', getUserBuyingPowerSaga)
    yield takeEvery('getTotalValue_saga', getTotalValueSaga)
    yield takeEvery('getUserHomeStocks_saga', getUserHomeStocksSaga)
    yield takeEvery('getUserOrders_saga', getUserOrdersSaga)

}