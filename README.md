# BookFinder

By [Andy Finnell](andy.finnell@gmail.com)

[portfolio.afinnell.com](http://portfolio.afinnell.com)

## Instructions

1. Navigate to [repo](https://github.com/scatterbrain-d/zikher)
2. Clone git locally using `git clone git@github.com:scatterbrain-d/zikher.git`
3. Install dependencies with `npm install`
4. Start the server with `npm start`
5. Navigate to app in the [browser](http://localhost:8000)
6. Optional - Build app for production with `npm run build`

## Discussion

For this project I used HTML, CSS, and React.
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Requirements

#### 1. Create a single-page JavaScript app using React, and any other JavaScript packages you feel might be helpful
#### 2. The app interface should include a search input to get data from a public API

BookFinder is a single-page React app with the ability to search for books using one of three criteria: title,
author, or subject. It returns data using the [Google Books API v1](https://developers.google.com/books/docs/overview).

#### 3. Display the data in a table, with functionality to toggle-sort the data in ascending or descending order by each category in the table header.

The data is displayed 10 to 40 (adjustable) entries at a time, and can be sorted by title, author, or published date.

#### 4. Post the code to a Github repository and host the app with a cloud service provider of your choice

This site is hosted with AWS and can be accessed at [bookfinder.afinnell.com](http://bookfinder.afinnell.com).

## Bonus Points

#### 1. Any UI/UX and design considerations.

The UI is responsive and adjusts to fit any size screen. On screens less than 550 pixels wide,
the UI format adjusts to a more compact design to fit mobile screens as narrow as 300px.
API calls were specified to only pull the data fields I wanted from the records requested, 
resulting in faster load times. Once you find a book you like, one click takes you to the Google Books
Preview page, where many entries have some or all of the book available to read instantly as well
as links to download/purchase.

#### 2. Custom features

* The search input is filtered through a regex check to ensure disruptive characters aren't injected
into the API call. 
* The call itself catches errors and posts them to the user. 
* A loading spinner is presented during load times.
* 'Previous' and 'Next' buttons allow for easy navigation through the results.
* Adjustable number of records per page, up to 40 (max allowed by the API)
* The mobile format combines the 'title' column with the 'preview' column, preserving functionality while compacting the design.
* Adorable book mascot

#### 3./5. Preprocessors / Build systems and task runners 

[Create React App](https://github.com/facebookincubator/create-react-app) comes with a ready-made workflow that includes Babel, Webpack, and ESLint. It bundles,
optimizes, and minifies code when building for production.

#### 4. Mobile compatibility

As mentioned above, the UI design is flexible and works just as well on mobile screens as desktops. 
It even works in Samsung's stock browser, which I've found to be very finicky!

## Grievances

When building the app, I came across some limitations of the Google Books API. The search algorithm seems
somewhat arbitrary, returning different numbers of results for identical consecutive searches - this can be
seen in the app as you're clicking through the pages and the total page count occasionally changes.

I had initially wanted to provide searching with multiple parameters at once - title and author for example - 
but the API search algorithm puts so much emphasis on the first parameter that the second is all but ignored.

