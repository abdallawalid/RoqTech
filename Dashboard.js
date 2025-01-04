// Data for calculations
let monthlyTarget = {
    oc: 50, // Orange Cash target
    points: 725,
    ga: 100, // General Achievement target
    total: 1000, // Total monthly target
};
let achieved = {
    oc: 0,
    points: 0,
    ga: 0,
};
let dailyTarget = Math.ceil(monthlyTarget.total / 30); // Approximate daily target
let daysLeft = 30; // Number of days left in the month

// Update progress display
function updateProgress() {
    // Calculate percentages
    let monthlyAchieved = (
        ((achieved.oc / monthlyTarget.oc) * 0.2) +
        ((achieved.points / monthlyTarget.points) * 0.65) +
        ((achieved.ga / monthlyTarget.ga) * 0.15)
    ) * 100;

    let dailyAchieved = (achieved.points / dailyTarget) * 100;

    // Update UI
    document.getElementById("monthly-progress").textContent = `${Math.min(monthlyAchieved, 100).toFixed(2)}%`;
    document.getElementById("daily-progress").textContent = `${Math.min(dailyAchieved, 100).toFixed(2)}%`;
}

// Example: Log daily progress
function logDailyProgress(section, value) {
    if (achieved[section] !== undefined) {
        achieved[section] += value;
        monthlyTarget.total -= value;
        dailyTarget = Math.ceil(monthlyTarget.total / --daysLeft);
    }
    updateProgress();
}
function canReceiveSalary() {
    const gaAchievedPercentage = (achieved.ga / monthlyTarget.ga) * 100;
    return gaAchievedPercentage >= 90; // شرط تحقيق 90% على الأقل في GA
}
function updateGAStatus() {
    const gaAchievedPercentage = (achieved.ga / monthlyTarget.ga) * 100;

    if (gaAchievedPercentage < 90) {
        document.getElementById("ga-warning").style.display = "block";
    } else {
        document.getElementById("ga-warning").style.display = "none";
    }
}
if (canReceiveSalary()) {
    console.log("مبروك! مؤهل لاستلام الراتب.");
} else {
    console.log("عذرًا! لم تحقق النسبة المطلوبة من GA.");
}


// Initialize progress
updateProgress();
