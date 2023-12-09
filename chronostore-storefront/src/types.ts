export interface Product {
    id:string,
    thumbnail:string,
    title:string,
    images: Array<ProductImg>,
    options:ProductOption[],
    variants: Array<ProductVariant>,
    [key:string]:unknown
}

export interface ProductImg {
    id:string,
    url:string,
    [key:string]:unknown
}


export interface ProductOption {
    id:string,
    title:string,
    values: ProductOptionValue[],
    [key:string]:unknown
}

export interface ProductOptionValue {
    id:string,
    value:string,
    option_id:string,
    variant_id:string,
    [key:string]:unknown,
}

export interface ProductVariant {
    id: string,
    product_id: string,
    title: string,
    images: ProductImg[],
    prices: VariantPrice[];
    [key:string]:unknown,
}

export interface VariantPrice {
    id: string,
    currency_code: string,
    amount: number,
    [key:string]:unknown,
}