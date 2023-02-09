const filter = document.querySelector(".filter");
const filterBtns = document.querySelectorAll(".filter__title");
console.log(filterBtns);
filterBtns.forEach((e) => {
  e.addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("hidden");
    this.classList.toggle("arr-top");
  });
});
