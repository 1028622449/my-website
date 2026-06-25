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
const faceCard = document.querySelector(".face-card");
const wechatId = "xuzhou168qe";

const suggestions = [
  "可以先描述自己最关注的部位，再说明希望偏自然还是偏精致。",
  "面诊前可准备一张正面照、一张侧面照，以及近期护肤或项目记录。",
  "沟通时建议提前想好预算范围、可接受恢复期和风格偏好。",
  "不要仅凭线上结果决定项目，具体是否适合需要专业人员面诊确认。",
  "如果你更关注皮肤状态，可以重点询问毛孔、肤色、屏障和日常护理建议。"
];

uploadInput.addEventListener("change", () => {
  const file = uploadInput.files?.[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);
  preview.innerHTML = `<img src="${imageUrl}" alt="上传的自拍预览" />`;
  resultList.innerHTML = `
    <li>自拍已载入，可点击“开始 AI 测脸”生成参考清单。</li>
    <li>图片只在当前浏览器本地预览，不会自动上传或保存。</li>
  `;
  hideWechatCta();
});

analyzeButton.addEventListener("click", () => {
  analyzeButton.disabled = true;
  analyzeButton.textContent = "分析中...";
  faceCard?.classList.add("is-processing");
  hideWechatCta();

  window.setTimeout(() => {
    const base = uploadInput.files?.length ? 78 : 72;
    scoreContour.textContent = `${base + random(3, 9)}`;
    scoreSkin.textContent = `${base + random(1, 8)}`;
    scoreStyle.textContent = `${base + random(2, 10)}`;

    const picked = shuffle(suggestions).slice(0, 3);
    resultList.innerHTML = picked.map((item) => `<li>${item}</li>`).join("");

    analyzeButton.disabled = false;
    analyzeButton.textContent = "重新生成清单";
    faceCard?.classList.remove("is-processing");
    faceCard?.classList.add("has-result");
    showWechatCta();
  }, 1100);
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
