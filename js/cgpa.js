// ======================================
// KTU CGPA Calculator
// ======================================

const studentType = document.getElementById("studentType");
const generateBtn = document.getElementById("generate");
const semesterInputs = document.getElementById("semesterInputs");
const calculateBtn = document.getElementById("calculateCGPA");
const resetBtn = document.getElementById("resetCGPA");
const result = document.getElementById("cgpaResult");

// Generate Semester Fields

generateBtn.addEventListener("click", generateFields);

function generateFields() {

    semesterInputs.innerHTML = "";

    let semesters = 0;

    if (studentType.value === "regular") {

        semesters = 8;

    }
    else if (studentType.value === "let") {

        semesters = 6;

    }
    else {

        alert("Please select Student Type");

        return;
    }

    for (let i = 1; i <= semesters; i++) {

        const div = document.createElement("div");

        div.className = "form-group";

        div.innerHTML = `

            <label>Semester ${i} SGPA</label>

            <input
                type="number"
                class="sgpa"
                min="0"
                max="10"
                step="0.01"
                placeholder="Enter SGPA">

        `;

        semesterInputs.appendChild(div);

    }

}

// Calculate CGPA

calculateBtn.addEventListener("click", calculateCGPA);

function calculateCGPA() {

    const inputs = document.querySelectorAll(".sgpa");

    if (inputs.length === 0) {

        alert("Generate semester fields first.");

        return;
    }

    let total = 0;

    let count = 0;

    for (let input of inputs) {

        if (input.value === "") {

            alert("Please enter all SGPA values.");

            return;

        }

        let sgpa = parseFloat(input.value);

        if (sgpa < 0 || sgpa > 10) {

            alert("SGPA must be between 0 and 10.");

            return;

        }

        total += sgpa;

        count++;

    }

    const cgpa = (total / count).toFixed(2);

    result.innerHTML = cgpa;

}

// Reset

resetBtn.addEventListener("click", () => {

    semesterInputs.innerHTML = "";

    result.innerHTML = "0.00";

    studentType.selectedIndex = 0;

});