Project Name :##

Local Food Lovers Network

Purpose :

Local Food Lovers Network is a community-driven food review platform where people can explore, share, and celebrate local food experiences. From hidden street food gems to homestyle meals and restaurant dishes, users can post reviews with photos, rate foods, and discover what others around them are enjoying. It’s an SPA with authentication, protected routes, and a modern UI using Firebase, MongoDB, Express, React, and Node.js.

live site: https://food-lovers-c1f94.web.app/
github repository : https://github.com/Foyzullah9988/food_lovers_client

Key Features
Fully Responsive SPA

 Designed with a foodie aesthetic and fully optimized for mobile, tablet, and desktop users.
 Includes a consistent navbar, footer, and grid-based layout across all pages.

Home Page

 Hero Section — Interactive food-themed slider banner with eye-catching images and text.
 Featured Reviews — Dynamically displays 6 top-rated reviews from the database.
 “Show All” Button — Redirects to the All Reviews page.
 Extra Sections — THree additional sections :
 1:Challenge section
 2.Secret section
 3.Guide section

All Reviews
(Public)

 Shows all reviews from all users sorted by newest first.
 Each card includes food image, restaurant name, location, reviewer, and rating.
 Favorite (Heart) button to save reviews to your “My Favorites” list.
 Search feature to find reviews by food name using MongoDB $regex search.

Add Review
(Protected)

 Logged-in users can add new reviews with:

Food Name

Food Image

Restaurant Name

Location

Star Rating

Review Text

 Automatically includes user email and date.

My Reviews 
(Protected)

 Displays all reviews added by the logged-in user in a table.
 Edit Review — Opens form pre-filled with existing data for update.
 Delete Review — Confirmation modal before removing from database.

My Favorites 
(Protected)

 Displays all the favorite reviews of the logged-in user in a grid card view.
 Favorite (Heart) button to delete reviews to your “My Favorites” list.

Authentication

 Firebase Authentication with Email/Password and Google login.
 Register Page — Name, Email, Photo URL, Password (with uppercase, lowercase & min 6 chars validation).
 Redirects to homepage after successful registration.
 Login Page — Email, Password, and Google Login.
 Shows toast messages for success or failure.


Additional Features

 Loading spinner during data fetch.
 Custom 404 Error Page with fun image and “Back to Home” button.
 Real-time toast messages instead of default alerts.
 Clean UI design using TailwindCSS and DaisyUI.

npm packages used
    "firebase"  
    "react"  
    "react-router-dom"  
    "react-icons"  
    "react-hot-toast"  
    "react-spinners"  
    "tailwindcss"  
    "daisyui"  
    "aos"  
    "swiper"  
    "axios"  