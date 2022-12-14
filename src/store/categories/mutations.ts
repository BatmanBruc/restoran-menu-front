import type { MutationTree } from "vuex";
import type { Pagination } from '../types';
import type { CategoriesState, Category } from "./types";
import { CategoriesMutationTypes } from "./mutation-types";

export const mutations: MutationTree<CategoriesState> = {
    [CategoriesMutationTypes.SET_CATEGORIES](state, payload: Array<Category>){
        state.list = payload;
    },

    [CategoriesMutationTypes.SET_CATEGORIES_COUNT](state, payload: number){
        state.count = payload;
    },
    [CategoriesMutationTypes.CHANGE_CATEGORIES_PAGE](state, payload: Pagination){
        state.pagination.skip = payload.skip;
        state.pagination.take = payload.take;
    },
    [CategoriesMutationTypes.CHANGE_CATEGORIES_LOADING_LIST](state){
        state.loading_list = !state.loading_list;
    },
    [CategoriesMutationTypes.CHANGE_CATEGORIES_LOADING_ITEM](state){
        state.loading_item = !state.loading_item;
    },
    [CategoriesMutationTypes.SET_CATEGORY_ID](state, payload: number){
        state.item_id = payload;
    },
    [CategoriesMutationTypes.SET_CATEGORY](state, payload: Category){
        state.item = payload;
    },
    [CategoriesMutationTypes.REMOVE_CATEGORY](state){
        state.item = null;
        state.item_id = null;
    }
}