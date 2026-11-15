(() => {
  'use strict';

  const root = document.documentElement;
  const assetBase = new URL('assets/', document.currentScript.src);
  const productAssets = {
    mapping: 'latest/key-mapping.png',
    harness: 'latest/harness.png',
    switcher: 'latest/harness-switcher.png',
    connection: 'latest/connection-voice.png',
    phrases: 'latest/phrases.png',
  };
  const themeButton = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('rcharness-theme'); } catch { /* Storage may be unavailable. */ }
  function syncProductImages() {
    const suffix = root.dataset.theme === 'dark' ? '-dark' : '';
    document.querySelectorAll('img[data-product-screen]').forEach(img => {
      const screen = img.dataset.productScreen;
      const source = new URL(productAssets[screen] || `${screen}${suffix}.webp?v=20261110-site`, assetBase).href;
      if (img.getAttribute('src') !== source) img.src = source;
    });
  }
  function setTheme(theme) {
    root.dataset.theme = theme;
    const label = theme === 'dark' ? '切换到浅色模式' : '切换到深色模式';
    themeButton?.setAttribute('aria-label', label);
    themeButton?.setAttribute('title', label);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#141415' : '#fafafa');
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
  const contactMenus = document.querySelectorAll('.contact-menu');
  function closeContact(except) {
    contactMenus.forEach(menu => { if (menu !== except) menu.open = false; });
  }
  contactMenus.forEach(menu => menu.addEventListener('toggle', () => { if (menu.open) closeContact(menu); }));
  document.addEventListener('click', event => {
    contactMenus.forEach(menu => { if (!menu.contains(event.target)) menu.open = false; });
  });
  document.addEventListener('focusin', event => {
    contactMenus.forEach(menu => { if (!menu.contains(event.target)) menu.open = false; });
  });
  function closeMenu() {
    closeContact();
    if (!mobileNav || !menuButton) return;
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '展开导航');
  }
  menuButton?.addEventListener('click', () => {
    closeContact();
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '收起导航' : '展开导航');
  });
  mobileNav?.querySelectorAll(':scope > a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openContact = [...contactMenus].find(menu => menu.open);
    if (openContact) {
      closeContact();
      openContact.querySelector('summary').focus();
      return;
    }
    const menuWasOpen = menuButton?.getAttribute('aria-expanded') === 'true';
    closeMenu();
    if (menuWasOpen) menuButton.focus();
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', closeMenu);

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
    voice: { icon: '⌁', title: '按住语音键', description: 'RcHarness 传递声音，语音输入工具负责识别' },
    ok: { icon: '↵', title: '方向键与确认键', description: '导航并确认操作，也可配置快捷键或常用语' },
    custom: { icon: '⌘', title: '自定义按键动作', description: '绑定截图、快捷键、组合动作或「唤出常用语」' },
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

  // Geometry follows PhrasesPage.swift; content follows DefaultPhrases.swift.
  const phrases = {
  "continue": {
    "zh": "请继续完成剩余任务，完成后告诉我结果。",
    "en": "Please continue with the remaining tasks and let me know the results when you are done."
  },
  "explain": {
    "zh": "请用通俗的语言解释这部分的作用、实现思路和关键取舍，必要时给一个简单例子。",
    "en": "Please explain what this does, how it works, and the key tradeoffs in plain language. Include a simple example if helpful."
  },
  "confirm": {
    "zh": "好的，按这个方案执行。完成后说明结果和需要我处理的事项。",
    "en": "Sounds good. Please proceed with this plan, then report the results and anything that needs my attention."
  },
  "fix": {
    "zh": "请修复这个问题，尽量缩小改动范围，保留现有功能，并验证修复结果。",
    "en": "Please fix this issue with a focused change, preserve existing functionality, and verify the result."
  },
  "verify": {
    "zh": "请检查实现是否符合需求，运行相关测试和构建，并说明通过情况及尚未验证的部分。",
    "en": "Please verify that the implementation meets the requirements, run the relevant tests and build, and report what passed and what remains unverified."
  }
};
  let selectedPhrase = 'continue';
  let phraseLanguage = 'zh';
  const phraseButtons = [...document.querySelectorAll('[data-phrase]')];
  const languageButtons = [...document.querySelectorAll('[data-phrase-language]')];
  function updatePhraseDemo() {
    const output = document.getElementById('phrase-output');
    if (!output) return;
    phraseButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.phrase === selectedPhrase)));
    languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.phraseLanguage === phraseLanguage)));
    output.lang = phraseLanguage === 'en' ? 'en' : 'zh-CN';
    output.textContent = phrases[selectedPhrase][phraseLanguage];
  }
  function selectPhrase(button) {
    selectedPhrase = button.dataset.phrase;
    updatePhraseDemo();
  }
  phraseButtons.forEach(button => {
    button.addEventListener('click', () => selectPhrase(button));
    button.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectPhrase(button);
        return;
      }
      const directions = { ArrowUp: 'continue', ArrowDown: 'verify', ArrowLeft: 'explain', ArrowRight: 'fix', Home: 'confirm' };
      const next = phraseButtons.find(item => item.dataset.phrase === directions[event.key]);
      if (next) {
        event.preventDefault();
        next.focus();
        selectPhrase(next);
      }
    });
  });
  languageButtons.forEach(button => button.addEventListener('click', () => {
    phraseLanguage = button.dataset.phraseLanguage;
    updatePhraseDemo();
  }));

  const screens = {
    mapping: { title: '按键映射', caption: '按当前遥控器配置单击、双击与长按，并管理全局按键', alt: '遥控器实物图、按键连线、三种手势与全局按键' },
    harness: { title: '应用 Harness', caption: '管理内置与自定义应用，绑定方案并查看运行状态', alt: 'Codex、Claude、Cursor、DeepSeek、WorkBuddy 与 OpenCode 的方案绑定和启用状态' },
    connection: { title: '连接与语音', caption: '检查按键与语音连接，调整增益并管理虚拟麦克风组件', alt: '遥控器连接、电量、接收设备、增益、测试音与虚拟麦克风组件' },
    phrases: { title: '常用语', caption: '分配五向按键，编辑排序常用语库与两组内容', alt: '五向按键分配、常用语列表和内容 1、内容 2 编辑器' },
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
    screenshot.closest('.showcase-image-stage').dataset.compact = String(Boolean(screen.compact));
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
