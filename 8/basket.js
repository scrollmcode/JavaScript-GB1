
document.querySelector('.cartIcon').addEventListener('click', () => {
    document.querySelector('.basket').classList.toggle('hidden'); 
})

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', (event) => {
    if(!event.target.classList.contains('addToCart')){
        return;
    }

    addToCart(event);
})

function addToCart(el){
    let selctedItem = el.target.parentElement.parentElement.parentElement;
    let id = selctedItem.getAttribute('data-id');
    let name = selctedItem.getAttribute('data-name');
    let price = selctedItem.getAttribute('data-price');
    let count = 1;

    if(basket[selctedItem.getAttribute('data-id')]){
        count = basket[selctedItem.getAttribute('data-id')].count + 1;
    }

    basket[selctedItem.getAttribute('data-id')] = {id, name, count, price};

    document.querySelector('.basket').innerHTML = 
        `<div class="basketRow basketHeader">
            <div>Название товара</div>
            <div>Количество</div>
            <div>Цена за шт.</div>
            <div>Итого</div>
        </div>

        <div class="basketTotal">
            Товаров в корзине на сумму:
            $<span class="basketTotalValue">0</span>
        </div>`;

    let basketRows = document.querySelector('.basket > .basketTotal');
    let basketTotalValue = 0;

    for(let br in basket){
        let rowTotalValue = basket[br].price * basket[br].count;
        let rowBasket = `<div class="basketRow">
                            <div>${basket[br].name}</div>
                            <div>${basket[br].count}</div>
                            <div>${basket[br].price}</div>
                            <div>${rowTotalValue}</div>
                        </div>`;
                        
        basketRows.insertAdjacentHTML('beforeBegin', rowBasket);
        basketTotalValue += rowTotalValue;
    }

    document.querySelector('.basketTotalValue').innerText = basketTotalValue;
}