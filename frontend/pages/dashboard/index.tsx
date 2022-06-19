import type { NextPage } from 'next'
import Head from 'next/head'
import { Brands } from '../../components/brand/brand_list'

const Dashboard: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Cars Trade</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Brands />
        </div>
    )
}

export default Dashboard
