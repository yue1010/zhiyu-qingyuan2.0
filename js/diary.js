const emotionImgSrc = {
    happy: "../image/happy.png",
    calm: "../image/calm.png",
    tired: "../image/tired.png",
    anxious: "../image/anxious.png",
    wronged: "../image/wronged.png",
    angry: "../image/angry.png"
};
const emotionScores = {
    happy: 5,
    calm: 4,
    tired: 3,
    anxious: 2,
    wronged: 1,
    angry: 0
};

let diaryData = JSON.parse(localStorage.getItem("diaryData")) || {};
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

const calendarDaysEl = document.getElementById("calendarDays");
const currentMonthEl = document.querySelector(".current-month");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const addDiaryBtn = document.getElementById("addDiaryBtn");
const diaryModal = document.getElementById("diaryModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const diaryTitleEl = document.getElementById("diaryTitle");
const diaryContentEl = document.getElementById("diaryContent");
const diaryDateEl = document.getElementById("diaryDate");
const emotionBtns = document.querySelectorAll(".emotion-btn");

let selectedDate = null;
let selectedEmotion = "calm";
let emotionChart = null;

// 获取今天日期字符串 YYYY-MM-DD
function getTodayStr() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

// 判断目标日期是否是未来日期
function isFutureDate(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    return target > today;
}

function renderCalendar(year, month) {
    currentMonthEl.textContent = `${year}年${month + 1}月`;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    let html = "";

    // 上个月日期
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="day-cell other-month">${prevMonthDays - i}</div>`;
    }

    // 当前月日期
for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const diary = diaryData[dateStr];
    const imgUrl = diary ? emotionImgSrc[diary.emotion] : "";
    const isToday = dateStr === getTodayStr();

    html += `
        <div class="day-cell ${isToday ? 'today' : ''}" data-date="${dateStr}">
            <span class="day-number">${day}</span>
            ${imgUrl ? `<img class="day-emoji-img" src="${imgUrl}" alt="情绪图标">` : ""}
        </div>
    `;
}

    // 下个月日期
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const nextMonthDays = totalCells - (firstDay + daysInMonth);
    for (let i = 1; i <= nextMonthDays; i++) {
        html += `<div class="day-cell other-month">${i}</div>`;
    }

    calendarDaysEl.innerHTML = html;

    // 绑定日期点击事件（核心：判断未来日期，直接拦截）
    document.querySelectorAll(".day-cell:not(.other-month)").forEach(cell => {
        cell.addEventListener("click", () => {
            const dateStr = cell.dataset.date;
            // 未来日期 → 直接返回，不打开弹窗
            if (isFutureDate(dateStr)) {
                return;
            }
            selectedDate = dateStr;
            openDiaryModal(selectedDate);
        });
    });
}

function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        days.push(`${y}-${m}-${day}`);
    }
    return days;
}

function renderTrendChart() {
    const ctx = document.getElementById("emotionTrendChart").getContext("2d");
    const sevenDays = getLast7Days();
    const labels = sevenDays.map(d => d.slice(5));
    const data = sevenDays.map(date => {
        const item = diaryData[date];
        return item ? emotionScores[item.emotion] : null;
    });

    if (emotionChart) emotionChart.destroy();
    emotionChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "情绪状态",
                data: data,
                fill: true,
                backgroundColor: "rgba(189, 233, 120, 0.2)",
                borderColor: "#bde978",
                borderWidth: 2,
                pointBackgroundColor: "#22b559",
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                spanGaps: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        callback(val) {
                            const map = {
                                0: "愤怒",
                                1: "委屈",
                                2: "焦虑",
                                3: "疲惫",
                                4: "平静",
                                5: "开心"
                            };
                            return map[val] || "";
                        }
                    },
                    grid: { display: true }
                },
                x: { grid: { display: false } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label(ctx) {
                            const score = ctx.raw;
                            const map = {
                                0: "愤怒",
                                1: "委屈",
                                2: "焦虑",
                                3: "疲惫",
                                4: "平静",
                                5: "开心"
                            };
                            return score ? `情绪：${map[score]}` : "暂无记录";
                        }
                    }
                }
            }
        }
    });
}

function openDiaryModal(dateStr) {
    diaryDateEl.textContent = dateStr;
    selectedDate = dateStr;
    diaryTitleEl.value = "";
    diaryContentEl.value = "";
    selectedEmotion = "calm";
    emotionBtns.forEach(btn => btn.classList.remove("active"));
    document.querySelector('.emotion-btn[data-emotion="calm"]').classList.add("active");

    if (diaryData[dateStr]) {
        const diary = diaryData[dateStr];
        diaryTitleEl.value = diary.title || "";
        diaryContentEl.value = diary.content || "";
        selectedEmotion = diary.emotion;
        emotionBtns.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.emotion === selectedEmotion);
        });
    }
    diaryModal.classList.add("active");
}

function closeDiaryModal() {
    diaryModal.classList.remove("active");
}

function saveDiary() {
    const title = diaryTitleEl.value.trim();
    const content = diaryContentEl.value.trim();
    diaryData[selectedDate] = {
        title,
        content,
        emotion: selectedEmotion,
        timestamp: new Date().getTime()
    };
    localStorage.setItem("diaryData", JSON.stringify(diaryData));
    closeDiaryModal();
    renderCalendar(currentYear, currentMonth);
    renderTrendChart();
}

// 上一月
prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
});

// 下一月
nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
});

// 右下角加号：仅打开今日日记
addDiaryBtn.addEventListener("click", () => {
    const today = getTodayStr();
    selectedDate = today;
    openDiaryModal(today);
});

closeModalBtn.addEventListener("click", closeDiaryModal);
cancelBtn.addEventListener("click", closeDiaryModal);
saveBtn.addEventListener("click", saveDiary);

// 情绪选择
emotionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        emotionBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedEmotion = btn.dataset.emotion;
    });
});

// 点击弹窗蒙层关闭
diaryModal.addEventListener("click", e => {
    if (e.target === diaryModal) closeDiaryModal();
});

// 底部导航高亮
const tabItems = document.querySelectorAll('.tab-item');
const currentFileName = window.location.pathname.split('/').pop().replace('.html','');
tabItems.forEach(tab => {
    const page = tab.dataset.page;
    if (page === currentFileName) {
        tab.classList.add('active');
    } else {
        tab.classList.remove('active');
    }
});

// 页面初始化
renderCalendar(currentYear, currentMonth);
renderTrendChart();