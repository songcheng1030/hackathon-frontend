import { Dispatch } from 'redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { ETH_PRICE } from '../action-types';
import errorHandler from '../error-handler';
import { ethPriceService } from '../../services';

export const getEthPrice = () => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoading());
        const price = await ethPriceService.getEthPrice();
        dispatch(hideLoading());
        dispatch({
            type: ETH_PRICE,
            payload: {
                price: price.usdPrice
            },
        });
    } catch (error: any) {
        dispatch(hideLoading());
        errorHandler(error, ETH_PRICE)
    } 
}


