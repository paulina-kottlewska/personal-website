// Nav
const nav = document.querySelector('.navigation');
const menuBtn = document.querySelector('.menu-button');
const hamburgerIcon = document.querySelector('#barsIcon');
const xmarkIcon = document.querySelector('#xmarkIcon');

menuBtn.addEventListener('click', () => {
  const visibility = nav.getAttribute('data-visible');
  
  // Check visibility of the nav
  // Change the value of data-visible and aria-expanded based on the visibility
  if(visibility === 'false') {
    nav.setAttribute('data-visible', true);
    menuBtn.setAttribute('aria-expanded', true)
  } else {
    nav.setAttribute('data-visible', false);
    menuBtn.setAttribute('aria-expanded', false);
  }

  const icon = menuBtn.getAttribute('aria-expanded');

  // Change the icon based on the aria-expanded value
  if(icon === 'true') {
    hamburgerIcon.style.display = 'none';
    xmarkIcon.style.display = 'inline'
  } else {
    hamburgerIcon.style.display = 'inline';
    xmarkIcon.style.display = 'none'
  }
})


// Carousel
const carouselWrapper = document.querySelector('.carousel-wrapper');
const carouselItems = document.querySelectorAll('.carousel-item');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let currentIndex = 0;

function updateCarousel() {
  const firstItem = document.querySelector('.carousel-item.first-item');
  // Sum the first item's width and the calculated margin of it 
  const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight);
  // Calculate the amount (the total width of all the items to the left of the current item) by which the carousel should be translated
  carouselWrapper.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
}

leftArrow.addEventListener('click', () => {
  // Move the carousel one position to the left. 
  // In case of a negatvie index, loop to the last item in the carousel
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
});

rightArrow.addEventListener('click', () => {
  // Move the carousel one position to the right. 
  // In case the index is greater or equal to the carousel length, loop to the first item
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
});

updateCarousel();

// Tabs 
const tabLists = document.querySelectorAll('.tab-list');
const tabs = document.querySelectorAll('.tab-list-button');

// Add keydown event listeners to each tab list
tabLists.forEach(tabList => {
  tabList.addEventListener('keydown', changeTabFocus);
})

tabs.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel)
});

let tabFocus;

function changeTabFocus(e) {  
  const keydownLeft = 37;
  const keydownRight = 39;

  // Get the current tab list
  const currentTabList = e.target.closest('.tab-list');
  // Get all the tabs in the current tab list
  const currentTabs = currentTabList.querySelectorAll('.tab-list-button');

  // Find the index of the tab that is currently in focus
  tabFocus = Array.from(currentTabs).findIndex(tab => tab.getAttribute('tabindex') === '0');

  
  if(e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    // Remove the current tab from the focus order
    currentTabs[tabFocus].setAttribute('tabindex', -1);

    // Update tabFocus based on the arrow key pressed
    if(e.keyCode === keydownRight) {
      tabFocus++;
      
      if(tabFocus >= currentTabs.length) {
          tabFocus = 0;
      }
    } else if(e.keyCode === keydownLeft) {
      tabFocus--;
      
      if(tabFocus < 0) {
        tabFocus = currentTabs.length -1;
      }
    }
      
    // Make the new (current) tab part of the focus order
    currentTabs[tabFocus].setAttribute('tabindex', 0);
    currentTabs[tabFocus].focus();
  }
}

function changeTabPanel(e) {
  const targetBtn = e.target;
  const targetPanel = targetBtn.getAttribute('aria-controls');
  const targetImg = targetBtn.getAttribute('data-image');
  
  // Get the tab container and main container (section id="trips")
  const tabContainer = targetBtn.parentNode;
  const mainContainer = tabContainer.parentNode; 

  // Deselect the currently active tab
  tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);
  // Select the newly clicked button
  targetBtn.setAttribute("aria-selected", true);

  // Hide/show the corresponding tab panel
  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  // Hide/show the corresponding image
  hideContent(mainContainer, 'picture')
  showContent(mainContainer, [`#${targetImg}`])

  console.log(targetBtn)
}

function hideContent(parent, content) {
  // Add the hidden attribute to the trip descriptions and images that match the clicked button attribute 
  parent.querySelectorAll(content).forEach((item) => item.setAttribute('hidden', true));
}

function showContent(parent, content) {
  // Remove the hidden attribute from the trip descriptions and images that match the clicked button attribute
  parent.querySelector(content).removeAttribute('hidden');
}








