// アプリの更新履歴（コミット・プッシュのたびに先頭に新しいバージョンを追加する）
const CHANGELOG = [
  {
    version: "1.0.11",
    date: "2026-08-04",
    changes: [
      "使い方ガイドラインの冒頭に「完全無料、アカウント登録なしで簡単に使えます」の一文を追加",
      "使い方ガイドラインのQ&Aに「無料で使えるか」「登録が必要か」「演習記録は講師に共有されるか」「アプリだけで勉強できないか」の4問を追加",
      "使い方ガイドラインの文字サイズをさらに読みやすく調整",
    ],
  },
  {
    version: "1.0.10",
    date: "2026-08-04",
    changes: [
      "ホーム画面を開いた状態でアプリを閉じたときは、次回もホーム画面（前回の学期が選択された状態）から再開するように変更",
    ],
  },
  {
    version: "1.0.9",
    date: "2026-08-04",
    changes: [
      "学習到達度チェッカーで、「要復習」バッジがついたままA・Bをつけた問題はC評価として計算するように変更",
      "使い方ガイドラインに、上記の計算方法についての説明を追加",
    ],
  },
  {
    version: "1.0.8",
    date: "2026-08-04",
    changes: [
      "学習到達度チェッカーに、学期ごとの「全範囲」到達度を表示する行を追加",
      "画面左端からのスワイプでホーム画面に戻れるように",
      "履歴削除（🗑️）の確認ポップアップを廃止し、ワンタップで削除できるように",
      "ホーム画面の「学習到達度チェッカー」ボタンのサイズを「使い方ガイドライン」と統一",
      "使い方ガイドラインの文字サイズを調整して読みやすく",
    ],
  },
  {
    version: "1.0.7",
    date: "2026-07-30",
    changes: [
      "ホーム画面に「学習到達度チェッカー 📊」を追加",
      "学期別に各章の到達度を棒グラフで確認できる機能を追加",
      "使い方ガイドラインに学習到達度チェッカーの説明を追加",
    ],
  },
  {
    version: "1.0.6",
    date: "2026-07-29",
    changes: [
      "ホーム画面に追加した端末で更新が反映されにくい問題に対応。表紙画面に「🔁 最新版を確認する」ボタンを追加",
      "アプリ本体のファイルにバージョン番号を付け、更新のたびに新しい内容を確実に読み込めるように",
    ],
  },
  {
    version: "1.0.5",
    date: "2026-07-29",
    changes: [
      "「使い方ガイドライン」画面を新設し、表紙の「使い方ガイドライン（重要）」から開けるように（目次から各章にジャンプ可能）",
      "使い方・演習の仕方・自己評価・Check Point・復習方法・アプリ仕様を解説し、科学的根拠に基づく勉強法（アクティブリコール・分散学習・自己説明など）のコラムを掲載",
      "よくあるQ&Aを10問掲載。質問をタップすると回答が展開される形式に",
    ],
  },
  {
    version: "1.0.4",
    date: "2026-07-28",
    changes: ["表紙画面の見た目を調整（「このアプリの使い方」「更新履歴」を目立たせ、機種変更・バックアップ関連は控えめに）"],
  },
  {
    version: "1.0.3",
    date: "2026-07-28",
    changes: ["3学期では扱わない技1A第1・4・5章、技2B第1章を「(3学期範囲外)」として3学期のリストからも選べるように"],
  },
  {
    version: "1.0.2",
    date: "2026-07-28",
    changes: ["ホーム画面に追加したときのアイコンを設定（表紙と同じ金色の「技」デザイン）"],
  },
  {
    version: "1.0.1",
    date: "2026-07-28",
    changes: ["演習履歴を削除できる機能を追加（🗑️ボタンから間違えて入力した記録を削除できます）"],
  },
  {
    version: "1.0.0",
    date: "2026-07-23",
    changes: ["プレリリース版を公開"],
  },
];
const APP_VERSION = CHANGELOG[0].version;

// よくあるミスの選択肢（Bを選んだときにタップで選べる）
const MISTAKE_CATEGORIES = [
  "四則演算（単純な四則演算）",
  "符号（マイナスの分配、移項など）",
  "分数処理（通分・約分・分母分子の逆転など）",
  "展開・因数分解",
  "指数・根号の処理（累乗の計算、ルートの外し方など）",
  "文字の見間違い（x↔y、自分の字の誤読など）",
  "転記ミス（前の行・問題文からの写し間違いなど）",
  "代入ミス（値や式を入れる場所・値の間違いなど）",
  "端点の含め忘れ",
  "不等号の向き",
  "前提条件の見落とし",
  "問題文の読み間違い",
  "最後の詰め忘れ（約分し忘れ、答えをまとめ忘れなど）",
];

// 演習記録の保存・読み込み（スマホ本体の中に保存される）
function loadRecords() {
  const raw = localStorage.getItem("records");
  return raw ? JSON.parse(raw) : {};
}

function saveRecords(records) {
  localStorage.setItem("records", JSON.stringify(records));
}

// 演習履歴をJSONファイルとして書き出す（バックアップ用）
function exportRecords() {
  const data = localStorage.getItem("records") || "{}";
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const today = new Date().toISOString().slice(0, 10);

  const a = document.createElement("a");
  a.href = url;
  a.download = `waza-app-backup-${today}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// バックアップファイルから演習履歴を読み込む（今の記録に追加する形。上書き削除はしない）
function importRecords(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (typeof imported !== "object" || imported === null) throw new Error("invalid format");

      const current = loadRecords();
      Object.keys(imported).forEach(key => {
        current[key] = (current[key] || []).concat(imported[key]);
      });
      saveRecords(current);
      renderProblems();
      alert("履歴を読み込みました。");
    } catch (e) {
      alert("ファイルの読み込みに失敗しました。正しいバックアップファイルか確認してください。");
    }
    event.target.value = "";
  };
  reader.readAsText(file);
}

// 日時の表示用フォーマット（例: 2026/07/14 13:45）
function formatDate(isoString) {
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return isoString; // 古い形式などパースできない場合はそのまま表示
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// HTML属性の値に安全に埋め込むためのエスケープ
function escapeAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// <input type="datetime-local"> にセットするための値（例: 2026-07-14T13:45）
function toDatetimeLocalValue(isoString) {
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// 現在選んでいる学期・単元（講）のインデックス
let currentTermIndex = 0;
let currentUnitIndex = 0;

function getCurrentTerm() {
  return terms[currentTermIndex];
}

function getCurrentUnit() {
  return getCurrentTerm().units[currentUnitIndex];
}

// 現在の単元（講）が参照している技の問題データを取り出す。
// 問題そのもの（レベル・Check Point文）はproblemBankに、宿題必須かどうか（クラス別）は講ごとのhomeworkNumbersSSSA/SBCTに持たせている。
function getProblems() {
  const unit = getCurrentUnit();
  const chapter = problemBank[unit.chapterRef];
  const byNumber = {};
  chapter.problems.forEach(p => { byNumber[p.number] = p; });

  const referenceNumbers = unit.referenceNumbers || [];

  return unit.problemNumbers.map(number => ({
    number: number,
    level: byNumber[number].level,
    checkPoint: byNumber[number].checkPoint,
    homeworkRequiredSSSA: unit.homeworkNumbersSSSA.includes(number),
    homeworkRequiredSBCT: unit.homeworkNumbersSBCT.includes(number),
    isReference: referenceNumbers.includes(number),
  }));
}

// 記録のキーは「技の章＋問題番号」。講（学期）が変わっても同じ問題なら同じキーになるので、
// 演習履歴は学期をまたいでそのまま引き継がれる。
function recordKey(problem) {
  return getCurrentUnit().chapterRef + "_" + problem.number;
}

function getHistory(problem, records) {
  return records[recordKey(problem)] || [];
}

// 「要復習」かどうかを履歴から判定する
// 定義：C〜Eになったことがある。ただし、その後にAまたはBが2回連続したら要復習から外れる
// （その後また C〜E になれば、要復習に戻る）
function needsReview(history) {
  let flagged = false;
  let goodStreak = 0;

  history.forEach(record => {
    if (["C", "D", "E"].includes(record.evaluation)) {
      flagged = true;
      goodStreak = 0;
    } else {
      goodStreak += 1;
      if (flagged && goodStreak >= 2) {
        flagged = false;
      }
    }
  });

  return flagged;
}

// 現在の表示フィルタ（'all' / 'homeworkSSSA' / 'homeworkSBCT' / 'review' / 'unpracticed'）
let currentFilter = "all";
// 現在表示中のタブ（フィルタ4種 + 'mistakes' + 'checkpoints'）。単元切り替え時の再描画に使う
let currentView = "all";

// 単元（章・講）を切り替える
function switchUnit(index) {
  currentUnitIndex = Number(index);
  saveAppState();
  showView(currentView);
}

// 前回選んでいた学期・講を覚えておく（次回起動時に表紙を飛ばして直接戻るため）
function saveAppState() {
  localStorage.setItem("appState", JSON.stringify({
    termIndex: currentTermIndex,
    unitIndex: currentUnitIndex,
  }));
}

function loadAppState() {
  const raw = localStorage.getItem("appState");
  return raw ? JSON.parse(raw) : null;
}

// 直近に開いていたのがホーム画面か演習画面かを覚えておく（次回起動時にどちらを開くか判定するため）
function saveLastScreen(screen) {
  localStorage.setItem("lastScreen", screen);
}

function loadLastScreen() {
  return localStorage.getItem("lastScreen");
}

// 表紙画面で今タップされている学期（STARTを押すまでは未確定）
let coverSelectedTermIndex = null;

// 表紙画面を表示する（初回起動時、または「＜最初のページへ＞」を押したとき）
function showCoverScreen() {
  document.getElementById("cover-screen").style.display = "flex";
  document.getElementById("main-screen").style.display = "none";
  document.getElementById("guide-screen").style.display = "none";
  document.getElementById("achievement-screen").style.display = "none";
  saveLastScreen("cover");

  renderCoverTermButtons();
  document.getElementById("cover-version-text").textContent = APP_VERSION;

  const saved = loadAppState();
  if (saved && terms[saved.termIndex]) {
    selectCoverTerm(saved.termIndex);
  } else {
    coverSelectedTermIndex = null;
    updateStartButtonState();
  }
}

// メイン画面（講選択・問題一覧）を表示する
function showMainScreen() {
  document.getElementById("cover-screen").style.display = "none";
  document.getElementById("main-screen").style.display = "block";
  document.getElementById("guide-screen").style.display = "none";
  document.getElementById("achievement-screen").style.display = "none";
  saveLastScreen("main");

  renderUnitSelector();
  showView(currentView);
}

// 使い方ガイドライン画面を表示する
function showGuideScreen() {
  document.getElementById("cover-screen").style.display = "none";
  document.getElementById("main-screen").style.display = "none";
  document.getElementById("guide-screen").style.display = "block";
  document.getElementById("achievement-screen").style.display = "none";
  window.scrollTo(0, 0);
}

// ガイドライン内の目次タップで該当セクションまでジャンプする
function scrollToGuideSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Q&Aの質問をタップしたときに答えの表示・非表示を切り替える
function toggleGuideQA(id) {
  const box = document.getElementById(id);
  const arrow = document.getElementById("arrow-" + id);
  const isOpen = box.style.display === "block";
  box.style.display = isOpen ? "none" : "block";
  if (arrow) arrow.textContent = isOpen ? "▼" : "▲";
}

// 「最新版を確認する」ボタン：ホーム画面に追加した端末でキャッシュにより
// 更新が反映されないことがあるため、サーバー上の最新版を強制的に取得して比較する
async function checkForUpdate() {
  const statusEl = document.getElementById("cover-update-status");
  statusEl.textContent = "確認中…";
  try {
    const res = await fetch("script.js?check=" + Date.now(), { cache: "no-store" });
    const text = await res.text();
    const match = text.match(/version:\s*"([\d.]+)"/);
    const latestVersion = match ? match[1] : null;

    if (latestVersion && latestVersion !== APP_VERSION) {
      statusEl.textContent = `新しいバージョン（ver ${latestVersion}）があります。更新します…`;
      setTimeout(() => {
        window.location.href = window.location.pathname + "?refresh=" + Date.now();
      }, 900);
    } else {
      statusEl.textContent = `最新版です（ver ${APP_VERSION}）`;
    }
  } catch (e) {
    statusEl.textContent = "確認できませんでした。通信環境をご確認のうえ、もう一度お試しください。";
  }
}

// ===== 学習到達度チェッカー =====

// 章の表示順（技1A 第1〜8章 → 技2B 第1〜9章）。problemBankのキーそのもの。
const ACHIEVEMENT_CHAPTER_ORDER = [
  "1a-1", "1a-2", "1a-3", "1a-4", "1a-5", "1a-6", "1a-7", "1a-8",
  "2b-1", "2b-2", "2b-3", "2b-4", "2b-5", "2b-6", "2b-7", "2b-8", "2b-9",
];

// 学期ごとの対象レベル・除外章（演習画面の講構成とは独立に、章単位で判定する）
const ACHIEVEMENT_TERM_CONFIG = {
  term1: { label: "1学期", levelLabel: "Lv.1–2", maxLevel: 2, excludeChapters: ["1a-1", "1a-4", "2b-1", "2b-8"], termNumber: "1" },
  term2: { label: "2学期", levelLabel: "Lv.1–3", maxLevel: 3, excludeChapters: ["2b-8"], termNumber: "2" },
  term3: { label: "3学期以降", levelLabel: "Lv.1–4", maxLevel: 4, excludeChapters: [], termNumber: "3" },
};

const ACHIEVEMENT_TERM_STORAGE_KEY = "achievementSelectedTerm";
const VALID_ACHIEVEMENT_TERMS = ["term1", "term2", "term3"];
const ACHIEVEMENT_EVAL_SCORES = { A: 5, B: 4, C: 3, D: 2, E: 1 };

let currentAchievementTerm = "term1";

function loadAchievementTerm() {
  const savedTerm = localStorage.getItem(ACHIEVEMENT_TERM_STORAGE_KEY);
  return VALID_ACHIEVEMENT_TERMS.includes(savedTerm) ? savedTerm : "term1";
}

function selectAchievementTerm(termKey) {
  if (!VALID_ACHIEVEMENT_TERMS.includes(termKey)) termKey = "term1";
  currentAchievementTerm = termKey;
  localStorage.setItem(ACHIEVEMENT_TERM_STORAGE_KEY, termKey);
  renderAchievementTabs();
  renderAchievementChart();
}

// 章の表示タイトルを作る（例: "技1A 第2章（最大・最小）" → "技ⅠA 第2章 最大・最小"）
function formatAchievementChapterTitle(chapterRef) {
  const rawTitle = problemBank[chapterRef].title;
  const converted = rawTitle.replace("技1A", "技ⅠA").replace("技2B", "技ⅡB");
  const match = converted.match(/^(.*)（(.+)）$/);
  if (!match) return converted;
  return `${match[1]} ${match[2]}`;
}

// 問題1問の得点（未演習・不正な評価値は0点。最後につけた自己評価だけを使う）
function getLatestEvaluationScore(chapterRef, problemNumber, records) {
  const key = `${chapterRef}_${problemNumber}`;
  const history = Array.isArray(records[key]) ? records[key] : [];
  if (history.length === 0) return 0;
  const latest = history[history.length - 1];
  if (!latest || !latest.evaluation) return 0;

  // 要復習バッジが付いたままA/Bをつけても、1回の演習だけで満点評価にはしない（C評価として扱う）
  if (["A", "B"].includes(latest.evaluation) && needsReview(history)) {
    return ACHIEVEMENT_EVAL_SCORES.C;
  }
  return ACHIEVEMENT_EVAL_SCORES[latest.evaluation] || 0;
}

// 章ごとの到達度を計算する（副作用なし）。referenceNumbers・宿題必須番号は判定に使わない。
function calculateChapterAchievement(chapterRef, maxLevel, records) {
  const chapter = problemBank[chapterRef];
  const eligibleProblems = chapter.problems.filter(p => p.level <= maxLevel);
  const eligibleCount = eligibleProblems.length;

  if (eligibleCount === 0) {
    return { chapterRef, eligibleCount: 0, totalScore: 0, maxScore: 0, percentage: 0, isPerfect: false };
  }

  let totalScore = 0;
  eligibleProblems.forEach(p => {
    totalScore += getLatestEvaluationScore(chapterRef, p.number, records);
  });

  const maxScore = eligibleCount * 5;
  const rawPercentage = (totalScore / maxScore) * 100;
  const percentage = Math.max(0, Math.min(100, Math.round(rawPercentage)));
  const isPerfect = totalScore === maxScore;

  return { chapterRef, eligibleCount, totalScore, maxScore, percentage, isPerfect };
}

// 学期全体（表示中の全章合算）の到達度を計算する（副作用なし）
function calculateTermAchievement(chapterRefs, maxLevel, records) {
  let totalScore = 0;
  let maxScore = 0;
  let eligibleCount = 0;

  chapterRefs.forEach(chapterRef => {
    const result = calculateChapterAchievement(chapterRef, maxLevel, records);
    totalScore += result.totalScore;
    maxScore += result.maxScore;
    eligibleCount += result.eligibleCount;
  });

  if (eligibleCount === 0) {
    return { eligibleCount: 0, totalScore: 0, maxScore: 0, percentage: 0, isPerfect: false };
  }

  const rawPercentage = (totalScore / maxScore) * 100;
  const percentage = Math.max(0, Math.min(100, Math.round(rawPercentage)));
  const isPerfect = totalScore === maxScore;

  return { eligibleCount, totalScore, maxScore, percentage, isPerfect };
}

// 学習到達度チェッカー画面を表示する
function showAchievementScreen() {
  document.getElementById("cover-screen").style.display = "none";
  document.getElementById("main-screen").style.display = "none";
  document.getElementById("guide-screen").style.display = "none";
  document.getElementById("achievement-screen").style.display = "block";

  currentAchievementTerm = loadAchievementTerm();
  renderAchievementTabs();
  renderAchievementChart();
  window.scrollTo(0, 0);
}

// 学期タブを描画する
function renderAchievementTabs() {
  const container = document.getElementById("achievement-tabs");
  container.innerHTML = VALID_ACHIEVEMENT_TERMS
    .map(termKey => {
      const config = ACHIEVEMENT_TERM_CONFIG[termKey];
      const selected = termKey === currentAchievementTerm;
      return `
        <button type="button" role="tab" aria-selected="${selected}" class="achievement-tab${selected ? " selected" : ""}" onclick="selectAchievementTerm('${termKey}')">
          <span class="achievement-tab-title">${config.label}</span>
          <span class="achievement-tab-level">${config.levelLabel}</span>
        </button>
      `;
    })
    .join("");
}

// 選択中の学期の棒グラフを描画する（毎回演習履歴を読み直して最新状態で計算する）
function renderAchievementChart() {
  const container = document.getElementById("achievement-chart");
  const config = ACHIEVEMENT_TERM_CONFIG[currentAchievementTerm];
  const records = loadRecords();

  const chapterRefs = ACHIEVEMENT_CHAPTER_ORDER.filter(ref => !config.excludeChapters.includes(ref));
  const iaChapterRefs = chapterRefs.filter(ref => ref.startsWith("1a-"));
  const iibChapterRefs = chapterRefs.filter(ref => ref.startsWith("2b-"));

  function renderRow(chapterRef) {
    const result = calculateChapterAchievement(chapterRef, config.maxLevel, records);
    const title = formatAchievementChapterTitle(chapterRef);
    const groupClass = chapterRef.startsWith("1a-") ? "ia" : "iib";
    const fillClass = result.isPerfect ? "achievement-bar-fill perfect" : `achievement-bar-fill ${groupClass}`;
    const percentClass = result.isPerfect ? "achievement-percent perfect" : "achievement-percent";

    return `
      <div class="achievement-row">
        <div class="achievement-row-title">${title}</div>
        <div class="achievement-row-bar-wrap">
          <div class="achievement-bar-track" role="img" aria-label="${title} 到達度${result.percentage}%">
            <div class="${fillClass}" style="width: ${result.percentage}%;"></div>
          </div>
          <div class="${percentClass}">${result.percentage}%</div>
        </div>
      </div>
    `;
  }

  const iaHtml = iaChapterRefs.map(renderRow).join("");
  const iibHtml = iibChapterRefs.map(renderRow).join("");

  const totalResult = calculateTermAchievement(chapterRefs, config.maxLevel, records);
  const totalTitle = currentAchievementTerm === "term3" ? "技ⅠA・ⅡB 全問題" : `${config.termNumber}学期全範囲`;
  const totalFillClass = totalResult.isPerfect ? "achievement-bar-fill perfect" : "achievement-bar-fill total";
  const totalPercentClass = totalResult.isPerfect ? "achievement-percent perfect" : "achievement-percent";
  const totalHtml = `
    <div class="achievement-row achievement-total-row">
      <div class="achievement-row-title">${totalTitle}</div>
      <div class="achievement-row-bar-wrap">
        <div class="achievement-bar-track" role="img" aria-label="${totalTitle} 到達度${totalResult.percentage}%">
          <div class="${totalFillClass}" style="width: ${totalResult.percentage}%;"></div>
        </div>
        <div class="${totalPercentClass}">${totalResult.percentage}%</div>
      </div>
    </div>
  `;

  container.innerHTML = `
    ${iaChapterRefs.length > 0 ? `<p class="achievement-group-heading">技ⅠA</p>${iaHtml}` : ""}
    ${iibChapterRefs.length > 0 ? `<p class="achievement-group-heading">技ⅡB</p>${iibHtml}` : ""}
    ${totalHtml}
  `;
}

// 表紙画面の学期ボタンを作る
function renderCoverTermButtons() {
  const container = document.getElementById("cover-term-buttons");
  container.innerHTML = terms
    .map((term, index) => `<button type="button" class="cover-term-btn" onclick="selectCoverTerm(${index})">${term.title}</button>`)
    .join("");
}

// 表紙画面で学期ボタンをタップしたときの処理
function selectCoverTerm(index) {
  coverSelectedTermIndex = index;
  document.querySelectorAll(".cover-term-btn").forEach((btn, i) => {
    btn.classList.toggle("selected", i === index);
  });
  updateStartButtonState();
}

// 学期が選ばれるまでSTARTボタンを押せなくする
function updateStartButtonState() {
  const btn = document.getElementById("cover-start-btn");
  const disabled = coverSelectedTermIndex === null;
  btn.classList.toggle("disabled", disabled);
  btn.disabled = disabled;
}

// STARTボタンを押したときの処理：選んだ学期のメイン画面に進む
function startFromCover() {
  if (coverSelectedTermIndex === null) return;

  currentTermIndex = coverSelectedTermIndex;
  const saved = loadAppState();
  currentUnitIndex = (saved && saved.termIndex === currentTermIndex) ? saved.unitIndex : 0;

  saveAppState();
  showMainScreen();
}

// 単元選択メニューを作る
function renderUnitSelector() {
  const select = document.getElementById("unit-select");
  const term = getCurrentTerm();

  if (term.units.length === 0) {
    select.innerHTML = '<option value="">（まだデータがありません）</option>';
    return;
  }

  select.innerHTML = term.units
    .map((unit, index) => `<option value="${index}">${unit.title}</option>`)
    .join("");
  select.value = currentUnitIndex;
}

// 評価ボタンが押されたときの処理
function handleEvaluationClick(problem, evaluation) {
  if (evaluation === "B") {
    openMistakeModal(problem);
    return;
  }
  saveEvaluation(problem, evaluation, null);
}

// 評価（と、あればミス内容）を記録として保存する
function saveEvaluation(problem, evaluation, mistake) {
  const records = loadRecords();
  const key = recordKey(problem);
  if (!records[key]) records[key] = [];
  records[key].push({
    date: new Date().toISOString(),
    evaluation: evaluation,
    mistake: mistake || null,
  });
  saveRecords(records);

  renderProblems();
}

// 履歴の日時を編集するフォームの表示・非表示切り替え
function toggleDateEdit(key, i) {
  const form = document.getElementById(`edit-${key}-${i}`);
  form.style.display = form.style.display === "flex" ? "none" : "flex";
}

// 編集した日時を保存する
function saveEditedDate(problem, i) {
  const key = recordKey(problem);
  const input = document.getElementById(`input-${key}-${i}`);
  const newDate = new Date(input.value);
  if (isNaN(newDate.getTime())) {
    alert("日時が正しく入力されていません");
    return;
  }

  const records = loadRecords();
  records[key][i].date = newDate.toISOString();
  saveRecords(records);
  renderProblems();
}

// ミス内容を編集するフォームの表示・非表示切り替え
function toggleMistakeEdit(key, i) {
  const form = document.getElementById(`edit-mistake-${key}-${i}`);
  form.style.display = form.style.display === "flex" ? "none" : "flex";
}

// 編集したミス内容を保存する
function saveEditedMistake(problem, i) {
  const key = recordKey(problem);
  const input = document.getElementById(`input-mistake-${key}-${i}`);

  const records = loadRecords();
  records[key][i].mistake = input.value.trim() || null;
  saveRecords(records);
  renderProblems();
}

// 履歴の記録を削除する（間違えて入力した記録の削除用）
function deleteHistoryEntry(problem, i) {
  const records = loadRecords();
  const key = recordKey(problem);
  records[key].splice(i, 1);
  saveRecords(records);
  renderProblems();
}

// ミス選択モーダル：どの問題に対する記録かを一時的に覚えておく
let pendingMistakeProblem = null;
let selectedMistakeCategories = new Set();

function openMistakeModal(problem) {
  pendingMistakeProblem = problem;
  selectedMistakeCategories = new Set();
  document.getElementById("mistake-other-input").value = "";
  renderMistakeChips();
  document.getElementById("mistake-modal").style.display = "flex";
}

function closeMistakeModal() {
  document.getElementById("mistake-modal").style.display = "none";
  pendingMistakeProblem = null;
}

// 更新履歴モーダルの表示・非表示
function openChangelogModal() {
  const list = document.getElementById("changelog-list");
  list.innerHTML = CHANGELOG
    .map(
      entry => `
      <div class="changelog-entry">
        <div class="changelog-entry-header">
          <span class="changelog-version">ver ${entry.version}</span>
          <span class="changelog-date">${entry.date}</span>
        </div>
        <ul class="changelog-changes">
          ${entry.changes.map(c => `<li>${c}</li>`).join("")}
        </ul>
      </div>
    `
    )
    .join("");
  document.getElementById("changelog-modal").style.display = "flex";
}

function closeChangelogModal() {
  document.getElementById("changelog-modal").style.display = "none";
}

function renderMistakeChips() {
  const container = document.getElementById("mistake-chip-list");
  container.innerHTML = MISTAKE_CATEGORIES
    .map((category, index) => `<button type="button" class="mistake-chip" onclick="toggleMistakeChip(${index}, this)">${category}</button>`)
    .join("");
}

function toggleMistakeChip(index, el) {
  const category = MISTAKE_CATEGORIES[index];
  if (selectedMistakeCategories.has(category)) {
    selectedMistakeCategories.delete(category);
    el.classList.remove("selected");
  } else {
    selectedMistakeCategories.add(category);
    el.classList.add("selected");
  }
}

function confirmMistakeModal() {
  const otherText = document.getElementById("mistake-other-input").value.trim();
  const parts = Array.from(selectedMistakeCategories);
  if (otherText) parts.push("その他: " + otherText);
  const mistake = parts.length > 0 ? parts.join("、") : null;

  saveEvaluation(pendingMistakeProblem, "B", mistake);
  closeMistakeModal();
}

// Check Pointの表示・非表示切り替え（idを直接指定する。同じ問題が複数の画面に出ても衝突しないように）
function toggleCheckpointBox(id) {
  const box = document.getElementById(id);
  box.style.display = box.style.display === "block" ? "none" : "block";
}

// 履歴の表示・非表示切り替え（▼▲の矢印も連動して切り替える）
function toggleHistoryBox(boxId, arrowId) {
  const box = document.getElementById(boxId);
  const arrow = document.getElementById(arrowId);
  const isOpen = box.style.display === "block";
  box.style.display = isOpen ? "none" : "block";
  if (arrow) arrow.textContent = isOpen ? "▼" : "▲";
}

// 現在のフィルタに応じて対象の問題だけを取り出す
function getFilteredProblems() {
  const records = loadRecords();

  return getProblems()
    .map((problem, index) => ({ problem, index, history: getHistory(problem, records) }))
    .filter(({ problem, history }) => {
      if (currentFilter === "homeworkSSSA") return problem.homeworkRequiredSSSA;
      if (currentFilter === "homeworkSBCT") return problem.homeworkRequiredSBCT;
      if (currentFilter === "review") return needsReview(history);
      if (currentFilter === "unpracticed") return history.length === 0;
      return true; // 'all'
    });
}

// 問題一覧を画面に描画する
function renderProblems() {
  const container = document.getElementById("problem-list");
  container.innerHTML = "";

  if (!getCurrentUnit()) {
    container.innerHTML = "<p>この学期のデータはまだありません。</p>";
    return;
  }

  const filtered = getFilteredProblems();

  if (filtered.length === 0) {
    container.innerHTML = "<p>該当する問題はありません。</p>";
    return;
  }

  filtered.forEach(({ problem, index, history }) => {
    const key = recordKey(problem);
    const historyBoxId = "history-" + key;
    const latest = history[history.length - 1];

    const item = document.createElement("div");
    item.className = "problem-item";

    const evalButtons = ["A", "B", "C", "D", "E"]
      .map(e => {
        const isSelected = latest && latest.evaluation === e;
        return `<button class="eval-btn eval-${e}${isSelected ? " selected" : ""}" onclick="handleEvaluationClick(getProblems()[${index}], '${e}')">${e}</button>`;
      })
      .join("");

    const historyEntries = history
      .map((r, i) => ({ r, i }))
      .reverse()
      .map(({ r, i }) => `
        <div class="history-entry">
          <span class="history-eval">${r.evaluation}</span>
          <span class="history-date">${formatDate(r.date)}</span>
          <button class="history-edit-btn" onclick="toggleDateEdit('${key}', ${i})">✏️</button>
          <button class="history-delete-btn" onclick="deleteHistoryEntry(getProblems()[${index}], ${i})">🗑️</button>
          <div class="date-edit-form" id="edit-${key}-${i}">
            <input type="datetime-local" id="input-${key}-${i}" value="${toDatetimeLocalValue(r.date)}">
            <button onclick="saveEditedDate(getProblems()[${index}], ${i})">保存</button>
          </div>
          ${r.evaluation === "B" ? `
            <div class="history-mistake">
              ミス: ${r.mistake || "（未記入）"}
              <button class="history-edit-btn" onclick="toggleMistakeEdit('${key}', ${i})">✏️</button>
            </div>
            <div class="date-edit-form" id="edit-mistake-${key}-${i}">
              <input type="text" id="input-mistake-${key}-${i}" value="${escapeAttr(r.mistake || "")}">
              <button onclick="saveEditedMistake(getProblems()[${index}], ${i})">保存</button>
            </div>
          ` : ""}
        </div>
      `)
      .join("");

    item.innerHTML = `
      <div class="problem-header">
        <span class="problem-number">${problem.number}</span>
        <span class="problem-level">Lv${problem.level}</span>
        ${problem.homeworkRequiredSSSA ? '<span class="homework-badge homework-badge-sssa">必須(SS/SA)</span>' : ""}
        ${problem.homeworkRequiredSBCT ? '<span class="homework-badge homework-badge-sbct">必須(SBC/T)</span>' : ""}
        ${problem.isReference ? '<span class="reference-badge">参考</span>' : ""}
        ${needsReview(history) ? '<span class="review-badge">要復習</span>' : ""}
      </div>
      <div class="eval-buttons">${evalButtons}</div>
      <div class="last-record" onclick="toggleHistoryBox('${historyBoxId}', 'arrow-${historyBoxId}')">
        <span>${latest ? `最新評価: ${latest.evaluation}（${formatDate(latest.date)}）` : "未演習"}</span>
        <span class="dropdown-arrow" id="arrow-${historyBoxId}">▼</span>
      </div>
      <div id="${historyBoxId}" class="history-list">
        ${history.length > 0 ? historyEntries : "<p>まだ記録がありません。</p>"}
      </div>
      <button class="checkpoint-toggle" onclick="toggleCheckpointBox('checkpoint-${key}')">💡 Check Point！</button>
      <div id="checkpoint-${key}" class="checkpoint">${problem.checkPoint}</div>
    `;
    container.appendChild(item);
  });
}

// Check Point一覧（評価なし、質問をどんどん確認するための一覧）を描画する
function renderCheckpoints() {
  const container = document.getElementById("checkpoint-list");
  container.innerHTML = "";

  if (!getCurrentUnit()) {
    container.innerHTML = "<p>この学期のデータはまだありません。</p>";
    return;
  }

  getProblems().forEach(problem => {
    const item = document.createElement("div");
    item.className = "problem-item";
    item.innerHTML = `
      <div class="problem-header">
        <span class="problem-number">${problem.number}</span>
        <span class="problem-level">Lv${problem.level}</span>
      </div>
      <div class="checkpoint-visible">${problem.checkPoint}</div>
    `;
    container.appendChild(item);
  });
}

// ミス一覧（評価がBだった問題のミス内容だけ）を描画する
function renderMistakes() {
  const records = loadRecords();
  const container = document.getElementById("mistake-list");
  container.innerHTML = "";

  if (!getCurrentUnit()) {
    container.innerHTML = "<p>この学期のデータはまだありません。</p>";
    return;
  }

  const mistakes = [];
  getProblems().forEach(problem => {
    const history = getHistory(problem, records);
    history.forEach(record => {
      if (record.evaluation === "B" && record.mistake) {
        mistakes.push({ problem, record });
      }
    });
  });

  if (mistakes.length === 0) {
    container.innerHTML = "<p>まだミスの記録はありません。</p>";
    return;
  }

  // 新しい記録が上に来るように並び替え
  mistakes.reverse().forEach(({ problem, record }) => {
    const item = document.createElement("div");
    item.className = "mistake-item";
    item.innerHTML = `
      <div class="problem-header">
        <span class="problem-number">${problem.number}</span>
        <span class="problem-level">Lv${problem.level}</span>
      </div>
      <div class="mistake-date">${formatDate(record.date)}</div>
      <div class="mistake-text">ミス内容: ${record.mistake}</div>
    `;
    container.appendChild(item);
  });
}

// タブの切り替え（すべて/提出必須/要復習/未演習/ミス一覧/Check Point一覧）
function showView(view) {
  currentView = view;

  const problemList = document.getElementById("problem-list");
  const mistakeList = document.getElementById("mistake-list");
  const checkpointList = document.getElementById("checkpoint-list");

  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById("tab-" + view).classList.add("active");

  problemList.style.display = "none";
  mistakeList.style.display = "none";
  checkpointList.style.display = "none";

  if (view === "mistakes") {
    mistakeList.style.display = "block";
    renderMistakes();
  } else if (view === "checkpoints") {
    checkpointList.style.display = "block";
    renderCheckpoints();
  } else {
    problemList.style.display = "block";
    currentFilter = view; // 'all' / 'homeworkSSSA' / 'homeworkSBCT' / 'review' / 'unpracticed'
    renderProblems();
  }
}

// ===== 画面左端からのスワイプでホーム画面に戻る =====
// iOSのエッジスワイプに合わせ、画面左端付近から始まったタッチのみを対象にする（誤操作防止）。
(function setupSwipeBack() {
  const EDGE_ZONE_PX = 24;
  const SWIPE_THRESHOLD_PX = 80;
  const MAX_VERTICAL_RATIO = 0.5;

  let startX = null;
  let startY = null;

  function isModalOpen() {
    const mistakeModal = document.getElementById("mistake-modal");
    const changelogModal = document.getElementById("changelog-modal");
    return mistakeModal.style.display === "flex" || changelogModal.style.display === "flex";
  }

  function isBackableScreenVisible() {
    return (
      document.getElementById("main-screen").style.display !== "none" ||
      document.getElementById("guide-screen").style.display !== "none" ||
      document.getElementById("achievement-screen").style.display !== "none"
    );
  }

  document.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1 || e.touches[0].clientX > EDGE_ZONE_PX) {
        startX = null;
        return;
      }
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      if (startX === null) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = Math.abs(touch.clientY - startY);
      startX = null;

      if (dx < SWIPE_THRESHOLD_PX || dy > dx * MAX_VERTICAL_RATIO) return;
      if (isModalOpen() || !isBackableScreenVisible()) return;

      showCoverScreen();
    },
    { passive: true }
  );
})();

// ページが読み込まれたら、前回の続きがあれば表紙を飛ばしてメイン画面へ、なければ表紙画面を表示する
(function initApp() {
  const saved = loadAppState();
  const lastScreen = loadLastScreen();
  // 前回ホーム画面を開いた状態で閉じていた場合は、演習の続きへは飛ばずホーム画面を再表示する
  // （ホーム画面側で、前回選んでいた学期のランプは自動的に選択状態になる）
  if (saved && terms[saved.termIndex] && lastScreen !== "cover") {
    currentTermIndex = saved.termIndex;
    currentUnitIndex = saved.unitIndex || 0;
    showMainScreen();
  } else {
    showCoverScreen();
  }
})();
