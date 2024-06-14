document.getElementById('filter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let category = document.getElementById('filter-category').value;
    let priceRange = document.getElementById('filter-price').value;
    let brand = document.getElementById('filter-brand').value;
    let rating = document.getElementById('filter-rating').value;

    sessionStorage.setItem('selectedCategory', category);
    sessionStorage.setItem('selectedPrice', priceRange);
    sessionStorage.setItem('selectedBrand', brand);
    sessionStorage.setItem('selectedRating', rating);

    fetchProducts({ category, priceRange, brand, rating });
});

document.addEventListener('DOMContentLoaded', () => {
    let selectedCategory = sessionStorage.getItem('selectedCategory') || 'all';
    let selectedPrice = sessionStorage.getItem('selectedPrice') || '1000';
    let selectedBrand = sessionStorage.getItem('selectedBrand') || 'all';
    let selectedRating = sessionStorage.getItem('selectedRating') || '5';

    document.getElementById('filter-category').value = selectedCategory;
    document.getElementById('filter-price').value = selectedPrice;
    document.getElementById('filter-brand').value = selectedBrand;
    document.getElementById('filter-rating').value = selectedRating;

    fetchProducts({ category: selectedCategory, priceRange: selectedPrice, brand: selectedBrand, rating: selectedRating });
});

function fetchProducts(filters) {
    let products = [
        { id: 1, name: 'Smartphone', category: 'electronics', price: 500, brand: 'Brand1', rating: 4, image: 'electronics.jpg' },
        { id: 2, name: 'T-shirt', category: 'fashion', price: 150, brand: 'Brand2', rating: 3, image: 'fashion.jpg' },
        { id: 3, name: 'Garden Tools Set', category: 'home-garden', price: 75, brand: 'Brand3', rating: 4.5, image: 'home-gardens.jpg' },
        { id: 4, name: 'Basketball', category: 'sports', price: 200, brand: 'Brand4', rating: 5, image: 'sports.jpg' },
        { id: 5, name: 'Action Figure', category: 'toys', price: 50, brand: 'Brand5', rating: 3.5, image: 'toys.jpg' },
        { id: 6, name: 'Face Cream', category: 'beauty', price: 30, brand: 'Brand6', rating: 4, image: 'beauty.jpg' },
        { id: 7, name: 'Car Wax', category: 'automotive', price: 400, brand: 'Brand1', rating: 4.8, image: 'automotive.jpg' },
        { id: 8, name: 'Novel', category: 'books', price: 20, brand: 'Brand2', rating: 3, image: 'books.jpg' },
        { id: 9, name: 'Vitamin Supplements', category: 'medicines', price: 750, brand: 'Brand3', rating: 4.9, image: 'medicine.jpg' },
        { id: 10, name: 'Dumbbells', category: 'gym-equipments', price: 100, brand: 'Brand4', rating: 4.2, image: 'gym.jpg' }
    ];

    let filteredProducts = products.filter(product => {
        return (filters.category === 'all' || product.category === filters.category) &&
               (filters.priceRange >= product.price) &&
               (filters.brand === 'all' || product.brand === filters.brand) &&
               (filters.rating >= product.rating);
    });

    displayProducts(filteredProducts);
}

function displayProducts(products) {
    let productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        let productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.dataset.id = product.id;
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h3>${product.name}</h3>
                <p class="product-price">Price: $${product.price}</p>
                <p class="product-rating">Rating: ${product.rating}</p>
            </div>`;
        productItem.addEventListener('click', function () {
            showProductDetails(product.id);
        });
        productList.appendChild(productItem);
    });
}

function showProductDetails(productId) {
    let products = [
        { id: 1, name: 'Smartphone', category: 'electronics', price: 500, brand: 'Brand1', rating: 4, image: 'electronics.jpg', description: 'A high-end smartphone with a sleek design and powerful features.' },
        { id: 2, name: 'T-shirt', category: 'fashion', price: 150, brand: 'Brand2', rating: 3, image: 'fashion.jpg', description: 'A stylish and comfortable T-shirt made from high-quality materials.' },
        { id: 3, name: 'Garden Tools Set', category: 'home-garden', price: 75, brand: 'Brand3', rating: 4.5, image: 'home-gardens.jpg', description: 'A complete set of garden tools for all your gardening needs.' },
        { id: 4, name: 'Basketball', category: 'sports', price: 200, brand: 'Brand4', rating: 5, image: 'sports.jpg', description: 'A durable basketball suitable for both indoor and outdoor play.' },
        { id: 5, name: 'Action Figure', category: 'toys', price: 50, brand: 'Brand5', rating: 3.5, image: 'toys.jpg', description: 'A collectible action figure with detailed features and accessories.' },
        { id: 6, name: 'Face Cream', category: 'beauty', price: 30, brand: 'Brand6', rating: 4, image: 'beauty.jpg', description: 'A rejuvenating face cream that moisturizes and nourishes your skin.' },
        { id: 7, name: 'Car Wax', category: 'automotive', price: 400, brand: 'Brand1', rating: 4.8, image: 'automotive.jpg', description: 'A premium car wax that provides long-lasting protection and shine.' },
        { id: 8, name: 'Novel', category: 'books', price: 20, brand: 'Brand2', rating: 3, image: 'books.jpg', description: 'An engaging novel that takes you on an unforgettable journey.' },
        { id: 9, name: 'Vitamin Supplements', category: 'medicines', price: 750, brand: 'Brand3', rating: 4.9, image: 'medicine.jpg', description: 'High-quality vitamin supplements to support your overall health.' },
        { id: 10, name: 'Dumbbells', category: 'gym-equipments', price: 100, brand: 'Brand4', rating: 4.2, image: 'gym.jpg', description: 'A set of adjustable dumbbells for your strength training needs.' }
    ];

    let product = products.find(p => p.id === productId);

    if (product) {
        let productDetails = `
            <div class="product-details">
                <button class="close-btn">&times;</button>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating}</p>
                <button id="buy-now-btn">Buy Now</button>
            </div>`;
        let productDetailsContainer = document.createElement('div');
        productDetailsContainer.classList.add('product-details-container');
        productDetailsContainer.innerHTML = productDetails;

        productDetailsContainer.querySelector('.close-btn').addEventListener('click', function () {
            document.body.removeChild(productDetailsContainer);
        });

        document.body.appendChild(productDetailsContainer);

        document.getElementById('buy-now-btn').addEventListener('click', function () {
            showCheckoutForm(product);
        });
    }
}

function showCheckoutForm(product) {
    document.getElementById('checkout-form').style.display = 'block';

    document.getElementById('checkout-product-name').value = product.name;
    document.getElementById('checkout-product-price').value = `$${product.price}`;
    document.getElementById('checkout-product-rating').value = product.rating;
    document.getElementById('checkout-product-description').value = product.description;

    document.getElementById('product-list').style.display = 'none';
    let productDetailsContainer = document.querySelector('.product-details-container');
    if (productDetailsContainer) {
        productDetailsContainer.style.display = 'none';
    }
}

document.getElementById('checkout-form-details').addEventListener('submit', function (e) {
    e.preventDefault();
    completePayment();
});

function completePayment() {
    setTimeout(() => {
        document.getElementById('checkout-form').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
    }, 1000); 
}

document.getElementById('filter-price').addEventListener('input', function () {
    let price = document.getElementById('filter-price').value;
    document.getElementById('price-value').textContent = `$0 - $${price}`;
});

document.getElementById('filter-rating').addEventListener('input', function () {
    let rating = document.getElementById('filter-rating').value;
    document.getElementById('rating-value').textContent = `0 - ${rating}`;
});
