function navbarBurgerToggle() {
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
}

$(function() {
  navbarBurgerToggle();
});

// Bulma Card Toggle.
document.addEventListener('DOMContentLoaded', function() {
  let cardToggles = document.getElementsByClassName('card-toggle');
  for (let i = 0; i < cardToggles.length; i++) {
    cardToggles[i].addEventListener('click', e => {
      let n = e.currentTarget
      while (n=n.nextSibling) {
        if (n.nodeType != Node.TEXT_NODE && n.classList.contains("card-content")) {
          n.classList.toggle('is-hidden');
        }
      }
    });
    if (cardToggles[i].parentElement.parentElement.id == location.hash.substr(1)) {
      let n = cardToggles[i]
      while (n=n.nextSibling) {
        if (n.nodeType != Node.TEXT_NODE && n.classList.contains("card-content")) {
          n.classList.toggle('is-hidden');
        }
      }
    }
  }
});
