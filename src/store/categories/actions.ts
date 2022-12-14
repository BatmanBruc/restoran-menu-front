import type { ActionTree } from 'vuex';
import type { CategoriesState, Category } from './types';
import type { RootState } from '../types';
import { CategoriesMutationTypes } from './mutation-types';
import {CategoriesActionTypes} from './action-types';
import { Api } from './../../services/Api';


export const actions: ActionTree<CategoriesState, RootState> = {
    [CategoriesActionTypes.GET_CATEGORIES]({ commit, state }): any {
        const api = new Api()
        commit(CategoriesMutationTypes.CHANGE_CATEGORIES_LOADING_LIST);
        api.post('/categories',{
            ...state.pagination
        }).then((response)=>{
            const list: Category[] = response.data.content.list;
            const count: number = response.data.content.count;
            commit(CategoriesMutationTypes.SET_CATEGORIES, list);
            commit(CategoriesMutationTypes.SET_CATEGORIES_COUNT, count);
            commit(CategoriesMutationTypes.CHANGE_CATEGORIES_LOADING_LIST);
        }, (error)=>{
            Api.showEror(error)
        })
    },
    [CategoriesActionTypes.GET_CATEGORY]({ commit, state }): any {
        const api = new Api()
        commit(CategoriesMutationTypes.CHANGE_CATEGORIES_LOADING_ITEM);
        api.get('/category/' + state.item_id,).then((response)=>{
            commit(CategoriesMutationTypes.SET_CATEGORY, response.data.content);
            commit(CategoriesMutationTypes.CHANGE_CATEGORIES_LOADING_ITEM);
        }, (error)=>{
            Api.showEror(error)
        })
    }
};