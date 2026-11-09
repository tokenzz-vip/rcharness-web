(() => {
  'use strict';

  const filters = document.querySelector('.recommendation-filters');
  const layout = document.querySelector('.recommendation-layout');
  const groups = [...document.querySelectorAll('[data-category]')];
  const status = document.getElementById('recommendation-status');
  if (!filters || !layout || !status) return;

  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;

    const filter = button.dataset.filter;
    filters.querySelectorAll('button').forEach(item => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    layout.dataset.filter = filter;
    groups.forEach(group => { group.hidden = filter !== 'all' && group.dataset.category !== filter; });
    const count = groups.filter(group => !group.hidden).reduce((total, group) => total + group.querySelectorAll('article').length, 0);
    status.textContent = `显示${filter === 'all' ? '全部' : filter === 'hardware' ? '硬件' : '软件'}推荐，共 ${count} 项。`;
  });
})();
