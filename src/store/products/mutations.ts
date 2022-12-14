import type { MutationTree } from "vuex";
import type { Pagination } from '../types';
import type { ProductsState, Product } from "./types";
import { ProductsMutationTypes } from "./mutation-types";

export const mutations: MutationTree<ProductsState> = {
    [ProductsMutationTypes.SET_PRODUCTS](state, payload: Array<Product>){
        state.list = payload;
    },

    [ProductsMutationTypes.SET_PRODUCTS_COUNT](state, payload: number){
        state.count = payload;
    },
    [ProductsMutationTypes.CHANGE_PRODUCTS_PAGE](state, payload: Pagination){
        state.pagination.skip = payload.skip;
        state.pagination.take = payload.take;
    },
    [ProductsMutationTypes.CHANGE_PRODUCTS_LOADING_LIST](state){
        state.loading_list = !state.loading_list;
    },
    [ProductsMutationTypes.CHANGE_PRODUCTS_LOADING_ITEM](state){
        state.loading_item = !state.loading_item;
    },
    [ProductsMutationTypes.SET_PRODUCT_ID](state, payload: number){
        state.item_id = payload;
    },
    [ProductsMutationTypes.SET_PRODUCT](state, payload: Product){
        state.item = payload;
    },
    [ProductsMutationTypes.REMOVE_PRODUCT](state){
        state.item = null;
        state.item_id = null;
    }
}