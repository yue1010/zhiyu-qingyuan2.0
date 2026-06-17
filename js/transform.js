// 情绪文案库，可自行扩展关键词与文案
const textLibrary = {
    // 1. 个人负面情绪（原有保留）
    "焦虑": [
        "不安只是内心在提醒你，试着放慢脚步，和自己和解。",
        "接纳当下的慌乱，慢慢来，一切都会慢慢变好。"
    ],
    "委屈": [
        "不必强迫所有人理解你，温柔对待自己，就是最好的治愈。",
        "心里的难过不必硬扛，允许情绪流淌，然后继续前行。"
    ],
    "愤怒": [
        "把怒火化作边界，保护自己，而不是伤害自己。",
        "情绪是信使，它在告诉你：你值得被尊重。"
    ],
    "难过": [
        "眼泪不是软弱，是心灵在慢慢释放压力。",
        "允许自己低落片刻，休息过后，再重新出发。"
    ],
    "迷茫": [
        "前路看不清也没关系，走好当下每一步就足够。",
        "暂时迷失方向很正常，静下心，答案会慢慢出现。"
    ],
    // 2. 新增：网络负面言论、对立评论转化（匹配评论模拟器联动场景）
    "抬杠": [
        "每个人成长视角不同，不必强求观点完全一致，互相包容就好。",
        "观点无高低，尊重彼此差异，理性交流才更有意义。"
    ],
    "偏见": [
        "片面判断只是一时视角局限，多一份体谅，少一点标签化评判。",
        "未经完整了解的定论难免偏颇，试着换位思考再下判断。"
    ],
    "指责": [
        "指责容易带来对抗，温和表达诉求，更容易达成互相理解。",
        "与其单向追责，不如一起寻找解决问题的方式。"
    ],
    "情绪化对线": [
        "激动发言容易消耗彼此，放缓语气，好好沟通才能传递想法。",
        "情绪上头时先暂停，平和表达才是有效沟通。"
    ],
    "否定": [
        "不认同不代表全盘否定，认可差异，保留各自表达的空间。",
        "观点相悖无需争执，求同存异也是一种温柔。"
    ],
    "default": [
        "每一种情绪都有意义，读懂它，安放它，好好爱自己。",
        "把尖锐的思绪化作温柔文字，与生活、他人温柔相拥。"
    ]
};

// DOM 元素获取
const emotionInput = document.getElementById('emotion-input');
const transformBtn = document.getElementById('transform-btn');
const resultModal = document.getElementById('result-modal');
const resultText = document.getElementById('result-text');
const copyBtn = document.getElementById('copy-btn');
const shareBtn = document.getElementById('share-btn');
const closeModalBtn = document.getElementById('close-modal');
const modalMask = document.querySelector('.modal-mask');

// 显示弹窗
function showModal() {
    resultModal.classList.remove('hidden');
}

// 隐藏弹窗 + 清空输入框
function hideModal() {
    resultModal.classList.add('hidden');
    // 关闭时清空输入框
    emotionInput.value = '';
}

// 转化生成文案
transformBtn.addEventListener('click', function () {
    let key = emotionInput.value.trim();
    if (!key) {
        alert('请输入你的情绪关键词');
        return;
    }

    // 匹配文案
    let list = textLibrary[key] || textLibrary['default'];
    let randomStr = list[Math.floor(Math.random() * list.length)];

    // 更新文案并显示弹窗
    resultText.innerText = randomStr;
    showModal();
});

// 关闭事件
closeModalBtn.addEventListener('click', hideModal);
modalMask.addEventListener('click', hideModal);

// 复制文案功能
copyBtn.addEventListener('click', function () {
    let content = resultText.innerText;
    navigator.clipboard.writeText(content).then(() => {
        alert('文案复制成功！');
    }).catch(() => {
        // 兼容低版本浏览器
        let input = document.createElement('input');
        input.value = content;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        alert('文案复制成功！');
    });
});

// 分享按钮（模拟弹窗）
shareBtn.addEventListener('click', function () {
    let content = resultText.innerText;
    alert(`准备分享内容：\n${content}\n\n（可对接朋友圈/微博分享接口）`);
});

// 底部导航高亮逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面文件名
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    // 遍历所有导航项
    document.querySelectorAll('.tab-item').forEach(item => {
        // 移除所有active类
        item.classList.remove('active');
        // 给当前页面对应的导航项加上active
        if (item.getAttribute('href') === `${currentPage}.html`) {
            item.classList.add('active');
        }
    });
});