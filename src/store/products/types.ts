import type { Dayjs } from 'dayjs';
import type { Pagination } from '../types';
import type { Category } from '../categories/types';

export type Image = {
    src: string,
    name?: String,
    id: number
}

export type Product = {
    id?: number,
    title: string,
    category?: Category
    category_id: number | null
    image?: Image | null
    image_id?: number | null
}

export interface ProductsState {
    list: Array<Product>,
    item: Product | null,
    item_id: number | null,
    loading_list: boolean,
    loading_item: boolean,
    pagination: Pagination,
    count: number
}