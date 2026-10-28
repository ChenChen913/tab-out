/* Tab Out — hero（时钟 / 日期 / 自动昼夜 / 搜索） */
(function () {
  'use strict';
  if (location.search.indexOf('reload-ext') >= 0) { chrome.runtime.reload(); return; }
  var root = document.documentElement;
  var clockEl = document.getElementById('clock');
  var dateEl = document.getElementById('heroDate');
  var WD = ['日', '一', '二', '三', '四', '五', '六'];

  function pad(n) { return String(n).padStart(2, '0'); }

  function applyTheme(d) {
    var h = d.getHours();
    var theme = (h >= 6 && h < 20) ? 'light' : 'dark';
    if (root.getAttribute('data-theme') !== theme) root.setAttribute('data-theme', theme);
  }

  function render() {
    var d = new Date();
    if (clockEl) clockEl.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
    if (dateEl) dateEl.innerHTML = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 <b>星期' + WD[d.getDay()] + '</b>';
    applyTheme(d);
  }

  render();
  setInterval(render, 1000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) render(); });

  // 搜索框
  var form = document.getElementById('searchForm');
  var input = document.getElementById('searchInput');
  if (!form || !input) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value.trim();
    if (!v) return;
    var looksLikeUrl = /^(https?:\/\/)|^(www\.)|^[^\s]+\.[a-z]{2,}([\/?#]|$)/i.test(v);
    if (looksLikeUrl) {
      window.location.href = /^https?:\/\//i.test(v) ? v : 'https://' + v;
    } else {
      window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(v);
    }
  });

  // "/" 快速聚焦搜索框
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault();

    }
  });

})();
