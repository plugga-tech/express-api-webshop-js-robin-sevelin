const appContainer = document.getElementById('app');

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

  appContainer.innerHTML = '<h2>Skapa användare</h2>';
  createUserButton.innerHTML = 'Skicka';

  appContainer.append(nameInput, emailInput, passwordInput, createUserButton);

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
    })
  );
}

fetchProducts();
renderForm();
