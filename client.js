document.addEventListener("DOMContentLoaded", function() {
    const blogForm = document.getElementById("consForm");
    const modelSection = document.getElementById("game-catalog");
    const loadModelsButton = document.getElementById('loadMore');

    if (loadModelsButton) {
        loadModelsButton.addEventListener('click', () => {
            fetch('http://localhost:3001/products')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    data.forEach(item => {
                        const newModel = document.createElement('div');
                        newModel.classList.add('game-item'); // Додати правильний клас

                        newModel.innerHTML = `
                            <img src="images/key.WebP" alt="Фото гри">
                            <h2>${item.name}</h2>
                            <p>Ціна: ${item.price} $</p>
                            <p>Опис: ${item.description}</p>
                        `;
                        // Додаємо новий елемент у секцію modelSection
                        modelSection.appendChild(newModel);
                    });
                })
                .catch(error => console.error('Помилка при завантаженні моделей з бази даних:', error));
        });
    } else {
        console.error('Button with ID "loadMore" not found.');
    }

    blogForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const price = document.getElementById("price").value;
        const descriptionV = document.getElementById("description").value;

        const data = JSON.stringify({
            name: title,
            description: descriptionV,
            price: price
        });

        fetch('http://localhost:3001/products/postgresql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
        .then(response => {
            if (response.ok) {
                console.log('Успішно збережено до PostgreSQL');
                const newModel = document.createElement('div');
                newModel.classList.add('game-item'); // Додати правильний клас
                newModel.innerHTML = `
                    <img src="images/key.png" alt="Фото гри">
                    <h2>${title}</h2>
                    <p>Ціна: ${price} $</p>
                    <p>Опис: ${descriptionV}</p>
                `;
                // Додаємо новий елемент у секцію modelSection
                modelSection.appendChild(newModel);
                blogForm.reset();
            } else {
                console.error('Помилка при збереженні моделі до PostgreSQL:', response.statusText);
            }
        })
        .catch(error => console.error('помилка', error));
    });
});
