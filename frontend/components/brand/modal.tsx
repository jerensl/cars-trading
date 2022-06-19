import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Formik, Form, Field, FormikHelpers } from 'formik'

interface MyFormValues {
    brandName: string
    description: string
    brandStatus: string
    photo: string
}

export function Brand_Modal() {
    let [isOpen, setIsOpen] = React.useState(false)
    const initialValues: MyFormValues = {
        brandName: '',
        description: '',
        brandStatus: '',
        photo: '',
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleSubmit = async (
        values: MyFormValues,
        actions: FormikHelpers<MyFormValues>
    ) => {
        const data = {
            name: values.brandName,
            description: values.description,
        }
        const resp = await fetch(
            `${process.env.NEXT_PUBLIC_RESTFULL_API}/brand`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )

        const respData = await resp.json()
        const formUploadImage = new FormData()

        formUploadImage.append('brand_id', respData.data[0].id)
        formUploadImage.append('image', values.photo)

        await fetch(
            `${process.env.NEXT_PUBLIC_RESTFULL_API}/brand/uploadimage`,
            {
                method: 'POST',
                body: formUploadImage,
            }
        )
        actions.setSubmitting(false)
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={openModal}
                className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
            >
                Add Brand
            </button>
            <Transition appear show={isOpen} as={React.Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add Car Brand
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Setup your car brand
                                        </p>
                                    </div>
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={handleSubmit}
                                    >
                                        {(formik) => {
                                            return (
                                                <Form className="flex flex-col">
                                                    <label className="mt-5">
                                                        Upload File
                                                    </label>
                                                    <input
                                                        type="file"
                                                        name="photo"
                                                        accept="image/*"
                                                        onChange={(
                                                            e: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            if (
                                                                !e.target
                                                                    .files ||
                                                                e.target.files
                                                                    .length ===
                                                                    0
                                                            ) {
                                                                return
                                                            }

                                                            const image =
                                                                e.target
                                                                    .files[0]

                                                            formik.setFieldValue(
                                                                'photo',
                                                                image
                                                            )
                                                        }}
                                                    />
                                                    <label
                                                        className="mt-5"
                                                        htmlFor="brandName"
                                                    >
                                                        Brand name
                                                    </label>
                                                    <Field
                                                        className="w-44 py-2"
                                                        id="brandName"
                                                        name="brandName"
                                                        placeholder="Brand Name"
                                                    />
                                                    <label
                                                        className="mt-5"
                                                        htmlFor="description"
                                                    >
                                                        Description
                                                    </label>
                                                    <Field
                                                        className="w-44 py-2"
                                                        id="description"
                                                        name="description"
                                                        placeholder="Description"
                                                    />
                                                    {/* <label
                                                    className="mt-5"
                                                    htmlFor="brandStatus"
                                                >
                                                    Brand Status
                                                </label>
                                                <Field
                                                    className="w-44 py-2"
                                                    id="brandStatus"
                                                    name="brandStatus"
                                                    placeholder="Brand Status"
                                                /> */}
                                                    <button
                                                        type="submit"
                                                        className="mt-10 inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                    >
                                                        Submit
                                                    </button>
                                                </Form>
                                            )
                                        }}
                                    </Formik>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
