import { del, get, patch, post, postForm, patchForm, put } from "./api";


export const sendOtp = (data) => post("/user/send-otp", data);
export const postRegister = (data) => post("/user/registration", data);
export const postLogin = (data) => post("/user/login", data);
export const postVerifyOtp = (data) => post("/user/verify-otp", data);
export const postResetPassword = (data) => post("/user/reset-password", data);
export const postChangePassword = (data) => post("/user/password", data);



// export const fetchCategories = data => get('/category/list', data)
export const fetchCategory = (data) => get("/category/:uid", data);
export const fetchCategoryElements = (data) => get("/category/elements", data);
// export const postCategory = data => post('/category', data)
// export const patchCategory = data => patch('/category/:uid', data)
// export const delCategory = data => del('/category/:uid', data)

export const fetchCategories = (data) => get("/category/list", data);
export const postCategory = (data) => postForm("/category", data);
export const delCategory = (data) => del("/category", data);

// admin blog tags
export const fetchTags = (data) => get("/tag/list", data);
export const postTag = (data) => post("/tag", data);
export const delTag = (data) => del("/tag", data);

// admin blog
export const fetchBlogs = (data) => get("/blog/list", data);
export const fetchBlog = (data) => get("/blog", data);
export const postBlog = (data) => postForm("/blog", data);
export const delBlog = (data) => del("/blog", data);
export const toggleBlogPublish = (data) => get("/blog/toggle-publish", data);
export const toggleBlogPopular = (data) => get("/blog/toggle-popular", data);


// admin property category
export const fetchPropertyCategories = (data) => get("/property/category/list", data);
export const fetchPropertyCategory = (data) => get("/property/category", data);
export const postPropertyCategory = (data) => post("/property/category", data);
export const delPropertyCategory = (data) => del("/property/category", data);

// admin property additional info
export const fetchPropertyAdditionalInfo = (data) => get("/property/additional-info/list", data);
export const fetchPropertyAdditionalInfoDetail = (data) => get("/property/additional-info", data);
export const postPropertyAdditionalInfo = (data) => post("/property/additional-info", data);
export const delPropertyAdditionalInfo = (data) => del("/property/additional-info", data);

// admin property
export const fetchAdminProperties = (data) => get("/property/admin-list", data);
export const fetchAdminProperty = (data) => get("/property", data);
export const postAdminProperty = (data) => post("/property", data);
export const delAdminProperty = (data) => del("/property", data);
export const toggleAdminPropertyActive = (data) => get("/property/toggle-active", data);
export const postPropertyStatus = (data) => post("/property/toggle-status", data);

// admin services
export const fetchServices = (data) => get("/service/list", data);
export const fetchService = (data) => get("/service", data);
export const postService = (data) => postForm("/service", data);
export const delService = (data) => del("/service", data);

// admin faq 
export const fetchFaq = (data) => get("/faq/list", data);
export const fetchFaqDetail = (data) => get("/faq", data);
export const postFaq = (data) => post("/faq", data);
export const delFaq = (data) => del("/faq", data);

// admin testimonials
export const fetchTestimonials = (data) => get("/testimonial/list", data);
export const fetchTestimonial = (data) => get("/testimonial", data);
export const postTestimonial = (data) => postForm("/testimonial", data);
export const delTestimonial = (data) => del("/testimonial", data);


//owner apis
export const fetchRideList = (data) => get("/vehicle/ride/list", data);
export const fetchVehicles = (data) => get("/vehicle/list", data);
export const fetchVehicleDetail = (data) => get("/vehicle", data);
export const postVehicle = (data) => postForm("/vehicle", data);
export const patchVehicle = (data) => patchForm("/vehicle", data);

export const fetchDriverHireList = (data) => get("/driver/hire/list", data);
export const fetchDriverHireDetail = (data) => get("/driver/hire", data);
export const patchDriverHire = (data) => patch('/driver/hire', data);
export const postDriverHire = (data) => post('/driver/hire', data);




//contact us
export const postContactUs = (data) => post("/contact", data);
export const fetchContact = (data) => get("/contact/list", data);
export const fetchContactDetail = (data) => get("/contact", data);
export const delContact = (data) => del("/contact", data);
export const replyContact = (data) => post("/contact/reply", data);

// settings
export const fetchAdminSettings = (data) => get('/settings', data);
export const postAdminSettings = (data) => postForm('/settings', data);

export const fetchDashboardData = (data) => get('/user/dashboard', data);

// admin subscription
export const fetchSubscription = (data) => get('/subscription/list', data);
export const fetchSubscriptionDetails = (data) => get('/subscription', data);
export const postSubscription = (data) => post('/subscription', data);
export const delSubscription = (data) => del('/subscription', data);

// admin payment methods 
export const fetchPaymentMethods = (data) => get("/payment/method/list", data);
export const fetchPaymentMethod = (data) => get("/payment/method", data);
export const postPaymentMethod = (data) => post("/payment/method", data);
export const delPaymentMethod = (data) => del("/payment/method", data);


// owner subscription 
export const buyOwnerSubscription = (data) => post('/subscription/buy', data);
export const fetchOwnerSubscriptionHistory = (data) => get('/subscription/history', data);
// newsletter
export const fetchNewsletter = (data) => get('/newsletter/list', data);
export const delNewsLetter = (data) => del('/newsletter', data);
export const postNewsLetter = (data) => post('/newsletter', data);

export const fetchUsers = (data) => get('/user/list', data);
export const fetchUserDetails = (data) => get('/user/details', data);
export const fetchUser = (data) => get("/user", data);


// languages 
export const fetchLanguages = (data) => get('/language/list', data);
export const fetchLanguage = (data) => get('/language', data);
export const postLanguage = (data) => post('/language', data);
export const delLanguage = (data) => del('/language', data);

// translations 
export const fetchTranslations = (data) => get('/language/translations', data);
export const fetchPublicLanguages = (data) => get('/languages', data);


// admin page
export const fetchSinglePage = (data) => get("/page", data);
export const postPage = (data) => postForm("/page", data);


// admin image file
export const postSingleImage = (data) => postForm("/file/single-image-upload", data);
export const postMultipleImage = (data) => postForm("/file/multiple-image-upload", data);
//agent profile
export const agentProfileUpdate = (data) => postForm("/user", data);



export const propertyCategories = (data) => get("/property-categories", data);
export const propertyAdditionalInfo = (data) => get("/property-additional-info", data);
export const postProperty = (data) => post("/property", data);
export const getAllProperty = (data) => get("/property/agent-list", data);
export const getAgentProperty = (data) => get("/property/agent", data);
export const delAgentProperty = (data) => del("/property/agent", data);


/* ---------------------------------------- site api -------------------------------- */

// agents list 
export const agentsList = (data) => get("/user/agents", data)
export const agentDetail = (data) => get("/user/agent", data)
export const agentDashboardDetail = (data) => get("/user/dashboard", data)


// blog list
export const blogListLatest = (data) => get("/blog/latest", data)
export const blogListPopular = (data) => get("/blog/popular", data)
export const propertyList = (data) => get("/property/list", data)
export const blogListCategories = (data) => get("/blog-categories", data)
export const blogDetails = (data) => get("/blog/details", data)

//public property
export const publicProperty = (data) => get("/property", data)
export const propertyReview = (data) => post("/property/review", data)
export const getPropertyReview = (data) => get("/property/review", data)
export const propertyContact = (data) => post("/agent-contact", data)
export const agentContactList = (data) => get("/agent-contact/list", data)
export const agentContactDetail = (data) => get("/agent-contact", data)
export const agentContactDelete = (data) => del("/agent-contact", data)

// services list
export const getServiceList = (data) => get("/services", data)
export const getPropertyList = (data) => get("/property/list", data)

// blog comments
export const blogComments = (data) => get("/comment", data)
export const postComments = (data) => post("/comment", data)
export const deleteComments = (data) => del("/comment", data)
export const deleteAdminComments = (data) => del("/comment/delete-admin", data)
export const postCommentReply = (data) => post("/commentReply", data)
export const deleteCommentReply = (data) => del("/commentReply", data)
export const deleteAdminCommentReply = (data) => del("/commentReply/delete-admin", data)
export const fetchSiteSettings = (data) => get("/siteSettings", data)
export const fetchUserTestimonials = (data) => get("/testimonials", data)

//subscription 
export const subscriptionPlan = (data) => get("/subscription/all", data)
export const subscriptionPlanDetails = (data) => get("/subscription/details", data)
export const createStripeSubscription = (data) => post("/subscription/create-stripe-subscription", data)
export const getUserHistorySubscription = (data) => get("/subscription/user-history", data)


// admin subscription list
export const fetchAdminSubscriptionHistoryList = (data) => get("/subscription/admin-history", data)


//email settings 
export const fetchEmailSettings = (data) => get("/mail-credential", data)
export const postEmailSettings = (data) => post("/mail-credential", data)

