class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(item) {
    const id = item.id;
    const itemInCart = this.items.find((el) => el.id === id);
    if (itemInCart) {
      if (itemInCart.amount < 4) {
        itemInCart.amount++;
      }
      return itemInCart;
    }
    const newItemInCart = {
      id,
      item,
      amount: 1,
    };
    return this.items.push(newItemInCart);
  }

  get totalAmount() {
    return this.items.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
  }

  get totalPrice() {
    return this.items.reduce((acc, item) => {
      return acc + item.amount * item.item.price;
    }, 0);
  }

  decreaseItem(item) {
    const id = item.id;
    const itemInCart = this.items.find((product) => product.id === id);
    if (itemInCart && itemInCart.amount >= 2) {
      itemInCart.amount--;
    }
  }

  removeItem(item) {
    item.amount = 0;
    let result = this.items.filter((e) => e.amount > 0);
    this.items = result;
    return cart.items;
  }
}

class RenderCart {
  constructor() {
    this.cartContainer = document.querySelector(".cart-modal__item-holder");
    this.renderCartList(cart.items);
    this.openCartModalWindow();
  }

  renderCartToList(item) {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-modal__item";
    cartItem.innerHTML = `
        <img
          src="../images/${item.item.imgUrl}"
          alt="${item.item.name}"
          class="cart-modal__img"
        />
        <div class="cart-modal__item-info">
          <div class="cart-modal__item-name">${item.item.name}</div>
          <div class="cart-modal__item-price">
            <span class="cart-modal__item-currency">$</span
            ><span class="cart-modal__item-value">${item.item.price}</span>
          </div>
        </div>
        <div class="cart-modal__actions">
          <button class="cart-modal__btn btn-decr-i">-</button>
          <div class="cart-modal__item-quantity">${item.amount}</div>
          <button class="cart-modal__btn btn-incr-i">+</button>
          <button class="cart-modal__btn btn-del-i">X</button>
        </div>
    `;

    const totalAmount = document.querySelector(".amount__value");
    totalAmount.innerHTML = `${cart.totalAmount}`;

    const totalPrice = document.querySelector(".price__value");
    totalPrice.innerHTML = `${cart.totalPrice}`;

    const decreaseBtn = cartItem.querySelector(".btn-decr-i");
    decreaseBtn.addEventListener("click", () => {
      cart.decreaseItem(item);
      renderCart.renderCartList(cart.items);
    });

    const addBtn = cartItem.querySelector(".btn-incr-i");
    addBtn.addEventListener("click", () => {
      cart.addToCart(item);
      renderCart.renderCartList(cart.items);
    });

    const removeBtn = cartItem.querySelector(".btn-del-i");
    removeBtn.addEventListener("click", () => {
      cart.removeItem(item);
      renderCart.renderCartList(cart.items);
      totalAmount.innerHTML = ` ${cart.totalAmount} `;
      totalPrice.innerHTML = ` ${cart.totalPrice}`;
    });

    return cartItem;
  }

  renderCartList(items) {
    this.cartContainer.innerHTML = ``;
    let products = items.map((item) => {
      return this.renderCartToList(item);
    });
    return this.cartContainer.append(...products);
  }

  // toggle cart
  openCartModalWindow() {
    const cartBtn = document.querySelector(".header__cart-btn");
    const cartWindow = document.querySelector(".cart-modal");

    cartBtn.onclick = () => {
      cartWindow.classList.toggle("hidden");
    };
  }
}

const cart = new Cart();
const renderCart = new RenderCart(cart);
