import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');
let drink;

form.addEventListener('submit', event => {
  event.preventDefault();
  const formDrink = new FormData(event.target);
  drink = formDrink.get('drink');
  const decision = new FormData(event.target);
  const row = addOrderRow(drink);
  console.log(row);
  const change = row.querySelector('.row-pending');
  makeOrder(PREP_TIME[drink], decision.get('state') === 'fulfilled')
    .then(delay => {
      change.classList.remove('row-pending');
      change.classList.add('row-ok');
      change.textContent = `✅ ${drink} · готове · ${delay} ms`;
    })
    .catch(delay => {
      change.classList.remove('row-pending');
      change.classList.add('row-err');
      change.textContent = `❌ ${drink} · скасовано · ${delay} ms`;
    })
    .finally(() => {
      change.insertAdjacentText(
        'beforeend',
        ` · ${new Date().toLocaleTimeString('uk-UA')}`
      );
    });
});

function makeOrder(delay, shouldResolve = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function addOrderRow(name) {
  orderLog.insertAdjacentHTML(
    'beforeend',
    `<li class="row-pending">⏳ ${name} у роботі </li>`
  );
  return orderLog;
}
