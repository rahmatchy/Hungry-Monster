const serchBtn = document.getElementById('search-btn');
const showmeal = document.getElementById('show-meal')

serchBtn.addEventListener('click', getmealList)

function getmealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(resp => resp.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id ="${meal.idMeal}">
                        <img src="${meal.strMealThumb}">
                        <h3 onclick=getMealDetails('${meal.idMeal}')>${meal.strMeal} </h3>
                    </div>
                `
            });
        }else{
            html = "Sorry, we didnt have this food"
            showmeal.classList.add('notMached');
        }
        showmeal.innerHTML = html;
    })
}

const getMealDetails = details =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`
    fetch(url)
    .then(resp => resp.json())
    .then(data => displayDetails(data.meals[0]));
}

const displayDetails = meal=>{
    console.log(meal);
    const mealDetails = document.getElementById('mealDetails');
    mealDetails.innerHTML = `
            <img src ="${meal.strMealThumb}">
            <h3>${meal.strMeal}<h3>
            <p>${meal.strInstructions} </p>
    `


}









// const displayMeal = meals => {
//     const showmeal = document.getElementById('show-meal');
//     for (let i = 0; i < meals.length; i++) {
//         const meal = meals[i];
//         const mealList = document.createElement('div')
//         mealList.className = 'meals';
//         const mealInfo = `
            
//             <img src="${meal.strCategoryThumb}">
//             <h3> ${meal.strCategory} </h3>
//         `
//         mealList.innerHTML = mealInfo;
//         showmeal.appendChild(mealList);



//     }
// }

// const displayMealInfo = name => {
//     const url = `https://www.themealdb.com/images/category/${meal.strCategoryThumb}.png`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => console.log(data));

// }