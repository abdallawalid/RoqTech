// إعداد Stripe
var stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');  // استبدل بمفتاح الـ Public من Stripe
var elements = stripe.elements();

// إنشاء عنصر بطاقة الدفع
var card = elements.create('card');
card.mount('#card-element');

// معالجة الدفع عند الضغط على زر الدفع
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // إنشاء توكن لبطاقة الدفع
    stripe.createToken(card).then(function(result) {
        if (result.error) {
            // ظهور رسالة خطأ إذا كانت البيانات غير صحيحة
            alert(result.error.message);
        } else {
            // إرسال التوكن إلى الخادم
            processPayment(result.token);
        }
    });
});

// إرسال التوكن إلى الخادم
function processPayment(token) {
    fetch('/process-payment', {  // هنكتب عنوان الـ API في الـ Backend بعدين
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token.id,
            amount: 50 * 100,  // المبلغ بالقرش المصري
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // إذا تم الدفع بنجاح
            window.location.href = '/dashboard';  // تحويله للداشبورد بعد الدفع
        } else {
            alert('حدث خطأ أثناء معالجة الدفع، يرجى المحاولة مرة أخرى.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('حدث خطأ أثناء الاتصال بالخادم.');
    });
}
