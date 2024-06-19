// Select the button and the menu bar
const menu = document.getElementById('toggle-able-menu');
const closeMenuButton = document.getElementById('menu-close-btn');
const navigateBtn = document.getElementById('navigate-btn');

const classNameShowMenu = 'show-menu';

function showMenu(e) {
  e.preventDefault();
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
    if (scrollTop > nav.offsetHeight/2.5) {
        // If the placeholder is not already in the document, insert it before the nav
        if (!placeholder.parentNode) {
            placeholder.style.height = `${nav.offsetHeight}px`;
            nav.parentNode.insertBefore(placeholder, nav);
        }

        // Add the 'sticky' class to the nav
        nav.classList.add('sticky');
    } 
    // If the scroll position is less than or equal to the nav's height
    else if (scrollTop <= nav.offsetHeight/2.5) {
        // If the placeholder is in the document, remove it
        if (placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }

        // Remove the 'sticky' class from the nav
        nav.classList.remove('sticky');
    }
});


// Select all nav items
const navItems = Array.from(menu.children);

// Add a 'click' event listener to each nav item
navItems.forEach(function(navItem) {
    navItem.addEventListener('click', function() {
        // Remove the 'active' class from all nav items
        navItems.forEach(function(navItem) {
            if (navItem.children[0]) {
                navItem.children[0].classList.remove('active');
            }
        });

        // Add the 'active' class to the clicked nav item
        if (this.children[0]) {
            this.children[0].classList.add('active');
        }
    });
});



// Select all sections based on the href attribute of the a elements in the li elements
const sections = navItems.map(function(navItem) {
    const anchor = navItem.querySelector('a');
    if (anchor) {
        const id = anchor.getAttribute('href').replace('#', '');
        return document.getElementById(id);
    }
    return null;
}).filter(Boolean); // filter out null values

console.log("Sections: ", sections);

function removeActiveClass() {
    sections.forEach(function(section) {
        if (section) {
            section.classList.remove('active');
        }
    });
}

let lastScrollY = window.scrollY;
let isScrollingDown = true;

window.addEventListener('scroll', () => {
  isScrollingDown = (window.scrollY > lastScrollY);
  lastScrollY = window.scrollY;
});

const observerScrollingDown = new IntersectionObserver(entries => {
    if (!isScrollingDown) return;
    // handle for scrolling down
  entries.forEach(entry => {
    // If the entry is intersecting
        if (entry.isIntersecting) {
            // Remove the 'active' class from all nav items
            navItems.forEach(function(navItem) {
                if (navItem.children[0]) {
                    navItem.children[0].classList.remove('active');
                }
            });

            // Add the 'active' class to the nav item corresponding to the entry
            const id = entry.target.getAttribute('id');
            const navItem = document.querySelector(`.main-nav .main-menu li a[href="#${id}"]`);
            if (navItem) {
                navItem.classList.add('active');
            }
        }
  });
}, { rootMargin: '0px 0px -60% 0px', threshold: 0.0 });

const observerScrollingUp = new IntersectionObserver(entries => {
    if (isScrollingDown) return;
    // handle for scrolling up
  entries.forEach(entry => {
    // If the entry is intersecting
        if (entry.isIntersecting) {
            // Remove the 'active' class from all nav items
            navItems.forEach(function(navItem) {
                if (navItem.children[0]) {
                    navItem.children[0].classList.remove('active');
                }
            });

            // Add the 'active' class to the nav item corresponding to the entry
            const id = entry.target.getAttribute('id');
            const navItem = document.querySelector(`.main-nav .main-menu li a[href="#${id}"]`);
            if (navItem) {
                navItem.classList.add('active');
            }
        }
  });
}, { rootMargin: '0px 0px 0% 0px', threshold: 0.6 });

// apply observers to each section
sections.forEach(section => {
  observerScrollingDown.observe(section);
  observerScrollingUp.observe(section);
});

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       // Do something when the section is in view
//       console.log(`${entry.target.id} is in view!`);
//     }
//   });
// });

// sections.forEach(section => {
//   observer.observe(section);
// });