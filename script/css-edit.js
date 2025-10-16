const urlParams = new URLSearchParams(window.location.search);
const codeName = urlParams.get('code');
const storageKey = `code_${codeName}_css`;
let editorInstance;

if (!codeName) {
  alert('コード名が指定されていません');
  window.location.href = '../index.html';
}

document.getElementById('codeName').textContent = codeName;

// 初期テーマはlocalStorageから取得（なければライトモード）
let currentTheme = localStorage.getItem('editorTheme') || 'vs-light';

// Monaco Editorの読み込み設定
require.config({
  paths: {
    'vs': 'https://unpkg.com/monaco-editor@0.44.0/min/vs'
  }
});

require(['vs/editor/editor.main'], function() {
  const savedCode = localStorage.getItem(storageKey);
  const initialCode = savedCode !== null ? savedCode :
    '/* CSS */\nbody {\n font-family: sans-serif;\n margin: 0;\n padding: 20px;\n}';

  editorInstance = monaco.editor.create(document.getElementById('editor'), {
    value: initialCode,
    language: 'css',
    theme: currentTheme,
    automaticLayout: true,
  });

  updateCharCount();

  // テーマ切替ボタン
  const btn = document.getElementById('themeToggleBtn');
  updateButtonLabel();

  btn.addEventListener('click', () => {
    currentTheme = currentTheme === 'vs-light' ? 'vs-dark' : 'vs-light';
    monaco.editor.setTheme(currentTheme);
    localStorage.setItem('editorTheme', currentTheme);
    updateButtonLabel();
  });

  function updateButtonLabel() {
    btn.textContent = currentTheme === 'vs-light' ? 'ダークモードに切替' : 'ライトモードに切替';
  }

  // 文字数更新イベント
  editorInstance.onDidChangeModelContent(updateCharCount);

  // Ctrl+Sで保存
  window.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveCode();
    }
  });
});

function saveCode() {
  if (editorInstance) {
    const code = editorInstance.getValue();
    localStorage.setItem(storageKey, code);
    showToast();
  }
}

function saveAndView() {
  saveCode();
  window.location.href = `../view.html?code=${encodeURIComponent(codeName)}`;
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.style.visibility = 'visible';
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.visibility = 'hidden';
  }, 2000);
}

function updateCharCount() {
  if (editorInstance) {
    const length = editorInstance.getValue().length;
    document.getElementById('charCount').textContent = `${length} characters`;
  }
}

// Monacoロード後の初期化内に追加
const clearBtn = document.getElementById('clearCodeBtn');
clearBtn.addEventListener('click', () => {
  if (confirm('コードを全て消去しますか？戻せません。')) {
    editorInstance.setValue('');   // Monacoの内容を空に
    updateCharCount();
  }
});