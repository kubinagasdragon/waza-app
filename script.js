// アプリの更新履歴（コミット・プッシュのたびに先頭に新しいバージョンを追加する）
const CHANGELOG = [
  {
    version: "1.0.13",
    date: "2026-09-01",
    changes: [
      "学習カレンダーで、休塾の日を開いたときにタイトルが「第undefined講」になっていたのを「休塾」に修正",
      "ボタンなどをタップした際に、枠線が付いたり一瞬白っぽくフラッシュしたりする表示を修正",
    ],
  },
  {
    version: "1.0.12",
    date: "2026-09-01",
    changes: [
      "ホーム画面に「'26 大テスト対策 🎯」を追加",
      "全分野弱点ランダム演習 🔥：学期ごとに、過去に一度でも「要復習」になったことがある問題から5／10／20問をランダムに出題。出題順はⅠA第1章→ⅡB第9章の順、同一章内は問題番号順に整列",
      "学習カレンダー 📅：レギュラー講座の校舎（曜日）を設定すると、各講義日と講義間の「演習期間」が自動で表示される。日付をタップすると、その回の講義内容・次回講義までのタスクを確認でき、推奨復習内容は自分用にカスタマイズ可能（空欄にもできる）。休塾・大テストの日は色分けして表示し、その学期に関係ない月へは移動できないようにした",
      "使い方ガイドラインに「'26 大テスト対策」の説明を追加",
    ],
  },
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
    chapterRef: unit.chapterRef,
    homeworkRequiredSSSA: unit.homeworkNumbersSSSA.includes(number),
    homeworkRequiredSBCT: unit.homeworkNumbersSBCT.includes(number),
    isReference: referenceNumbers.includes(number),
  }));
}

// 記録のキーは「技の章＋問題番号」。講（学期）が変わっても同じ問題なら同じキーになるので、
// 演習履歴は学期をまたいでそのまま引き継がれる。
// problem.chapterRefがあればそれを優先する（大テスト対策のランダム演習など、現在の単元と無関係な問題を扱う場面向け）。
function recordKey(problem) {
  return (problem.chapterRef || getCurrentUnit().chapterRef) + "_" + problem.number;
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

// アプリの画面（div）一覧。新しい画面を追加したらここに登録するだけで、
// hideAllScreens()や各show◯◯Screen()から自動的に隠す対象になる。
const ALL_SCREEN_IDS = [
  "cover-screen",
  "main-screen",
  "guide-screen",
  "achievement-screen",
  "bigtest-screen",
  "bigtest-random-screen",
  "bigtest-calendar-screen",
];

function hideAllScreens() {
  ALL_SCREEN_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}

// 表紙画面で今タップされている学期（STARTを押すまでは未確定）
let coverSelectedTermIndex = null;

// 表紙画面を表示する（初回起動時、または「＜最初のページへ＞」を押したとき）
function showCoverScreen() {
  hideAllScreens();
  document.getElementById("cover-screen").style.display = "flex";
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
  hideAllScreens();
  document.getElementById("main-screen").style.display = "block";
  saveLastScreen("main");

  renderUnitSelector();
  showView(currentView);
}

// 使い方ガイドライン画面を表示する
function showGuideScreen() {
  hideAllScreens();
  document.getElementById("guide-screen").style.display = "block";
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
  hideAllScreens();
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

// ===== 大テスト対策 =====

const BIGTEST_TERM_STORAGE_KEY = "bigtestSelectedTerm";
const BIGTEST_RANDOM_SESSION_KEY = "bigtestRandomSession";
const BIGTEST_RANDOM_COUNTS = [5, 10, 20];

let currentBigTestTerm = "term1";

function loadBigTestTerm() {
  const saved = localStorage.getItem(BIGTEST_TERM_STORAGE_KEY);
  return VALID_ACHIEVEMENT_TERMS.includes(saved) ? saved : "term1";
}

function selectBigTestTerm(termKey) {
  if (!VALID_ACHIEVEMENT_TERMS.includes(termKey)) termKey = "term1";
  currentBigTestTerm = termKey;
  localStorage.setItem(BIGTEST_TERM_STORAGE_KEY, termKey);
  renderBigTestTabs();
}

// その学期の対象章一覧（学習到達度チェッカーと同じ除外ルール）
function getEligibleChaptersForTerm(termKey) {
  const config = ACHIEVEMENT_TERM_CONFIG[termKey];
  return ACHIEVEMENT_CHAPTER_ORDER.filter(ref => !config.excludeChapters.includes(ref));
}

// その学期の対象問題を、章をまたいでフラットな一覧にして返す
function getEligibleProblemsForTerm(termKey) {
  const config = ACHIEVEMENT_TERM_CONFIG[termKey];
  const result = [];
  getEligibleChaptersForTerm(termKey).forEach(chapterRef => {
    problemBank[chapterRef].problems.forEach(p => {
      if (p.level <= config.maxLevel) {
        result.push({ chapterRef, number: p.number, level: p.level, checkPoint: p.checkPoint });
      }
    });
  });
  return result;
}

// 履歴の中に一度でもC〜Eがあったかどうか（現在「要復習」バッジが外れていても対象に含む）
function everHadReview(history) {
  return history.some(record => ["C", "D", "E"].includes(record.evaluation));
}

// 「全分野弱点ランダム演習」の対象プール：その学期の対象問題のうち、過去に一度でもC〜Eがついたことがある問題
function getWeaknessPoolForTerm(termKey) {
  const records = loadRecords();
  return getEligibleProblemsForTerm(termKey).filter(p => {
    const history = records[`${p.chapterRef}_${p.number}`] || [];
    return everHadReview(history);
  });
}

// 配列をランダムに並び替える（Fisher-Yates）
function shuffleArray(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// chapterRef（例："1a-3"）を「ⅠA→ⅡBの順、章番号は昇順」で比較する
function compareChapterRef(a, b) {
  const parse = ref => {
    const m = ref.match(/^(1a|2b)-(\d+)$/);
    if (!m) return [99, 0];
    return [m[1] === "1a" ? 0 : 1, Number(m[2])];
  };
  const [seriesA, numA] = parse(a);
  const [seriesB, numB] = parse(b);
  return seriesA !== seriesB ? seriesA - seriesB : numA - numB;
}

// 新しいランダム演習セットを作り、localStorageに保存する（画面を離れても同じセットに戻れるように）
function generateBigTestRandomSet(termKey, count) {
  const pool = getWeaknessPoolForTerm(termKey);
  // 出題内容（どの問題が選ばれるか）はランダムにしつつ、並び順は
  // ⅠA第1章→…→ⅡB第9章の順、同じ章内では問題番号の昇順に揃える
  const picked = shuffleArray(pool)
    .slice(0, count)
    .sort((a, b) => compareChapterRef(a.chapterRef, b.chapterRef) || a.number - b.number);
  const session = {
    termKey,
    count,
    problems: picked.map(p => ({ chapterRef: p.chapterRef, number: p.number })),
  };
  localStorage.setItem(BIGTEST_RANDOM_SESSION_KEY, JSON.stringify(session));
  return session;
}

function loadBigTestRandomSession() {
  const raw = localStorage.getItem(BIGTEST_RANDOM_SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

// 大テスト対策のトップ画面（学期タブ＋機能一覧）を表示する
function showBigTestScreen() {
  hideAllScreens();
  document.getElementById("bigtest-screen").style.display = "block";

  currentBigTestTerm = loadBigTestTerm();
  renderBigTestTabs();
  window.scrollTo(0, 0);
}

// 学期タブを描画する（学習到達度チェッカーと同じ見た目のタブを流用）
function renderBigTestTabs() {
  const container = document.getElementById("bigtest-tabs");
  container.innerHTML = VALID_ACHIEVEMENT_TERMS
    .map(termKey => {
      const config = ACHIEVEMENT_TERM_CONFIG[termKey];
      const selected = termKey === currentBigTestTerm;
      return `
        <button type="button" role="tab" aria-selected="${selected}" class="achievement-tab${selected ? " selected" : ""}" onclick="selectBigTestTerm('${termKey}')">
          <span class="achievement-tab-title">${BIGTEST_TERM_LABELS[termKey]}</span>
          <span class="achievement-tab-level">${config.levelLabel}</span>
        </button>
      `;
    })
    .join("");
}

// 問題数を選んでランダム演習を開始する
function startBigTestRandomPractice(count) {
  generateBigTestRandomSet(currentBigTestTerm, count);
  showBigTestRandomScreen();
}

// 同じ学期・同じ問題数の条件で、セットを新しく作り直す
function regenerateBigTestRandomPractice() {
  const session = loadBigTestRandomSession();
  const count = session ? session.count : BIGTEST_RANDOM_COUNTS[1];
  generateBigTestRandomSet(currentBigTestTerm, count);
  renderBigTestRandomList();
}

// 全分野弱点ランダム演習の画面を表示する
function showBigTestRandomScreen() {
  hideAllScreens();
  document.getElementById("bigtest-random-screen").style.display = "block";
  renderBigTestRandomList();
  window.scrollTo(0, 0);
}

// ランダム演習の問題一覧を描画する（メイン演習画面のカード表示を流用）
function renderBigTestRandomList() {
  const session = loadBigTestRandomSession();
  const container = document.getElementById("bigtest-random-list");
  const meta = document.getElementById("bigtest-random-meta");
  const records = loadRecords();

  if (!session || session.problems.length === 0) {
    meta.textContent = "";
    container.innerHTML = "<p>対象となる問題（過去に一度でも「要復習」になったことがある問題）が見つかりませんでした。演習を重ねてからもう一度試してみてください。</p>";
    return;
  }

  const config = ACHIEVEMENT_TERM_CONFIG[session.termKey];
  meta.textContent = `${config.label}・${session.problems.length}問`;

  container.innerHTML = "";
  session.problems.forEach((ref, index) => {
    const chapterData = problemBank[ref.chapterRef];
    const problemData = chapterData ? chapterData.problems.find(p => p.number === ref.number) : null;
    if (!problemData) return; // データが変わっていた場合は安全にスキップ

    const problem = {
      chapterRef: ref.chapterRef,
      number: problemData.number,
      level: problemData.level,
      checkPoint: problemData.checkPoint,
    };
    const key = recordKey(problem);
    const history = records[key] || [];
    const latest = history[history.length - 1];
    const chapterLabel = formatAchievementChapterTitle(ref.chapterRef);
    const historyBoxId = "bigtest-history-" + key;
    const checkpointBoxId = "bigtest-checkpoint-" + key;

    const evalButtons = ["A", "B", "C", "D", "E"]
      .map(e => {
        const isSelected = latest && latest.evaluation === e;
        return `<button class="eval-btn eval-${e}${isSelected ? " selected" : ""}" onclick="handleBigTestEvaluationClick(${index}, '${e}')">${e}</button>`;
      })
      .join("");

    const historyEntries = history
      .slice()
      .reverse()
      .map(r => `
        <div class="history-entry">
          <span class="history-eval">${r.evaluation}</span>
          <span class="history-date">${formatDate(r.date)}</span>
          ${r.evaluation === "B" ? `<div class="history-mistake">ミス: ${r.mistake || "（未記入）"}</div>` : ""}
        </div>
      `)
      .join("");

    const item = document.createElement("div");
    item.className = "problem-item";
    item.innerHTML = `
      <div class="problem-header">
        <span class="bigtest-chapter-label">${chapterLabel}</span>
        <span class="problem-number">${problem.number}</span>
        <span class="problem-level">Lv${problem.level}</span>
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
      <button class="checkpoint-toggle" onclick="toggleCheckpointBox('${checkpointBoxId}')">💡 Check Point！</button>
      <div id="${checkpointBoxId}" class="checkpoint">${problem.checkPoint}</div>
    `;
    container.appendChild(item);
  });
}

// ランダム演習画面での評価ボタンの処理（履歴の編集・削除は既存の演習画面から行う想定でここでは省略）
function handleBigTestEvaluationClick(index, evaluation) {
  const session = loadBigTestRandomSession();
  if (!session) return;
  const ref = session.problems[index];
  const chapterData = problemBank[ref.chapterRef];
  const problemData = chapterData ? chapterData.problems.find(p => p.number === ref.number) : null;
  if (!problemData) return;

  const problem = { chapterRef: ref.chapterRef, number: problemData.number };

  if (evaluation === "B") {
    openMistakeModal(problem);
    return;
  }
  saveEvaluation(problem, evaluation, null);
}

// ===== 学習カレンダー =====

const WEEKDAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"];

const BIGTEST_WEEKDAY_KEY = "bigtestWeekday";
// プリセットの曜日と偶然同じ曜日番号（例：その他で月曜日を選んだ場合）でも、
// 「その他」を選んだこと自体を覚えておくためのモード（"preset" / "custom"）
const BIGTEST_WEEKDAY_MODE_KEY = "bigtestWeekdayMode";
const BIGTEST_OVERRIDES_KEY = "bigtestPlanOverrides";

// レギュラー講座の曜日プリセット（weekdayは日=0〜土=6のJS Dateの曜日番号に合わせている）
const BIGTEST_WEEKDAY_PRESETS = [
  { label: "姫路校", sub: "月", weekday: 1 },
  { label: "天王寺校", sub: "水", weekday: 3 },
  { label: "西北校", sub: "土", weekday: 6 },
];

// 学習カレンダー上でだけ使う学期タブの表示名（学習到達度チェッカー側の「3学期以降」とは別表記にする）
const BIGTEST_TERM_LABELS = { term1: "1学期", term2: "2学期", term3: "3学期" };

let currentCalendarYear = null;
let currentCalendarMonth = null; // 0〜11
let pendingCalendarWeekStart = null;

function loadBigTestWeekday() {
  const raw = localStorage.getItem(BIGTEST_WEEKDAY_KEY);
  const n = raw === null ? NaN : Number(raw);
  return Number.isInteger(n) && n >= 0 && n <= 6 ? n : 6; // 未設定時は西北校（土）をデフォルトにする
}

// プリセットボタン（姫路校／天王寺校／西北校）から曜日を設定する
function saveBigTestWeekday(weekday) {
  localStorage.setItem(BIGTEST_WEEKDAY_KEY, String(weekday));
  localStorage.setItem(BIGTEST_WEEKDAY_MODE_KEY, "preset");
  renderBigTestCalendar();
}

// 「その他」の選択欄から曜日を設定する。プリセットと同じ曜日番号を選んでも、
// 「その他」を選んだ状態として区別して覚えておく（他の操作で勝手にプリセット表示に戻らないように）
function saveBigTestWeekdayCustom(weekday) {
  localStorage.setItem(BIGTEST_WEEKDAY_KEY, String(weekday));
  localStorage.setItem(BIGTEST_WEEKDAY_MODE_KEY, "custom");
  renderBigTestCalendar();
}

// 現在「その他」モードかどうか。モード未保存（過去バージョンの保存データ等）の場合のみ、
// 曜日番号がプリセットと一致するかどうかで推測する
function isCustomWeekdayMode() {
  const mode = localStorage.getItem(BIGTEST_WEEKDAY_MODE_KEY);
  if (mode === "preset") return false;
  if (mode === "custom") return true;
  return !BIGTEST_WEEKDAY_PRESETS.some(p => p.weekday === loadBigTestWeekday());
}

function loadBigTestOverrides() {
  const raw = localStorage.getItem(BIGTEST_OVERRIDES_KEY);
  return raw ? JSON.parse(raw) : {};
}

// 週（weekStartがキー）に対する日付変更・復習内容の上書きを保存する
function saveBigTestOverrideFor(weekStart, patch) {
  const overrides = loadBigTestOverrides();
  overrides[weekStart] = Object.assign({}, overrides[weekStart] || {}, patch);
  localStorage.setItem(BIGTEST_OVERRIDES_KEY, JSON.stringify(overrides));
}

// 指定した学期の週データを返す（1学期は2026年度分がすでに終了しているため、当面カレンダー上は空にしておく）
function getBigTestWeeksForTerm(termKey) {
  if (termKey === "term1") return [];
  return BIGTEST_STUDY_PLAN[termKey].weeks.filter(week => week.weekStart);
}

// 学期を通した講義の通し番号（休塾を除く）を、weekStartをキーにして計算する
function getLectureNumberMap(termKey) {
  const map = {};
  let num = 0;
  BIGTEST_STUDY_PLAN[termKey].weeks.forEach(week => {
    if (!week.content) return; // 休塾はカウントしない
    num += 1;
    map[week.weekStart] = num;
  });
  return map;
}

// 授業日セル・モーダルタイトルで使う表示ラベルを作る。
// 大テストの回は「大テスト」、夏期・冬期講習の回は「第14講(冬期第1講)」のように通し番号＋元の名称を併記し、
// 通常回は「第1講」のように通し番号だけを表示する
function formatLectureLabel(week, lectureNumber) {
  if (!week.content) return "休塾"; // 休塾は講数を持たないので、講数表示はしない
  if (week.content.includes("大テスト")) return "大テスト";
  const isSpecialSession = /^(夏期|冬期)/.test(week.lecture);
  const shortLabel = `第${lectureNumber}講`;
  return isSpecialSession ? `${shortLabel}(${week.lecture})` : shortLabel;
}

// 週の月曜日（weekStart）と曜日設定から、実際の講義日（Dateオブジェクト）を計算する
function resolveWeekDate(weekStartStr, weekday) {
  const start = new Date(weekStartStr + "T00:00:00");
  const offset = (weekday + 6) % 7; // 月曜からの日数（月=0, 火=1, ... 日=6）
  const resolved = new Date(start);
  resolved.setDate(resolved.getDate() + offset);
  return resolved;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Dateを "YYYY-MM-DD" 形式にする（タイムゾーンに影響されないよう、getFullYear等から組み立てる）
function formatDateKey(date) {
  const pad = n => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// 曜日設定・日付変更を反映した「実際の表示日」を計算する
function resolveDisplayDate(week, weekday, overrides) {
  const override = overrides[week.weekStart] || {};
  return override.movedDate ? new Date(override.movedDate + "T00:00:00") : resolveWeekDate(week.weekStart, weekday);
}

// 現在の曜日設定で、この学期の講義が実際に存在する年月の範囲（最初の月〜最後の月）を計算する。
// レギュラー講座の曜日によって最初の講義日が属する月がずれるため（例：月曜なら8月、土曜なら9月）、
// weekStart（常に月曜）ではなく実際に解決した講義日から範囲を求める
function getBigTestMonthRange(termKey) {
  const weekday = loadBigTestWeekday();
  const overrides = loadBigTestOverrides();
  const weeks = getBigTestWeeksForTerm(termKey);
  if (weeks.length === 0) return null;

  const dates = weeks.map(week => resolveDisplayDate(week, weekday, overrides));
  const minDate = dates.reduce((a, b) => (b < a ? b : a));
  const maxDate = dates.reduce((a, b) => (b > a ? b : a));
  return {
    minKey: minDate.getFullYear() * 12 + minDate.getMonth(),
    maxKey: maxDate.getFullYear() * 12 + maxDate.getMonth(),
    minYear: minDate.getFullYear(),
    minMonth: minDate.getMonth(),
  };
}

// 学習カレンダー画面を表示する（現在選択中の学期＝currentBigTestTermの期間を表示する）
function showBigTestCalendarScreen() {
  hideAllScreens();
  document.getElementById("bigtest-calendar-screen").style.display = "block";

  const range = getBigTestMonthRange(currentBigTestTerm);
  const base = range ? new Date(range.minYear, range.minMonth, 1) : new Date();
  currentCalendarYear = base.getFullYear();
  currentCalendarMonth = base.getMonth();

  renderBigTestCalendar();
  window.scrollTo(0, 0);
}

function shiftCalendarMonth(delta) {
  let nextMonth = currentCalendarMonth + delta;
  let nextYear = currentCalendarYear;
  if (nextMonth < 0) {
    nextMonth = 11;
    nextYear -= 1;
  } else if (nextMonth > 11) {
    nextMonth = 0;
    nextYear += 1;
  }

  // その学期に講義が存在しない月へは移動しない
  const range = getBigTestMonthRange(currentBigTestTerm);
  if (range) {
    const key = nextYear * 12 + nextMonth;
    if (key < range.minKey || key > range.maxKey) return;
  }

  currentCalendarMonth = nextMonth;
  currentCalendarYear = nextYear;
  renderBigTestCalendar();
}

// レギュラー講座の曜日設定UIを描画する
function renderBigTestWeekdayPresets() {
  const container = document.getElementById("calendar-weekday-presets");
  const select = document.getElementById("calendar-weekday-custom");
  const current = loadBigTestWeekday();
  const isCustom = isCustomWeekdayMode();

  const presetButtons = BIGTEST_WEEKDAY_PRESETS.map(
    p => `
      <button type="button" class="calendar-weekday-btn${!isCustom && p.weekday === current ? " selected" : ""}" onclick="saveBigTestWeekday(${p.weekday})">
        ${p.label}<span class="calendar-weekday-btn-sub">${p.sub}</span>
      </button>
    `
  ).join("");

  const otherButton = `
    <button type="button" class="calendar-weekday-btn${isCustom ? " selected" : ""}" onclick="showCalendarWeekdayCustomSelect()">
      その他<span class="calendar-weekday-btn-sub">${isCustom ? WEEKDAY_NAMES[current] + "曜" : "曜日を選択"}</span>
    </button>
  `;

  container.innerHTML = presetButtons + otherButton;

  // 選択肢は最初に一度だけ作る（毎回作り直すと、選択中の値が不安定になることがあるため）。
  // 「その他」モードが選ばれている間は、他の操作をしても選択欄を表示し続ける。
  if (select.options.length === 0) {
    select.innerHTML = WEEKDAY_NAMES.map((name, i) => `<option value="${i}">${name}曜日</option>`).join("");
  }
  select.value = String(current);
  select.style.display = isCustom ? "block" : "none";
}

function showCalendarWeekdayCustomSelect() {
  const select = document.getElementById("calendar-weekday-custom");
  if (select.options.length === 0) {
    select.innerHTML = WEEKDAY_NAMES.map((name, i) => `<option value="${i}">${name}曜日</option>`).join("");
  }
  select.value = String(loadBigTestWeekday());
  select.style.display = "block";
  // 曜日はまだ変えず、「その他」モードにしたことだけ先に確定させる（初回タップ時に一瞬プリセット表示へ戻るのを防ぐ）
  localStorage.setItem(BIGTEST_WEEKDAY_MODE_KEY, "custom");
}

function selectBigTestWeekdayCustom(value) {
  saveBigTestWeekdayCustom(Number(value));
}

// 学習計画のトピック名（「基盤」「最大・最小」など）→ problemBankの章キーの対応表。
// 範囲サマリーの自由記述（「２学期全範囲」「基盤〜積分法まで全て」等）はここには含めず、
// 該当する技のセクションが分からない場合は単に注記を付けない（誤った章を示すよりは安全なため）。
const BIGTEST_TOPIC_TO_CHAPTERS = {
  "基盤": ["1a-1", "2b-1"], // 2学期第1講はⅠA・ⅡB両方の導入章をまとめて扱う
  "最大・最小": ["1a-2"],
  "最大最小": ["1a-2"],
  "方程式・不等式": ["1a-3"],
  "方程式不等式": ["1a-3"],
  "データの分析": ["1a-4"],
  "三角比・図形": ["1a-5"],
  "場合の数": ["1a-6"],
  "確率": ["1a-7"],
  "整数": ["1a-8"],
  "整数①": ["1a-8"],
  "整数②": ["1a-8"],
  "式と証明": ["2b-1"],
  "図形と式": ["2b-2"],
  "図形と式①": ["2b-2"],
  "図形と式②": ["2b-2"],
  "三角関数": ["2b-3"],
  "指数・対数関数": ["2b-4"],
  "指数対数関数": ["2b-4"],
  "三角・指数対数": ["2b-3", "2b-4"],
  "微分法": ["2b-5"],
  "積分法": ["2b-6"],
  "数列": ["2b-7"],
  "確率分布と統計": ["2b-8"],
  "平面ベクトル": ["2b-9"],
  "空間ベクトル": ["2b-9"],
  "ベクトル": ["2b-9"],
};

// 章キーの配列 → "ⅠA 第1章＋ⅡB 第1章" のような表示ラベルを作る
function formatChapterRefLabel(chapterRefs) {
  return chapterRefs
    .map(ref => {
      const m = ref.match(/^(1a|2b)-(\d+)$/);
      if (!m) return null;
      return `${m[1] === "1a" ? "ⅠA" : "ⅡB"} 第${m[2]}章`;
    })
    .filter(Boolean)
    .join("＋");
}

// トピック名の文字列から技の章参照ラベルを作る（複数トピックが「、」区切りの場合も対応）。
// 対応表に無いフレーズ（範囲サマリー等）は空文字を返す。
function resolveTopicChapterLabel(topicText) {
  if (!topicText) return "";
  if (BIGTEST_TOPIC_TO_CHAPTERS[topicText]) {
    return formatChapterRefLabel(BIGTEST_TOPIC_TO_CHAPTERS[topicText]);
  }
  const parts = topicText.split(/[、,]/).map(s => s.trim()).filter(Boolean);
  if (parts.length > 1 && parts.every(p => BIGTEST_TOPIC_TO_CHAPTERS[p])) {
    return formatChapterRefLabel(parts.flatMap(p => BIGTEST_TOPIC_TO_CHAPTERS[p]));
  }
  return "";
}

// 講義と講義の間（講義翌日〜次回講義前日）を「演習期間」とし、その間にやるべき内容とあわせて計算する
function computeBigTestPracticePeriods(weeks, weekday, overrides) {
  // 休塾週はここでは無視する（休塾を挟んでも、前後の実際の講義同士でタスク期間をつなげるため）
  const dated = weeks
    .filter(week => week.content)
    .map(week => ({ week, date: resolveDisplayDate(week, weekday, overrides) }))
    .sort((a, b) => a.date - b.date);

  const periods = [];
  for (let i = 0; i < dated.length - 1; i++) {
    const cur = dated[i];
    const next = dated[i + 1];
    const startDate = addDays(cur.date, 1);
    const endDate = addDays(next.date, -1);
    if (startDate > endDate) continue; // 間隔が無い（連日開催など）場合は演習期間なし

    const override = overrides[cur.week.weekStart] || {};
    const plan = BIGTEST_STUDY_PLAN[currentBigTestTerm];
    const extra1Value = override.extra1Override != null ? override.extra1Override : cur.week.extra1;
    const extra2Value = override.extra2Override != null ? override.extra2Override : cur.week.extra2;

    const parts = [];
    if (cur.week.review) parts.push({ type: "review", text: `${cur.week.review}(${plan.reviewTag})` });
    if (extra1Value) parts.push({ type: "extra1", text: `復習(${plan.extra1Tag})：${extra1Value}` });
    if (extra2Value) parts.push({ type: "extra2", text: `復習(${plan.extra2Tag})：${extra2Value}` });
    if (parts.length === 0) continue; // 演習すべき内容が無ければ表示しない

    periods.push({
      startKey: formatDateKey(startDate),
      endKey: formatDateKey(endDate),
      parts,
    });
  }
  return periods;
}

// 月間カレンダーのグリッドを描画する
function renderBigTestCalendar() {
  renderBigTestWeekdayPresets();
  document.getElementById("calendar-month-label").textContent = `${currentCalendarYear}年${currentCalendarMonth + 1}月`;

  const weekday = loadBigTestWeekday();
  const overrides = loadBigTestOverrides();
  const weeks = getBigTestWeeksForTerm(currentBigTestTerm);

  // その学期に関係ない月へは移動できないよう、範囲の端では矢印を無効化する
  const range = getBigTestMonthRange(currentBigTestTerm);
  const curKey = currentCalendarYear * 12 + currentCalendarMonth;
  document.getElementById("calendar-nav-prev").disabled = !range || curKey <= range.minKey;
  document.getElementById("calendar-nav-next").disabled = !range || curKey >= range.maxKey;

  const emptyNote = document.getElementById("calendar-empty-note");
  const grid = document.getElementById("calendar-grid");

  if (weeks.length === 0) {
    emptyNote.style.display = "block";
    grid.innerHTML = "";
    return;
  }
  emptyNote.style.display = "none";

  const eventsByDate = {};
  weeks.forEach(week => {
    eventsByDate[formatDateKey(resolveDisplayDate(week, weekday, overrides))] = week;
  });

  const practicePeriods = computeBigTestPracticePeriods(weeks, weekday, overrides);
  const lectureNumbers = getLectureNumberMap(currentBigTestTerm);

  grid.innerHTML = "";

  const firstOfMonth = new Date(currentCalendarYear, currentCalendarMonth, 1);
  const daysInMonth = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
  const todayKey = formatDateKey(new Date());
  const leadingBlanks = firstOfMonth.getDay();
  const totalCells = leadingBlanks + daysInMonth;
  const totalRows = Math.ceil(totalCells / 7);
  // minmax(0, 1fr)にしないと、帯（.calendar-band）の中身が多い時にその行だけ縦に伸びてズレてしまう
  grid.style.gridTemplateRows = `repeat(${totalRows}, minmax(0, 1fr))`;

  for (let i = 0; i < leadingBlanks; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-cell calendar-cell-empty";
    empty.style.gridRow = `${Math.floor(i / 7) + 1} / ${Math.floor(i / 7) + 2}`;
    empty.style.gridColumn = `${(i % 7) + 1} / ${(i % 7) + 2}`;
    grid.appendChild(empty);
  }

  // 各日のセル情報（行・列）を、演習期間の帯を後から重ねて描画するために記録しておく。
  // 帯（.calendar-band）を明示的なgrid-row/columnで配置すると、それ以外のセルが自動配置のままではCSS Gridの
  // 「自動配置は明示配置された領域を避ける」仕様により位置がずれてしまうため、日付セルにも明示配置を指定する。
  const dayCells = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(currentCalendarYear, currentCalendarMonth, day);
    const key = formatDateKey(dateObj);
    const week = eventsByDate[key];
    const cellIndex = leadingBlanks + day - 1;
    const row = Math.floor(cellIndex / 7);
    const col = cellIndex % 7;
    dayCells.push({ key, row, col });

    const cell = document.createElement("div");
    cell.className = "calendar-cell";
    cell.style.gridRow = `${row + 1} / ${row + 2}`;
    cell.style.gridColumn = `${col + 1} / ${col + 2}`;
    if (key === todayKey) cell.classList.add("calendar-cell-today");

    let innerHtml = `<div class="calendar-cell-date">${day}</div>`;

    if (week) {
      const isTest = week.content && week.content.includes("大テスト");
      const isRest = !week.content;
      cell.classList.add("calendar-cell-has-event");
      if (isTest) cell.classList.add("calendar-cell-test");
      if (isRest) cell.classList.add("calendar-cell-rest");
      innerHtml += `<div class="calendar-event-label">${isRest ? "休塾" : formatLectureLabel(week, lectureNumbers[week.weekStart])}</div>`;
      cell.onclick = () => openCalendarDayModal(key);
    } else if (practicePeriods.some(p => key >= p.startKey && key <= p.endKey)) {
      // 演習期間中の日は、下に重ねる帯（.calendar-band）が見えるよう背景を透明にしておく
      cell.classList.add("calendar-cell-band-covered");
    }

    cell.innerHTML = innerHtml;
    grid.appendChild(cell);
  }

  // 演習期間を、行をまたぐ場合は行ごとに分割し、セルを一体化した帯として描画する
  practicePeriods.forEach(period => {
    const cellsInPeriod = dayCells.filter(d => d.key >= period.startKey && d.key <= period.endKey);
    if (cellsInPeriod.length === 0) return;

    // 行ごと、かつ休塾など「その日自体に予定がある日」の手前でブロック（セグメント）を区切る。
    // こうすることで帯（.calendar-band）の矩形がその日の列にはそもそもかからず、文字が休塾セルに被らない
    const segments = [];
    let segmentStart = null;
    let prev = null;
    cellsInPeriod.forEach(cell => {
      const hasOwnEvent = !!eventsByDate[cell.key];
      if (hasOwnEvent) {
        if (segmentStart) segments.push({ row: segmentStart.row, colStart: segmentStart.col, colEnd: prev.col });
        segmentStart = null;
        prev = null;
        return;
      }
      if (!segmentStart) {
        segmentStart = cell;
      } else if (cell.row !== prev.row) {
        segments.push({ row: segmentStart.row, colStart: segmentStart.col, colEnd: prev.col });
        segmentStart = cell;
      }
      prev = cell;
    });
    if (segmentStart) segments.push({ row: segmentStart.row, colStart: segmentStart.col, colEnd: prev.col });
    if (segments.length === 0) return;

    // 演習内容（parts）を各ブロックに振り分ける。1つのブロックに全部詰め込んで折り返す（切れる）のではなく、
    // 入りきらない分は次の週のブロックに続けて表示する。日数（横幅）が狭いブロックほど詰め込みすぎないよう、
    // 幅に応じて1ブロックに入れる件数の上限を決める（どのブロックも幅が狭くて入りきらない場合のみ、
    // 表示自体が消えてしまわないよう最後のブロックにまとめて表示する）
    let partIndex = 0;
    let lastBand = null;
    segments.forEach(seg => {
      const width = seg.colEnd - seg.colStart + 1;
      const cap = width <= 1 ? 1 : width <= 3 ? 2 : 3;
      const remainingParts = period.parts.length - partIndex;
      const count = Math.min(cap, remainingParts);
      const segmentParts = period.parts.slice(partIndex, partIndex + count);
      partIndex += count;

      const band = document.createElement("div");
      band.className = "calendar-band";
      band.style.gridRow = `${seg.row + 1} / ${seg.row + 2}`;
      band.style.gridColumn = `${seg.colStart + 1} / ${seg.colEnd + 2}`;
      if (segmentParts.length > 0) {
        band.innerHTML = segmentParts.map(p => `<span class="calendar-band-${p.type}">${p.text}</span>`).join(" / ");
      }
      grid.appendChild(band);
      lastBand = band;
    });

    // どのブロックの幅にも収まりきらなかった分は、内容が消えないよう最後のブロックに追加で表示する
    if (partIndex < period.parts.length && lastBand) {
      const leftover = period.parts.slice(partIndex);
      const leftoverHtml = leftover.map(p => `<span class="calendar-band-${p.type}">${p.text}</span>`).join(" / ");
      lastBand.innerHTML = lastBand.innerHTML ? `${lastBand.innerHTML} / ${leftoverHtml}` : leftoverHtml;
    }
  });
}

// 日付をタップしたときに、その週の推奨計画・編集フォームを表示する
function openCalendarDayModal(dateKey) {
  const weekday = loadBigTestWeekday();
  const overrides = loadBigTestOverrides();
  const weeks = getBigTestWeeksForTerm(currentBigTestTerm);

  const week = weeks.find(w => formatDateKey(resolveDisplayDate(w, weekday, overrides)) === dateKey);
  if (!week) return;

  const override = overrides[week.weekStart] || {};
  pendingCalendarWeekStart = week.weekStart;

  const plan = BIGTEST_STUDY_PLAN[currentBigTestTerm];
  const lectureNumbers = getLectureNumberMap(currentBigTestTerm);
  document.getElementById("calendar-day-modal-title").textContent = formatLectureLabel(week, lectureNumbers[week.weekStart]);

  const isTestWeek = week.content && week.content.includes("大テスト");

  const extra1Value = override.extra1Override != null ? override.extra1Override : week.extra1;
  const extra2Value = override.extra2Override != null ? override.extra2Override : week.extra2;

  const reviewChapterLabel = resolveTopicChapterLabel(week.review);
  const extra1ChapterLabel = resolveTopicChapterLabel(week.extra1);
  const extra2ChapterLabel = resolveTopicChapterLabel(week.extra2);

  const hasTasks = isTestWeek || week.review || week.extra1 || week.extra2;

  const body = document.getElementById("calendar-day-modal-body");
  body.innerHTML = `
    ${week.content ? `<p class="calendar-modal-content">講義内容：${week.content}</p>` : `<p class="calendar-modal-content calendar-modal-rest">休塾</p>`}
    ${hasTasks ? `<p class="calendar-modal-task-heading">【次回講義までのタスク】</p>` : ""}
    ${isTestWeek ? `
    <p class="calendar-modal-test-message">特になし。大テストまでに全力を注いだら、その後は少しだけ休みましょう。</p>
    ` : `
    ${week.review ? `<p class="calendar-modal-line">講義内容の復習：${week.review}${reviewChapterLabel ? ` (${reviewChapterLabel})` : ""} ${plan.reviewTag}</p>` : ""}
    ${week.extra1 ? `
      <div class="calendar-modal-edit-row">
        <label class="calendar-modal-field-label">🔁（${plan.extra1Tag}復習）${(override.extra1Override == null || override.extra1Override === "") ? `<span class="calendar-modal-recommend-badge" data-recommend="${escapeAttr(week.extra1)}" onclick="restoreCalendarModalRecommend('calendar-modal-extra1', this)">推奨：${week.extra1}${extra1ChapterLabel ? ` (${extra1ChapterLabel})` : ""}</span>` : ""}</label>
        <div class="calendar-modal-input-row">
          <input type="text" id="calendar-modal-extra1" class="calendar-modal-text-input" value="${escapeAttr(extra1Value)}">
          <button type="button" class="calendar-modal-clear-btn" onclick="clearCalendarModalInput('calendar-modal-extra1')" aria-label="消去">✕</button>
        </div>
      </div>
    ` : ""}
    ${week.extra2 ? `
      <div class="calendar-modal-edit-row">
        <label class="calendar-modal-field-label">🔁（${plan.extra2Tag}復習）${(override.extra2Override == null || override.extra2Override === "") ? `<span class="calendar-modal-recommend-badge" data-recommend="${escapeAttr(week.extra2)}" onclick="restoreCalendarModalRecommend('calendar-modal-extra2', this)">推奨：${week.extra2}${extra2ChapterLabel ? ` (${extra2ChapterLabel})` : ""}</span>` : ""}</label>
        <div class="calendar-modal-input-row">
          <input type="text" id="calendar-modal-extra2" class="calendar-modal-text-input" value="${escapeAttr(extra2Value)}">
          <button type="button" class="calendar-modal-clear-btn" onclick="clearCalendarModalInput('calendar-modal-extra2')" aria-label="消去">✕</button>
        </div>
      </div>
    ` : ""}
    `}
    <label class="calendar-modal-field-label">日付を変更（実際の講義日が違う場合）</label>
    <input type="date" id="calendar-modal-date" class="calendar-modal-date-input" value="${dateKey}">
    <div class="modal-buttons">
      <button type="button" class="modal-cancel" onclick="closeCalendarDayModal()">キャンセル</button>
      <button type="button" class="modal-save" onclick="saveCalendarDayModal()">保存</button>
    </div>
  `;
  document.getElementById("calendar-day-modal").style.display = "flex";
}

function saveCalendarDayModal() {
  const weeks = getBigTestWeeksForTerm(currentBigTestTerm);
  const week = weeks.find(w => w.weekStart === pendingCalendarWeekStart);
  if (!week) return;

  const dateVal = document.getElementById("calendar-modal-date").value;
  const weekday = loadBigTestWeekday();
  const defaultKey = formatDateKey(resolveWeekDate(week.weekStart, weekday));

  const patch = { movedDate: dateVal && dateVal !== defaultKey ? dateVal : null };

  // 空欄で保存した場合も「あえて空にした」という上書きとして扱う（推奨内容へ勝手に戻さない）。
  // 推奨内容とまったく同じ文字列を入力した場合のみ、上書きなし（推奨表示に戻る）とみなす
  const extra1Input = document.getElementById("calendar-modal-extra1");
  if (extra1Input) {
    const val = extra1Input.value.trim();
    patch.extra1Override = val !== (week.extra1 || "") ? val : null;
  }

  const extra2Input = document.getElementById("calendar-modal-extra2");
  if (extra2Input) {
    const val = extra2Input.value.trim();
    patch.extra2Override = val !== (week.extra2 || "") ? val : null;
  }

  saveBigTestOverrideFor(pendingCalendarWeekStart, patch);
  closeCalendarDayModal();
  renderBigTestCalendar();
}

// 推奨復習の入力欄をワンタッチで空にする（空欄のまま保存すれば「復習なし」として扱われる）
function clearCalendarModalInput(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.value = "";
  input.focus();
}

// 「推奨」バッジをタップすると、空欄にした入力欄に元の推奨内容を復活させる
function restoreCalendarModalRecommend(inputId, badgeEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.value = badgeEl.dataset.recommend || "";
  input.focus();
}

function closeCalendarDayModal() {
  document.getElementById("calendar-day-modal").style.display = "none";
  pendingCalendarWeekStart = null;
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

  // 評価をつけた画面（メイン演習画面／大テスト対策のランダム演習画面）に応じて再描画する
  if (document.getElementById("bigtest-random-screen").style.display !== "none") {
    renderBigTestRandomList();
  } else {
    renderProblems();
  }
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
    const calendarDayModal = document.getElementById("calendar-day-modal");
    return (
      mistakeModal.style.display === "flex" ||
      changelogModal.style.display === "flex" ||
      calendarDayModal.style.display === "flex"
    );
  }

  // 各画面のスワイプバック先（画面上の「＜ 戻る」ボタンと同じ遷移先にする）
  const SWIPE_BACK_TARGETS = {
    "main-screen": showCoverScreen,
    "guide-screen": showCoverScreen,
    "achievement-screen": showCoverScreen,
    "bigtest-screen": showCoverScreen,
    "bigtest-random-screen": showBigTestScreen,
    "bigtest-calendar-screen": showBigTestScreen,
  };

  function getSwipeBackHandler() {
    for (const id in SWIPE_BACK_TARGETS) {
      if (document.getElementById(id).style.display !== "none") return SWIPE_BACK_TARGETS[id];
    }
    return null;
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
      if (isModalOpen()) return;

      const handler = getSwipeBackHandler();
      if (handler) handler();
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
