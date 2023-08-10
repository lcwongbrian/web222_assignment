const { reviewData } = window;

function addLeadingZero(digit) {
  return digit < 10 ? `0${digit}` : digit;
}

function parseDate(date) {
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${addLeadingZero(date.getMinutes())}:${addLeadingZero(
    date.getSeconds()
  )}`;
}

function sortCriteria(a, b) {
  return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
}

function createReviewCard(review) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.addEventListener("click", () => {
    console.log(review.name);
  });

  const cardRow = document.createElement("div");
  cardRow.classList.add("card-row");

  const cardName = document.createElement("h4");
  cardName.classList.add("card-name");
  cardName.innerHTML = review.name;

  const cardDate = document.createElement("time");
  cardDate.classList.add("card-date");
  cardDate.innerHTML = parseDate(new Date(review.date));

  const cardRate = document.createElement("div");
  for (let i = 0; i < 5; i++) {
    const star = document.createElement("span");
    star.classList.add("fa", "fa-star");
    i < review.rate && star.classList.add("checked");
    cardRate.appendChild(star);
  }

  const cardContent = document.createElement("span");
  cardContent.classList.add("card-content");
  cardContent.innerHTML = review.content;

  cardRow.appendChild(cardName);
  cardRow.appendChild(cardDate);

  card.appendChild(cardRow);
  card.appendChild(cardRate);
  card.appendChild(cardContent);

  return card;
}

function reloadReview() {
  const divContainer = document.querySelector(".container");
  divContainer.innerHTML = "";
  reviewData.sort(sortCriteria).forEach((review) => {
    divContainer.appendChild(createReviewCard(review));
  });
}

function resetForm(form) {
  form.name.value = "";
  form.rate.value = 5;
  form.content.value = "";
}

window.addEventListener("load", () => {
  reloadReview();

  const formReview = document.getElementById("formReview");
  formReview.addEventListener("submit", (e) => {
    e.stopPropagation();
    e.preventDefault();
    const res = {
      name: formReview.name.value,
      date: new Date().getTime(),
      rate: formReview.rate.value,
      content: formReview.content.value
    };
    reviewData.push(res);
    reloadReview();
    resetForm(formReview);
  });
});
