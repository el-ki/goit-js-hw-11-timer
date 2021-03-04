import './styles.css';
// // Таймер обратного отсчета
// // Создай плагин настраиваемого таймера, который ведет обратный отсчет до предварительно определенной даты. 
// Такой плагин может использоваться в блогах и интернет - магазинах, страницах регистрации событий,
//     во время технического обслуживания и т.д.

// // preview

// // Плагин ожидает следующую HTML-разметку и показывает четыре цифры: дни, часы, минуты и секунды в формате XX:XX:XX:XX.
// Количество дней может состоять из более чем двух цифр.

// <div class="timer" id="timer-1">
//   <div class="field">
//     <span class="value" data-value="days">11</span>
//     <span class="label">Days</span>
//   </div>

//   <div class="field">
//     <span class="value" data-value="hours">11</span>
//     <span class="label">Hours</span>
//   </div>

//   <div class="field">
//     <span class="value" data-value="mins">11</span>
//     <span class="label">Minutes</span>
//   </div>

//   <div class="field">
//     <span class="value" data-value="secs">11</span>
//     <span class="label">Seconds</span>
//   </div>
// </div>
// Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.

// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 17, 2019'),
// });
// Для подсчета значений используй следующие готовые формулы, где time - разница между targetDate и текущей датой.

// /*
//  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
//  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
//  */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

// /*
//  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//  * остатка % и делим его на количество миллисекунд в одном часе
//  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//  */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// /*
//  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
//  */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

// /*
//  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//  * миллисекунд в одной секунде (1000)
//  */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.intervalId = null;
        this.targetDate = targetDate.getTime(); 
        const startime = this.targetDate;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startime - currentTime;
            if (deltaTime <= 0) { 
                clearInterval(this.intervalId)
            }
            const times = getTimeComponents(deltaTime)
            updateClockface(times);
        }, 1000);

        const clockDays = document.querySelector('span[data-value="days"]');
        const clockHours = document.querySelector('span[data-value="hours"]');
        const clockMins = document.querySelector('span[data-value="mins"]');
        const clockSecs = document.querySelector('span[data-value="secs"]');

        function updateClockface({ days, hours, mins, secs }) { 
            clockDays.textContent = `${days}`;
            clockHours.textContent = `${hours}`;
            clockMins.textContent = `${mins}`;
            clockSecs.textContent = `${secs}`;
        };

        function pad(value) { 
            return String(value).padStart(2, '0');
        };
        
        function getTimeComponents(time) {
            const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
            const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
            const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
            return { days, hours, mins, secs };
        };
    } 
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});