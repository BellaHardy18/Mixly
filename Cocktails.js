

console.log(localStorage.getItem('finallist'));
document.addEventListener('DOMContentLoaded', function () {
    const drinksContainer = document.getElementById('drinksContainer');
    const cocktailData = localStorage.getItem('cocktailResults');
    const preselectedAlcohol = localStorage.getItem('selectedAlcohol');
    if (cocktailData) {
        const drinks = JSON.parse(cocktailData);

        if (drinks && Array.isArray(drinks) && drinks.length > 0) {
            drinks.forEach(drink => {
                const drinkElement = document.createElement('div');
                drinkElement.classList.add('card', 'm-2', 'p-3', 'text-center', 'shadow-sm', 'align-self-start');
                drinkElement.style.width = '300px';

                drinkElement.innerHTML = `
                    <a class="selectedcocktail" style="cursor: pointer;" data-id="${drink.idDrink}"><img src="${drink.strDrinkThumb}" class="img-fluid customimg" alt="${drink.strDrink}"></a>
                    <h5>${drink.strDrink}</h5>
                    
                `;
                drinksContainer.appendChild(drinkElement);
                
            });

        } 
        
        
        else {
            // Center content inside the container
            drinksContainer.className = 'd-flex flex-column align-items-center justify-content-center text-center';
            drinksContainer.style.minHeight = '60vh';

            // Add the message + button
            drinksContainer.innerHTML = `
                <h2>No drinks found. Please try again.</h2>
                <button class="goback-button" style="padding: 6px 12px; margin-top: 20px;">
                    Back to Ingredients
                </button>
            `;

            // Add click handler to the button
            const goBackButton = drinksContainer.querySelector('.goback-button');
            goBackButton.addEventListener('click', function () {
                location.href = 'Other.html';
            });
        }
    } else {
        drinksContainer.innerHTML = '<p>Something went wrong. Please go back and try again.</p>';
    }
});



document.addEventListener('click', function (e) {
    const target = e.target.closest('.selectedcocktail');
    
    if (target) {
        const drinkID = target.getAttribute('data-id');
        localStorage.setItem('selectedDrinkID', drinkID);
        location.href = 'Selected.html';
    }
});