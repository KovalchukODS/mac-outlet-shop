class Filter {
  #itemsModel = null;
  #renderCards = null;
  constructor(itemsModel, renderCards) {
    this.#itemsModel = itemsModel;
    this.#renderCards = renderCards;
    this.name = ``;
    this.sort = "def";
    this.color = [];
    this.storage = [];
    this.os = [];
    this.display = [];
  }

  setFilter(key, value) {
    if (!Array.isArray(this[key])) {
      this[key] = value;
      this.#findAndRerender();
      return;
    }

    if (this[key].includes(value)) {
      this[key] = this[key].filter((e) => e != value);
    } else {
      this[key].push(value);
    }
    this.#findAndRerender();
  }
  #findAndRerender() {
    const items = this.#itemsModel.filterItems({
      name: this.name,
      color: this.color,
      storage: this.storage,
      os: this.os,
      display: this.display,
    });
    this.#renderCards.renderCards(items);
  }
}

class RenderFilters {
  #filter = null;
  constructor(itemsModel, filter) {
    this.#filter = filter;
    this.containerElem = document.querySelector(".filter");
    this.filterOptions = [
      {
        displayName: "Color",
        name: `color`,
        options: itemsModel.availableColors,
      },
      {
        displayName: "Storage",
        name: `storage`,
        options: itemsModel.availableStorage,
      },
      {
        displayName: "OS",
        name: `os`,
        options: itemsModel.availableOS,
      },
      {
        displayName: "Display",
        name: `display`,
        options: itemsModel.availableDisplay,
      },
    ];

    this.renderFilters(this.filterOptions);
  }

  renderFilter(optionsData) {
    const filterElem = document.createElement("div");
    filterElem.className = "filter__item";
    filterElem.innerHTML = `<button class="filter__title">${optionsData.displayName}</button>`;

    const optionsWrapper = document.createElement("div");
    optionsWrapper.classList.add("filter__group-wrapper", "hidden");

    const optionElements = optionsData.options.map((opt) => {
      const optionLabel = document.createElement("label");
      optionLabel.className = "filter__label";
      optionLabel.innerHTML = `<span>${opt}</span>`;

      const optionCheckbox = document.createElement("input");
      optionCheckbox.type = "checkbox";
      optionCheckbox.value = opt;
      optionCheckbox.onchange = () => {
        this.#filter.setFilter(optionsData.name, opt);
      };

      optionLabel.prepend(optionCheckbox);

      return optionLabel;
    });

    optionsWrapper.append(...optionElements);
    filterElem.append(optionsWrapper);
    return filterElem;
  }

  renderFilters() {
    this.containerElem.innerHTML = ``;
    const filtersElems = this.filterOptions.map((optionData) =>
      this.renderFilter(optionData)
    );

    this.containerElem.append(...filtersElems);
  }
}

const itemFilter = new Filter(itemsModel, renderCards);
const renderFilters = new RenderFilters(itemsModel, itemFilter);

const finderInput = document.querySelector(".finder__input");
const orderInput = document.querySelector(".finder__order-selector");

finderInput.oninput = (e) => {
  itemFilter.setFilter("name", e.target.value);
};
orderInput.onchange = (e) => {
  console.log(e.target.value);
  itemFilter.setFilter("sort", e.target.value);
};

const filter = document.querySelector(".filter");
const filterBtns = document.querySelectorAll(".filter__title");
filterBtns.forEach((e) => {
  e.addEventListener("click", function (e) {
    e.target.nextElementSibling.classList.toggle("hidden");
    e.target.classList.toggle("arr-top");
  });
});
