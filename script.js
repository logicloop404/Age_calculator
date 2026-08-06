const voiceBtn = document.getElementById("voiceBtn");

voiceBtn.addEventListener("click", speakAge);
const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculateBtn");
const themeBtn = document.getElementById("themeBtn");

let birthDate = null;

/* -------------------- Live Clock -------------------- */

function updateClock() {
    const now = new Date();

    document.getElementById("liveClock").innerHTML =
        now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

/* -------------------- Dark Mode -------------------- */

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = "☀️";
    } else {
        themeBtn.innerHTML = "🌙";
    }

});

/* -------------------- Calculate Button -------------------- */

calculateBtn.addEventListener("click", () => {

    if (!dobInput.value) {

        alert("Please select your birth date.");

        return;
    }

    birthDate = new Date(dobInput.value);

    calculateAge();

});

/* -------------------- Live Counter -------------------- */

setInterval(() => {

    if (birthDate) {

        calculateAge();

    }

}, 1000);

/* -------------------- Age Calculation -------------------- */

function calculateAge() {
    

    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    // Days adjustment

    if (days < 0) {

        months--;

        const previousMonth =
            new Date(now.getFullYear(), now.getMonth(), 0);

        days += previousMonth.getDate();

    }

    // Months adjustment

    if (months < 0) {

        years--;

        months += 12;

    }

    document.getElementById("years").innerHTML = years;
    document.getElementById("months").innerHTML = months;
    document.getElementById("days").innerHTML = days;

    /* ----- Live Hours ----- */

    let hourDiff = now.getHours() - birthDate.getHours();

    if (hourDiff < 0) {

        hourDiff += 24;

    }

    document.getElementById("hours").innerHTML = hourDiff;

    /* ----- Minutes ----- */

    let minuteDiff = now.getMinutes() - birthDate.getMinutes();

    if (minuteDiff < 0) {

        minuteDiff += 60;

    }

    document.getElementById("minutes").innerHTML = minuteDiff;

    /* ----- Seconds ----- */

    let secondDiff = now.getSeconds() - birthDate.getSeconds();

    if (secondDiff < 0) {

        secondDiff += 60;

    }

    document.getElementById("seconds").innerHTML = secondDiff;
    document.getElementById("seconds").innerHTML = secondDiff;

    getBirthDay();

    getZodiac();

    nextBirthday();

    birthdayProgress();

}
/* ---------------- Day of Birth ---------------- */

function getBirthDay() {

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    document.getElementById("birthDay").innerHTML =
        days[birthDate.getDay()];

}

/* ---------------- Zodiac Sign ---------------- */

function getZodiac() {

    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;

    let zodiac = "";

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18))
        zodiac = "♒ Aquarius";

    else if ((month == 2 && day >= 19) || (month == 3 && day <= 20))
        zodiac = "♓ Pisces";

    else if ((month == 3 && day >= 21) || (month == 4 && day <= 19))
        zodiac = "♈ Aries";

    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20))
        zodiac = "♉ Taurus";

    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20))
        zodiac = "♊ Gemini";

    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22))
        zodiac = "♋ Cancer";

    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22))
        zodiac = "♌ Leo";

    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22))
        zodiac = "♍ Virgo";

    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22))
        zodiac = "♎ Libra";

    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21))
        zodiac = "♏ Scorpio";

    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21))
        zodiac = "♐ Sagittarius";

    else
        zodiac = "♑ Capricorn";

    document.getElementById("zodiac").innerHTML = zodiac;

}
/* ---------------- Next Birthday ---------------- */

function nextBirthday() {

    const today = new Date();

    let next = new Date(
        today.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );

    if (today > next) {

        next.setFullYear(today.getFullYear() + 1);

    }

    const diff = next - today;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {

        document.getElementById("nextBirthday").innerHTML =
            "🎉 Happy Birthday!";

    }

    else {

        document.getElementById("nextBirthday").innerHTML =
            `${days} Days Remaining`;

    }

}
function speakAge() {

    if (!birthDate) {
        alert("Please calculate your age first.");
        return;
    }

    const years = document.getElementById("years").textContent;
    const months = document.getElementById("months").textContent;
    const days = document.getElementById("days").textContent;

    const text = `Your age is ${years} years, ${months} months and ${days} days.`;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}