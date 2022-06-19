import * as React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Navbar } from '../components/navbar'

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default MyApp
