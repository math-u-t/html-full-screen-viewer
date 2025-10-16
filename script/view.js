const urlParams = new URLSearchParams(window.location.search);
const codeName = urlParams.get('code');

if (!codeName) {
  alert('コード名が指定されていません');
  window.location.href = '../index.html';
}

document.getElementById('codeName').textContent = codeName;

function loadPreview() {
  const htmlCode = localStorage.getItem(`code_${codeName}_html`) || '';
  const cssCode = localStorage.getItem(`code_${codeName}_css`) || '';
  const jsCode = localStorage.getItem(`code_${codeName}_js`) || '';

  if (!htmlCode && !cssCode && !jsCode) {
    document.getElementById('errorMessage').classList.add('show');
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 2000);
    return;
  }

  const iframe = document.getElementById('preview-frame');
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
  <script>
${jsCode}
  <\/script>
</body>
</html>
      `;

  iframeDoc.open();
  iframeDoc.write(fullHtml);
  iframeDoc.close();
}

function reloadPreview() {
  loadPreview();
}

loadPreview();