install packages

1. npm install react-router-dom
2. npm install axios
3. npm install react-helmet-async // for alter html title
4. npm install @reduxjs/toolkit // for state managament
5. npm install redux-thunk // api action delay
6. npm install redux-devtools-extension
7. npm install --save react-toastify
8. npm install rc-pagination 
9. npm install rc-slider
10. npm install rc-tooltip
11. npm install countries-list
12. npm install @stripe/react-stripe-js @stripe/stripe-js
13. npm install react-data-table-component@7.7.0
14. npm install react-icons

 npm install axios react-helmet-async redux react-redux redux-thunk redux-devtools redux-devtools-extension

then go and check package.json for install details

___________________________________________________________________________________________________________________

then go to app.css and setup based on your projects like styles, fonts, public, images, and cdn links for frameworks

then create layouts ex nav, footer, hero

then router setup like / , * 404 page etc

____________________________________________________________________________________________________________________

then using helmet provider to handle the project title routing path names

____________________________________________________________________________________________________________________

redux setup, chrome redux extension

____________________________________________________________________________________________________________________

create product reducer

create proxy in package.json

setup api with ui

create loader and implement functionality

for error set trostify install  trostify and import in App.jsx {}

next create product detail using params useNavigate
___________________________________________________________________________________________________________________

Next pagination

npm install rc-pagination 

__________________________________________________________________________________________________________________

Product Search 
search product validations, logics

Filter API Implementation
rc-slider npm install rc-slider npm install rc-tooltip

category Filter

Filter By Raitngs
_______________________________________________________________________________________________________________

Auth Slice
Auth Action
Creating Login Component

__________________________________________________________________________________________________________________

Register Reducer & Action
Resister Component
for this register to read avathar we added multiple form datas so for backend need to install npm install multer
_________________________________________________________________________________________________________________

Load Logged User data
Show user details, header style and display user name
Logout user
Show User Profile
____________________________________________________________________________________________________________________

Protected Route create protected rout with childern and call in the route path of the component

Update Profile Reducers & Action

_______________________________________________________________________________________________________________________

Password Update
Forgot & Reset Password 
_________________________________________________________________________________________________________________________

handle-quantity-selection 

Add to cart Button and store in local storage
cart component
Remove Item cart
Handle Cart Summary

_____________________________________________________________________________________________________________________________

Shipping Component

npm install countries-list

Checkout Steps
______________________________________________________________________________________________________________________________

confirm order

Stripe for payment first backend

stripe setup in frontend in App.jsx

Stripe package install 

npm install @stripe/react-stripe-js @stripe/stripe-js

Payment using stripe elements in payment component

next create rOrderComplete reducer to clear local and session storage shippingInfo, cart and product itmes

for stripe test docs datas use https://dashboard.stripe.com/acct_1TXRBTLc78IKlxC6/test/workbench/logs 

4242424242424242

__________________________________________________________________________________________________________________________________

User Orders & Reviews

Order Reducer & action

Order Success Component

_________________________________________________________________________________________________________________________________

User Orders Reducers & Action
User Order Component npm install react-data-table-component@7.7.0

_______________________________________________________________________________________________________________________________________

Order Detail Component and reducers

___________________________________________________________________________________________________________________________________________

Review Reducers & action

Submitting Review

Display Review 
_____________________________________________________________________________________________________________________________________________

Admin Modules 

Admin Sidebar

Dashboard Component and Admin Protect Route -> dashboard counts datas

Admin: Product List -> backend All Product Lists -> FrontEnd slice and actions creation -> list in all products npm install react-icons

_______________________________________________________________________________________________________________________________________

Add new Product

New Product Component create