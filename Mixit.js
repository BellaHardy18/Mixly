const alcButtons = document.querySelectorAll('.alcbuttons');


alcButtons.forEach(button => {
    button.addEventListener('click', () => {
        alcButtons.forEach(btn => btn.classList.remove('selected-alcohol'));
        button.classList.add('selected-alcohol');
    });
});


const mixbutton = document.getElementById('Nextbutton');

mixbutton.addEventListener('click', () => {
    const hasSelectedAlcohol = Array.from(alcButtons).some(button =>
        button.classList.contains('selected-alcohol')
    );

    if (!hasSelectedAlcohol) {
        alert("Please select an alcohol type before proceeding.");
        return;
    }

    localStorage.setItem('baseselectedAlcohol', 
        document.querySelector('.selected-alcohol').textContent.trim().toLowerCase()
    );

    location.href = 'Other.html';
});