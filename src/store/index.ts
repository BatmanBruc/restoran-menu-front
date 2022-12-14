import { createStore } from "vuex";
import type { RootState } from "./types";
import { categories } from './categories/index'
import { products } from './products/index'

const store = createStore<RootState>({
    state: {
        version: 0
    },
    modules: {
        categories,
        products
    }
})

export default store