const catalog = document.querySelector(".catalog");

class Catalog {
  render() {
    let renderCatalog = ``;

    ITEMS.forEach((el) => {
      renderCatalog += `
      <div class="catalog__item">
              <div class="item__body">
                <div class="item__media">
                  <img
                    src="../images/${el.imgUrl}"
                    alt=" ${el.name}"
                    class="item__img"
                  />
                  <button class="btn-like">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      width="24px"
                      height="24px"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                      />
                    </svg>
                  </button>
                </div>
                <h2 class="item__title">${el.name}</h2>
                <div class="item__status-wrapper">
                  <img
                    src="../images/icons/check.svg"
                    alt="item status"
                    class="item__status-icon"
                  />
                  <p class="item__status-quantity">${el.orderInfo.inStock} Left in stock</p>
                </div>
                <p class="item__price">
                  <span class="item__price-value">${el.price}</span
                  ><span class="item__price-currency">$</span>
                </p>
                <button class="btn-add btn-active">Add to cart</button>
              </div>
              <div class="item__footer">
                <img
                  src="../images/icons/like_filled.svg"
                  alt="like-filled icon"
                  class="item__footere-icon"
                />
                <div class="item__reviews-wrapper">
                  <p class="item__reviews-num">
                    <span class="item__review-perc"></span>${el.orderInfo.reviews}% Positive reviews
                  </p>
                  <p>Above Average</p>
                </div>
                <div class="item__orders-wrapper">
                  <p class="item__orders-num">123</p>
                  <p>orders</p>
                </div>
                </div>
            </div>
      `;

      console.log(`src="../images/${el.imgUrl}`);
    });

    catalog.innerHTML = `
    ${renderCatalog}
  `;
  }
}

const itemsCatalog = new Catalog();
itemsCatalog.render();
