const formContainer = document.getElementById('form-container');
const createUserButton = document.getElementById('create-user-button');
const appNav = document.getElementById('app-nav');
const appContent = document.getElementById('app-content');
const order = {
  user: localStorage.getItem('user'),
  products: [{ productId: '', quantity: 0 }],
};

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
    appContent.innerHTML = '';
    fetchProducts();
  });

  shoppingCartButton.addEventListener('click', () => {
    appContent.innerHTML = '';
    renderShoppingCart();
  });

  ordersButton.addEventListener('click', () => {
    appContent.innerHTML = '';

    // order = { user: 'user', token: '1234key1234' };
    // fetchOrders();
  });

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
        console.log(data);
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
      order.products[i].productId = data[i]._id;
      order.products[i].quantity += 1;
      console.log(order);
    });
  }
}

function renderShoppingCart() {
  const submitOrderButton = document.createElement('button');

  appContent.innerHTML = '<h2>varukorgen</h2>';

  for (let i = 0; i < order.products.length; i++) {
    const cartItem = document.createElement('li');
    appContent.append(cartItem);
    cartItem.innerHTML = `Artikel: ${order.products[i].productId}<br /> antal: ${order.products[i].quantity}`;
  }

  appContent.appendChild(submitOrderButton);
  submitOrderButton.innerHTML = 'skicka order';

  submitOrderButton.addEventListener('click', () => {});
}

async function sendOrder(product) {
  await fetch('http://localhost:3000/api/orders/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {});
}

async function fetchOrders(order) {
  await fetch('http://localhost:3000/api/orders/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  }).then((res) =>
    res.json().then((data) => {
      console.log(data);
      renderOrderPage(data);
    })
  );
}

// function renderOrderPage(orders) {
//   const orderContainer = document.createElement('div');

//   for (let i = 0; i < orders.length; i++) {
//     console.log(orders[i]);
//   }
// }

init();
