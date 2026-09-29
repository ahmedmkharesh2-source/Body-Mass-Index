const buttonBMI = document.getElementById("btnBIM");
const result = document.getElementById("result");
const resultBox = document.getElementById("resultBox");
const needle = document.getElementById("needle");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");

// ألوان حسب الفئة
const categoryColors = {
    "نقص الوزن": "#38bdf8",
    "وزن صحي": "#22e07a",
    "زيادة في الوزن": "#fbbf24",
    "سمنة من الدرجة الأولى": "#fb923c",
    "سمنة من الدرجة الثانية": "#ff6b4a",
    "سمنة خطيرة": "#ff4757"
};

buttonBMI.addEventListener("click", () => {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value) / 100; // Convert cm to meters

    resultBox.classList.remove("active");
    needle.classList.remove("show");

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        result.style.color = "#ff4757";
        result.textContent = "الرجاء إدخال قيم صحيحة للوزن والطول.";
        resultBox.classList.add("active");
        return;
    }

    const bmi = weight / (height * height);
    result.style.color = "#eef2ff";
    result.textContent = `مؤشر كتلة الجسم: ${bmi.toFixed(2)}`;

    let category = "";
    if (bmi < 18.5) {
        category = "نقص الوزن";
    } else if (bmi < 25) {
        category = "وزن صحي";
    } else if (bmi < 30) {
        category = "زيادة في الوزن";
    } else if (bmi < 35) {
        category = "سمنة من الدرجة الأولى";
    } else if (bmi < 40) {
        category = "سمنة من الدرجة الثانية";
    } else {
        category = "سمنة خطيرة";
    }

    result.textContent += ` - ${category}`;
    result.style.color = categoryColors[category];
    resultBox.classList.add("active");

    // تحريك مؤشر الشريط (15 → 40 يغطي المقياس)
    const clamped = Math.min(Math.max(bmi, 14), 42);
    const percent = ((clamped - 14) / (42 - 14)) * 100;
    setTimeout(() => {
        needle.style.left = `${percent}%`;
        needle.classList.add("show");
    }, 100);
});

// السماح بالحساب بزر Enter
[weightInput, heightInput].forEach(input => {
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") buttonBMI.click();
    });
});