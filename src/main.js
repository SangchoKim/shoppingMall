
// Fetch the item from JSON file
function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

function displayItems(items){
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// Create HTML list item from the given data item
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items){
    const dataSet = event.target.dataset;
    const key = dataSet.key;
    const value = dataSet.value;

    if(key === null || value === null){
        return;
    }

    displayItems(items.filter(item => item[key] === value));
    // updateItems(items, key, value);
}

function updateItems(items, key, value){
    items.forEach(item => {
        console.log(item);
        if(item[key] === value ){
            console.log(item.classList)
            item.classList.remove('invisible');
        }else{
            item.classList.add('invisible');
        }
    })

}

function setEventListener(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click',() => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems()
    .then(items => {
        displayItems(items);
        setEventListener(items);
    })
    .catch(console.log);