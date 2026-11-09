(() => {
  'use strict';

  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('rcharness-theme'); } catch { /* Storage may be unavailable. */ }
  function syncProductImages() {
    const suffix = root.dataset.theme === 'dark' ? '-dark' : '';
    document.querySelectorAll('img[data-product-screen]').forEach(img => {
      const source = `assets/${img.dataset.productScreen}${suffix}.webp?v=current-ui`;
      if (img.getAttribute('src') !== source) img.src = source;
    });
  }
  function setTheme(theme) {
    root.dataset.theme = theme;
    const label = theme === 'dark' ? '切换到浅色模式' : '切换到深色模式';
    themeButton?.setAttribute('aria-label', label);
    themeButton?.setAttribute('title', label);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#161620' : '#ffffff');
    syncProductImages();
  }
  setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : systemTheme.matches ? 'dark' : 'light');
  themeButton?.addEventListener('click', () => {
    savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(savedTheme);
    try { localStorage.setItem('rcharness-theme', savedTheme); } catch { /* Theme still works without persistence. */ }
  });
  systemTheme.addEventListener('change', event => { if (!savedTheme) setTheme(event.matches ? 'dark' : 'light'); });

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  function closeMenu() {
    if (!mobileNav || !menuButton) return;
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '展开导航');
  }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '收起导航' : '展开导航');
  });
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  const downloadDialog = document.getElementById('download-dialog');
  document.querySelectorAll('[data-download]').forEach(button => button.addEventListener('click', () => downloadDialog?.showModal()));
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });

  const remoteContent = {
    voice: { icon: '⌁', title: '按住，说出你的想法', description: '松开即停，让表达自然发生。' },
    ok: { icon: '↵', title: '确认，就这么顺手', description: '方向键导航，OK 键确认。也能自定义为你的常用操作。' },
    custom: { icon: '⌘', title: '为你的习惯留一个键', description: '截图、快捷键或组合动作。常用操作，一按就到。' },
  };
  document.querySelectorAll('[data-remote]').forEach(button => button.addEventListener('click', () => {
    const name = button.dataset.remote;
    document.querySelectorAll('[data-remote]').forEach(item => {
      const selected = item.dataset.remote === name;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.getElementById('remote-tooltip-icon').textContent = remoteContent[name].icon;
    document.getElementById('remote-tooltip-title').textContent = remoteContent[name].title;
    document.getElementById('remote-tooltip-description').textContent = remoteContent[name].description;
  }));

  const screens = {
    mapping: { title: '按键映射', caption: '按键与遥控器一一对应，点选即可配置。', alt: '遥控器实物图、按键连线、单击双击长按动作，以及电源和语音全局按键' },
    harness: { title: '应用 Harness', caption: '为当前遥控器绑定应用方案，运行状态一目了然。', alt: 'Codex、Claude、Cursor、DeepSeek 与 WorkBuddy 的方案绑定、运行状态与启用开关' },
    profiles: { title: '键位方案', caption: '每款遥控器，各有一套顺手的方案。', alt: '当前遥控器的默认方案与应用方案，支持新建、复制和管理绑定' },
    macros: { title: '组合动作', caption: '把重复的步骤，变成一次按下。', alt: '按顺序编辑本机动作和步骤等待时间' },
    phrases: { title: '常用语', caption: '常用的表达，保存后就能绑定到按键。', alt: '从按键页进入的本地常用语管理，支持新建、编辑和复制' },
    connection: { title: '连接与语音', caption: '从连接状态，到语音输出，一目了然。', alt: '遥控器连接、麦克风组件、音频输出与增益设置' },
    about: { title: '设置', caption: '全局按键、权限与偏好，集中管理。', alt: '应用版本、全局按键、系统权限、配置导入导出与启动偏好' },
    statistics: { title: '使用统计', caption: '看见每一次操作，为工作流多一点了解。', alt: '本机按键次数、语音时长与最近七天统计' },
  };
  const tabs = [...document.querySelectorAll('[data-screen]')];
  const screenshot = document.getElementById('showcase-image');
  let currentScreen = 'mapping';
  function selectScreen(tab) {
    currentScreen = tab.dataset.screen;
    const screen = screens[currentScreen];
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    screenshot.dataset.productScreen = currentScreen;
    syncProductImages();
    screenshot.alt = `${screen.title}：${screen.alt}`;
    document.getElementById('showcase-panel').setAttribute('aria-labelledby', tab.id);
    document.getElementById('screen-window-title').textContent = screen.title;
    document.getElementById('screen-caption').textContent = screen.caption;
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectScreen(tab));
    tab.addEventListener('keydown', event => {
      let nextIndex;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      selectScreen(tabs[nextIndex]);
      tabs[nextIndex].focus();
    });
  });
  document.getElementById('expand-screenshot')?.addEventListener('click', () => {
    const expanded = document.getElementById('expanded-image');
    expanded.dataset.productScreen = currentScreen;
    syncProductImages();
    expanded.alt = screenshot.alt;
    document.getElementById('screenshot-dialog').showModal();
  });
})();
