#### THE СRAWLER
***

#TECHNICAL DESIGN

The application is divided into the pages: `(*book, chapter 7, react routing)`
 + [Authorization page](#auth);
 + [Registration page](#registr);
 + [Home page](#home);
 + [Search page](#auth);
 + [News page](#auth);
 + [One news page](#auth);
 + [Apartment page](#auth);
 + [Add apartment page](#auth);
 + [Edit apartment page](#auth);
 + [User page](#auth);
 + [User's apartments page](#auth);
 + [Add news page](#auth);



## <a name="auth"></a>	Authorization page
Page includes:
  - form with 2 fields: email and password;
  - navigation button to registration page
  - navigation button in the form of a logo on the main page
  - authorization button (script to click button:
 1.login function
 2.in case of success of the function - navigation to the personal account
 2.incase of an error - display the error on the screen to the user)


## <a name="registr"></a>	Registration page
Page includes:
  - the forms with user registration fields (first name, last name, email password, city, gender, phone number and photo);
  - navigation button to login page
  - navigation button in the form of a logo on the main page
  - registration button (script to click button:
1.authorization function
2.in case of success - navigation to your personal account
2.in case of an error - display the error on the screen to the user (the user with this email already exists, invalid mail or phone format,

## <a name="home"></a>	Home page
Page includes:
##### <a name="home"></a>	Header
  - displays the logo and buttons for registration and authorization (if the user is not authorized in the system) or the logo and buttons for the personal account and logout (if the user is authorized in the system)

##### <a name="filter"></a>	Filter
  - displays a corporate phrase
  - has 3 dropdowns with the ability to filter apartments (location, number of rooms, type of rental period: long-term or short-term) and a search button

##### <a name="city-panel"></a>	Panel search apartment according to the proposed city
  - has panels with photos of suggested cities, when you click on the panel, you are redirected to the search results page for this city

##### <a name="premium"></a> Slider with premium apartments
  - slider with premium ad cards. when you click on the card, you are redirected to the page of this apartment

##### <a name="news-component"></a> Component with news cards
  - link to list of all news
  - panel with 3 latest news. Clicking on a news article opens the article with that news

##### <a name="footer"></a> Footer
  - application footer with the site's branded phrase and links - stubs


## <a name="search"></a>	Search page
The purpose of the page is to display apartment cards in accordance with the user's request
Page includes:
  [Header](#header)
  <a name="result">Result of search apartments</a> `(book, chapter 4, rendering)`
  [Filter](#filter)
  [Footer](#footer)

## <a name="search"></a>	List of news page
Page includes:
  [Header](#header)
  ##### <a name="news-component"></a> Component with news list:
  - button "step back"
  - list of news cards `(book, chapter 4, rendering)`
[Footer](#footer)

## <a name="search"></a>	News page
Page includes:
  [Header](#header)
  Button "step back"
  Displaying the time of publication of the news
  News headline photo
  News text
  [Footer](#footer)

## Apartment page
Page includes:
  [Header](#header)
  Apartment photo slider
  Description section
  Details section
  Section of Google maps with a label for finding an apartment (book, Chapter 6)
  Contact information section
  [Footer](#footer)

## Add apartment page
Page includes:
  [Header](#header)
  Title input field
  File input field
  Apartment description entry field
  Details input field (price, number of rooms, year of construction, etc.)
  Apartment address entry field
  Publish button
  There is validation on the page, the publish button is inactive until the validation rules are followed
  [Footer](#footer)

## Edit apartment page
Page includes:
  [Header](#header)
  Title input field
  File input field
  Apartment description entry field
  Details input field (price, number of rooms, year of construction, etc.)
  Apartment address entry field
  Publish button
  There is validation on the page, the publish button is inactive until the validation rules are followed
  When the page is rendered, the previously specified data is displayed in the edit fields `(book, chapter 10, Redux)`
  [Footer](#footer)

## User page
Page includes:
  [Header](#header)
  User data fields (editable)
  User photo
  User data refresh button
  <a name="navigation">Navigation component with links:</a>
  - My profile
  - My objects
  - To add an advert
  - Add news (for user with admin role)
  - Logout
  [Footer](#footer)

## User's apartment page
Page with personal ads of the user
Page includes:
  [Header](#header)
  [Navigation](#navigation)
  [User apartment](#result)
  [Footer](#footer)


## Add news page (for a user with admin status)
 Page includes:
  [Header](#header)
  Title input field
  File input field
  Apartment description entry field
  Validation is present on the page, the publish button is inactive until the validation rules are met
  [Footer](#footer)
  