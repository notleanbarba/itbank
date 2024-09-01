const navbar = document.getElementById('navbar');
let lastFocus;

function openMenu() {
  navbar.classList.add('open');
  lastFocus = document.activeElement;
  navbar.children[1].focus();
  document.addEventListener('keydown', handleKeyOpenMenu);
}

function closeMenu() {
  document.removeEventListener('keydown', handleKeyOpenMenu);
  navbar.classList.remove('open');
  lastFocus.focus();
}

function handleKeyOpenMenu(event) {
  console.log(event.key);
  const activeFocus = document.activeElement;

  switch (event.key) {
    case 'Escape':
    case 'Tab':
      closeMenu();
      break;

    case 'ArrowDown':
      if (activeFocus.nextElementSibling === null) {
        navbar.children[1].focus();
      } else {
        document.activeElement.nextElementSibling.focus();
      }
      break;

    case 'ArrowUp':
      if (activeFocus.previousElementSibling.previousElementSibling === null) {
        navbar.lastElementChild.focus();
      } else {
        activeFocus.previousElementSibling.focus();
      }
      break;
    default:
      return;
  }
  event.preventDefault();
}

document.getElementById('open-menu').addEventListener('click', openMenu);
document.getElementById('close-menu').addEventListener('click', closeMenu);
