function openModal(event) {
  const modal = document.getElementById(event.target.name);
  modal.showModal();
  modal.getElementsByClassName('modal-close')[0].addEventListener(
    'click',
    () => {
      modal.close();
    },
    { once: true },
  );
}

Array.from(document.getElementsByClassName('modal-open')).forEach((button) => button.addEventListener('click', openModal));
