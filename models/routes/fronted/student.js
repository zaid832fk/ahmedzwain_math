// حماية الصفحة
const token = localStorage.getItem("token");
if (!token) window.location = "login.html";

// التنقل بين الأقسام
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    if (id === "classes") loadClassesStudent();
}

// =================== تحميل الفصول للطالب ===================
async function loadClassesStudent() {
    const res = await fetch("http://localhost:3000/api/teacher/classes", {
        headers: { Authorization: token }
    });
    const data = await res.json();
    const select = document.getElementById("selectClassStudent");
    select.innerHTML = "<option value=''>اختر الفصل</option>";
    data.forEach(cls => {
        const opt = document.createElement("option");
        opt.value = cls._id;
        opt.textContent = cls.title;
        select.appendChild(opt);
    });
}

// =================== تحميل محتوى الفصل ===================
async function loadClassContent() {
    const classId = document.getElementById("selectClassStudent").value;
    if (!classId) return;

    // تحميل المحاضرات
    const lecRes = await fetch(`http://localhost:3000/api/lecture/class/${classId}`, {
        headers: { Authorization: token }
    });
    const lectures = await lecRes.json();
    const lecList = document.getElementById("lectureListStudent");
    lecList.innerHTML = "";
    lectures.forEach(lec => {
        const li = document.createElement("li");
        li.innerHTML = `${lec.title} 
      <video width="320" controls>
        <source src="http://localhost:3000/${lec.videoUrl}" type="video/mp4">
      </video>
    `;
        lecList.appendChild(li);
    });

    // تحميل الملفات
    const fileRes = await fetch(`http://localhost:3000/api/file/class/${classId}`, {
        headers: { Authorization: token }
    });
    const files = await fileRes.json();
    const fileList = document.getElementById("fileListStudent");
    fileList.innerHTML = "";
    files.forEach(f => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="http://localhost:3000/${f.fileUrl}" target="_blank">${f.title}</a>`;
        fileList.appendChild(li);
    });
}// إرسال رسالة للأستاذ
async function sendMessageStudent() {
    const content = document.getElementById("messageContentStudent").value;
    if (!content) return alert("اكتب رسالتك!");

    const from = JSON.parse(localStorage.getItem("user")).email; // ايميل الطالب
    const to = "ahmedzwain@gmail.com";

    await fetch("http://localhost:3000/api/message/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ from, to, content })
    });

    document.getElementById("messageContentStudent").value = "";
    loadChatStudent();
}

// تحميل المحادثة
async function loadChatStudent() {
    const from = JSON.parse(localStorage.getItem("user")).email;
    const to = "ahmedzwain@gmail.com";

    const res = await fetch("http://localhost:3000/api/message/fetch", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ user1: from, user2: to })
    });

    const data = await res.json();
    const chatList = document.getElementById("chatListStudent");
    chatList.innerHTML = "";
    data.forEach(msg => {
        const li = document.createElement("li");
        li.textContent = `${msg.from}: ${msg.content}`;
        chatList.appendChild(li);
    });
}

// تحميل المحادثة عند الدخول
setInterval(loadChatStudent, 3000); // تحديث كل 3 ثواني

// =================== تسجيل خروج ===================
function logout() {
    localStorage.removeItem("token");
    window.location = "login.html";
}