import React from 'react'
import { LinkURL } from './link_url'

export const Navbar = (): React.ReactElement => {
    return (
        <nav className="fixed w-full z-10 bg-white px-5vw">
            <div className="flex text-center justify-between border-b-2 h-full w-full border-gray-100">
                <LinkURL
                    href="/"
                    className="font-semibold m-0 text-xl py-5 w-24 hover:bg-gray-100"
                >
                    Cars Trade
                </LinkURL>
                <div className="flex text-center my-auto md h-full">
                    <div className="text-center h-full w-full hidden md:flex">
                        <LinkURL
                            href="/dashboard"
                            className="hidden md:block font-semibold text-gray-800 text-xl py-5 w-24 hover:bg-gray-100"
                        >
                            Dashboard
                        </LinkURL>
                    </div>
                </div>
            </div>
        </nav>
    )
}