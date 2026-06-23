const uploadInput = document.querySelector("#faceUpload");
const preview = document.querySelector("#preview");
const analyzeButton = document.querySelector("#analyzeButton");
const resultList = document.querySelector("#resultList");
const scoreContour = document.querySelector("#scoreContour");
const scoreSkin = document.querySelector("#scoreSkin");
const scoreStyle = document.querySelector("#scoreStyle");
const wechatCta = document.querySelector("#wechatCta");
const openWechat = document.querySelector("#openWechat");
const closeWechat = document.querySelector("#closeWechat");
const wechatModal = document.querySelector("#wechatModal");
const copyWechat = document.querySelector("#copyWechat");
const wechatId = "xuzhou168qe";

const suggestions = [
  "建议先从你最关注的部位聊起，用“想要自然改善，还是更精致一点”确认审美方向。",
  "可以准备素颜正面照、侧面照和近期护肤记录，方便顾问帮你整理面诊沟通重点。",
  "跟进时优先确认预算、恢复期和接受程度，再由专业人员做线下面诊评估。",
  "不直接给项目结论，用“到店面诊后确认是否适合”替代确定性承诺。",
  "适合作为皮肤管理、轮廓协调、抗衰紧致的私域首聊入口。"
];

uploadInput.addEventListener("change", () => {
  const file = uploadInput.files?.[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);
  preview.innerHTML = `<img src="${imageUrl}" alt="上传的自拍预览" />`;
  resultList.innerHTML = `
    <li>自拍已载入，可点击“开始 AI 测脸”生成演示报告。</li>
    <li>本页面只在浏览器本地预览图片，不会上传或保存。</li>
  `;
  hideWechatCta();
});

analyzeButton.addEventListener("click", () => {
  analyzeButton.disabled = true;
  analyzeButton.textContent = "分析中...";
  hideWechatCta();

  window.setTimeout(() => {
    const base = uploadInput.files?.length ? 78 : 72;
    scoreContour.textContent = `${base + random(3, 9)}`;
    scoreSkin.textContent = `${base + random(1, 8)}`;
    scoreStyle.textContent = `${base + random(2, 10)}`;

    const picked = shuffle(suggestions).slice(0, 3);
    resultList.innerHTML = picked.map((item) => `<li>${item}</li>`).join("");

    analyzeButton.disabled = false;
    analyzeButton.textContent = "重新生成报告";
    showWechatCta();
  }, 900);
});

openWechat?.addEventListener("click", () => {
  wechatModal?.classList.add("is-open");
  wechatModal?.setAttribute("aria-hidden", "false");
});

closeWechat?.addEventListener("click", closeWechatModal);

copyWechat?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(wechatId);
    copyWechat.textContent = "已复制微信号";
    window.setTimeout(() => {
      copyWechat.textContent = "复制微信号";
    }, 1600);
  } catch {
    copyWechat.textContent = wechatId;
  }
});

wechatModal?.addEventListener("click", (event) => {
  if (event.target === wechatModal) {
    closeWechatModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeWechatModal();
  }
});

function showWechatCta() {
  if (!wechatCta) return;
  wechatCta.hidden = false;
  wechatCta.classList.add("is-visible");
}

function hideWechatCta() {
  if (!wechatCta) return;
  wechatCta.hidden = true;
  wechatCta.classList.remove("is-visible");
}

function closeWechatModal() {
  wechatModal?.classList.remove("is-open");
  wechatModal?.setAttribute("aria-hidden", "true");
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}
