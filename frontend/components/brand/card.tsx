import Image, { ImageLoader } from 'next/image'
import { Brand } from '../../context/api'

const blobStorageIoImageLoader: ImageLoader = ({ src }) => {
    return `http://localhost:8000/brand/${src}`
}

export const Card = ({
    id,
    name,
    description,
    logo,
    status,
    update_at,
}: Brand): React.ReactElement => {
    return (
        <article
            key={id}
            className="col-span-full md:col-span-4 lg:col-span-4 rounded-md border border-gray-400"
        >
            <div className="relative overflow-auto">
                <Image
                    loader={blobStorageIoImageLoader}
                    src={logo}
                    alt="Person"
                    objectFit="cover"
                    height="200px"
                    width="450px"
                    className="relative transition duration-250 ease-in-out scale-100 hover:scale-110 cursor-pointer"
                />
            </div>
            <div className="flex flex-col p-2 justify-between">
                <div className="flex flex-col">
                    <h1 className="text-2xl pb-4 font-bold leading-8 tracking-tight cursor-pointer">
                        {name}
                    </h1>

                    <p className="line-clamp-3">{description}</p>
                </div>
                <p className="text-gray-500">hello</p>
            </div>
        </article>
    )
}
