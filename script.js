// website/script.js

let currentFilter = "all";
let searchKeyword = "";

// =========================
// MODAL
// =========================

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("closeModal");

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

// =========================
// FILTER
// =========================

function setFilter(type){
    currentFilter = type;
    renderAll();
}

// =========================
// SEARCH
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("searchInput");

    input.addEventListener("input", (e) => {
        searchKeyword = e.target.value.toLowerCase();
        renderAll();
    });

    renderAll();
});

// =========================
// SEARCH MATCH
// =========================

function matchSearch(text){
    return text.toLowerCase().includes(searchKeyword);
}

// =========================
// SAFE IMAGE FUNCTION
// =========================

function safeImage(path){
    if (!path || path.trim() === "") {
        return "image/noimage.png";
    }
    return path;
}

// =========================
// STUDENTS
// =========================

function generateStudentCards(){

    const container = document.getElementById("student-container");
    container.innerHTML = "";

    students.forEach(student => {

        const text = `${student.id} ${student.name} ${student.course}`;

        if(currentFilter === "instructors") return;
        if(!matchSearch(text)) return;

        const card = document.createElement("div");
        card.className = "student-card";

        const imgSrc = safeImage(student.image);

        card.innerHTML = `
            <div class="student-info">
                <ul>
                    <li><strong>ID:</strong> ${student.id}</li>
                    <li><strong>Name:</strong> ${student.name}</li>
                    <li><strong>Course:</strong> ${student.course}</li>
                </ul>
            </div>

            <div class="student-image">
                <img src="${imgSrc}"
                     onerror="this.src='image/noimage.png'"
                     style="width:100%;height:100%;object-fit:cover;border-radius:8px;">
            </div>
        `;

        card.onclick = () => {

            modalBody.innerHTML = `
                <h2 style="color:#49ffb3;">${student.name}</h2>

                <div class="modal-item"><strong>ID:</strong> ${student.id}</div>
                <div class="modal-item"><strong>Course:</strong> ${student.course}</div>

                <div style="margin-top:15px;">
                    <button onclick="location.href='${student.page}'"
                        style="padding:10px 14px;background:#49ffb3;border:none;cursor:pointer;">
                        Open Page
                    </button>
                </div>
            `;

            modal.style.display = "flex";
        };

        container.appendChild(card);
    });
}

// =========================
// INSTRUCTORS
// =========================

function generateInstructorCards(){

    const container = document.getElementById("instructor-container");
    container.innerHTML = "";

    instructors.forEach((teacher, index) => {

        const text = `${teacher.name} ${teacher.title}`;

        if(currentFilter === "students") return;
        if(!matchSearch(text)) return;

        const num = String(index + 1).padStart(2,"0");

        const card = document.createElement("div");
        card.className = "student-card";

        const imgSrc = safeImage(teacher.image);

        card.innerHTML = `
            <div class="student-info">
                <ul>
                    <li><strong>ICT Instructor</strong></li>
                    <li><strong>Name:</strong> ${teacher.name}</li>
                </ul>
            </div>

            <div class="student-image">
                <img src="${imgSrc}"
                     onerror="this.src='image/noimage.png'"
                     style="width:100%;height:100%;object-fit:cover;border-radius:8px;">
            </div>
        `;

        card.onclick = () => {

            modalBody.innerHTML = `
                <h2 style="color:#49ffb3;">${teacher.name}</h2>

                <div class="modal-item">
                    <strong>Role:</strong> ${teacher.title}
                </div>

                <button onclick="location.href='Instructor_${num}/Instructor_${num}.html'"
                    style="margin-top:15px;padding:10px;background:#49ffb3;border:none;cursor:pointer;">
                    Open Page
                </button>
            `;

            modal.style.display = "flex";
        };

        container.appendChild(card);
    });
}

// =========================
// RENDER
// =========================

function renderAll(){
    generateStudentCards();
    generateInstructorCards();
}