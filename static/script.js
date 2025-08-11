document.addEventListener('DOMContentLoaded', () => {

    const pollContainer = document.querySelector('.poll-container');
    if (pollContainer) {
        const handleVote = (option) => {
            fetch('/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vote: option }),
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('cats-votes').innerText = data.cats;
                document.getElementById('dogs-votes').innerText = data.dogs;
            })
            .catch(error => console.error('Error submitting vote:', error));
        };

        document.getElementById('vote-cats-btn').addEventListener('click', () => handleVote('cats'));
        document.getElementById('vote-dogs-btn').addEventListener('click', () => handleVote('dogs'));
    }

    const paletteContainer = document.querySelector('.palette-container');
    if (paletteContainer) {
        const generateBtn = document.getElementById('generate-btn');
        const colorContainer = document.getElementById('palette-container');
        
        const generatePalette = () => {
            fetch('/api/palette')
            .then(response => response.json())
            .then(data => {
                colorContainer.innerHTML = '';
                
                data.colors.forEach(color => {
                    const swatch = document.createElement('div');
                    swatch.classList.add('color-swatch');
                    swatch.style.backgroundColor = color;
                    swatch.innerText = color;
                    colorContainer.appendChild(swatch);
                });
            })
            .catch(error => console.error('Error fetching palette:', error));
        };

        generateBtn.addEventListener('click', generatePalette);
        generatePalette();
    }
});