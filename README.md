# RcHarness 官网

RcHarness 的官方网站，介绍蓝牙遥控器的按住说话、按键映射、应用 Harness、常用语与组合动作，提供真实软件截图、使用指南和软硬件推荐。

[访问官网](https://rcharness.tokenzz.vip) · [RcHarness 发布页](https://github.com/tokenzz-vip/RcHarness/releases)

使用原生 HTML、CSS 与 JavaScript，无生产依赖。

```sh
# 本地预览
python3 -m http.server 4173 --bind 127.0.0.1

# 将公开文件整理到 _site，供 GitHub Pages 发布
python3 scripts/build.py
```

内容及产品截图对应 RcHarness v0.2.0（1067cae，2026-11-10）。截图由软件的 `--render-settings` 模式导出，深浅色各自提供 WebP 素材。该模式使用临时配置，截图中的连接状态与统计是演示状态。

设计方向与核对记录见 [页面优化记录](docs/design-review.md)。设计检查采用 [unslop](https://heydamir.design/unslop)，作者为 [Damir Sokolovsky（@heydamir）](https://x.com/heydamir)，CC BY 4.0。
