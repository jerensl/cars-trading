import * as React from 'react'
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik'
import { Grid } from './grid'
import { Brand_Modal } from './card-modal'

interface MyFormValues {
    query: string
}

export const Brands = (): React.ReactElement => {
    const initialValues: MyFormValues = { query: '' }
    return (
        <Grid className="pt-20">
            <div className="col-span-full flex flex-row justify-between">
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        console.log({ values, actions })
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
                    }}
                >
                    <Form className="flex flex-col">
                        <div className="w-full bg-transparent border rounded-md focus-within:border-red-500 focus-within:ring focus-within:ring-red-400 focus-within:ring-opacity-40">
                            <Field
                                className="text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0 p-2 w-full"
                                id="query"
                                name="query"
                                placeholder="Search Car Brand.."
                            />
                        </div>
                    </Form>
                </Formik>
                <Brand_Modal />
            </div>
        </Grid>
    )
}
