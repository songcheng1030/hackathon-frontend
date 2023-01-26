import { Dispatch } from 'redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { ASSETS_GET_ALL, ASSETS_GET_BY_ID } from '../action-types';
import errorHandler from '../error-handler';
import { assetsService } from '../../services';
import { GNftData } from '../../types';

export const getAllAssets = (address: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoading());
        const res = await assetsService.getAssets(address);
        res.ownedNfts.map(item=>{
            if (item.error || !item.metadata){
                res.totalCount = res.totalCount-1;
            }
        })
        dispatch(hideLoading());

        dispatch({
            type: ASSETS_GET_ALL,
            payload: {
                assets: res
            },
        });
    } catch (error: any) {
        dispatch(hideLoading());
        errorHandler(error, ASSETS_GET_ALL)
    }
}

export const getAssetById = (address: string, id: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoading());
        const res = await assetsService.getAssetById(address, id);
        dispatch(hideLoading());
        
        dispatch({
            type: ASSETS_GET_BY_ID,
            payload: {
                asset: res
            },
        });
    } catch (error: any) {
        dispatch(hideLoading());
        errorHandler(error, ASSETS_GET_ALL)
    }
}


