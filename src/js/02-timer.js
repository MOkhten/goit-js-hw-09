import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerRefs = document.querySelector('.timer');
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;


let numberSelectedDates = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
     onClose(selectedDates) {
    console.log(selectedDates[0]);
         numberSelectedDates = selectedDates[0].getTime();
          const delta = numberSelectedDates - Date.now();
        if (delta <= 0) {
              Notify.failure(
                "Please choose a date in the future", {
                position: 'center-center',
                backOverlay: true,
                clickToClose: true,
            });
              startButton.disabled = true;
              return;
        }
         startButton.disabled = false;
    },
   
}

const myInput = document.querySelector('#datetime-picker');
const fp = flatpickr(myInput, options );

const timer = {
    intervalId: null,
    refs: {},
    start(rootSelector, selectedDates) {
        this.getRefs(rootSelector);
        this.intervalId = setInterval(() => {
            const diff = numberSelectedDates - Date.now();
            if (diff <= 1000) {
               clearInterval(this.intervalId);
            }
        
            const data = this.convertMs(diff);
            this.refs.days.textContent = this.addLeadingZero(data.days);
            this.refs.hours.textContent = this.addLeadingZero(data.hours);
            this.refs.minutes.textContent = this.addLeadingZero(data.minutes);
            this.refs.seconds.textContent = this.addLeadingZero(data.seconds);
        }, 1000);
    },
        getRefs(rootSelector) {
        this.refs.days = rootSelector.querySelector('[data-days]');
        this.refs.hours = rootSelector.querySelector('[data-hours]');
        this.refs.minutes = rootSelector.querySelector('[data-minutes]');
        this.refs.seconds = rootSelector.querySelector('[data-seconds]');
            
    },
    convertMs(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    return { days, hours, minutes, seconds };
  },
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    },
  
    }

startButton.addEventListener('click', () => {
    timer.start(timerRefs, numberSelectedDates);
    startButton.disabled = true;
} );