
  
  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

var sixtyMins = 60 * 60, display = document.querySelector('#time');
startTimer(sixtyMins, display);

var todayDate = new Date(); // today's date
var totalSecondsToday = 0;
totalSecondsToday += todayDate.getHours() * 60 * 60; // => 9
totalSecondsToday += todayDate.getMinutes() * 60; // =>  30
totalSecondsToday += todayDate.getSeconds();
console.log("totalSecondsToday: ", totalSecondsToday);

function getTimeRemaining(endtime) {
  // const total = Date.parse(endtime) - Date.parse(new Date());
  // const seconds = Math.floor((total / 1000) % 60) - todayDate.getSeconds();
  // const minutes = Math.floor((total / 1000 / 60) % 60) - (todayDate.getMinutes() * 60);
  // const hours = Math.floor((total / (1000 * 60 * 60)) % 24) - (todayDate.getHours() * 60 * 60);
  // const days = 0;//Math.floor(total / (1000 * 60 * 60 * 24));

  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60) ;
  const minutes = Math.floor((total / 1000 / 60) % 60) ;
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24) ;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  
  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date()) + (24 * 60 * 60 * 1000) - totalSecondsToday*1000);
initializeClock('clockdiv', deadline);
