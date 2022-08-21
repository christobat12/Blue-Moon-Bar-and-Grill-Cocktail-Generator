# Cocktail-Generator
CocktailDB API

This project utilizes TheCocktailDB API to generate a cocktail recipe using an ingredient or drink you have in your bar. It also features a Drink of the Day for inspiration. Enter an ingredient you have on hand (e.g such as "Gin") and start making your very own cocktail.

**Link to project:** https://generate-cocktail.netlify.app

![Bar](bar.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

This app uses TheCocktailDB API to fetch data regarding different cocktails in a database. The Drink of the Day feature is provided using local storage. Each new day, a new fetch randomly picks a drink from the database to display it as the Drink of the Day. When the user types in an ingredient, a new fetch grabs a drinkID. Using JavaScript, information is pulled from the object to display the drink name, measurements, ingredients, and instructions.  

## Optimizations

I would like to optimize this app further by allowing the user to enter multiple search ingredients. This would be done by adding multiple query parameters to the fetch request.   

## Lessons Learned:

-Using local storage to provide a Drink of the Day.<br>
-Fetching from an API and using using promises.<br>
-Modifying the DOM
