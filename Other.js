

const ingredientsList = [];

const base = localStorage.getItem('baseselectedAlcohol');

const searchInput = document.getElementById("search");
const cardContainer = document.getElementById("ingredient-cards");
const plusButton = document.getElementById("add-icon");

document.getElementById("base-alcohol").textContent =  base.toUpperCase(); // Display selected base alcohol

searchInput.addEventListener('input', function () {
    if (this.value.trim() !== "") {
        plusButton.src = "imgs/plusyellow.svg";
        plusButton.style.opacity = "1"; // Fade in
    } else {
        plusButton.src = "imgs/plusgreen.svg";
        plusButton.style.opacity = "0"; // Fade out
    }
});




function addIngredient() {
    const searchValue = searchInput.value.trim().toLowerCase();
    if (ingredientsList.includes(searchValue)) {
        alert("This ingredient is already added.");
        searchInput.value = ""; // Clear input if ingredient already exists
        plusButton.src = "imgs/plusgreen.svg"; // Reset button icon
        return;
    }
    if (searchValue !== "") {
        ingredientsList.push(searchValue);
        console.log(ingredientsList);

        // Create card
        const card = document.createElement("div");
        card.classList.add("card", "p-3", "text-white", "ingredient", "d-flex", "justify-content-between", "align-items-center");
        card.style.minWidth = "100px";
        card.style.textAlign = "center";
        card.style.paddingRight = "30px";
        card.style.backgroundColor = "#eab555"; // Assuming yellow is your card bg
        card.textContent = searchValue.toUpperCase();
        card.style.cursor = "pointer"; // Change cursor to pointer for better UX
        card.style.display = "flex";
        card.style.flexDirection = "row"; // ensure horizontal layout
        card.style.justifyContent = "space-between";
        card.style.alignItems = "center";
        card.innerHTML = `
        <span style="flex-grow: 1;">${searchValue.toUpperCase()}</span>
        <img src="imgs/removex.svg" alt="Remove" style="width: 14px; height: 14px; margin-left: 12px; cursor: pointer;">
      `;
        
        

        cardContainer.appendChild(card);

        // Clear input
        searchInput.value = "";
        plusButton.src = "imgs/plusgreen.svg";
    }
}

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addIngredient();
    }
});

plusButton.addEventListener('click', function () {
    addIngredient();
});


cardContainer.addEventListener('click', function (event) {
    const card = event.target.closest('.card');
    if (card) {
        const ingredientName = card.textContent.trim().toLowerCase();
        if (ingredientsList.includes(ingredientName)) {
            ingredientsList.splice(ingredientsList.indexOf(ingredientName), 1);
            card.remove();
        }
    }
});

let finalingredients = "";
console.log(base);

document.getElementById("Nextbutton").addEventListener('click', function () {

    if (ingredientsList.length === 0) {
        // alert("Please add at least one ingredient before proceeding.");
        // return;

        finalingredients = base; // If no ingredients are added, use only the base alcohol
        console.log(finalingredients);
        localStorage.setItem('finallist', finalingredients);
        document.body.style.cursor = 'wait'; // Change cursor to wait while fetching data
        fetch('https://www.thecocktaildb.com/api/json/v2/961249867/filter.php?i=' + finalingredients)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Store data in localStorage
            localStorage.setItem('cocktailResults', JSON.stringify(data.drinks));

                document.body.style.cursor = 'default';
                window.location.href = 'Cocktails.html';


        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.body.style.cursor = 'default';
        });
    };


    document.body.style.cursor = 'wait'; // Change cursor to wait while fetching data

    finalingredients = ingredientsList.join(',');
    finalingredients= finalingredients +","+base;
    console.log(finalingredients);
    localStorage.setItem('finallist', finalingredients);

    fetch('https://www.thecocktaildb.com/api/json/v2/961249867/filter.php?i=' + finalingredients)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Store data in localStorage
            localStorage.setItem('cocktailResults', JSON.stringify(data.drinks));

                document.body.style.cursor = 'default';
                window.location.href = 'Cocktails.html';


        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.body.style.cursor = 'default';
        });
});
