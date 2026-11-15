import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');

form.addEventListener('submit', event => {
  event.preventDefault();
  const formDrink = new FormData(event.target);
  const drink = formDrink.get('drink');
  const decision = new FormData(event.target);
  const row = addOrderRow(drink);

  makeOrder(PREP_TIME[drink], decision.get('state') === 'fulfilled')
    .then(delay => {
      row.classList.remove('row-pending');
      row.classList.add('row-ok');
      row.textContent = `✅ ${drink} · готове · ${delay} ms`;
    })
    .catch(delay => {
      row.classList.remove('row-pending');
      row.classList.add('row-err');
      row.textContent = `❌ ${drink} · скасовано · ${delay} ms`;
    })
    .finally(() => {
      row.insertAdjacentText(
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
  const row = document.querySelector('.row-pending');
  return row;
}
