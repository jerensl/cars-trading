import * as React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { Grid } from '../grid'
import { Brand_Modal } from './modal'
import { useMutation, useQuery } from 'react-query'
import { getAllBrand, searchBrandByName, queryClient } from '../../context/api'
import { Card } from './card'
import { ListOfBrands } from './item'

interface MyFormValues {
    query: string
}

export const Brands = (): React.ReactElement => {
    const { data } = useQuery('brand', getAllBrand, {
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const mutation = useMutation(
        (brand_name: string) => searchBrandByName(brand_name),
        {
            // When mutate is called:
            onMutate: async (newBrand) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries('brand')

                // Snapshot the previous value
                const previousBrand = queryClient.getQueryData('brand')

                // Optimistically update to the new value
                queryClient.setQueryData('brand', newBrand)

                // Return a context object with the snapshotted value
                return { previousBrand, newBrand }
            },
            // If the mutation fails, use the context returned from onMutate to roll back
            onError: (err, newBrand, context) => {
                queryClient.setQueryData('brand', context?.previousBrand)
            },
            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries('brand')
            },
        }
    )

    const initialValues: MyFormValues = { query: '' }

    const handleSubmit = (
        values: MyFormValues,
        actions: FormikHelpers<MyFormValues>
    ) => {
        mutation.mutate(values.query)
        actions.setSubmitting(false)
    }

    const queryValidation = Yup.object().shape({
        query: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    })

    const allDataQuery = mutation.data?.data.length
        ? mutation.data?.data
        : data?.data

    return (
        <Grid className="pt-20">
            <div className="col-span-full flex flex-row justify-between">
                <Formik
                    initialValues={initialValues}
                    validationSchema={queryValidation}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="w-full bg-transparent border rounded-md focus-within:border-green-500 focus-within:ring focus-within:ring-green-400 focus-within:ring-opacity-40">
                                <Field
                                    className="text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0 p-2 w-full"
                                    id="query"
                                    name="query"
                                    placeholder="Search Car Brand.."
                                />
                            </div>
                            {errors.query && touched.query ? (
                                <div>{errors.query}</div>
                            ) : null}
                        </Form>
                    )}
                </Formik>
                <Brand_Modal />
            </div>
            <div className="col-span-full">
                <ListOfBrands brand={allDataQuery} />
                {/* {mutation.data?.data.length
                    ? mutation.data?.data.map(item)
                    : null}
                {!mutation.data?.data.length ? data?.data.map(item) : null} */}
            </div>
        </Grid>
    )
}
