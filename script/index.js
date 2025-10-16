let currentRenameCode = null;

function getCodeList() {
  const codes = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('code_')) {
      const parts = key.split('_');
      if (parts.length === 3) {
        const codeName = parts[1];
        const fileType = parts[2];
        if (!codes[codeName]) {
          codes[codeName] = {
            html: false,
            css: false,
            js: false
          };
        }
        codes[codeName][fileType] = true;
      }
    }
  }
  return codes;
}

function renderCodeList() {
  const codes = getCodeList();
  const codeList = document.getElementById('codeList');

  if (Object.keys(codes).length === 0) {
    codeList.innerHTML = `
          <div class="empty-state">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            <p>まだコードが保存されていません</p>
          </div>
        `;
    return;
  }

  codeList.innerHTML = Object.keys(codes).map(codeName => `
        <li class="code-item">
          <div>
            <div class="code-name">${codeName}</div>
          </div>
          <div class="code-actions">
            <a href="code/html.html?code=${encodeURIComponent(codeName)}" class="btn btn-primary">HTML</a>
            <a href="code/css.html?code=${encodeURIComponent(codeName)}" class="btn btn-primary">CSS</a>
            <a href="code/js.html?code=${encodeURIComponent(codeName)}" class="btn btn-primary">JS</a>
            <a href="view.html?code=${encodeURIComponent(codeName)}" class="btn btn-success">View</a>
            <button class="btn btn-warning" onclick="openRenameModal('${codeName}')">名前変更</button>
            <button class="btn btn-danger" onclick="deleteCode('${codeName}')">削除</button>
          </div>
        </li>
      `).join('');
}

function createNewCode() {
  const input = document.getElementById('newCodeName');
  const codeName = input.value.trim();

  if (!codeName) {
    alert('コード名を入力してください');
    return;
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(codeName)) {
    alert('コード名は英数字、ハイフン、アンダースコアのみ使用できます');
    return;
  }

  localStorage.setItem(`code_${codeName}_html`, '<!DOCTYPE html>\n<html>\n<head>\n <title>My Page</title>\n</head>\n<body>\n <h1>Hello World</h1>\n</body>\n</html>');
  localStorage.setItem(`code_${codeName}_css`, '/* CSS */\nbody {\n font-family: sans-serif;\n}');
  localStorage.setItem(`code_${codeName}_js`, '// JavaScript\nconsole.log("Hello!");');

  input.value = '';
  renderCodeList();
}

function deleteCode(codeName) {
  if (!confirm(`「${codeName}」を削除してもよろしいですか？`)) {
    return;
  }

  localStorage.removeItem(`code_${codeName}_html`);
  localStorage.removeItem(`code_${codeName}_css`);
  localStorage.removeItem(`code_${codeName}_js`);

  renderCodeList();
}

function openRenameModal(codeName) {
  currentRenameCode = codeName;
  document.getElementById('renameInput').value = codeName;
  document.getElementById('renameModal').classList.add('active');
}

function closeRenameModal() {
  document.getElementById('renameModal').classList.remove('active');
  currentRenameCode = null;
}

function confirmRename() {
  const newName = document.getElementById('renameInput').value.trim();

  if (!newName) {
    alert('コード名を入力してください');
    return;
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(newName)) {
    alert('コード名は英数字、ハイフン、アンダースコアのみ使用できます');
    return;
  }

  if (newName === currentRenameCode) {
    closeRenameModal();
    return;
  }

  const codes = getCodeList();
  if (codes[newName]) {
    alert('そのコード名は既に存在します');
    return;
  }

  ['html', 'css', 'js'].forEach(type => {
    const oldKey = `code_${currentRenameCode}_${type}`;
    const newKey = `code_${newName}_${type}`;
    const content = localStorage.getItem(oldKey);
    if (content !== null) {
      localStorage.setItem(newKey, content);
      localStorage.removeItem(oldKey);
    }
  });

  closeRenameModal();
  renderCodeList();
}

renderCodeList();