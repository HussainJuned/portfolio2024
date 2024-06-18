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
});


// Select the nav element
const nav = document.querySelector('.main-nav');

// Create a placeholder element
const placeholder = document.createElement('div');

// Add a scroll event listener to the window
window.addEventListener('scroll', function() {
    // Get the current scroll position
    let scrollTop = window.scrollY;

    // If the scroll position is greater than the nav's height
    if (scrollTop > nav.offsetHeight/2) {
        // If the placeholder is not already in the document, insert it before the nav
        if (!placeholder.parentNode) {
            placeholder.style.height = `${nav.offsetHeight}px`;
            nav.parentNode.insertBefore(placeholder, nav);
        }

        // Add the 'sticky' class to the nav
        nav.classList.add('sticky');
    } 
    // If the scroll position is less than or equal to the nav's height
    else if (scrollTop <= nav.offsetHeight/2) {
        // If the placeholder is in the document, remove it
        if (placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }

        // Remove the 'sticky' class from the nav
        nav.classList.remove('sticky');
    }
});