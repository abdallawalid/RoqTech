// ملف signup.js

document.getElementById("role").addEventListener("change", function() {
    let role = document.getElementById("role").value;
    let branchesFields = document.getElementById("branchesFields");

    if (role === "areaManager") {
        // إذا تم اختيار مدير منطقة، يظهر الحقول الخاصة بالفروع
        branchesFields.style.display = "block";
    } else {
        // لو تم اختيار أي وظيفة أخرى، إخفاء الحقول الخاصة بالفروع
        branchesFields.style.display = "none";
    }
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // الحصول على القيم المدخلة
    const email = document.getElementById("email").value;
    const branchNumber = document.getElementById("branchNumber").value;
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // التحقق من تطابق كلمة المرور
    if (password !== confirmPassword) {
        alert("كلمات المرور غير متطابقة.");
        return;
    }

    // التحقق من شروط كلمة المرور (يجب أن تحتوي على حروف وأرقام)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        alert("كلمة المرور يجب أن تحتوي على حروف وأرقام.");
        return;
    }

    // التحقق من عدم التسجيل بنفس البريد الإلكتروني سابقاً
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.some(user => user.email === email)) {
        alert("تم تسجيل هذا البريد الإلكتروني من قبل.");
        return;
    }

    // إضافة المستخدم الجديد إلى localStorage
    const newUser = {
        email,
        branchNumber,
        role,
        password
    };

    if (role === "areaManager") {
        newUser.branchFrom = document.getElementById("branchFrom").value;
        newUser.branchTo = document.getElementById("branchTo").value;
    }

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("تم التسجيل بنجاح!");
    window.location.href = "login.html";  // إعادة توجيه لصفحة تسجيل الدخول بعد التسجيل الناجح
});
