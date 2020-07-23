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

document.addEventListener('DOMContentLoaded', function() {
  talkTimes = document.getElementsByClassName('talktime');
  for (let i = 0; i < talkTimes.length; i++) {
    talkTime = talkTimes[i]
    dt = luxon.DateTime.fromISO(talkTime.textContent)
    if (!dt.invalid) {
      localTime = dt.toLocaleString({hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short'})
      talkTime.textContent = localTime
    }
  }
});
