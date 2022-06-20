import * as React from 'react'
import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { getAllBrand, getBrandByID } from '../../context/api'
import { Grid } from '../../components/grid'
import Image, { ImageLoader } from 'next/image'

const blobStorageIoImageLoader: ImageLoader = ({ src }) => {
    return `http://localhost:8000/brand/${src}`
}

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
        <Grid className="pt-20 gap-10">
            <div className="col-span-full">
                <h1 className="text-2xl font-medium">Brand Logo</h1>

                <Image
                    loader={blobStorageIoImageLoader}
                    src={brand.data[0].logo}
                    alt="Person"
                    objectFit="cover"
                    height="150px"
                    width="150px"
                    className="w-full h-full rounded-full"
                />
            </div>
            <div className="col-span-full flex flex-col gap-4">
                <h2 className="text-2xl font-medium">Brand Detail</h2>
                <div>
                    <h3>Brand Name</h3>
                    <h4 className="text-xl font-medium">
                        {brand.data[0].name}
                    </h4>
                </div>

                <div>
                    <h3>Brand Description</h3>

                    <h4 className="text-xl font-medium">
                        {brand.data[0].description}
                    </h4>
                </div>

                <div>
                    <h3>Brand Status</h3>
                    <h4 className="text-xl font-medium">
                        {brand.data[0].status}
                    </h4>
                </div>
            </div>
        </Grid>
    )
}
