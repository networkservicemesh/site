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
      for (let j=0;j< e.currentTarget.childNodes.length;j++) {
        let n = e.currentTarget.childNodes[j]
        if (n.nodeType != Node.TEXT_NODE &&  n.classList.contains("card-content")) {
          n.classList.toggle('is-hidden');
        }
      }
    });
    if (cardToggles[i].id == location.hash.substr(1)) {
      for (let j=0;j< cardToggles[i].childNodes.length;j++) {
        let n = cardToggles[i].childNodes[j]
        if (n.nodeType != Node.TEXT_NODE &&  n.classList.contains("card-content")) {
          n.classList.toggle('is-hidden');
        }
      }
    }
  }
});
