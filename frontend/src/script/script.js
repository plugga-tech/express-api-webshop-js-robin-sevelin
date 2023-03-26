const formContainer = document.getElementById('form-container');
const createUserButton = document.getElementById('create-user-button');
const appNav = document.getElementById('app-nav');
const appContent = document.getElementById('app-content');
// const order = {
//   user: localStorage.getItem('user'),
//   products: [{ productId: '', quantity: 0 }],
// };

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function init() {
  if (localStorage.getItem('user')) {
    console.log('ÄR INLOGGAD');
    renderAppNav();
  } else {
    console.log('ÄR EJ INLOGGAD');
    renderLoginForm();
  }
}

function renderAppNav() {
  const logOutButton = document.createElement('button');
  const productsButton = document.createElement('button');
  const ordersButton = document.createElement('button');
  const shoppingCartButton = document.createElement('button');
  logOutButton.classList.add('nav');
  productsButton.classList.add('nav');
  shoppingCartButton.classList.add('nav');
  ordersButton.classList.add('nav');

  ordersButton.innerHTML = 'dina ordrar';
  productsButton.innerHTML = 'våra produkter';
  shoppingCartButton.innerHTML = 'din varukorg';
  logOutButton.innerHTML = 'logga ut';

  appNav.append(productsButton, shoppingCartButton, ordersButton, logOutButton);

  productsButton.addEventListener('click', () => {
    fetchProducts();
  });

  shoppingCartButton.addEventListener('click', () => {
    renderShoppingCart();
  });

  ordersButton.addEventListener('click', () => {});

  logOutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    appContent.innerHTML = '';
    init();
  });
}

createUserButton.addEventListener('click', () => {
  const nameInput = document.getElementById('input-name');
  const emailInput = document.getElementById('input-email');
  const passwordInput = document.getElementById('input-password');

  if (
    nameInput.value === '' ||
    emailInput.value === '' ||
    passwordInput.value === '' ||
    !emailInput.value.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
  ) {
    console.log('du måste fylla in fälten korrekt');
    return;
  }

  const newUser = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  createUser(newUser);
  nameInput.innerHTML = '';
  emailInput.innerHTML = '';
  passwordInput.innerHTML = '';
});

async function createUser(newUser) {
  await fetch('http://localhost:3000/api/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  }).then((res) => res.json());
  console.log('användare skapad');
}

function renderLoginForm() {
  const emailInput = document.createElement('input');
  const passwordInput = document.createElement('input');
  const logInUserButton = document.createElement('button');

  emailInput.placeholder = 'e-post';
  passwordInput.placeholder = 'lösenord';

  passwordInput.type = 'password';
  emailInput.type = 'email';

  appNav.innerHTML = '<h2>Logga in</h2>';
  logInUserButton.innerHTML = 'Skicka';

  appNav.append(emailInput, passwordInput, logInUserButton);

  logInUserButton.addEventListener('click', () => {
    if (
      emailInput.value === '' ||
      passwordInput.value === '' ||
      !emailInput.value.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
    ) {
      console.log('du måste fylla in fälten korrekt');
      return;
    }

    let user = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    logInUser(user);
    appNav.innerHTML = '';
  });
}

async function logInUser(user) {
  await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((loggedUser) => {
      if (loggedUser) {
        localStorage.setItem('user', loggedUser);
        init();
      } else {
        console.log('inloggningen misslyckades');
      }
    });
}

async function fetchProducts() {
  await fetch('http://localhost:3000/api/products').then((res) =>
    res.json().then((data) => {
      console.log(data);
      renderProducts(data);
    })
  );
}

function renderProducts(data) {
  appContent.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    const productContainer = document.createElement('div');
    const addToCartButton = document.createElement('button');

    addToCartButton.innerHTML = 'lägg till i varukogen';
    appContent.appendChild(productContainer);

    productContainer.innerHTML += `<div class="product-card"><h3>${data[i].name}</h3>${data[i].description}<br />
      <img src="./img/röd.jpg" loading="lazy" with="100" height="100" alt="ball"><br />
      kategori: ${data[i].category.name}<br />
      pris: ${data[i].price} kr/st<br />lagerstatus: ${data[i].lager} st</div>`;

    productContainer.appendChild(addToCartButton);

    addToCartButton.addEventListener('click', () => {
      const product = data[i]._id;

      addProductToCart(product);
    });
  }
}

async function addProductToCart(product) {
  console.log(product);

  await fetch('http://localhost:3000/api/products/' + product)
    .then((res) => res.json())
    .then((product) => {
      const itemInCart = cart.find(
        (cartProduct) => cartProduct._id === product._id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        cart = updatedCart;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    });
}

function renderShoppingCart() {
  appContent.innerHTML = '';
  const submitOrderButton = document.createElement('button');
  const removeItemsButton = document.createElement('button');

  appContent.innerHTML = '<h2>varukorgen</h2>';

  for (let i = 0; i < cart.length; i++) {
    const cartItem = document.createElement('li');
    appContent.append(cartItem);
    cartItem.innerHTML = `${cart[i].name}<br /> antal: ${cart[i].quantity} st`;
  }

  appContent.append(submitOrderButton, removeItemsButton);
  submitOrderButton.innerHTML = 'skicka order';
  removeItemsButton.innerHTML = 'rensa varukorgen';

  removeItemsButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    console.log('varukorgen är tömd');
    renderShoppingCart();
  });

  submitOrderButton.addEventListener('click', () => {
    let products = [];

    const itemsInCart = JSON.parse(localStorage.getItem('cart'));

    for (let i = 0; i < itemsInCart.length; i++) {
      products.push({
        productId: itemsInCart[i]._id,
        quantity: itemsInCart[i].quantity,
      });
    }

    let newOrder = {
      user: localStorage.getItem('user'),
      products,
    };

    sendOrder(newOrder);
  });
}

async function sendOrder(data) {
  await fetch('http://localhost:3000/api/orders/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let userOrder = {
        user: localStorage.getItem('user'),
        token: '1234key1234',
      };

      console.log(userOrder);
    });
}

async function fetchUserOrders(data) {
  await fetch('http://localhost:3000/api/orders/user', {
    method: 'POST',
    headers: {
      'Content-Type:': 'application/json',
      body: JSON.stringify(data),
    },
  }).then((res) =>
    res.json().then((data) => {
      console.log(data);
    })
  );
}

// function renderOrderPage(orders) {
//   appContent.innerHTML = '<h2>Dina ordrar</h2>';

//   for (let i = 0; i < orders.length; i++) {
//     console.log('hej');
//   }
// }

init();
