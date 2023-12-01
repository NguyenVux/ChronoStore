export interface Product {
    id:string,
    thumbnail:string,
    title:string,
    images: Array<ProductImg>,
    [key:string]:any
}

export interface ProductImg {
    id:string,
    url:string,
    [key:string]:any
}