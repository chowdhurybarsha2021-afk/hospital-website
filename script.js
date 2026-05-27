// ================= MENU TOGGLE =================
const menuBtn = document.querySelector(".menu-btn");
const menuContainer = document.querySelector(".menu-container");

if (menuBtn && menuContainer) {
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        menuContainer.classList.toggle("active");
    });

    document.addEventListener("click", () => {
        menuContainer.classList.remove("active");
    });
}

// ================= ABOUT TABS =================
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

if (tabBtns.length) {
    tabBtns.forEach(button => {
        button.addEventListener("click", () => {
            tabBtns.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");

            const target = document.getElementById(button.dataset.tab);
            if (target) target.classList.add("active");
        });
    });
}

// ================= SCROLL ANIMATION =================
const sections = document.querySelectorAll(".section");

function revealSections() {
    sections.forEach(sec => {
        if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
            sec.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealSections);
revealSections();

// ================= COUNTER =================
const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector(".stats-section");
let counterStarted = false;

function startCounters() {
    if (counterStarted) return;
    counterStarted = true;

    counters.forEach(counter => {
        const target = +counter.dataset.target;

        let count = 0;

        const update = () => {
            count += Math.ceil(target / 100);

            if (count < target) {
                counter.innerText = count;
                setTimeout(update, 20);
            } else {
                counter.innerText = target + "+";
            }
        };

        update();
    });
}

window.addEventListener("scroll", () => {
    if (statsSection &&
        statsSection.getBoundingClientRect().top < window.innerHeight - 100) {
        startCounters();
    }
}); 

// ================= APPOINTMENT =================
const form = document.getElementById("appointmentForm");
const tableBody = document.getElementById("appointmentList");

let appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

function showAppointments() {
    if (!tableBody) return;

    tableBody.innerHTML = "";

    appointments.forEach((item, index) => {
        tableBody.innerHTML += `
<tr>
<td>${index + 1}</td>
<td>${item.name}</td>
<td>${item.phone}</td>
<td>${item.doctor}</td>
<td>${item.department}</td>
<td>${item.date}</td>
<td>${item.time}</td>
<td>${item.status}</td>
</tr>`;
    });
}

showAppointments();

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const newApp = {
            name: patientName.value,
            phone: patientPhone.value,
            doctor: doctorSelect.value,
            department: department.value,
            date: appointmentDate.value,
            time: appointmentTime.value,
            status: status.value
        };

        appointments.push(newApp);

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        showAppointments();
        form.reset();

        alert("Appointment Booked Successfully!");
    });
}

// ================= APPOINTMENT TOGGLE =================
function toggleAppointment() {
    const box = document.getElementById("appointmentBox");

    if (!box) return;

    box.style.display =
        box.style.display === "block" ? "none" : "block";

    if (box.style.display === "block") {
        box.scrollIntoView({ behavior: "smooth" });
    }
}

// ================= ADMIN =================
const adminModal = document.getElementById("adminModal");
const dashboard = document.getElementById("dashboard");
const uploadSection = document.getElementById("uploadSection");

function openAdminLogin(e){
    e.preventDefault();

    if(localStorage.getItem("adminLoggedIn")==="true"){
        showDashboard();
        if(uploadSection){
            uploadSection.style.display="block";
        }
    }else{
        adminModal.style.display="flex";
    }
}

function closeAdminLogin(){
    adminModal.style.display="none";
}

function adminLogin(){

const username=document.getElementById("adminUser").value;
const password=document.getElementById("adminPass").value;
const msg=document.getElementById("loginMsg");

if(username==="admin" && password==="1234"){

localStorage.setItem("adminLoggedIn","true");

msg.style.color="green";
msg.innerText="Login Successful";

if(uploadSection){
uploadSection.style.display="block";
}

setTimeout(()=>{
closeAdminLogin();
showDashboard();
},700);

}else{

msg.style.color="red";
msg.innerText="Wrong Username or Password";

}
}

function logoutAdmin(){

localStorage.removeItem("adminLoggedIn");

dashboard.style.display="none";

if(uploadSection){
uploadSection.style.display="none";
}
}

function showDashboard(){

dashboard.style.display="block";

dashboard.scrollIntoView({
behavior:"smooth"
});
}

window.onload=function(){

if(localStorage.getItem("adminLoggedIn")==="true"){

if(uploadSection){
uploadSection.style.display="block";
}

}
}

// ================= DARK MODE =================
const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {
    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "mode",
            document.body.classList.contains("dark-mode")
                ? "dark"
                : "light"
        );
    });
}

window.onload = function () {
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
    }
};

// ================= NOTICE =================
function toggleNotice(el) {
    el.parentElement.classList.toggle("active");
}

// ================= GALLERY =================
function toggleGallery() {
    const gallery = document.getElementById("gallery");

    if (!gallery) return;

    gallery.style.display =
        gallery.style.display === "block" ? "none" : "block";

    if (gallery.style.display === "block") {
        gallery.scrollIntoView({ behavior: "smooth" });
    }
}

// ================= SERVICE MODAL =================
const serviceModal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalInfo = document.getElementById("modalInfo");

document.querySelectorAll(".learn-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
        if (this.dataset.title) {
            e.preventDefault();

            modalTitle.innerText = this.dataset.title;
            modalInfo.innerText = this.dataset.info;
            serviceModal.style.display = "flex";
        }
    });
});

function closeServiceModal() {
    if (serviceModal) serviceModal.style.display = "none";
}

// ================= PAYMENT =================
const paymentForm = document.querySelector("#payment form");

if (paymentForm) {
    paymentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        alert("Payment Saved Successfully");
        this.reset();
    });
}

// Upload
document.getElementById("uploadForm").addEventListener("submit",function(e){

e.preventDefault();

let reportId=document.getElementById("uploadReportId").value;
let file=document.getElementById("reportFile").files[0];

if(file){

let url=URL.createObjectURL(file);

localStorage.setItem("report_"+reportId,url);

alert("Upload Success");

this.reset();

}
});


// Search
document.getElementById("searchForm").addEventListener("submit",function(e){

e.preventDefault();

let reportId=document.getElementById("searchReportId").value;

let file=localStorage.getItem("report_"+reportId);

if(file){

window.open(file);

}else{

alert("Report Not Found");

}
});


// Download
document.getElementById("downloadForm").addEventListener("submit",function(e){

e.preventDefault();

let reportId=document.getElementById("downloadReportId").value;

let file=localStorage.getItem("report_"+reportId);

if(file){

fetch(file)
.then(res=>res.blob())
.then(blob=>{

let url=window.URL.createObjectURL(blob);

let a=document.createElement("a");

a.href=url;
a.download="report"+reportId+".pdf";

document.body.appendChild(a);

a.click();

document.body.removeChild(a);

window.URL.revokeObjectURL(url);

});

}else{

alert("Report Not Found");

}

});