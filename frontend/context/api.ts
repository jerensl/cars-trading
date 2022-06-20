import { QueryClient } from 'react-query'

export interface Brand {
    id: string
    name: string
    logo: string
    description: string
    update_at: string
    status: string
}

export const queryClient = new QueryClient()

export interface Brands {
    data: Array<Brand>
    code: number
    message: string
}

export const getAllBrand = async (): Promise<Brands> =>
    fetch(`${process.env.NEXT_PUBLIC_RESTFULL_API}/brand`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json())

export const searchBrandByName = async (brand_name: string): Promise<Brands> =>
    fetch(`${process.env.NEXT_PUBLIC_RESTFULL_API}/brand/${brand_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json())

export const getBrandByID = async (brand_id: string): Promise<Brands> =>
    fetch(`${process.env.NEXT_PUBLIC_RESTFULL_API}/brand/detail/${brand_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json())
