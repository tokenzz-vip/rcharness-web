# RcHarness 官网

RcHarness 的官方网站，介绍首次使用向导、蓝牙遥控器的按住说话、按键映射、应用 Harness、常用语与组合动作，提供真实软件截图、使用指南和软硬件推荐。

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

内容及产品截图对应 RcHarness v1.0.1（2026-11-17 发布）。截图来自 RcHarness 官方仓库 `docs/images`，覆盖按键映射、Harness、快速切换、连接与语音、常用语页面；以上五张截图已于 2026-11-17 同步同级 RcHarness 工作副本的最新图片，应用与方案示例已更新为 ChatGPT。截图中的连接状态与统计是演示状态。2026-11-18 已清理下线功能的展示文案，并将历史按键映射图片与社交分享图中的界面替换为当前版本；深色映射图由同级 RcHarness 工作副本的本地构建导出。

设计方向与核对记录见 [页面优化记录](docs/design-review.md)。设计检查采用 [unslop](https://heydamir.design/unslop)，作者为 [Damir Sokolovsky（@heydamir）](https://x.com/heydamir)，CC BY 4.0。

首次使用向导的介绍位于首页「开始使用」、产品界面标签与 FAQ，以及使用指南的「首次使用向导」章节。欢迎、遥控器连接和语音试用的深浅色 WebP 图片由同级 RcHarness 本地构建的 `--render-settings` 模式导出；文案依据 `docs/behavior.md` 与向导实现核对。图片使用模拟状态，实际首次使用仍需授权、配对并确认语音转文字结果。
