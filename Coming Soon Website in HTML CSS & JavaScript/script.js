// Countdown Timer Logic
const launchDate = new Date("December 31, 2025 00:00:00").getTime(); // Set your target date here

const countdown = () => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector(".days .number").innerText = days;
    document.querySelector(".hours .number").innerText = hours;
    document.querySelector(".minutes .number").innerText = minutes;
    document.querySelector(".seconds .number").innerText = seconds;
};

// Run countdown immediately and then every second
countdown();
setInterval(countdown, 1000);

// Email Subscription Form Logic
document.querySelector(".input-box button").addEventListener("click", () => {
    const emailInput = document.querySelector(".input-box input");
    const email = emailInput.value.trim();

    if (email === "") {
        alert("Please enter your email address.");
        return;
    }

    // You can add AJAX call or integrate with an API/email service here
    alert("Thank you! We'll notify you at launch.");

    // Clear input
    emailInput.value = "";
});