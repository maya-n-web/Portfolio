// 1. iframeエラー対策（JSファイルの冒頭に配置）
var submitted = false;

$(function () {
  // 2. ハンバーガーメニューの開閉処理
  $('.toggle_btn').on('click', function () {
    // <body>に .open を付与（三本線の変形とマスク表示用）
    $('body').toggleClass('open');

    // .global_navに .is_open を付与（CSSの .global_nav.is_open に合わせる）
    $('.global_nav').toggleClass('is_open');
  });

  // 3. 背景（マスク）をクリックした時に閉じる
  $('#mask').on('click', function () {
    $('body').removeClass('open');
    $('.global_nav').removeClass('is_open');
  });

  // 4. リンクをクリックした時に閉じる（ページ内リンク対策）
  $('.nav_link').on('click', function () {
    $('body').removeClass('open');
    $('.global_nav').removeClass('is_open');
  });
});
///////////////////////////////////////////////////////////////////

function submitted_func() {
  // HTML側の onload="submitted_func()" と合わせる
  window.location = 'thanks.html'; // 飛ばしたい先のURL
}
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  {
    rootMargin: '0px 0px -10% 0px', // 画面下端から10%入ったところで発火（微調整用）
  },
);

document.querySelectorAll('.js-reveal').forEach((el) => observer.observe(el));

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
      Object.keys(savedData).forEach((key) => {
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
