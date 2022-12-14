import type { Dayjs } from 'dayjs';
import type { Pagination } from '../types';


export type Category = {
    id?: number,
    title: string
}

export interface CategoriesState {
    list: Array<Category>,
    item: Category | null,
    item_id: number | null,
    loading_list: boolean,
    loading_item: boolean,
    pagination: Pagination,
    count: number
}