const menuList = document.getElementById('menu-list');
let lastFocus;

function switchMenuSelector() {
  if (menuList.classList.contains('open')) return closeMenu();
  lastFocus = document.activeElement;
  menuList.classList.add('open');
  menuList.children[0].focus();
  document.addEventListener('keydown', handleKeyOpenMenu);
  document.addEventListener('click', closeMenu, { capture: true, once: true });
}

function closeMenu() {
  document.removeEventListener('keydown', handleKeyOpenMenu);
  menuList.classList.remove('open');
  lastFocus.focus();
}

function handleKeyOpenMenu(event) {
  const activeFocus = document.activeElement;

  switch (event.key) {
    case 'Escape':
    case 'Tab':
      closeMenu();
      break;

    case 'ArrowDown':
      if (activeFocus.nextElementSibling === null) {
        menuList.children[0].focus();
      } else {
        document.activeElement.nextElementSibling.focus();
      }
      break;

    case 'ArrowUp':
      if (activeFocus.previousElementSibling === null) {
        menuList.lastElementChild.focus();
      } else {
        activeFocus.previousElementSibling.focus();
      }
      break;
    default:
      return;
  }
  event.preventDefault();
}

document.getElementById('menu-selector').addEventListener('click', switchMenuSelector);
