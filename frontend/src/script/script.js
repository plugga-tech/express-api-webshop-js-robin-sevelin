const appContainer = document.getElementById('app');
const formContainer = document.getElementById('form-container');

function renderLoginForm() {
  const emailInput = document.createElement('input');
  const passwordInput = document.createElement('input');
  const logInUserButton = document.createElement('button');

  emailInput.placeholder = 'e-post';
  passwordInput.placeholder = 'lösenord';

  passwordInput.type = 'password';
  emailInput.type = 'email';

  appContainer.innerHTML = '<h2>Logga in</h2>';
  logInUserButton.innerHTML = 'Skicka';

  appContainer.append(emailInput, passwordInput, logInUserButton);
}

function renderForm() {
  const nameInput = document.createElement('input');
  const emailInput = document.createElement('input');
  const passwordInput = document.createElement('input');
  const createUserButton = document.createElement('button');

  nameInput.placeholder = 'namn';
  emailInput.placeholder = 'e-post';
  passwordInput.placeholder = 'lösenord';

  nameInput.type = 'text';
  passwordInput.type = 'password';
  emailInput.type = 'email';

  formContainer.innerHTML = '<h2>Skapa användare</h2>';
  createUserButton.innerHTML = 'Skicka';

  formContainer.append(nameInput, emailInput, passwordInput, createUserButton);

  createUserButton.addEventListener('click', () => {
    if (
      nameInput.value === '' ||
      emailInput.value === '' ||
      passwordInput.value === ''
    ) {
      console.log('du måste fylla in fälten korrekt');
      return;
    }

    const newUser = {
      userName: nameInput.value,
      userEmail: emailInput.value,
      userPassword: passwordInput.value,
    };

    createUser(newUser);
    renderForm();
  });
}

function createUser(newUser) {
  console.log(newUser);
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
  const ulElement = document.createElement('ul');
  const liElement = document.createElement('li');
  const addToCartButton = document.createElement('button');

  addToCartButton.innerHTML = 'lägg till i varukogen';

  appContainer.innerHTML = '<h2>Våra produkter</h2>';
  appContainer.appendChild(ulElement);

  for (let i = 0; i < data.length; i++) {
    appContainer.appendChild(liElement);
    liElement.innerHTML = `<h3>${data[i].name}</h3>
                          <p>${data[i].description}</p>
                          <img src="./img/red-ball.jpg" loading="lazy" with="100" height="100" alt="red-ball">
                          <p>${data[i].price} kr</p>
                          <p>${data[i].lager} st kvar i lager</p>`;
  }
  appContainer.appendChild(addToCartButton);

  addToCartButton.addEventListener('click', () => {
    console.log('click');
  });
}

fetchProducts();
renderForm();
// renderLoginForm();
