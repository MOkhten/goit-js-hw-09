import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRefBtn = document.querySelector('.form');
console.log(formRefBtn);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

formRefBtn.addEventListener('submit', e => {
  e.preventDefault();
  let delay = Number(e.currentTarget.delay.value);
  let step = Number(e.currentTarget.step.value);
  let amount = Number(e.currentTarget.amount.value);
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);

  });
    
    delay += step;
  }
});