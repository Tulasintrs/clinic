// --------------------------
// PAGE NAVIGATION
// --------------------------
function showPage(page) {
    let pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = "none"; // hide all pages
    }
    document.getElementById(page).style.display = "block"; // show selected page
}

// --------------------------
// SIGNUP
// --------------------------
function signup() {
    let name = document.getElementById("sname").value;
    let email = document.getElementById("semail").value;
    let password = document.getElementById("spass").value;
    let cpass = document.getElementById("scpass").value;
    let phone = document.getElementById("sphone").value;
    let msg = document.getElementById("smsg");

    if (!name || !email || !password || !cpass || !phone) {
        msg.innerText = "Please fill all fields!";
        return;
    }
    if (!email.includes("@")) {
        msg.innerText = "Enter valid email!";
        return;
    }
    if (password !== cpass) {
        msg.innerText = "Passwords do not match!";
        return;
    }

    // save to localStorage
    let patient = {name: name, email: email, password: password};
    localStorage.setItem("patient", JSON.stringify(patient));
    msg.innerText = "Signup successful! You can login now.";
}

// --------------------------
// LOGIN
// --------------------------
function login() {
    let email = document.getElementById("lemail").value;
    let password = document.getElementById("lpass").value;
    let msg = document.getElementById("lmsg");

    let patient = JSON.parse(localStorage.getItem("patient"));
    if (patient && patient.email === email && patient.password === password) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("patientName", patient.name);
        msg.innerText = "Login successful!";
        showPage("home");
    } else {
        msg.innerText = "Invalid email or password!";
    }
}

// --------------------------
// DOCTORS LISTING (No Images)
// --------------------------
function loadDoctors() {
    let container = document.getElementById("doctorList");
    container.innerHTML = "";

    let doctors = [
        {name: "Dr. Smith", spec: "Cardiologist", available: "Available"},
        {name: "Dr. Johnson", spec: "Dermatologist", available: "Not Available"},
        {name: "Dr. Emily", spec: "Pediatrician", available: "Available"}
    ];

    for (let i = 0; i < doctors.length; i++) {
        let card = "<div class='card'>" +
                   "<h4>" + doctors[i].name + "</h4>" +
                   "<p>Specialization: " + doctors[i].spec + "</p>" +
                   "<p>Status: " + doctors[i].available + "</p>" +
                   "</div>";
        container.innerHTML += card;
    }
}

// --------------------------
// APPOINTMENTS
// --------------------------
let appointments = [];

function bookAppointment() {
    let patient = localStorage.getItem("patientName") || document.getElementById("apname").value;
    let doctor = document.getElementById("apdoctor").value;
    let date = document.getElementById("apdate").value;
    let time = document.getElementById("aptime").value;
    let reason = document.getElementById("apreason").value;
    let msg = document.getElementById("apmsg");

    if (!patient || !doctor || !date || !time || !reason) {
        msg.innerText = "Please fill all fields!";
        return;
    }

    appointments.push({patient, doctor, date, time, reason});
    localStorage.setItem("appointments", JSON.stringify(appointments));
    msg.innerText = "Appointment booked!";
    showAppointments();
}

function showAppointments() {
    let table = document.getElementById("appointmentTable");
    table.innerHTML = "<tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Reason</th></tr>";

    for (let i = 0; i < appointments.length; i++) {
        let a = appointments[i];
        table.innerHTML += "<tr><td>"+a.patient+"</td><td>"+a.doctor+"</td><td>"+a.date+"</td><td>"+a.time+"</td><td>"+a.reason+"</td></tr>";
    }
}

// --------------------------
// CONTACT FORM
// --------------------------
function contact() {
    let name = document.getElementById("cname").value;
    let email = document.getElementById("cemail").value;
    let message = document.getElementById("cmsg").value;
    let status = document.getElementById("cstatus");

    if (!name || !email || !message) {
        status.innerText = "Please fill all fields!";
        return;
    }
    if (!email.includes("@")) {
        status.innerText = "Enter valid email!";
        return;
    }
    status.innerText = "Message sent successfully!";
}

// --------------------------
// INITIAL LOAD
// --------------------------
window.onload = function() {
    loadDoctors();
    showAppointments();
    showPage('home'); // start with home page
}
