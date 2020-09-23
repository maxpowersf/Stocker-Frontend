import { Category } from 'src/app/categories/models/category.model';

export class Product {
    id: number;
    name: string;
    photo: string;
    type: number;
    categoryId: number;
    category: Category;
    stock: number;
    minimumAccepted: number;
    minimumRequired: number;
    active: boolean;
}