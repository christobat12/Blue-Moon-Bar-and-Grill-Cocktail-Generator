const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const todayFormatted = today.toDateString()


//Check if there is anything in local storage
if(!localStorage.getItem('lastFetchCall')) {
  localStorage.setItem('lastFetchCall', todayFormatted) 
  drinkOfTheDay();
}

if(localStorage.getItem('lastFetchCall') === todayFormatted) {
  drinkOfDaySaved(localStorage.getItem('drinkID'))
}else {
  localStorage.setItem('lastFetchCall', todayFormatted)
  drinkOfTheDay()
}

function drinkOfTheDay() {
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

      const saveDrinkID = data.drinks[0].idDrink;
      drinkOfDaySaved(saveDrinkID);
      localStorage.setItem('drinkID', saveDrinkID)
    }) 

    .catch(err => {
        console.log(`error ${err}`)
    });

}

function drinkOfDaySaved(drinkId) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    
    document.querySelector('.ingredient').innerHTML = '' //Resetting the ingredient list for each time you get a drink
    document.querySelector('h2').innerText = data.drinks[0].strDrink

    const ingredients = [];
    const measurement = [];

    for (const [key, value] of Object.entries(data.drinks[0])) {
      if(key.includes("strIngredient") && value) {
        ingredients.push(value)
      }
    }

    for (const [key, value] of Object.entries(data.drinks[0])) {
      if(key.includes("strMeasure") && value) {
        measurement.push(value)
      }
    }
    
    const finalText = []

    for(let i=0; i<15;i++) {
      if(measurement[i] && ingredients[i]) {
      finalText.push(`${measurement[i]} ${ingredients[i]}`)
    }else if(!measurement[i]) {
      finalText.push(` ${ingredients[i]}`)
    }
  }


    finalText.forEach( element => {
      if(element !== " undefined") {
      //create an li
      const li = document.createElement('li')
      //add text to li
      li.textContent = element
      //append the li to the ul
      document.querySelector('.ingredient').appendChild(li)
    }})


    document.querySelector('img').src = data.drinks[0].strDrinkThumb;
    document.querySelector('#instruction').innerText = 'Instructions';
    document.querySelector('p').innerText = data.drinks[0].strInstructions;
  })
   .catch(err => {
      console.log(`error ${err}`)
    });

}


document.querySelector('button').addEventListener('click', getDrinkID)


function getDrinkID(){

    let randomDrinkID = ''
    let drink = document.querySelector('input').value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

      
      const randomIndex = Math.floor(Math.random() * data.drinks.length);
      randomDrinkID = data.drinks[randomIndex].idDrink;
      getDrink(randomDrinkID); //Passing in random drink ID to function getDrink below
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function getDrink(drinkID) {
    

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks[0])
      document.querySelector(".hidden").style.display = 'none';
      document.querySelector('.ingredient').innerHTML = '' //Resetting the ingredient list for each time you get a drink
      document.querySelector('h2').innerText = data.drinks[0].strDrink
 
      const ingredients = [];
      const measurement = [];

      for (const [key, value] of Object.entries(data.drinks[0])) {
        if(key.includes("strIngredient") && value) {
          ingredients.push(value)
        }
      }

      for (const [key, value] of Object.entries(data.drinks[0])) {
        if(key.includes("strMeasure") && value) {
          measurement.push(value)
        }
      }
      
      const finalText = []

      for(let i=0; i<15;i++) {
        if(measurement[i] && ingredients[i]) {
        finalText.push(`${measurement[i]} ${ingredients[i]}`)
      }else if(!measurement[i]) {
        finalText.push(` ${ingredients[i]}`)
      }
    }


      finalText.forEach( element => {
        if(element !== " undefined") {
        //create an li
        const li = document.createElement('li')
        //add text to li
        li.textContent = element
        //append the li to the ul
        document.querySelector('.ingredient').appendChild(li)
      }})


      document.querySelector('img').src = data.drinks[0].strDrinkThumb;
      document.querySelector('#instruction').innerText = 'Instructions';
      document.querySelector('p').innerText = data.drinks[0].strInstructions;
    })
    
    .catch(err => {
        console.log(`error ${err}`)
    });
}


  
