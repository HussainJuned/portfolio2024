// Select the button and the menu bar
const menu = document.getElementById('toggle-able-menu');
const closeMenuButton = document.getElementById('menu-close-btn');
const navigateBtn = document.getElementById('navigate-btn');

const classNameShowMenu = 'show-menu';

function showMenu() {
  menu.classList.add(classNameShowMenu); 
}

navigateBtn.addEventListener('click', showMenu);


// Add an event listener to the menu close button
closeMenuButton.addEventListener('click', function (event) {
    // Toggle the menu visibility
    if (menu.classList.contains(classNameShowMenu)) {
        console.log('Button: remove show-menu class from menu');
        menu.classList.remove(classNameShowMenu);
    }
});

// Add an event listener to the document
document.addEventListener('click', function (event) {
    console.log('Main Doc: target; ', event.target);
    // If the click event originated from the button or a descendant of the button, do nothing
    if (navigateBtn.contains(event.target)) {
        return;
    }
    // If the click event's target is outside the menu, hide the menu
    if (!menu.contains(event.target)) {
        menu.classList.remove('show-menu');
    }

    // If the click event originated from a child or grandchild of the menu, hide the menu
    var parent = event.target.parentElement;
    var grandparent = parent ? parent.parentElement : null;
    if ((parent && menu.contains(parent)) || (grandparent && menu.contains(grandparent))) {
        console.log('Main Doc: remove show-menu class from menu');
        menu.classList.remove(classNameShowMenu);
        return;
    }

    // // If the click event did not originate from the button or a descendant of the button or the menu, hide the menu
    // if (event.target !== navigateBtn && menu.classList.contains(classNameShowMenu)) {
    //     console.log('Main Doc: remove show-menu class from menu');
    //     menu.classList.remove(classNameShowMenu);
    // }
});