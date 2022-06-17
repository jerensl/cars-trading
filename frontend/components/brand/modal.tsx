import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Formik, Form, Field, FormikValues, FormikHelpers } from 'formik'

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

    const handleSubmit = (
        values: MyFormValues,
        actions: FormikHelpers<MyFormValues>
    ) => {
        console.log({ values, actions })
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
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
                                        <Form className="flex flex-col">
                                            <label className="mt-5">
                                                Upload File
                                            </label>
                                            <input
                                                type="file"
                                                name="photo"
                                                accept="image/*"
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
                                                Brand name
                                            </label>
                                            <Field
                                                className="w-44 py-2"
                                                id="description"
                                                name="description"
                                                placeholder="Description"
                                            />
                                            <label
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
                                            />
                                            <button
                                                type="submit"
                                                className="mt-10 inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Submit
                                            </button>
                                        </Form>
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
