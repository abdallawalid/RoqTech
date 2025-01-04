// دالة لتغيير اللغة بين العربية والإنجليزية
function toggleLanguage() {
    let currentLang = localStorage.getItem("language") || "ar";  // إذا مفيش لغة، نستخدم العربية كافتراضي
    let newLang = (currentLang === "ar") ? "en" : "ar";
    localStorage.setItem("language", newLang);  // حفظ اللغة في localStorage

    // تحديث النصوص حسب اللغة
    if (newLang === "en") {
        document.querySelector("h2").textContent = "Login";
        document.querySelector("label[for='email']").textContent = "Email:";
        document.querySelector("label[for='password']").textContent = "Password:";
        document.querySelector("button#loginBtn").textContent = "Login";
        document.querySelector("button#changeLanguageBtn").textContent = "Change Language";
        document.querySelector(".footer p").innerHTML = `Don't have an account? <a href="signup.html">Sign Up</a>`;
    } else {
        document.querySelector("h2").textContent = "تسجيل الدخول";
        document.querySelector("label[for='email']").textContent = "البريد الإلكتروني:";
        document.querySelector("label[for='password']").textContent = "كلمة المرور:";
        document.querySelector("button#loginBtn").textContent = "دخول";
        document.querySelector("button#changeLanguageBtn").textContent = "تغيير اللغة";
        document.querySelector(".footer p").innerHTML = `ليس لديك حساب؟ <a href="signup.html">إنشاء حساب جديد</a>`;
    }
}

// دالة لتسجيل الدخول والتحقق من البيانات
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // التحقق من وجود البيانات في localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // التحقق من حالة الاشتراك
        if (user.subscriptionPaid) {
            // إذا دفع الاشتراك
            window.location.href = "dashboard.html";  // التوجيه للداشبورد
        } else {
            // إذا لم يدفع الاشتراك
            window.location.href = "payment.html";  // التوجيه لشاشة الدفع
        }
    } else {
        alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
    }
});
