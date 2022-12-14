import type {  Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import type { CategoriesState } from './types';
import type { RootState } from '../types';

export const state: CategoriesState = {
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

export const categories: Module<CategoriesState, RootState> = {
    state,
    actions,
    mutations
};