const productContainer = document.getElementById('products');
const formContainer = document.getElementById('form-container');
const createUserButton = document.getElementById('create-user-button');
const loginForm = document.getElementById('login-form');
const appContainer = document.getElementById('app');

function init() {
  if (localStorage.getItem('user')) {
    console.log('ÄR INLOGGAD');
    fetchProducts();
  } else {
    console.log('ÄR EJ INLOGGAD');
    renderLoginForm();
  }
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

async function fetchProducts() {
  await fetch('http://localhost:3000/api/products').then((res) =>
    res.json().then((data) => {
      console.log(data);
      renderProducts(data);
    })
  );
}

function renderLoginForm() {
  const emailInput = document.createElement('input');
  const passwordInput = document.createElement('input');
  const logInUserButton = document.createElement('button');

  emailInput.placeholder = 'e-post';
  passwordInput.placeholder = 'lösenord';

  passwordInput.type = 'password';
  emailInput.type = 'email';

  loginForm.innerHTML = '<h2>Logga in</h2>';
  logInUserButton.innerHTML = 'Skicka';

  loginForm.append(emailInput, passwordInput, logInUserButton);

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

    console.log(user);
    logInUser(user);
  });
}

async function logInUser(user) {
  await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        localStorage.setItem('user', data.email);
        console.log(data.email);
        init();
      } else {
        console.log('inloggningen misslyckades');
      }
    });
}

function renderProducts(data) {
  const ulElement = document.createElement('ul');
  const liElement = document.createElement('li');
  const addToCartButton = document.createElement('button');
  addToCartButton.classList.add('add-to-cart');

  addToCartButton.innerHTML = 'lägg till i varukogen';

  productContainer.innerHTML = '<h2>Våra produkter</h2>';
  productContainer.appendChild(ulElement);

  for (let i = 0; i < data.length; i++) {
    ulElement.appendChild(liElement);
    liElement.innerHTML += `<h3>${data[i].name}</h3><p>${data[i].description}</p>
    <img src="./img/${data[i].category.name}.jpg" loading="lazy" with="100" height="100" alt="ball">
    <p>${data[i].price} kr</p><p>${data[i].lager} st kvar i lager</p>`;
    liElement.appendChild(addToCartButton);
  }

  addToCartButton.addEventListener('click', () => {
    console.log('click');
  });
}

async function fetchShoppingCart() {
  await fetch('http://localhost:3000/api/orders/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shoppingCart),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // renderShoppingCart(data);
    });
}

function renderShoppingCart(shoppingCart) {
  const shoppingCartContainer = document.getElementById('shopping-cart');
  const cartItem = document.createElement('div');

  shoppingCartContainer.innerHTML = '<h2>Varukorgen</h2>';

  for (let i = 0; i < shoppingCart.length; i++) {
    shoppingCartContainer.appendChild(cartItem);
  }
}

init();
// renderShoppingCart();

// fetchShoppingCart();
