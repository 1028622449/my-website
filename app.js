const uploadInput = document.querySelector("#faceUpload");
const preview = document.querySelector("#preview");
const analyzeButton = document.querySelector("#analyzeButton");
const resultList = document.querySelector("#resultList");
const scoreContour = document.querySelector("#scoreContour");
const scoreSkin = document.querySelector("#scoreSkin");
const scoreStyle = document.querySelector("#scoreStyle");

const suggestions = [
  "建议先从用户最关注的部位聊起，用“想要自然还是更精致”确认审美方向。",
  "可引导用户准备素颜正面照、侧面照和近期护肤/医美记录，方便面诊沟通。",
  "咨询师跟进时优先询问预算、恢复期和接受程度，再安排专业人员评估。",
  "避免直接给项目结论，用“可面诊确认是否适合”替代确定性承诺。",
  "适合作为皮肤管理、轮廓协调、抗衰紧致的私域首聊入口。"
];

uploadInput.addEventListener("change", () => {
  const file = uploadInput.files?.[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);
  preview.innerHTML = `<img src="${imageUrl}" alt="上传的自拍预览" />`;
  resultList.innerHTML = `
    <li>自拍已载入，可点击“开始 AI 测脸”生成演示报告。</li>
    <li>本静态页面只在浏览器本地预览图片，不会上传或保存。</li>
  `;
});

analyzeButton.addEventListener("click", () => {
  analyzeButton.disabled = true;
  analyzeButton.textContent = "分析中...";

  window.setTimeout(() => {
    const base = uploadInput.files?.length ? 78 : 72;
    scoreContour.textContent = `${base + random(3, 9)}`;
    scoreSkin.textContent = `${base + random(1, 8)}`;
    scoreStyle.textContent = `${base + random(2, 10)}`;

    const picked = shuffle(suggestions).slice(0, 3);
    resultList.innerHTML = picked.map((item) => `<li>${item}</li>`).join("");

    analyzeButton.disabled = false;
    analyzeButton.textContent = "重新生成报告";
  }, 900);
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}
