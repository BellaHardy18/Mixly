function shrinkTextToFit(el, maxLines = 2, maxFontSize = 6, minFontSize = 1) {
    el.style.fontSize = `${maxFontSize}em`;
    el.offsetHeight; // Force reflow

    const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight) || 1.2;
    const maxHeight = lineHeight * maxLines;

    let fontSize = maxFontSize;

    while (el.scrollHeight > maxHeight && fontSize > minFontSize) {
        fontSize -= 0.05; 
        el.style.fontSize = `${fontSize}em`;
        el.offsetHeight; // reflow again
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const drinkId = localStorage.getItem('selectedDrinkID');

    if (!drinkId) {
        document.body.innerHTML = '<p>No drink selected. Go back and choose one.</p>';
        return;
    }

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        .then(response => response.json())
        .then(data => {
            const drink = data.drinks[0];
            const ingredients = [];

            for (let i = 1; i <= 15; i++) {
                const ingredient = drink[`strIngredient${i}`];
                const measure = drink[`strMeasure${i}`];

                if (ingredient) {
                    ingredients.push(`${measure || ''} ${ingredient}`.trim());
                }
            }

            // Now display the details
            document.getElementById('selecteddrink').innerHTML = `
                <div class="d-flex justify-content-center">
                        <div class="row w-100 justify-content-center align-items-start">
                            <div class="col-md-4 text-center mb-4">
                                <div class="customimgborder mx-auto">
                                    <img src="${drink.strDrinkThumb}" class="customimg" alt="${drink.strDrink}">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h1 class="drinktitle">${drink.strDrink}</h1>
                                <h3>Ingredients:</h3>
                                <ul>${ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
                                <h3>Instructions:</h3>
                                <p>${drink.strInstructions}</p>
                            </div>
                        </div>
                    </div>
            `;
            const titleElement = document.querySelector('.drinktitle');
            shrinkTextToFit(titleElement, 2, 6, 1);
            const newingredientsList = ingredients.join(", ");
            generateAIDescription(drink.strDrink, newingredientsList);
            })
        .catch(error => {
            console.error('Error loading drink details:', error);
        });
});





function generateAIDescription(drinkName, newingredients) {
    fetch('https://redomixly.vercel.app/api/generate', {   // 🔥 your live backend URL here
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            drinkName: drinkName,
            newingredients: newingredients
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('ai-description').innerHTML = data.aiText.replace(/\n/g, "<br>");
    })
    .catch(error => {
        console.error('Error fetching AI description:', error);
        document.getElementById('ai-description').textContent = "Couldn't load cocktail variations.";
    });
}
