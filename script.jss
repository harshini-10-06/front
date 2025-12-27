// ===============================
// CONFIG
// ===============================
const API_BASE = "https://YOUR-BACKEND-URL.onrender.com";

// ===============================
// BACKEND STATUS (index.html)
// ===============================
function checkBackend() {
    const statusEl = document.getElementById("status");
    if (!statusEl) return;

    fetch(API_BASE + "/")
        .then(res => res.text())
        .then(() => statusEl.innerText = "Backend Connected Successfully ✅")
        .catch(() => statusEl.innerText = "Backend Not Connected ❌");
}

// ===============================
// STUDENT DASHBOARD
// ===============================
function loadStudentCourses() {
    const list = document.getElementById("courseList");
    const count = document.getElementById("courseCount");
    if (!list || !count) return;

    fetch(API_BASE + "/courses")
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";
            count.innerText = data.length;

            data.forEach(course => {
                const div = document.createElement("div");
                div.className = "course";
                div.innerText = course.title;
                list.appendChild(div);
            });
        })
        .catch(() => {
            list.innerText = "Unable to load courses ❌";
        });
}

// ===============================
// INSTRUCTOR DASHBOARD
// ===============================
function loadInstructorCourses() {
    const list = document.getElementById("courseList");
    const count = document.getElementById("courseCount");
    if (!list || !count) return;

    fetch(API_BASE + "/courses")
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";
            count.innerText = data.length;

            data.forEach(course => {
                const div = document.createElement("div");
                div.className = "course";
                div.innerText = course.title;
                list.appendChild(div);
            });
        })
        .catch(() => {
            list.innerText = "Unable to load courses ❌";
        });
}

function addCourse() {
    const input = document.getElementById("courseTitle");
    const msg = document.getElementById("msg");
    if (!input || !msg) return;

    if (input.value === "") {
        msg.innerText = "Please enter course title ❌";
        return;
    }

    fetch(API_BASE + "/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input.value })
    })
        .then(res => res.json())
        .then(() => {
            msg.innerText = "Course Added ✅";
            input.value = "";
            loadInstructorCourses();
        })
        .catch(() => {
            msg.innerText = "Error adding course ❌";
        });
}

// ===============================
// COURSE MANAGEMENT PAGE
// ===============================
function loadAllCourses() {
    const list = document.getElementById("courseList");
    if (!list) return;

    fetch(API_BASE + "/courses")
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";

            data.forEach(course => {
                const div = document.createElement("div");
                div.className = "course-box";
                div.innerHTML = `
                    <span>${course.title}</span>
                    <button onclick="deleteCourse('${course._id || ""}')">Delete</button>
                `;
                list.appendChild(div);
            });
        })
        .catch(() => {
            list.innerText = "Unable to load courses ❌";
        });
}

function deleteCourse(id) {
    if (!id) {
        alert("Delete demo only (no database ID)");
        return;
    }

    fetch(API_BASE + "/courses/" + id, {
        method: "DELETE"
    }).then(() => loadAllCourses());
}

// ===============================
// AUTO RUN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    checkBackend();
    loadStudentCourses();
    loadInstructorCourses();
    loadAllCourses();
});
