function calcTimeTillDate(date) {
    const clock = new Date();
    let year = clock.getFullYear();

    let yearTarget = `${year}-${date}`;                     // gaunam 2021-03-15 14:30:00
    let yearDateObject = new Date(yearTarget);              // gaunam datos objekta
    let currMiliseconds = yearDateObject.getTime();            // suzinom kiek milisekundziu nuo 1970

    const nowInMiliseconds = Date.now();

    if (currMiliseconds < nowInMiliseconds) {
        year++;
        yearTarget = `${year}-${date}`;
        yearDateObject = new Date(yearTarget);
        currMiliseconds = yearDateObject.getTime();
    }

    const timeLeftInMiliseconds = currMiliseconds - nowInMiliseconds;
    let timeLeftInSeconds = Math.round(timeLeftInMiliseconds / 1000);

    // const seconds = timeLeftInSeconds % 60;
    // const minutes = (timeLeftInSeconds - seconds) / 60 % 60;
    // const hours = (timeLeftInSeconds - seconds - minutes * 60) / 3600 % 24;
    // const days = (timeLeftInSeconds - seconds - minutes * 60 - hours * 3600) / 86400;

    const days = Math.floor(timeLeftInSeconds / 86400);
    timeLeftInSeconds -= days * 86400;
    const hours = Math.floor(timeLeftInSeconds / 3600);
    timeLeftInSeconds -= hours * 3600;
    const minutes = Math.floor(timeLeftInSeconds / 60);
    const seconds = timeLeftInSeconds % 60;

    return { days, hours, minutes, seconds }
}

function formatNumber(number) {
    return number < 10 ? '0' + number : number;
}

function updateTime(valuesDOM, timeValues) {
    const config = ['days', 'hours', 'minutes', 'seconds'];

    for (let i = 0; i < valuesDOM.length; i++) {
        const valueDOM = valuesDOM[i];
        const key = config[i];
        const value = key === 'days' ? timeValues[key] : formatNumber(timeValues[key]);
        valueDOM.innerText = value;
    }
}

function clock(selector, date) {
    const DOM = document.querySelector(selector);
    const timeLeft = calcTimeTillDate(date);
    const config = ['days', 'hours', 'minutes', 'seconds'];

    let HTML = '';
    for (const item of config) {
        const value = item === 'days' ? timeLeft[item] : formatNumber(timeLeft[item]);

        HTML += `<div class="time">
                    <div class="value">${value}</div>
                    <div class="label">${item}</div>
                </div>`;
    }

    DOM.innerHTML = HTML;
    const allTimeValueDOM = DOM.querySelectorAll('.value');

    setInterval(() => {
        updateTime(allTimeValueDOM, calcTimeTillDate(date));
    }, 1000);
}

export { clock }