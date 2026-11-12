# RcHarness 官网

RcHarness 的官方网站，介绍蓝牙遥控器的按住说话、按键映射、应用 Harness、常用语与组合动作，提供真实软件截图、使用指南和软硬件推荐。

[访问官网](https://rcharness.tokenzz.vip) · [RcHarness 最新发布页](https://github.com/tokenzz-vip/RcHarness/releases/latest)

使用原生 HTML、CSS 与 JavaScript，无生产依赖。下载入口统一指向 GitHub 的 `/releases/latest`，由 GitHub 自动跳转到最新版发布页，发布新版后无需修改官网链接。

首页、推荐页和使用指南的桌面导航在「常见问题」后提供「关注」入口，移动端在导航菜单内提供，可展开 Tokenzz 的抖音与小红书二维码，点击图片可保存。二维码素材由账号所有者提供。

```sh
# 本地预览（http://127.0.0.1:4173）
npm run dev

# 将公开文件整理到 _site，供 GitHub Pages 发布
npm run build
```

npm 脚本复用 Python 3，无需运行 `npm install`。也可直接执行 `python3 -m http.server 4173 --bind 127.0.0.1` 和 `python3 scripts/build.py`。

内容及产品截图对应 RcHarness v0.2.0（1067cae，2026-11-10）。截图由软件的 `--render-settings` 模式导出，深浅色各自提供 WebP 素材。该模式使用临时配置，截图中的连接状态与统计是演示状态。

设计方向与核对记录见 [页面优化记录](docs/design-review.md)。设计检查采用 [unslop](https://heydamir.design/unslop)，作者为 [Damir Sokolovsky（@heydamir）](https://x.com/heydamir)，CC BY 4.0。
