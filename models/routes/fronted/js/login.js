async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);

        if (data.role === "teacher") {
            window.location = "teacher.html";
        } else {
            window.location = "student.html";
        }
    } else {
        alert("بيانات الدخول غير صحيحة");
    }
}