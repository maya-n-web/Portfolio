window.submitted = false;

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('g-form');

  if (form) {
    form.addEventListener('submit', () => {
      window.submitted = true;
    });
  }
});

window.submitted = false;

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('g-form');
  const storageKey = 'contact_form_data'; // 保存用の名前

  if (form) {
    // --- 1. ページ読み込み時：保存されたデータを復元 ---
    const savedData = JSON.parse(localStorage.getItem(storageKey));
    if (savedData) {
      Object.keys(savedData).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) input.value = savedData[key];
      });
    }

    // --- 2. 入力時：LocalStorageにリアルタイム保存 ---
    form.addEventListener('input', () => {
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      localStorage.setItem(storageKey, JSON.stringify(data));
    });

    // --- 3. 送信時：フラグを立てる ---
    form.addEventListener('submit', () => {
      window.submitted = true;
    });
  }
});

// --- 4. 送信完了後：保存データを削除 ---
// HTML側のiframeのonloadから呼ばれる仕組みを利用
window.clearFormStorage = function () {
  localStorage.removeItem('contact_form_data');
};