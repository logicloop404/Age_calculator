function calculateAge() {
    const dob = document.getElementById("dob").value;

    if (dob === "") {
        document.getElementById("result").innerHTML = "Please select your birth date.";
        return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // If days are negative
    if (days < 0) {
        months--;

        // Days in previous month
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    // If months are negative
    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("result").innerHTML =
        `${years} Years ${months} Months ${days} Days`;
}