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
// 問題そのもの（レベル・Check Point文）はproblemBankに、宿題必須かどうかは講ごとのhomeworkNumbersに持たせている。
function getProblems() {
  const unit = getCurrentUnit();
  const chapter = problemBank[unit.chapterRef];
  const byNumber = {};
  chapter.problems.forEach(p => { byNumber[p.number] = p; });

  return unit.problemNumbers.map(number => ({
    number: number,
    level: byNumber[number].level,
    checkPoint: byNumber[number].checkPoint,
    homeworkRequired: unit.homeworkNumbers.includes(number),
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

// 現在の表示フィルタ（'all' / 'homework' / 'review' / 'unpracticed'）
let currentFilter = "all";
// 現在表示中のタブ（フィルタ4種 + 'mistakes' + 'checkpoints'）。単元切り替え時の再描画に使う
let currentView = "all";

// 学期を切り替える
function switchTerm(index) {
  currentTermIndex = Number(index);
  currentUnitIndex = 0;
  saveAppState();
  renderUnitSelector();
  showView(currentView);
}

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

// 表紙画面で今タップされている学期（STARTを押すまでは未確定）
let coverSelectedTermIndex = null;

// 表紙画面を表示する（初回起動時、または「＜最初のページへ＞」を押したとき）
function showCoverScreen() {
  document.getElementById("cover-screen").style.display = "flex";
  document.getElementById("main-screen").style.display = "none";

  renderCoverTermButtons();

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

  renderTermSelector();
  renderUnitSelector();
  showView(currentView);
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

// 学期選択メニューを作る
function renderTermSelector() {
  const select = document.getElementById("term-select");
  select.innerHTML = terms
    .map((term, index) => `<option value="${index}">${term.title}</option>`)
    .join("");
  select.value = currentTermIndex;
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
      if (currentFilter === "homework") return problem.homeworkRequired;
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
        ${problem.homeworkRequired ? '<span class="homework-badge">宿題必須</span>' : ""}
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
    currentFilter = view; // 'all' / 'homework' / 'review' / 'unpracticed'
    renderProblems();
  }
}

// ページが読み込まれたら、前回の続きがあれば表紙を飛ばしてメイン画面へ、なければ表紙画面を表示する
(function initApp() {
  const saved = loadAppState();
  if (saved && terms[saved.termIndex]) {
    currentTermIndex = saved.termIndex;
    currentUnitIndex = saved.unitIndex || 0;
    showMainScreen();
  } else {
    showCoverScreen();
  }
})();
