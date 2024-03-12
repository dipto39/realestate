"use client";
import React, { useEffect } from 'react';
import { fetchLanguage, fetchTranslations, postLanguage } from '../../../../../helpers/backend';
import { useAction, useFetch } from '../../../../../helpers/hooks';
import { Card, Form } from 'antd';
import PageTitle from '../../../../../../components/common/title';
import { HiddenInput } from '../../../../../../components/form/input';
import Button from '../../../../../../components/common/button';


const Translations = ({ params }) => {
    const [translations, getTranslations] = useFetch(fetchTranslations, {}, false)
    const [data, getData, { loading }] = useFetch(fetchLanguage, {}, false);

    useEffect(() => {
        if (params?._id) {
            getData({ _id: params?._id });
            getTranslations({ _id: params?._id });
        }
    }, [params]);

    useEffect(() => {
        if (translations) {
            let values = {}
            Object?.keys(translations?.translations ?? {})?.forEach(key => {
                values = {
                    ...values,
                    [params._id]: {
                        ...values[params._id],
                        [key]: {
                            value: translations?.translations[key],
                        }
                    }
                }
            })
            form.setFieldsValue(values);
        }
    }, [translations]);

    const [form] = Form.useForm();

    const keys = [
        { name: 'Dashboard' },
        { name: 'Admin Dashboard' },
        { name: 'Home' },
        { name: 'About' },
        { name: 'About Us' },
        { name: 'Contact' },
        { name: 'Contact Us' },
        { name: 'Privacy Policy' },
        { name: 'Terms & Conditions' },
        { name: 'Settings' },
        { name: 'Countries' },
        { name: 'Languages' },
        { name: 'Translations' },
        { name: 'Add Country' },
        { name: 'Add Languages' },
        { name: 'Add Translation' },
        { name: 'Add Product' },
        { name: 'Add Customer' },
        { name: 'Add Order' },
        { name: 'Edit Country' },
        { name: 'Edit Languages' },
        { name: 'Edit Translation' },
        { name: 'Edit Product' },
        { name: 'Edit Customer' },
        { name: 'Edit Order' },
        { name: 'Name' },
        { name: 'Code' },
        { name: 'Currency' },
        { name: 'RTL' },
        { name: 'Submit' },
        { name: 'Update' },
        { name: 'Edit' },
        { name: 'Delete' },
        { name: 'View' },
        { name: 'Add' },
        { name: 'Save' },
        { name: 'Cancel' },
        { name: 'Actions' },
        { name: 'No' },
        { name: 'Yes' },
        { name: 'Profile' },
        { name: 'Wallet' },
        { name: 'Logout' },
        { name: 'Log in' },
        { name: 'Sign up' },
        { name: 'Email' },
        { name: 'About Us' },
        { name: 'Contact Us' },
        { name: 'Terms & Condition' },
        { name: 'Privacy Policy' },
        { name: 'Get User App On' },
        { name: 'Get Driver App On' },
        { name: 'Live Site' },
        { name: 'Categories' },
        { name: 'Users' },
        { name: 'Vehicle List' },
        { name: 'Currencies' },
        { name: 'Payment Methods' },
        { name: 'Subscription' },
        { name: 'Newsletter' },
        { name: 'Contacts' },
        { name: 'Add New Blog' },
        { name: 'Title' },
        { name: 'Blog Tags' },
        { name: 'Details' },
        { name: 'Add to popular' },
        { name: 'Published' },
        { name: 'Images' },
        { name: 'Submit' },
        { name: 'Blog Categories' },
        { name: 'Add New' },
        { name: 'Blog Category Details' },
        { name: 'Edit Blog' },
        { name: 'Blog Tags' },
        { name: 'Blog Tags Details' },
        { name: 'Tags' },
        { name: 'Comments' },
        { name: 'Load More' },
        { name: 'Comment' },
        { name: 'Submit New Comments' },
        { name: 'Reply' },
        { name: 'Popular' },
        { name: 'Blog List' },
        { name: 'Subject' },
        { name: 'Reply Message' },
        { name: 'Contact Us SMS Reply' },
        { name: 'View Quote Details Information' },
        { name: 'Client Name' },
        { name: 'Client Email' },
        { name: 'Client Phone' },
        { name: 'Query' },
        { name: 'Email To' },
        { name: 'Send' },
        { name: 'Question' },
        { name: 'Answer' },
        { name: 'Frequently Ask Qsn' },
        { name: 'Frequently Ask Qsn Details' },
        { name: 'Add Languages' },
        { name: 'Language Information' },
        { name: 'Code' },
        { name: 'Flag' },
        { name: 'Rtl Support' },
        { name: 'Edit Languages' },
        { name: 'Created At' },
        { name: 'Newsletter List' },
        { name: 'Pages List' },
        { name: 'Planning & Designing' },
        { name: 'Description' },
        { name: 'Sweet Journey' },
        { name: 'Heading' },
        { name: 'Address' },
        { name: 'Google Map Address' },
        { name: 'Home Page' },
        { name: 'Hero Section' },
        { name: 'Renovation' },
        { name: 'Achievements' },
        { name: 'Count' },
        { name: "Renovation can't be negative" },
        { name: "Renovation should be number" },
        { name: 'Agents' },
        { name: "Agents can't be negative" },
        { name: 'Agents should be number' },
        { name: 'Project' },
        { name: "Project can't be negative" },
        { name: 'Project should be number' },
        { name: 'Satisfied Clients' },
        { name: "Satisfied Clients can't be negative" },
        { name: 'Satisfied Clients should be number' },
        { name: 'Payment Method Information' },
        { name: 'Method Type' },
        { name: 'Paypal Client ID' },
        { name: 'Paypal Client Secret' },
        { name: 'Paypal Mode' },
        { name: 'Stripe Client ID' },
        { name: 'Stripe Client Secret' },
        { name: 'Stripe Mode' },
        { name: 'Edit Payment Method' },
        { name: 'Payment Method List' },
        { name: 'Price' },
        { name: 'Plan Type' },
        { name: 'Credits' },
        { name: 'Minimum Buying' },
        { name: 'Other' },

        { name: "My Credits" },
        { name: "Pricing Plan" },
        { name: "Reset Password" },
        { name: "Account Information" },
        { name: "Profile Picture" },
        { name: "Logged out successfully" },
        { name: "Total Properties" },
        { name: "Approved Properties" },
        { name: "Pending Properties" },
        { name: "Rejected Properties" },
        { name: "Name" },
        { name: "Email" },
        { name: "Phone Number" },
        { name: "About" },
        { name: "Address" },
        { name: "Facebook Link" },
        { name: "Twitter Link" },
        { name: "Instagram Link" },
        { name: "Linkedin Link" },
        { name: "Image" },
        { name: "Submit" },
        { name: "Packages" },
        { name: "Your credits" },
        { name: "credits" },
        { name: "Plan Name" },
        { name: "Your current credits credit's" },
        { name: "ID" },
        { name: "Active" },
        { name: "Inactive" },
        { name: "Transactions" },
        { name: "Opps" },
        { name: "No transactions" },
        { name: "Agent Dashboard" },
        { name: "Please subscribe to add new property" },
        { name: "Add New Property" },
        { name: "Property Details" },
        { name: "Nearest Location" },
        { name: "Location" },
        { name: "Distance" },
        { name: "Property Plan" },
        { name: "Video" },
        { name: "Reviews" },
        { name: "Add a Review" },
        { name: "Rating" },
        { name: "Please give a rating" },
        { name: "Write your review here" },
        { name: "Failed to add property" },
        { name: "Please subscribe to add property" },
        { name: "Title" },
        { name: "Category" },
        { name: "Type" },
        { name: "Description" },
        { name: "Property Location" },
        { name: "Cost can't be negative" },
        { name: "Cost should be number" },
        { name: "Bathrooms" },
        { name: "Total Garage" },
        { name: "Total Kitchen" },
        { name: "Area" },
        { name: "Unit" },
        { name: "Price" },
        { name: "Country" },
        { name: "City" },
        { name: "Additional Information" },
        { name: "Distance(km)" },
        { name: "Add More" },
        { name: "Select Location" },
        { name: "Thumb Image" },
        { name: "Video Description" },
        { name: "Please input your old password!" },
        { name: "Enter Your Old Password" },
        { name: "Old Password" },
        { name: "New Password" },
        { name: "Please input your new password!" },
        { name: "Enter Your New Password" },
        { name: "Please confirm your password!" },
        { name: "The new password that you entered do not match!" },
        { name: "Confirm Your Password" },
        { name: "Subject" },
        { name: "month" },
        { name: "Please login first a agent" },
        { name: "Choose this plan" },
        { name: "Choose Plan" },
        { name: "Latest News From Blogs" },
        { name: "Explore All News" },
        { name: "Read More" },
        { name: "Property Agent" },
        { name: "Real Estate Agent" },
        { name: "Message" },
        { name: "Send Message" },
        { name: "Comments" },
        { name: "Tags" },
        { name: "Reply" },
        { name: "Submit New Comments" },
        { name: "Write a comment" },
        { name: "Load More" },
        { name: "Share News" },
        { name: "Popular Blog" },
        { name: "Clear" },
        { name: "Blog Categories" },
        { name: "Find Property" },
        { name: "Sale" },
        { name: "Rent" },
        { name: "Enter Location" },
        { name: "Select City" },
        { name: "Select Country" },
        { name: "View More" },
        { name: "We provide the best service for you" },
        { name: "Featured Properties" },
        { name: "All Property" },
        { name: "For Sale" },
        { name: "For Rent" },
        { name: "View" },
        { name: "These are the latest properties in the Sales category. You can create the list using the “latest listing shortcode” and show items by specific  categories" },

        { name: "Explore All Propertys" },
        { name: "Meet Our Amazing Agents" },
        { name: "View all" },
        { name: "Get in touch with us" },
        { name: "Contact Information" },
        { name: "Say something to start a live chat!" },
        { name: "Any question or remarks? Just write us a message!" },
        { name: "Email Address" },
        { name: "Company Name" },
        { name: "What our clients says about us" },
        { name: "Search Propertys" },
        { name: "A Message" },
        { name: "Leave Us" },
        { name: "Contact Us" },
        { name: "We provide the best service for you" },
        { name: "Property for" },
        { name: "What our happy clients says about Us" },
        { name: "Client" },
        { name: "Beds" },
        { name: "Baths" },
        { name: "sqft" },
        { name: "Price" },
        { name: "View All" },
        { name: "Become a Agent" },
        { name: "Sign up Today" },
        { name: "Subscribe" },
        { name: "Enter your email" },
        { name: "Overview" },
        { name: "Features" },
        { name: "Pricing" },
        { name: "Help" },
        { name: "About Us" },
        { name: "Terms & Conditions" },
        { name: "Privacy" },
        { name: "Become a Agent" },
        { name: "Sign up Today" },
        { name: "About Me" },
        { name: "Frequently Asked Question" },
        { name: "The page you are looking for does not exist. It might have been moved or deleted." },
        { name: "Back To Homepage" },
        { name: "Oops... Page Not Found!" },
        { name: "Please confirm your email address below and we will send you a verification code." },
        { name: "Continue with Gmail" },
        { name: "Continue with Phone" },
        { name: "Forgot Your Password?" },
        { name: "Please input your Email!" },
        { name: "Phone Number" },
        { name: "Send OTP" },
        { name: "Verify Code" },
        { name: "Verify" },
        { name: "resend in" },
        { name: "s" },
        { name: "Welcome Back" },
        { name: "Please enter your account details to continue." },
        { name: "Sign in with Gmail" },
        { name: "Sign in with Phone" },
        { name: "Phone Number" },
        { name: "Password" },
        { name: "Please input your password!" },
        { name: "Enter Your Password" },
        { name: "Login" },
        { name: "Forgot Password" },
        { name: "Sign Up" },
        { name: "Don't have an account?" },
        { name: "Your code send to this" },
        { name: "bilsanders@gmial.com" },
        { name: "email account." },
        { name: "Payment Cancelled" },
        { name: "Payment Success" },
        { name: "Plan Details" },
        { name: "Standard" },
        { name: "Please provide Custom Plan" },
        { name: "Custom Plan should be more than" },
        { name: "Total Cradite" },
        { name: "Payment Method" },
        { name: "Stripe" },
        { name: "Checkout" },
        { name: "Par Cradite" },
        { name: "Custom Plan" },
        { name: "Enter Custom Plan" },
        { name: "Admin" },
        { name: "Fullname" },
        { name: "Phone" },
        { name: "Please input a valid email!" },
        { name: "Property Not Found!!!" },
        { name: "Property Details" },
        { name: "Agents" },
        { name: "Contact Us" },
        { name: "404 Error" },
        { name: "Faq" },
        { name: "Frequently Asked Questions" },
        { name: "Latest News" },
        { name: "rivacy Policy" },
        { name: "Properties" },
        { name: "Services" },
        { name: "Terms & Condition" },

        { name: "Add Properties" },
        { name: "Home" },
        { name: "Pages" },
        { name: "Property" },
        { name: "Contact" },
        { name: "Home 2" },
        { name: "Home 3" },
        { name: "News" },
        { name: "Logout" },
        { name: "Dashboard" },
        { name: "Profile" },
        { name: "Follow Us" },

        { name: "Create Account" },
        { name: "Already have an account?" },
        { name: "OTP sent to" },
        { name: "Sign up as User" },
        { name: "Sign up as Agent" },
        { name: "Please input your User Name!" },
        { name: "User Name" },
        { name: "Enter Your Username" },
        { name: "Confirm Password" },
        { name: "By signing up. you agree to the" },
        { name: "Terms of Service" },
        { name: "and" },
        { name: "Privacy policy" },
        { name: "Sign Up" },
        { name: "Didn't receive the code?" },
        { name: "Resend" },
        { name: "m" },
        { name: "Agent’s Details" },
        { name: "Please enter a valid email address" },
        { name: "Meet With Team" },
        { name: "Short Description" },
        { name: "Select Category" },
    ];

    const handleSubmit = async values => {
        let translations = []
        Object.keys(values)?.forEach(lang => {
            Object.keys(values[lang])?.forEach(key => {
                translations.push({
                    [key]: values[lang][key].value,
                })
            })
        })

        const translationsObject = {
            translations: Object.assign({}, ...translations)
        };

        return useAction(postLanguage, {
            _id: params._id,
            name: data?.name,
            code: data?.code,
            flag: data?.flag,
            ...translationsObject
        }, () => {
            getTranslations({ _id: params?._id });
        })
    }
    return (
        <>
            <PageTitle title="Translations" />
            <Card>
                <div className="card">
                    <div className="body">
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            <table className="w-full">
                                <thead className='bg-slate-300'>
                                    <tr>
                                        <th className="px-4 py-2 text-start">English</th>
                                        <th className="px-4 py-2">
                                            {data?.name}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {keys?.map((key, index) => (
                                        <tr key={index} className='w-full'>
                                            <th className="bg-white pt-3 px-4 py-2 flex justify-start">{key?.name}</th>
                                            <td key={index} className="px-4 py-2">
                                                <HiddenInput
                                                    name={[params._id, key.name, 'type']}
                                                    initialValue={key.type}
                                                />
                                                <Form.Item
                                                    className="mb-0 w-full"
                                                    initialValue=""
                                                    name={[params._id, key.name, 'value']}>
                                                    <input
                                                        className="w-full border-gray-300 rounded-md"
                                                        style={{
                                                            border: '1px solid #ddd',
                                                            padding: '5px 5px'
                                                        }}
                                                    />
                                                </Form.Item>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Button>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>

            </Card>

        </>
    );
};

export default Translations;