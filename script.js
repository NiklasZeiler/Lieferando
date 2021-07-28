let mealNames = [];//Name of Meal
let mealPrices = [];// Price of Meal
let amounts = [];// Amounts of Meal
let liked = false;



function init() {
    renderBasket();
    showEmptyBasket();
    

}

//Fix Basket//Disappaer arrow
window.onscroll = function () {// Da immer nur einmal onscroll auf jeder Seite funktioniert muss man beide Funktionen in einer onscroll Funktion ausführen
    disappaer();
    scrollBasket();
}

// disapaer arrow
function disappaer() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        document.getElementById('toTop').className = 'to-top';
    } else {
        document.getElementById('toTop').className = 'd-none';
    }
}

// Fixed Basket at scroll the page to the top
function scrollBasket() {
    let basket = document.getElementById('basket');
    let top = basket.offsetTop;
    if (window.pageYOffset > top) {
        basket.classList.add('basket-scroll');
    } else {
        basket.classList.remove('basket-scroll');
    }
}



// Add to Basket

function addToBasket(mealName, mealPrice) {
    let position = mealNames.indexOf(mealName);
    if (position == -1) {
        mealNames.push(mealName);
        mealPrices.push(mealPrice);
        amounts.push(1);

    } else {
        amounts[position]++;

    }

    renderBasket();
    Calculate();
}


//Show Basket

function renderBasket() {
    showMobileBasketButton();
    document.getElementById('emptyBasket').innerHTML = '';


    if (mealNames.length == 0) {
        showEmptyBasket();
    } else {
        for (let i = 0; i < mealNames.length; i++) {
            let totalPrice = mealPrices[i] * amounts[i];
            document.getElementById('emptyBasket').innerHTML += `
            <div class="meal-basket">
                <div class="basket-amounts" id="amounts${i}">
                    <span>${amounts[i]}</span>
                </div>
                <div class="basket-meal-name" id="meal-basket-name${i}">
                    <span>${mealNames[i]}</span>
                </div>
                <div class="meal-basket-change-amount">
                    <button onclick="removeonemenu(${i})">-</button>
                    <button onclick="addonemenu(${i})">+</button>
                </div>
                <div class="basket-price" id="meal-basket-price">
                    <span>${totalPrice.toFixed(2).replace(".", ",")} €</span>
                </div>
    
                <div class="meal-basket-delete">
                    <img onclick="basketDelete(${[i]})" src="img/trash.png">
                </div>
            </div>
            `;
        }
    }
}

//Add one of the Same Menu

function addonemenu(n) {
    amounts[n]++;

    renderBasket();
    Calculate();

}


// Delete one of the same Menu

function removeonemenu(n) {
    if (amounts[n] < 2) {
        basketDelete(n);
    } else {
        amounts[n]--;
        renderBasket();
        Calculate();
    }

}

// Delete from Basket

function basketDelete(position) {
    mealNames.splice(position, 1);
    mealPrices.splice(position, 1);
    amounts.splice(position, 1);
    renderBasket();
    Calculate();

}


//Show Empty Basket
function showEmptyBasket() {
    if (mealNames == 0) {
        document.getElementById('emptyBasket').innerHTML = `
              
            <img class="basket-empty-img" src="img/cart-59-64.png">
            <span class="basket-empty-text">Suche dir was leckeres aus unserer Karte aus damit du direkt bestellen
                kannst.</span>
                
        `;

    }
}


//show mobile basket
function showMobileBasketButton() {
    if (mealNames.length >= 1) {
        document.getElementById('mobileButton').classList.remove('d-none-mobile');
    } else {
        document.getElementById('mobileButton').classList.add('d-none-mobile');
    }
}


function showMobileBasket() {
    document.getElementById('basket').classList.remove('d-none-mobile');
    document.getElementById('mobileButton').classList.add('d-none-mobile');
}

function backToMenus() {
    document.getElementById('basket').classList.add('d-none-mobile');
    if (mealNames.length > 0) {
        document.getElementById('mobileButton').classList.remove('d-none-mobile');
    }
}

//Caculate Sum

function Calculate() {
    let price = 0;
    for (let i = 0; i < mealPrices.length; i++) {
        let totalPrice = mealPrices[i] * amounts[i];
        price += totalPrice;
    }
    document.getElementById('subPrice').innerHTML = '';
    document.getElementById('subPrice').innerHTML = `${price.toFixed(2).replace(".", ",")} €`;

    let sum = price + 3;
    document.getElementById('totalPrice').innerHTML = '';
    document.getElementById('totalPrice').innerHTML = `${sum.toFixed(2).replace(".", ",")} €`;

    pushButtonToOrder(sum);

}


//remove minimum order value and activate button
function pushButtonToOrder(sum) {

    if (sum >= 25) {

        document.getElementById('order-now').style.backgroundColor = '#FF8000';
        document.getElementById('order-now').style.cursor = 'pointer';
        document.getElementById('min-value-order').classList.add('d-none');
    } else {
        document.getElementById('order-now').style.backgroundColor = '#d7d7d7';
        document.getElementById('order-now').style.cursor = 'not-allowed';
        document.getElementById('min-value-order').classList.remove('d-none');
    }

}


//alert 

function OnlyTestPage() {
    alert('Dies ist eine Testseite! Leider kannst du bei uns nicht bestellen');
}

//Change Heart 

function like() {
    liked = !liked;
    document.getElementById('heart').src = liked?  "img/favorite-5-32.png" : "img/heart-outline.png";
    document.getElementById('heart').style.width = liked? '48px' : 'unset';
}




//Save Array
function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}


//Load Array
function getArray(key) {
    return JSON.parse(localStorage.getItem(key));
}