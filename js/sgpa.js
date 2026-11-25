/*
==========================================
KTU SGPA Calculator
Main JavaScript
==========================================
*/

// ---------------------------
// Grade List
// ---------------------------

const grades = {
    "S": 10,
    "A+": 9,
    "A": 8.5,
    "B+": 8,
    "B": 7,
    "C": 6,
    "P": 5,
    "F": 0,
    "FE": 0,
    "Absent": 0
};


// ---------------------------
// HTML Elements
// ---------------------------

const department = document.getElementById("department");
const semester = document.getElementById("semester");

const loadBtn = document.getElementById("loadSubjects");

const subjectsContainer =
document.getElementById("subjectsContainer");


// ---------------------------
// Load Subjects Button
// ---------------------------

loadBtn.addEventListener("click", loadSubjects);


// ---------------------------
// Load Subjects Function
// ---------------------------

function loadSubjects() {

    const dept = department.value;

    const sem = semester.value;

    // Validation

    if (dept === "" || sem === "") {

        alert("Please select Department and Semester.");

        return;

    }

    // Get Subject List

    const subjectList = subjects[dept][sem];

    // Clear Old Subjects

    subjectsContainer.innerHTML = "";

    // Loop through every subject

    subjectList.forEach(createSubjectCard);

}

// ---------------------------
// Create Subject Card
// ---------------------------

function createSubjectCard(subject) {

    const card = document.createElement("div");

    card.className = "subject-card";

    card.innerHTML = `

        <div class="subject-details">

            <h3>${subject.code}</h3>

            <p>${subject.name}</p>

            <span>Credits : ${subject.credits}</span>

        </div>

        <div class="subject-grade">

            <select class="grade">

                <option value="">Grade</option>

                <option>S</option>
                <option>A+</option>
                <option>A</option>
                <option>B+</option>
                <option>B</option>
                <option>C</option>
                <option>P</option>
                <option>F</option>
                <option>FE</option>
                <option>Absent</option>

            </select>

            <button class="delete-btn">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

    `;

    subjectsContainer.appendChild(card);

}

// ===========================
// Delete Subject
// ===========================

subjectsContainer.addEventListener("click", function (e) {

    if (e.target.closest(".delete-btn")) {

        e.target.closest(".subject-card").remove();

    }

});

// ===========================
// Add Subject
// ===========================

const addBtn = document.getElementById("addSubject");

addBtn.addEventListener("click", function () {

    const subject = {

        code: "CUSTOM",

        name: "New Subject",

        credits: 3

    };

    createSubjectCard(subject);

});

// ===========================
// Calculate SGPA
// ===========================

const calculateBtn = document.getElementById("calculate");

calculateBtn.addEventListener("click", calculateSGPA);

function calculateSGPA() {

    const cards = document.querySelectorAll(".subject-card");

    if (cards.length === 0) {

        alert("Please load subjects first.");

        return;

    }

    let totalCredits = 0;
    let totalPoints = 0;
    let valid = true;

    cards.forEach(card => {

        const grade = card.querySelector(".grade").value;

        if (grade === "") {

            valid = false;
            return;

        }

        const creditText = card.querySelector("span").innerText;

        const credits = Number(
            creditText.replace("Credits : ", "")
        );

        totalCredits += credits;
        totalPoints += grades[grade] * credits;

    });

    if (!valid) {

        alert("Please select grades for all subjects.");

        return;

    }

   const sgpa = totalPoints / totalCredits;

const result = document.getElementById("result");

result.innerHTML = `
    ${sgpa.toFixed(2)}
    <br>
    <span style="font-size:20px;">
        ${getRemark(sgpa)}
    </span>
`;

// Statistics
document.getElementById("statistics").innerHTML = `
    Total Credits : ${totalCredits}
`;

// Last SGPA Save
localStorage.setItem("lastSGPA", sgpa.toFixed(2));

setResultColor(sgpa);

animateResult();

updateProgress(sgpa);
// ===========================
// Reset
// ===========================

const resetBtn =
document.getElementById("reset");

resetBtn.addEventListener("click", function () {

    department.value = "";

    semester.value = "";

    subjectsContainer.innerHTML = "";

    document.getElementById("result").innerHTML = "0.00";

});

// =============================
// SGPA Remark
// =============================

function getRemark(sgpa){

    if(sgpa >= 9){
        return "🏆 Excellent";
    }

    if(sgpa >= 8){
        return "🌟 Very Good";
    }

    if(sgpa >= 7){
        return "👍 Good";
    }

    if(sgpa >= 6){
        return "🙂 Average";
    }

    return "⚠️ Needs Improvement";

}

// =============================
// Result Color
// =============================

function setResultColor(sgpa){

    const result =
    document.getElementById("result");

    if(sgpa>=9){

        result.style.color="#22c55e";

    }

    else if(sgpa>=8){

        result.style.color="#38bdf8";

    }

    else if(sgpa>=7){

        result.style.color="#facc15";

    }

    else{

        result.style.color="#ef4444";

    }

}

// =============================
// Result Animation
// =============================

function animateResult(){

    const box =
    document.getElementById("resultBox");

    box.animate([

        {
            transform:"scale(.7)",
            opacity:0
        },

        {
            transform:"scale(1.08)",
            opacity:1
        },

        {
            transform:"scale(1)"
        }

    ],{

        duration:700

    });

}

// =============================
// Download PDF
// =============================

const pdfBtn =
document.getElementById("downloadPDF");

pdfBtn.addEventListener("click", downloadPDF);

function downloadPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    const result =
    document.getElementById("result").innerText;

    doc.setFontSize(22);

    doc.text("KTU SGPA Calculator",20,20);

    doc.setFontSize(16);

    doc.text("Department : " + department.value,20,40);

    doc.text("Semester : " + semester.value,20,55);

    doc.text("SGPA : " + result,20,75);

    doc.save("KTU_SGPA_Result.pdf");

}

// =============================
// Progress Bar
// =============================

function updateProgress(sgpa){

    const progress = (sgpa / 10) * 100;

    document.getElementById("progressBar").style.width =
    progress + "%";

}

// =============================
// Load Last SGPA
// =============================

window.addEventListener("load", () => {

    const lastSGPA = localStorage.getItem("lastSGPA");

    if(lastSGPA){

        document.getElementById("result").innerHTML =
        lastSGPA;

        updateProgress(Number(lastSGPA));

    }

});
}