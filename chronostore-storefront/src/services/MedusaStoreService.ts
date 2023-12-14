import { email } from "@vuelidate/validators";
import { store } from "../store";
import { Product } from "../types";
import { Store } from "vuex";
import { stringify } from "querystring";

const baseUrl = import.meta.env.VITE_MEDUSA_BACKEND_URL ?? 'http://localhost:9000';
store.subscribe((mutation,state)=>{
    if(mutation.type === 'update-token')
    {
        if(state.token === null)
        {
            localStorage.removeItem('access-token');
        }
        else {
            localStorage.setItem('access-token',state.token);
        }
    }

});
export interface Pagination {
    count: number,
    limit: number,
    offset: number,
}
export type ProductsPagination = { products:Product[] } & Pagination;
export class ProductService {
    async ListAll() : Promise<ProductsPagination> {
        const result = await fetch(`${baseUrl}/store/products`,{});
        if(result.ok)
        {
            return await result.json();
        }
        throw new Error(await result.text());
    }

    async Get(id: string): Promise<Product> {
        const result = await fetch(`${baseUrl}/store/products/${encodeURI(id)}`,{});
        if(result.ok)
        {
            return (await result.json()).product as Product;
        }
        console.log(result);
        throw new Error(await result.text());
    }
}

export interface Customer {
    id: string;
    skybioUid:string;
    email: string;
    first_name: string;
    last_name: string;
    billing_address_id: string | null;
    phone: string;
    has_account: boolean;
    billing_address: any | null;
    shipping_addresses: any[];
}

export interface LoginData {
    email: string,
    password: string,
}

export interface loginResult {
    access_token:string,
}
interface registerData 
{
  first_name:string;
  last_name:string;
  phone:string;
  email:string;
  password:string;
}
export class CustomerService {
    async me() : Promise<Customer> {
        const result = await fetch(`${baseUrl}/store/customers/me`,{
            headers: {
                'Authorization': `Bearer ${store.state.token}`
            }
        });
        if(result.ok)
        {
            return (await result.json()).customer as Customer;
        }
        throw new Error(await result.text());
    }
    async login(data: LoginData) : Promise<loginResult>
    {
        console.log(JSON.stringify(data));
        const result = await fetch(`${baseUrl}/store/auth/token`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data) ,
        });

        if(result.ok)
        {
            return (await result.json()) as loginResult;
        }
        throw new Error(await result.text());
    }

    async faceLogin(data: {file:Blob,email:string}) : Promise<loginResult>
    {
        const formdata = new FormData();
        formdata.append('email',data.email);
        formdata.append('file',data.file);
        const result = await fetch(`${baseUrl}/store/auth/face`,{
            method: 'POST',
            body: formdata ,
        });

        if(result.ok)
        {
            return (await result.json()) as loginResult;
        }
        throw new Error(await result.text());
    }

    async registerFace(files: Blob[]) : Promise<any>
    {

        const formData = new FormData();
        files.forEach(blob => formData.append('files',blob));
        const result = await fetch(`${baseUrl}/store/auth/add-face`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${store.state.token}`
            },
            body:formData,
        });

        if(result.ok)
        {
            return (await result.json()) as any;
        }
        throw new Error(await result.text());
    }
    async register(data: registerData) : Promise<any>
    {
        const result = await fetch(`${baseUrl}/store/customers`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
        });

        if(result.ok)
        {
            return (await result.json()) as any;
        }
        throw new Error(await result.text());
    }
}
export interface MedusaService{
    products: ProductService,
    customer: CustomerService,
}
export const MedusaStoreService:MedusaService = {
    products : new ProductService(),
    customer : new CustomerService(),
}