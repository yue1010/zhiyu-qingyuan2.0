//DOM
const openPop = document.getElementById('openPop');
const closePop = document.getElementById('closePop');
const mask = document.getElementById('mask');
const popBox = document.getElementById('popBox');
const tourBtn = document.getElementById('tourBtn');
const phoneInp = document.getElementById('phoneInp');
const codeInp = document.getElementById('codeInp');
const getCodeBtn = document.getElementById('getCodeBtn');
const submitLogin = document.getElementById('submitLogin');
const qqLogin = document.getElementById('qqLogin');
const wxLogin = document.getElementById('wxLogin');

//隐私弹窗DOM
const privacyMask = document.getElementById('privacyMask');
const countNum = document.getElementById('countNum');
const privacyCheck = document.getElementById('privacyCheck');
const agreeBtn = document.getElementById('agreeBtn');

let countDownTimer = null;
let count = 5;
let isAgree = false; //全局标记是否同意隐私

//页面加载自动弹出隐私弹窗
document.addEventListener('DOMContentLoaded', function(){
    countDownTimer = setInterval(()=>{
        count--;
        countNum.innerText = count;
        if(count <= 0){
            clearInterval(countDownTimer);
            privacyCheck.disabled = false;
        }
    },1000)
})

//勾选协议后解锁确认按钮
privacyCheck.onchange = function(){
    if(this.checked){
        agreeBtn.classList.remove('agree-disabled');
        agreeBtn.classList.add('agree-active');
        agreeBtn.disabled = false;
    }else{
        agreeBtn.classList.add('agree-disabled');
        agreeBtn.classList.remove('agree-active');
        agreeBtn.disabled = true;
    }
}

//点击确认关闭隐私弹窗
agreeBtn.onclick = function(){
    isAgree = true;
    privacyMask.style.display = 'none';
}

//一键登录 打开弹窗
openPop.onclick = function(){
    if(!isAgree){
        alert("请先阅读并同意隐私政策");
        return;
    }
    mask.style.display = 'block';
    popBox.classList.add('pop-show');
}

//关闭登录弹窗
closePop.onclick = function(){
    mask.style.display = 'none';
    popBox.classList.remove('pop-show');
}
mask.onclick = function(){
    mask.style.display = 'none';
    popBox.classList.remove('pop-show');
}

// ========= 1. 游客模式：不写入登录标识 =========
tourBtn.onclick = function(){
    if(!isAgree){
        alert("请先阅读并同意隐私政策");
        return;
    }
    alert("游客模式进入APP，仅开放部分功能，登录解锁全部服务");
    // 游客：清空登录标记，模拟未登录状态
    localStorage.removeItem("isLogin");
    location.href = "music.html";
}

//获取验证码 → 自动填入 000000 + 倒计时
getCodeBtn.onclick = function(){
    if(!isAgree){
        alert("请先阅读并同意隐私政策");
        return;
    }
    const phoneVal = phoneInp.value.trim();
    if(phoneVal.length !== 11){
        alert('请输入11位手机号码');
        return;
    }

    // 核心：自动填充验证码为 000000
    codeInp.value = "000000";

    // 60秒倒计时
    let cd = 60;
    let t = setInterval(()=>{
        cd--;
        getCodeBtn.innerText = `${cd}s后重新获取`;
        getCodeBtn.style.color = '#999';
        if(cd <= 0){
            clearInterval(t);
            getCodeBtn.innerText = '获取验证码';
            getCodeBtn.style.color = '#7ccd7c';
        }
    },1000)
}


// ========= 2. 手机号登录：正式登录，写入标识 =========
submitLogin.onclick = function(){
    if(!isAgree){
        alert("请先阅读并同意隐私政策");
        return;
    }
    const phoneVal = phoneInp.value.trim();
    const codeVal = codeInp.value.trim();
    if(phoneVal.length !== 11){
        alert('手机号格式错误');
        return;
    }
    if(codeVal !== '000000'){
        alert('验证码错误，测试验证码：000000');
        return;
    }
    mask.style.display = 'none';
    popBox.classList.remove('pop-show');
    // 正式登录：写入登录标记
    localStorage.setItem("isLogin", "1");
    location.href = "music.html";
}

// ========= 3. QQ登录：正式登录，写入标识 =========
qqLogin.onclick = function(){
    if(!isAgree){
        alert("请先阅读并同意隐私政策");
        return;
    }
    alert('模拟QQ授权登录，授权成功跳转APP首页');
    localStorage.setItem("isLogin", "1");
    location.href = "music.html";
}

// ========= 4. 微信登录：正式登录，写入标识 =========
wxLogin.onclick = function(){
    if(!isAgree){
        alert("请先阅读并同意隐私政策");
        return;
    }
    alert('模拟微信授权登录，授权成功跳转APP首页');
    localStorage.setItem("isLogin", "1");
    location.href = "music.html";
}
