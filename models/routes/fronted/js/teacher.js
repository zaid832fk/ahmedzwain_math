// حماية الصفحة
const token = localStorage.getItem("token");
if (!token) window.location = "login.html";

// =================== التنقل بين الأقسام ===================
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    if (id === "classes") {
        loadClasses();
        loadClassesForSelect();
        loadClassesForFiles();
    }
}

// =================== إدارة الفصول ===================
// تحميل الفصول لعرضها في القائمة
async function loadClasses() {
    const res = await fetch("http://localhost:3000/api/teacher/classes", {
        headers: { Authorization: token }
    });

    const data = await res.json();
    const list = document.getElementById("classList");
    list.innerHTML = "";

    data.forEach(cls => {
        const li = document.createElement("li");
        li.innerHTML = `
      ${cls.title}
      <button onclick="deleteClass('${cls._id}')">🗑️</button>
    `;
        list.appendChild(li);
    });
}

// إضافة فصل جديد
async function addClass() {
    const title = document.getElementById("className").value;
    if (!title) return alert("ادخل اسم الفصل!");

    await fetch("http://localhost:3000/api/teacher/classes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ title })
    });

    document.getElementById("className").value = "";
    loadClasses();
    loadClassesForSelect();
    loadClassesForFiles();
}

// حذف فصل
async function deleteClass(id) {
    await fetch(`http://localhost:3000/api/teacher/classes/${id}`, {
        method: "DELETE",
        headers: { Authorization: token }
    });
    loadClasses();
    loadClassesForSelect();
    loadClassesForFiles();
}

// =================== إدارة المحاضرات ===================
// تحميل الفصول لاختيار الفصل عند رفع المحاضرة
async function loadClassesForSelect() {
    const res = await fetch("http://localhost:3000/api/teacher/classes", {
        headers: { Authorization: token }
    });
    const data = await res.json();
    const select = document.getElementById("selectClass");
    select.innerHTML = "";
    data.forEach(cls => {
        const opt = document.createElement("option");
        opt.value = cls._id;
        opt.textContent = cls.title;
        select.appendChild(opt);
    });
}

// رفع محاضرة فيديو
async function uploadLecture() {
    const classId = document.getElementById("selectClass").value;
    const title = document.getElementById("lectureTitle").value;
    const file = document.getElementById("videoFile").files[0];

    if (!classId || !title || !file) return alert("اكمل كل الحقول!");

    const formData = new FormData();
    formData.append("classId", classId);
    formData.append("title", title);
    formData.append("video", file);

    await fetch("http://localhost:3000/api/lecture/upload", {
        method: "POST",
        headers: { Authorization: token },
        body: formData
    });

    document.getElementById("lectureTitle").value = "";
    document.getElementById("videoFile").value = "";
    loadLectures(classId);
}

// تحميل المحاضرات حسب الفصل
async function loadLectures(classId) {
    const res = await fetch(`http://localhost:3000/api/lecture/class/${classId}`, {
        headers: { Authorization: token }
    });
    const data = await res.json();
    const list = document.getElementById("lectureList");
    list.innerHTML = "";
    data.forEach(lec => {
        const li = document.createElement("li");
        li.innerHTML = `${lec.title} 
      <video width="320" controls>
        <source src="http://localhost:3000/${lec.videoUrl}" type="video/mp4">
      </video>
    `;
        list.appendChild(li);
    });
}

// =================== رفع ملفات PDF ===================
// تحميل الفصول لاختيار الفصل عند رفع ملفات PDF
async function loadClassesForFiles() {
    const res = await fetch("http://localhost:3000/api/teacher/classes", {
        headers: { Authorization: token }
    });
    const data = await res.json();
    const select = document.getElementById("selectClassFile");
    select.innerHTML = "";
    data.forEach(cls => {
        const opt = document.createElement("option");
        opt.value = cls._id;
        opt.textContent = cls.title;
        select.appendChild(opt);
    });
}

// رفع ملف PDF
async function uploadFile() {
    const classId = document.getElementById("selectClassFile").value;
    const title = document.getElementById("fileTitle").value;
    const file = document.getElementById("pdfFile").files[0];

    if (!classId || !title || !file) return alert("اكمل كل الحقول!");

    const formData = new FormData();
    formData.append("classId", classId);
    formData.append("title", title);
    formData.append("file", file);

    await fetch("http://localhost:3000/api/file/upload", {
        method: "POST",
        headers: { Authorization: token },
        body: formData
    });

    document.getElementById("fileTitle").value = "";
    document.getElementById("pdfFile").value = "";
    loadFiles(classId);
}

// تحميل ملفات PDF حسب الفصل
async function loadFiles(classId) {
    const res = await fetch(`http://localhost:3000/api/file/class/${classId}`, {
        headers: { Authorization: token }
    });
    const data = await res.json();
    const list = document.getElementById("fileList");
    list.innerHTML = "";
    data.forEach(f => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="http://localhost:3000/${f.fileUrl}" target="_blank">${f.title}</a>`;
        list.appendChild(li);
    });
}

// إرسال رسالة
async function sendMessage() {
    const to = document.getElementById("studentEmail").value;
    const content = document.getElementById("messageContent").value;
    if (!to || !content) return alert("اكمل الحقول!");

    const from = "ahmedzwain@gmail.com"; // ايميل الأستاذ ثابت
    await fetch("http://localhost:3000/api/message/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ from, to, content })
    });

    document.getElementById("messageContent").value = "";
    loadChat(to);
}

// تحميل المحادثة
async function loadChat(studentEmail) {
    const from = "ahmedzwain@gmail.com";
    const res = await fetch("http://localhost:3000/api/message/fetch", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ user1: from, user2: studentEmail })
    });

    const data = await res.json();
    const chatList = document.getElementById("chatList");
    chatList.innerHTML = "";
    data.forEach(msg => {
        const li = document.createElement("li");
        li.textContent = `${msg.from}: ${msg.content}`;
        chatList.appendChild(li);
    });
}









// =================== تسجيل خروج ===================
function logout() {
    localStorage.removeItem("token");
    window.location = "login.html";
}

// =================== تحديث القوائم عند تحميل الصفحة ===================
loadClassesForSelect();
loadClassesForFiles();