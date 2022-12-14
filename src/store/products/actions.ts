import type { ActionTree } from 'vuex';
import type { ProductsState, Product } from './types';
import type { RootState } from '../types';
import { ProductsMutationTypes } from './mutation-types';
import { ProductsActionTypes } from './action-types';
import { Api } from '../../services/Api';


export const actions: ActionTree<ProductsState, RootState> = {
    [ProductsActionTypes.GET_PRODUCTS]({ commit, state }): any {
        const api = new Api()
        commit(ProductsMutationTypes.CHANGE_PRODUCTS_LOADING_LIST);
        api.post('/products',{
            ...state.pagination
        }).then((response)=>{
            const list: Product[] = response.data.content.list;
            const count: number = response.data.content.count;
            commit(ProductsMutationTypes.SET_PRODUCTS, list);
            commit(ProductsMutationTypes.SET_PRODUCTS_COUNT, count);
            commit(ProductsMutationTypes.CHANGE_PRODUCTS_LOADING_LIST);
        }, (error)=>{
            Api.showEror(error)
            commit(ProductsMutationTypes.CHANGE_PRODUCTS_LOADING_LIST);
        })
    },
    [ProductsActionTypes.GET_PRODUCT]({ commit, state }): any {
        const api = new Api()
        commit(ProductsMutationTypes.CHANGE_PRODUCTS_LOADING_ITEM);
        api.get('/product/' + state.item_id,).then((response)=>{
            commit(ProductsMutationTypes.SET_PRODUCT, response.data.content);
            commit(ProductsMutationTypes.CHANGE_PRODUCTS_LOADING_ITEM);
        }, (error)=>{
            Api.showEror(error)
        })
    }
};