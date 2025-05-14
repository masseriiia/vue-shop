export interface Good {
    id?: number;
    name: string;
    price: number | null;
    oldPrice: number | null;
    photoUrl: string;
    updatedAt?: string;
    createdAt?: string;
    categoryId: number;
    createdBy?: number;
}