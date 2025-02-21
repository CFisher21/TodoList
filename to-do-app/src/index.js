import './style.css';
import garbageImg from './images/delete.svg'
import xImg from './images/x.svg'

// Hamburger menu
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navigation = document.getElementsByClassName('navigation')[0];    

toggleButton.addEventListener("click", () => {
    navigation.classList.toggle('active')
})
// Global functions 
function elementById(id) {
return document.getElementById(id);
}

function newElement(type) {
return document.createElement(type);
}

function createContent() {
const content = elementById('content');
return content
}

function createListItem() {
const listitem = newElement('div');
listitem.className = 'list-item';
listitem.id = 'list-item';
return listitem
}

function leftGroup() {
const leftgroup = newElement('div');
leftgroup.className = 'left-group';
return leftgroup
}

function checkBox() {
const inputcheck = newElement('input');
inputcheck.type = 'checkbox';
return inputcheck
} 

function deleteTask() {
const deleteButton = newElement('img')
deleteButton.className = 'x';
deleteButton.src = xImg;
deleteButton.alt = 'x';
deleteButton.id = 'x';
return deleteButton;
}

function newDefaultList() {
const defaultList = newElement('div');
defaultList.className = 'default-list';
return defaultList
}

function newTitleContainer() {
const titleContainer = newElement('div');
titleContainer.className = 'title-container';
return titleContainer;
}

function newListTitle() {
const listTitle = newElement('h2');
listTitle.className = 'list-title';
listTitle.id = 'list-title';
return listTitle;
}

function newDeleteImg() {
const deleteImg = newElement('img');
deleteImg.className = 'delete';
deleteImg.src = garbageImg;
deleteImg.alt = 'delete-icon';
return deleteImg;
}

function newListBody() {
const listBody = newElement('div');
listBody.className = 'list-body';
return listBody;
}

function newList() {
const list = newElement('ul');
list.className = 'list';
list.id = 'list';
return list;
}

function newListEnd() {
const listEnd = newElement('div');
listEnd.className = 'list-end';
listEnd.id = 'list-end';
return listEnd;
}

function newFlexRow() {
const flexRow = newElement('div');
flexRow.className = 'flex-row';
return flexRow;
}

function newPrioritySpan() {
const prioritySpan = newElement('span')
prioritySpan.classList = 'priority';
prioritySpan.innerText = 'Priority';
return prioritySpan
}

function newFlexEnd() {
const flexEnd = newElement('div');
flexEnd.className = 'flex-end';
return flexEnd;
}

function newDateInput() {
const dateInput = newElement('input')
dateInput.type = 'date';
dateInput.className = 'due-date';
dateInput.id = 'due-date';
return dateInput;
}

function newSpan() {
const span = newElement('span');
span.innerText = 'Due Date: ';
return span;
}

function newRightGroup() {
 const rightGroup = newElement('div');
rightGroup.classList = 'right-group'
return rightGroup;
}

function newTextInput() {
const textInput = newElement('input');
textInput.className = 'text-input';
textInput.type = 'text';
textInput.placeholder = 'Add Task..';
return textInput;
}

function newAddItem() {
const addItem = newElement('button');
addItem.className = 'add-item';
addItem.id = 'add-button';
addItem.innerText = 'Add';
return addItem;
}

function appendToContent(span, bold, dateInput, leftGroup2, rightGroup, flexRow, flexEnd, listEnd, list, div, titleContainer, deleteImg, listBody, content, defaultList, addListContainer) {

bold.appendChild(span);
rightGroup.appendChild(bold);
rightGroup.appendChild(dateInput);

flexEnd.appendChild(leftGroup2);
flexEnd.appendChild(rightGroup);

listEnd.appendChild(flexRow);
listEnd.appendChild(flexEnd);

list.appendChild(listEnd);

div.appendChild(list);

listBody.appendChild(div);

defaultList.appendChild(titleContainer);
defaultList.appendChild(deleteImg);
defaultList.appendChild(listBody);

content.insertBefore(defaultList, addListContainer);

return content
}
// Add new task to the list. 
document.addEventListener('click', (event) => {
    if(event.target.classList.contains('add-item')) {

        const text = event.target.closest('.flex-row').querySelector('.text-input').value;
        const capitalize = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

        const listitem = createListItem();

        const leftgroup = leftGroup();

        const checkbox1 = checkBox();
        checkbox1.className = 'check';

        const li = newElement('li');
        li.innerHTML = capitalize;

        const deleteButton = deleteTask()

        leftgroup.appendChild(checkbox1);
        leftgroup.appendChild(li);

        listitem.appendChild(leftgroup);
        listitem.appendChild(deleteButton);
        const listend = event.target.closest('.list-end');
        const list = event.target.closest('.list'); 

        

        if(text != "") {
            list.insertBefore(listitem, listend);
        } else {
            if(!elementById('text-input-error')) {
                const p = newElement('p');
                p.id = "text-input-error";
                p.className = 'text-input-error';
                p.innerHTML = 'Please enter a task name';
                list.insertBefore(p, listend);
            } else {
                console.log('Element already exists');
            }
            
            setTimeout(() => {
                elementById('text-input-error').remove();
            }, 3000)
        }
    }
    saveState();
}) 

// Delete task 
document.addEventListener('click', (event) => {
if(event.target.classList.contains('x')) {
   event.target.closest('.list-item').remove();
   saveState();
}
})

// Delete list
document.addEventListener('click', (event) => {
if(event.target.classList.contains('delete')) {
    const defaultList = event.target.closest('.default-list')
    if(confirm('Are you sure you want to delete this list?')) {
        defaultList.remove()
        saveState();
    } else {
        console.log('List deletion cancled')
    }
}
})

// Edit list title 
document.addEventListener("DOMContentLoaded", () => {
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("list-title")) {
        const titleElement = event.target;
        const input = document.createElement('input');
        input.type = "text";
        input.value = titleElement.textContent;
        input.classList.add("title-input");

        titleElement.replaceWith(input);
        input.focus();

        function saveTitle() {
            const newTitle = input.value.trim() || "Untitled";
            titleElement.textContent = newTitle;
            input.replaceWith(titleElement);
            saveState()
        }

        input.addEventListener("blur", saveTitle);
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                saveTitle();
            }
        });
        
    }
});
});


// Add a new list
document.getElementById('add-list').addEventListener('click', () => {

const userTitle = prompt('Enter new list title');

const content = createContent();
const addListContainer = elementById('add-list-container');

const defaultList = newDefaultList();

const titleContainer = newTitleContainer();

const listTitle = newListTitle();
listTitle.innerText = userTitle;

titleContainer.appendChild(listTitle);

const deleteImg = newDeleteImg();

const listBody = newListBody();

const div = newElement('div');

const list = newList();

const listEnd = newListEnd();

const flexRow = newFlexRow();

const textInput = newTextInput();

const addItem = newAddItem();

flexRow.appendChild(textInput);
flexRow.appendChild(addItem);

const leftGroup2 = leftGroup();

const checkbox2 = checkBox();
checkbox2.classList = 'check2';

const prioritySpan = newPrioritySpan()

leftGroup2.appendChild(checkbox2);
leftGroup2.appendChild(prioritySpan);

const flexEnd = newFlexEnd();

const dateInput = newDateInput()
dateInput.valueAsDate = new Date();

const span = newSpan();

const bold = newElement('b')

const rightGroup = newRightGroup();

appendToContent(span, bold, dateInput, leftGroup2, rightGroup, flexRow, flexEnd, listEnd, list, div, titleContainer, deleteImg, listBody, content, defaultList, addListContainer);

saveState();
})

// Change color when priority is checked. 
document.addEventListener('change', (event) => {
if(event.target.classList.contains('check2')) {

    const titleContainer = event.target.closest('.default-list').querySelector('.title-container')

    if(event.target.checked) {
        titleContainer.style.backgroundColor = "#E64833"
    } else {
        titleContainer.style.backgroundColor = "gold"
    }
    saveState();
}
})

// Savestate when changing date
document.addEventListener('change', (event) => {
if(event.target.classList.contains('due-date')) {
    saveState()
}
})

// Get Today Lists
function getFormattedDate(offset = 0) {
const date = new Date();
date.setDate(date.getDate() + offset);
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
return `${year}-${month}-${day}`;
}

function showListsByDueDate(offset = 0) {
const targetDate = getFormattedDate(offset);
const defaultLists = document.querySelectorAll('.default-list');

defaultLists.forEach(list => {
    const dueDateInput = list.querySelector('.due-date');
    list.style.display = (dueDateInput && dueDateInput.value === targetDate) ? '' : 'none';
});
}

function showListsForNextWeek() {
const startDate = getFormattedDate(7);  // 7 days from today
const endDate = getFormattedDate(14);   // 14 days from today

const defaultLists = document.querySelectorAll('.default-list');

defaultLists.forEach(list => {
    const dueDateInput = list.querySelector('.due-date');

    if (dueDateInput) {
        const dueDate = dueDateInput.value;
        if (dueDate >= startDate && dueDate <= endDate) { 
            list.style.display = '';  // Show lists with due dates between 7 and 14 days from today
        } else {
            list.style.display = 'none';
        }
    }
});
}

document.getElementById('today').addEventListener('click', (event) => {
event.preventDefault();
showListsByDueDate();
})

document.getElementById('tomorrow').addEventListener('click', (event) => {
event.preventDefault();
showListsByDueDate(1);
})

document.getElementById('next-week').addEventListener('click', (event) => {
event.preventDefault();
showListsForNextWeek();
} )

document.getElementById('all').addEventListener('click', () => {
loadState();
} )

document.getElementById('priority').addEventListener('click', (event) => {
event.preventDefault(); 
const defaultLists = document.querySelectorAll('.default-list');

defaultLists.forEach(list => {
    const priority = list.querySelector('.check2')
    console.log(priority)
    if(priority.checked) {
        list.style.display = '';
    } else {
        list.style.display = 'none';
    }
});
})
// Save state to local storage
function saveState() {

const listsData = [];

// Get all default lists
document.querySelectorAll(".default-list").forEach(list => {
  const listTitle = list.querySelector("#list-title").innerText; // Get the list title
  const priority = list.querySelector(".check2") ? list.querySelector(".check2").checked : false; // Get priority checkbox state
  const dueDate = list.querySelector(".due-date") ? list.querySelector(".due-date").value : ''; // Get due date value (if exists)
  const stringDate = dueDate.toString()
  const items = {};
  
  // Get all list items within this specific list
  list.querySelectorAll(".list-item").forEach((item, index) => {
    const text = item.querySelector("li").innerText; // Get task text
    const checked = item.querySelector(".check").checked; // Get checkbox state
   
    
    items[index] = {
      text: text,
      checked: checked,
    };
  });

  listsData.push({
    listTitle: listTitle,
    priority: priority,
    dueDate: stringDate,
    items: items
    
  });
});

localStorage.setItem('currentState', JSON.stringify(listsData))
return listsData;

}

// Load items from local storage
function loadState() {
const data = JSON.parse(localStorage.getItem('currentState'))

data.forEach((item) => {
    const content = createContent();
    const addListContainer = elementById('add-list-container');

    const defaultList = newDefaultList();

    const titleContainer = newTitleContainer();
    if(item.priority === true) {
        titleContainer.style.backgroundColor = '#E64833'
    }

    const listTitle = newListTitle();
    listTitle.innerText = item.listTitle;

    titleContainer.appendChild(listTitle);

    const deleteImg = newDeleteImg();

    const listBody = newListBody();

    const div = newElement('div');

    const list = newList();

    const listEnd = newListEnd();

    const flexRow = newFlexRow();
    
    const textInput = newTextInput();

    const addItem = newAddItem();

    flexRow.appendChild(textInput);
    flexRow.appendChild(addItem);

    const leftGroup2 = leftGroup();

    const checkBox2 = checkBox();
    checkBox2.classList = 'check2';
    checkBox2.checked = item.priority

    const prioritySpan = newPrioritySpan()

    leftGroup2.appendChild(checkBox2);
    leftGroup2.appendChild(prioritySpan);

    const flexEnd = newFlexEnd();

    const dateInput = newDateInput()
    const dueDate = item.dueDate;
    dateInput.value = dueDate;

    const span = newSpan();

    const bold = newElement('b')

    const rightGroup = newRightGroup();

    for(let i = 0; i < Object.keys(item.items).length; i++) {

        const listitem = createListItem();

        const leftgroup = leftGroup();


        const li = newElement('li');
        li.innerText = item.items[i].text

        const checkbox = checkBox();
        checkbox.classList = 'check'
        checkbox.checked = item.items[i].checked

        const deleteButton = deleteTask();
    
        leftgroup.appendChild(checkbox);
        leftgroup.appendChild(li);

        listitem.appendChild(leftgroup);
        listitem.appendChild(deleteButton);

        list.appendChild(listitem)

    }

    appendToContent(span, bold, dateInput, leftGroup2, rightGroup, flexRow, flexEnd, listEnd, list, div, titleContainer, deleteImg, listBody, content, defaultList, addListContainer);

})
}

document.addEventListener('DOMContentLoaded', function() {
// Call your function here
loadState();
});