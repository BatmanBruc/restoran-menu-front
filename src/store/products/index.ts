import type {  Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import type { ProductsState } from './types';
import type { RootState } from '../types';

export const state: ProductsState = {
    list: [],
    item: null,
    item_id: null,
    loading_list: false,
    loading_item: false,
    count: 0,
    pagination: {
        take: 20,
        skip: 0
    }
};

export const products: Module<ProductsState, RootState> = {
    state,
    actions,
    mutations
};