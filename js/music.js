// DOM元素获取
const cards = document.querySelectorAll('.emotion-card');
const musicModal = document.getElementById('musicModal');
const closeBtn = document.getElementById('closeBtn');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const likeBtn = document.getElementById('likeBtn');
const progressFill = document.querySelector('.progress-fill');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const songTitleEl = document.querySelector('.song-title');
const songArtistEl = document.querySelector('.song-artist');
const songTagEl = document.querySelector('.song-tag');
const coverBgEl = document.querySelector('.cover-bg');
const albumCover = document.querySelector('.album-cover');
const loginTip = document.getElementById("loginTip");
const tipClose = document.querySelector(".tip-close");
const wrap = document.querySelector(".phone-box");

// 全局音频实例（唯一Audio，切换歌曲复用）
let audio = new Audio();

// 歌曲列表
const songLists = {
    anger: [
        { 
            title: "Kiss The Rain", 
            artist: "By: Yiruma", 
            tag: "释放愤怒", 
            cover: "linear-gradient(135deg, #ff6b6b 0%, #ff8fab 50%, #ff6b6b 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/3.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/Release_Anger.mp3"
        },
        { 
            title: "River Flows In You", 
            artist: "钢琴版", 
            tag: "愤怒舒缓", 
            cover: "linear-gradient(135deg, #ff9999 0%, #cc0000 50%, #ff9999 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/6.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/calm_down.mp3"
        },
        { 
            title: "卡农（钢琴版）", 
            artist: "By: 文武贝", 
            tag: "情绪平复", 
            cover: "linear-gradient(135deg, #ffcccc 0%, #ff3333 50%, #ffcccc 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/2.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/peace_mind.mp3"
        }
    ],
    anxiety: [
        { 
            title: "Clair De Lune", 
            artist: "By: Various Artists&Kachina", 
            tag: "缓解焦虑", 
            cover: "linear-gradient(135deg, #fff8d9 0%, #cc8822 50%, #fff8d9 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/6.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/anxiety_relief.mp3"
        },
        { 
            title: "三亩地", 
            artist: "By: 城南花已开", 
            tag: "放松神经", 
            cover: "linear-gradient(135deg, #fff2cc 0%, #ffbb33 50%, #fff2cc 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/4.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/stress_away.mp3"
        },
        { 
            title: "故乡的原风景", 
            artist: "By: 宗次郎", 
            tag: "思绪清明", 
            cover: "linear-gradient(135deg, #fff9e6 0%, #ffcc66 50%, #fff9e6 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/7.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/clear_thoughts.mp3"
        }
    ],
    sad: [
        { 
            title: "The Truth That You Leave", 
            artist: "By: Pianoboy高至豪", 
            tag: "委屈治愈", 
            cover: "linear-gradient(135deg, #e8f4ff 0%, #3377cc 50%, #e8f4ff 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/2.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/sad_heal.mp3"
        },
        { 
            title: "Childhood Memory", 
            artist: "By: Bandari", 
            tag: "情绪释放", 
            cover: "linear-gradient(135deg, #d9e8ff 0%, #4488dd 50%, #d9e8ff 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/9.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/let_it_go.mp3"
        },
        { 
            title: "Eutopia", 
            artist: "By: Yoohsic Roomz", 
            tag: "温柔抚慰", 
            cover: "linear-gradient(135deg, #cce0ff 0%, #5599ee 50%, #cce0ff 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/1.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/warm_embrace.mp3"
        }
    ],
    defeat: [
        { 
            title: "Letters", 
            artist: "By: Maximilian", 
            tag: "重拾信心", 
            cover: "linear-gradient(135deg, #f0f7f0 0%, #556666 50%, #f0f7f0 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/6.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/rebuild_hope.mp3"
        },
        { 
            title: "菊次郎的夏天", 
            artist: "By: 久石让", 
            tag: "整装再发", 
            cover: "linear-gradient(135deg, #e6efeb 0%, #667777 50%, #e6efeb 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/3.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/new_start.mp3"
        },
        { 
            title: "City Of Stars", 
            artist: "By: Ryan Gosling", 
            tag: "稳步前行", 
            cover: "linear-gradient(135deg, #e0ebe5 0%, #778888 50%, #e0ebe5 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/4.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/step_forward.mp3"
        }
    ],
    calm: [
        { 
            title: "化身孤岛的鲸", 
            artist: "By: 周深", 
            tag: "内心平静", 
            cover: "linear-gradient(135deg, #e8f7e8 0%, #2d884a 50%, #e8f7e8 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/4.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/inner_peace.mp3"
        },
        { 
            title: "贝加尔湖畔", 
            artist: "By: 李健", 
            tag: "心如止水", 
            cover: "linear-gradient(135deg, #dcf0dc 0%, #339955 50%, #dcf0dc 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/7.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/still_water.mp3"
        },
        { 
            title: "这世界那么多人", 
            artist: "By: 莫文蔚", 
            tag: "宁静致远", 
            cover: "linear-gradient(135deg, #d0e8d0 0%, #44aa66 50%, #d0e8d0 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/5.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/tranquil_mind.mp3"
        }
    ],
    relax: [
        { 
            title: "稳稳的幸福", 
            artist: "By: 陈奕迅", 
            tag: "深度放松", 
            cover: "linear-gradient(135deg, #f0f5f5 0%, #2288cc 50%, #f0f5f5 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/5.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/deep_relax.mp3"
        },
        { 
            title: "菊次郎的夏天", 
            artist: "By: 久石让", 
            tag: "身心舒缓", 
            cover: "linear-gradient(135deg, #e6f0f5 0%, #3399dd 50%, #e6f0f5 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/8.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/body_soul.mp3"
        },
        { 
            title: "天空之城", 
            artist: "By: 宫崎骏", 
            tag: "轻松一刻", 
            cover: "linear-gradient(135deg, #dceaf5 0%, #44aadd 50%, #dceaf5 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/7.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/light_easy.mp3"
        }
    ],
    heal: [
        { 
            title: "茜さす", 
            artist: "By: Kyle Xian", 
            tag: "灵魂治愈", 
            cover: "linear-gradient(135deg, #eaf9ef 0%, #229977 50%, #eaf9ef 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/1.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/soul_heal.mp3"
        },
        { 
            title: "路过人间", 
            artist: "By: 郁可唯", 
            tag: "内心之光", 
            cover: "linear-gradient(135deg, #dcf7e4 0%, #33aa88 50%, #dcf7e4 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/9.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/light_within.mp3"
        },
        { 
            title: "Lemon", 
            artist: "By: 米津玄师", 
            tag: "温柔疗愈", 
            cover: "linear-gradient(135deg, #d0f2dd 0%, #44bb99 50%, #d0f2dd 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/8.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/heart_mender.mp3"
        }
    ],
    peace: [
        { 
            title: "Energy Flow", 
            artist: "By: 坂本龍一", 
            tag: "全然安心", 
            cover: "linear-gradient(135deg, #f5f5f5 0%, #8855aa 50%, #f5f5f5 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/7.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/total_peace.mp3"
        },
        { 
            title: "同桌的你", 
            artist: "By: 老狼", 
            tag: "安心港湾", 
            cover: "linear-gradient(135deg, #ebe6f0 0%, #9966bb 50%, #ebe6f0 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/5.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/safe_sound.mp3"
        },
        { 
            title: "星星失眠", 
            artist: "By: 哈利Halleeee", 
            tag: "无忧时刻", 
            cover: "linear-gradient(135deg, #e6e0eb 0%, #aa77cc 50%, #e6e0eb 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/1.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/no_worries.mp3"
        }
    ],
    default: [
        { 
            title: "Under The Rain", 
            artist: "By: Sarah Wins", 
            tag: "治愈系", 
            cover: "linear-gradient(135deg, #ffccd5 0%, #ff8fab 50%, #ffc2e2 100%)",
            coverImg: "https://yue1010.github.io/zhiyu-qingyuan2.0/image/2.jpg",
            audioSrc: "https://yue1010.github.io/zhiyu-qingyuan2.0/audio/rain.mp3"
        }
    ]
};

// 全局状态
let currentEmotion = 'default';
let currentSongIndex = 0;
let isPlaying = false;
let likedSongs = new Set();

// 格式化秒数为 00:00
function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 更新歌曲封面、标题、标签、收藏状态
function updateSongInfo() {
    const songList = songLists[currentEmotion] || songLists.default;
    const currentSong = songList[currentSongIndex];

    songTitleEl.textContent = currentSong.title;
    songArtistEl.textContent = currentSong.artist;
    songTagEl.textContent = currentSong.tag;

    // 封面图样式
    coverBgEl.style.backgroundImage = `url(${currentSong.coverImg})`;
    coverBgEl.style.backgroundSize = '108%';
    coverBgEl.style.backgroundPosition = '65% 50%';
    coverBgEl.style.backgroundRepeat = 'no-repeat';

    // 切换音频资源
    audio.src = currentSong.audioSrc;

    // 收藏爱心
    const songKey = `${currentEmotion}-${currentSongIndex}`;
    if (likedSongs.has(songKey)) {
        likeBtn.classList.add('active');
        likeBtn.textContent = '❤️';
    } else {
        likeBtn.classList.remove('active');
        likeBtn.textContent = '🤍';
    }
}

// 重置进度条UI
function resetProgressUI() {
    progressFill.style.width = '0%';
    currentTimeEl.textContent = '00:00';
}

// 播放/暂停切换
function togglePlay() {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
        playBtn.textContent = '| |';
        albumCover.classList.add('playing');
    } else {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = '▶';
        albumCover.classList.remove('playing');
    }
}

// 上一首
function prevSong() {
    const songList = songLists[currentEmotion] || songLists.default;
    currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
    resetProgressUI();
    updateSongInfo();
    if (isPlaying) audio.play();
}

// 下一首
function nextSong() {
    const songList = songLists[currentEmotion] || songLists.default;
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    resetProgressUI();
    updateSongInfo();
    if (isPlaying) audio.play();
}

// 收藏切换
function toggleLike() {
    const songKey = `${currentEmotion}-${currentSongIndex}`;
    if (likedSongs.has(songKey)) {
        likedSongs.delete(songKey);
        likeBtn.classList.remove('active');
        likeBtn.textContent = '🤍';
    } else {
        likedSongs.add(songKey);
        likeBtn.classList.add('active');
        likeBtn.textContent = '❤️';
    }
}

// 情绪卡片点击打开播放器
cards.forEach(card => {
    card.addEventListener('click', () => {
        const isLogin = getLoginStatus();
        if (!isLogin) {
            loginTip.classList.add("show");
            return;
        }
        currentEmotion = card.dataset.emotion;
        currentSongIndex = 0;
        resetProgressUI();
        updateSongInfo();
        musicModal.classList.add('active');
        // 自动播放
        audio.play();
        isPlaying = true;
        playBtn.textContent = '| |';
        albumCover.classList.add('playing');
    });
});

// 关闭弹窗：停止音频、重置状态
closeBtn.addEventListener('click', () => {
    musicModal.classList.remove('active');
    audio.pause();
    audio.currentTime = 0;
    resetProgressUI();
    isPlaying = false;
    playBtn.textContent = '▶';
    albumCover.classList.remove('playing');
});

// 音频时间更新：同步进度条UI
audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime;
    const total = audio.duration;
    if (!isNaN(total)) {
        const percent = (current / total) * 100;
        progressFill.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(current);
        totalTimeEl.textContent = formatTime(total);
    }
});

// 歌曲播放完毕自动切下一首
audio.addEventListener('ended', () => {
    nextSong();
});

// 按钮绑定
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
likeBtn.addEventListener('click', toggleLike);

// 底部导航激活
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === `${currentPage}.html`) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

// 登录弹窗逻辑
tipClose.addEventListener("click", () => {
    loginTip.classList.remove("show");
});
function getLoginStatus() {
    return localStorage.getItem("isLogin") === "1";
}
wrap.addEventListener("click", (e) => {
    const isLogin = getLoginStatus();
    if (isLogin) return;
    if (loginTip.contains(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    loginTip.classList.add("show");
});
