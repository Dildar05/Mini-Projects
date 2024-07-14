const output = document.querySelector('.pass-output');
const upperCheck = document.getElementById('upper');
const lowerCheck = document.getElementById('lower');
const numberCheck = document.getElementById('number');
const symbolCheck = document.getElementById('symbol');
const passLength = document.querySelector('.length');

const generBtn = document.querySelector('.generate');
const copyBtn = document.querySelector('.copy');

function getRandomChar(chars) {
  const randomIndex = Math.floor(Math.random() * chars.length);
  return chars[randomIndex];
}

function generatePassword(len) {
  const LOWER = 'abcdefghijklmnopqrstuvwxyz';
  const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const DIGITS = '0123456789';
  const SYMBOLS = '!@#$%^&*()_+[]{}|;:,.<>?';

  let allChars = '';
  let password = '';

  if (lowerCheck.checked) allChars += LOWER;
  if (upperCheck.checked) allChars += UPPER;
  if (numberCheck.checked) allChars += DIGITS;
  if (symbolCheck.checked) allChars += SYMBOLS;

  if (allChars.length === 0) {
    throw new Error('At least one character type must be selected');
  }

  if (lowerCheck.checked) password += getRandomChar(LOWER);
  if (upperCheck.checked) password += getRandomChar(UPPER);
  if (numberCheck.checked) password += getRandomChar(DIGITS);
  if (symbolCheck.checked) password += getRandomChar(SYMBOLS);

  for (let i = password.length; i < len; i++) {
    password += getRandomChar(allChars);
  }

  password = password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return password;
}

generBtn.addEventListener('click', () => {
  output.innerHTML = '';
  const length = parseInt(passLength.value);
  try {
    output.innerHTML += generatePassword(length);
  } catch (error) {
    alert(error.message);
  }
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard
    .writeText(output.innerHTML)
    .then(() => {
      alert('Password copied to clipboard');
    })
    .catch((error) => {
      console.error('Failed to copy password: ', error);
      alert('Failed to copy password');
    });
});
