import * as React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { Grid } from '../grid'
import { Brand_Modal } from './modal'

interface MyFormValues {
    query: string
}

export const Brands = (): React.ReactElement => {
    const initialValues: MyFormValues = { query: '' }

    const handleSubmit = (
        values: MyFormValues,
        actions: FormikHelpers<MyFormValues>
    ) => {
        console.log({ values, actions })
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
    }

    const queryValidation = Yup.object().shape({
        query: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    })

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
        </Grid>
    )
}
