import * as React from 'react'
import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { getAllBrand, getBrandByID } from '../../context/api'

export const getStaticPaths: GetStaticPaths = async () => {
    const brand = await getAllBrand()
    const brands = brand.data

    return {
        paths: brands.map(({ id }) => ({
            params: {
                id: id,
            },
        })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (
    context: GetStaticPropsContext
) => {
    const brand = await getBrandByID(context.params?.id as string)

    return {
        props: {
            brand,
        },
    }
}

export default function Brands({
    brand,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <div className="pt-20">
            <h1>{brand.data[0].name}</h1>
        </div>
    )
}
