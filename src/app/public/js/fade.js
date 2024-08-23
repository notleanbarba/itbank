document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  document.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const href = this.href;

      body.classList.add("fade-out");

      setTimeout(function () {
        window.location.href = href;
      }, 500);
    });
  });

  setTimeout(function () {
    body.classList.add("fade");
  }, 0);
});
