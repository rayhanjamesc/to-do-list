function editItem(itemId) {
    //Get item text by id
    let itemText = document.getElementById(itemId);

    //Prompt user for the new edited text
    let newText = prompt("Edit the item", itemText.textContent);

    //Update item text content
    if (newText !== null) {
        itemText.textContent = newText;
    }
}

function delItem(itemId) {
    //Get element item by id
    let item = document.getElementById(itemId);

    //Remove item from items container
    item.remove();
}

function addItem() {
    //Gets input values
    let inputVal = document.getElementById("item-input").value;

    //Create new item element
    let newItem = document.createElement("item");
    newItem.classList.add("item");
    newItem.id = "item" + inputVal.toLowerCase().replace(/\s+/g, '-');

    //Create text for the new element
    let itemText = document.createElement("p");
    itemText.textContent = inputVal;

    //Set unique id for each item text
    itemText.id = 'item-text' + inputVal.toLowerCase().replace(/\s+/g, '-');

    //Append the item text to the new item element
    newItem.appendChild(itemText);

    //Append new item to items container
    document.getElementById("items-container").appendChild(newItem);

    //Clear input field
    document.getElementById("item-input").value = "";

    //Add edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    newItem.appendChild(editBtn);
    editBtn.onclick = function() {
        //Call editItem() function
        editItem(itemText.id);
    }

    //Add delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "delete";
    newItem.appendChild(delBtn);
    delBtn.onclick = function() {
        //Call delItem() function
        delItem(newItem.id);
    }
}

//Function to store items in local storage
function storeItem(itemId, itemText) {
    //Parse items as JSON file and put it in a variable
    let storedItems = JSON.parse(localStorage.getItem("items")) || {}; //If no items in storage, defaults to empty object

    //Store new item's text using the ID as the key
    storedItems[itemId] = itemText;

    //Save updated items back to local storage
    localStorage.setItem("items", JSON.stringify(storedItems)); //First argument is key, second argument is value
}

//Function to load items from local storage
function loadItem() {
    let storedItems = JSON.parse(localStorage.getItem("items")) || {};

    //Loop through stored items and create elements for each
    for (let itemId in storedItems) {
        if (storedItems.hasOwnProperty(itemId)) {
            let newItem = createItemElement(itemId, storedItems[itemId]);
            document.getElementById("items-container").appendChild(newItem);
        }
    }
}

//Function to create item element
function createItemElement(itemId, itemText) {
    //Create new item element
    let newItem = document.createElement("item");
    newItem.classList.add("item");

    //Create text for new element
    let itemTextEl = document.createElement("p")
    itemTextEl.textContent = itemText;

    //Set unique id for each element
    itemTextEl.id = itemId;

    //Append item text to new element
    newItem.appendChild(itemTextEl);

    //Add edit button
    let editBtn = createButton("edit", function() {
        editItem(itemId);
    })

    //Add delete button
    let delBtn = createButton("delete", function() {
        delItem(itemId);
    })

    //Append buttons
    newItem.appendChild(editBtn);
    newItem.appendChild(delBtn);
}

//Load items from local storage every time page loads
window.onload = function() {
    loadItem();
}