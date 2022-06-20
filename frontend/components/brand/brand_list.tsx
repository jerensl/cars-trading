import * as React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { Grid } from '../grid'
import { Brand_Modal } from './modal'
import { useMutation, useQuery } from 'react-query'
import { getAllBrand, searchBrandByName, queryClient } from '../../context/api'
import { Card } from './card'
import { ListOfBrands } from './item'
import clsx from 'clsx'

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
                            <Field
                                className={clsx(
                                    'text-sm rounded-lg block w-full p-2.5',
                                    {
                                        'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500':
                                            errors.query,
                                        'bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500':
                                            !errors.query,
                                    }
                                )}
                                id="query"
                                name="query"
                                placeholder="Search Car Brand.."
                            />
                        </Form>
                    )}
                </Formik>
                <Brand_Modal />
            </div>
            <div className="col-span-full">
                <ListOfBrands brand={allDataQuery} />
            </div>
        </Grid>
    )
}
