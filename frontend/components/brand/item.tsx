import * as React from 'react'
import Image, { ImageLoader } from 'next/image'
import { Brand } from '../../context/api'
import { LinkURL } from '../link_url'

const blobStorageIoImageLoader: ImageLoader = ({ src }) => {
    return `http://localhost:8000/brand/${src}`
}

const HeadTable = () => {
    return (
        <thead>
            <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    description
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Updated at
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
            </tr>
        </thead>
    )
}

const BodyTable = ({
    id,
    name,
    description,
    logo,
    update_at,
    status,
}: Brand) => {
    return (
        <tr key={id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                        <Image
                            loader={blobStorageIoImageLoader}
                            src={logo}
                            alt="Person"
                            objectFit="cover"
                            height="150px"
                            width="150px"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                    <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {name}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {description}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(update_at).toLocaleDateString()}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span
                        aria-hidden
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">{status}</span>
                </span>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <LinkURL href={`/dashboard/${id}`}>
                    <a className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                        View Detail
                    </a>
                </LinkURL>
            </td>
        </tr>
    )
}

export const ListOfBrands = ({ brand }: { brand: Brand[] | undefined }) => {
    return (
        <table className="min-w-full leading-normal">
            <HeadTable />
            {brand?.map(BodyTable)}
        </table>
    )
}
