export interface Good {
    id?: number;
    name: string;
    price: number | null;
    oldPrice: number | null;
    photoUrl: string;
    categoryId: number | string;
    createdAt?: number
    updatedAt?: number
    createdBy?: number
}