class ItemOfCatalog {
  constructor(item) {
    Object.assign(this, item);
  }
  checkItemAvailability() {
    return this.orderInfo.inStock > 0 ? "cross-green.svg" : "cross-red.svg";
  }
  checkBtnIsDisabled() {
    return this.orderInfo.inStock <= 0 ? "btn-disabled" : "btn-active";
  }
}

class ItemsModel {
  constructor() {
    this.itemsCollection = ITEMS.map((e) => new ItemOfCatalog(e));
  }
  findByName(name) {
    return this.itemsCollection.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}

class RenderCards {
  constructor(itemsModel) {
    this.cardsContainer = document.querySelector(".catalog");
    this.renderCards(itemsModel.itemsCollection);
    this.renderCardsButtonsStates();
    this.addModalFunctional();
  }
  static renderCard(item) {
    const cardElem = document.createElement("div");
    cardElem.classList.add("catalog__item");
    cardElem.innerHTML = `
      <div class="item__body">
        <div class="item__media">
          <img
            src="../images/${item.imgUrl}"
            alt=" ${item.name}"
            class="item__img"
          />
          <button class="btn-like">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_4631_1371)">
                <path d="M9.49495 18.3463L9.99792 18.8042L10.5026 18.3482L11.711 17.2565L11.7126 17.2551L11.7823 17.1917C13.8831 15.2827 15.6869 13.6435 16.9607 12.0851C18.2573 10.4989 19.0832 8.90469 19.0832 7.08333C19.0832 4.10245 16.7307 1.75 13.7498 1.75C12.3542 1.75 11.0134 2.28813 9.99984 3.17666C8.98629 2.28813 7.64548 1.75 6.24984 1.75C3.26896 1.75 0.916504 4.10245 0.916504 7.08333C0.916504 8.9047 1.7424 10.4989 3.03909 12.0842C4.31733 13.647 6.12906 15.2898 8.23897 17.2031L8.28662 17.2463L8.2877 17.2473L9.49495 18.3463Z" stroke="black" stroke-width="1.5"/>
                <path d="M9.99984 17.7917L8.7915 16.6917C4.49984 12.8 1.6665 10.2333 1.6665 7.08333C1.6665 4.51667 3.68317 2.5 6.24984 2.5C7.69984 2.5 9.0915 3.175 9.99984 4.24167C10.9082 3.175 12.2998 2.5 13.7498 2.5C16.3165 2.5 18.3332 4.51667 18.3332 7.08333C18.3332 10.2333 15.4998 12.8 11.2082 16.7L9.99984 17.7917Z" fill="none" class='icon-like'/>
              </g>
              <defs>
                <clipPath id="clip0_4631_1371">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <h2 class="item__title">${item.name}</h2>
        <div class="item__status-wrapper">
          <img
            src="../images/icons/${item.checkItemAvailability()}"
            alt="item status"
            class="item__status-icon"
          />
          <p class="item__status-quantity">${
            item.orderInfo.inStock
          } Left in stock</p>
        </div>
        <p class="item__price"> Price
          <span class="item__price-value"> ${item.price}</span>
          <span class="item__price-currency">$</span>
        </p>
        <button class="btn-add ${item.checkBtnIsDisabled()}">Add to cart</button>
      </div>
  
      <div class="item__footer">
        <img
          src="../images/icons/like_filled.svg"
          alt="like-filled icon"
          class="item__footere-icon"
        />
        <div class="item__reviews-wrapper">
          <p class="item__reviews-num">
            <span class="item__review-perc"></span>${
              item.orderInfo.reviews
            }% Positive reviews
          </p>
          <p>Above Average</p>
        </div>
        <div class="item__orders-wrapper">
          <p class="item__orders-num">${Math.ceil(Math.random() * 100)}</p>
          <p>orders</p>
        </div>
      </div>
      
      
      
      
      <div class="modal hidden">
        <div class="modal__container">
          <div class="modal__media">
            <img
              src="../images/${item.imgUrl}"
              alt="${item.name}"
              class="modal__img"
            />
          </div>
          <div class="modal__stats">
            <h2 class="modal__item-title">${item.name}</h2>
            <div class="modal__review item__footer">
              <img
                src="../images/icons/like_filled.svg"
                alt="like-filled icon"
                class="item__footere-icon"
              />
              <div class="item__reviews-wrapper">
                <p class="item__reviews-num">
                  <span class="item__review-perc">${
                    item.orderInfo.reviews
                  }</span> Positive reviews
                </p>
                <p>Above Average</p>
              </div>
              <div class="item__orders-wrapper">
                <p class="item__orders-num">${Math.ceil(
                  Math.random() * 100
                )}</p>
                <p>orders</p>
              </div>
            </div>
            <ul class="modal__stats-list">
              <li class="modal__list-item">
                <span class="modal__list-span">Color: </span>
                <span class="modal__list-span">${item.color}</span>
              </li>
              <li class="modal__list-item">
                <span class="modal__list-span">Operating System: </span>
                <span class="modal__list-span">${item.os}</span>
              </li>
              <li class="modal__list-item">
                <span class="modal__list-span">Chip: </span>
                <span class="modal__list-span">${item.chip.name}</span>
              </li>
              <li class="modal__list-item">
                <span class="modal__list-span">Height: </span>
                <span class="modal__list-span">${item.size.height} cm</span>
              </li>
              <li class="modal__list-item">
                <span class="modal__list-span">Width: </span>
                <span class="modal__list-span">${item.size.width} cm</span>
              </li>
              <li class="modal__list-item">
                <span class="modal__list-span">Depth: </span>
                <span class="modal__list-span">${item.size.depth} cm</span>
              </li>
              <li class="modal__list-item">
                <span class="modal__list-span">Weight</span>
                <span class="modal__list-span">${item.size.weight} g</span>
              </li>
            </ul>
          </div>
          <div class="modal__order-info">
            <div class="modal__order-wrapper">
              <div class="modal__price-section">
                <span class="modal__currency">$</span>
                <span class="modal__value">${item.price}</span>
              </div>
              <div class="modal__stock-section">
                <span class="modal__stock-text">
                  Stock: <span class="modal__stock-num">${
                    item.orderInfo.inStock
                  }</span>
                  pcs.
                </span>
              </div>
              <button class="btn-add">Add to cart</button>
            </div>
          </div>
        </div>
    </div>`;

    return cardElem;
  }
  renderCards(items) {
    this.cardsContainer.innerHTML = ` `;
    const elements = items.map((item) => RenderCards.renderCard(item));
    this.cardsContainer.append(...elements);
  }

  renderCardsButtonsStates() {
    const btns = document.querySelectorAll(".btn-add");
    btns.forEach((btn) => {
      if (btn.classList.contains("btn-disabled")) {
        btn.setAttribute("disabled", "");
      }
      btn.onclick = (e) => e.stopPropagation();
    });
    const btnsLike = document.querySelectorAll(".btn-like");
    btnsLike.forEach((icon) => {
      icon.addEventListener("click", function (e) {
        const res = icon.querySelectorAll("path")[1];
        res.classList.toggle("red");
        e.stopPropagation();
      });
    });
  }
  addModalFunctional() {
    const catalogItem = document.querySelectorAll(".catalog__item");
    // const modals = document.querySelectorAll(".modal");
    catalogItem.forEach((elem) => {
      const modal = elem.querySelector(".modal");
      elem.addEventListener("click", (event) => {
        if (event.target == modal) {
          console.log(modal);
          console.log(event.target);
          modal.classList.add("hidden");
          return;
        }
        event.currentTarget.lastElementChild.classList.remove("hidden");
      });
    });
  }
}

const itemsModel = new ItemsModel();
const renderCards = new RenderCards(itemsModel);
