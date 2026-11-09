# RcHarness 官网

官网域名：<https://rcharness.tokenzz.vip>

原生 HTML、CSS 与 JavaScript 静态站点，无 npm 依赖。功能文案与截图于 2026-11-09 对照本机安装的 `vip.tokenzz.rcharness`（0.1.0）及 RcHarness 源码更新。品牌资产来自 RcHarness，产品截图通过应用的 `--render-settings` 模式导出，使用临时演示配置，未包含日常配置。首页与推荐页参考 sayall.app 的布局思路。

## 本地预览

```sh
python3 scripts/build.py
python3 -m http.server 4173 --bind 127.0.0.1 --directory _site
```

打开 <http://127.0.0.1:4173>。`_site` 为临时发布目录，源码在根目录；修改源码后重新运行构建脚本。

## 发布

现有 GitHub Pages 工作流在 `main` 分支推送时运行，使用 `scripts/build.py` 仅打包公开文件，部署 `_site`。`CNAME`、canonical、Open Graph 与 sitemap 均使用 `rcharness.tokenzz.vip`。域名的 DNS 与仓库 Pages 设置仍需由实际托管环境配置；仓库文件本身不会修改 DNS。

## 内容与交互

- 响应式首页、移动导航、深浅色切换（本地保存偏好）。
- 遥控器功能演示，八个产品页面的截图标签页与放大预览：按键映射、应用 Harness、键位方案、组合动作、常用语、连接与语音、设置、使用统计。支持键盘切换，截图随网站深浅色外观同步。
- Harness 运行列表展示，以及按遥控器分别保存方案、全局按键和应用绑定的使用说明。
- FAQ、下载状态弹窗，以及 `guide.html` 本地构建与配置指南。
- `recommendations/` 推荐页面：三款遥控器、三款语音输入软件，以及全部／硬件／软件筛选；无 JavaScript 时仍可查看全部推荐。
- 下载入口暂时指向 <https://github.com/tokenzz-vip/RcHarness/releases>；版本可用性、签名与公证状态以 GitHub Releases 页面为准。
- 无分析脚本、外部字体或第三方运行时请求。

## 更新下载入口

下载地址位于 `index.html` 的下载弹窗内；如发布地址或分发方式变化，请同步更新首页状态、FAQ 与指南开头。当前所有「获取 Mac 版」按钮共享同一弹窗。

应用 Logo 位于 `assets/app-logos/`，通过 macOS `NSWorkspace` 从本机安装的对应应用图标导出为透明 WebP，与 RcHarness 的 Harness 列表保持一致：Codex（`com.openai.codex`）、Claude（`com.anthropic.claudefordesktop`）、Cursor（`com.todesktop.230313mzl4w4u92`）、DeepSeek Harness（`com.deepseek.dsh`）、WorkBuddy（`com.tencent.workbuddy.mac`）。这些应用标识属于各自品牌。

样式令牌统一位于 `styles.css` 的 `tokens` 层。交互位于 `app.js`；新增截图时更新 `screens` 映射和首页标签按钮。

## 更新产品截图

使用当前安装的应用导出两种外观；此模式不监听硬件、不修改日常偏好设置，完成后会自动退出：

```sh
/Applications/RcHarness.app/Contents/MacOS/RcHarness --render-settings /tmp/rcharness-web-light
/Applications/RcHarness.app/Contents/MacOS/RcHarness --render-settings /tmp/rcharness-web-dark --dark
```

将导出的 `mapping`、`harness`、`profiles`、`macros`、`phrases`、`connection`、`about`、`statistics`、`harness-switcher` PNG 等比缩小至最大边 1600 px，再转换为 WebP（当前质量 88）。浅色文件保存为 `assets/<名称>.webp`，深色文件保存为 `assets/<名称>-dark.webp`。`about` 对应 App 的「设置」页。首页含 `data-product-screen` 的图片由 `app.js` 统一切换外观，新增页面时同步更新截图尺寸、替代文本和页面说明。更新图片或脚本后须同步更换资源的缓存查询参数。

推荐页样式与筛选交互位于 `recommendations/styles.css` 和 `recommendations/app.js`。谷歌 Chromecast（G9N9N）图片来自 RcHarness 的 `assets/app/`；小米蓝牙遥控器 2 图片与 vokie 图标来自用户指定的 [SayAll 推荐页](https://sayall.app/recommendations/)，存于 `assets/recommendations/`，并已压缩为 WebP。产品名称和图标属于各自品牌，软件按钮直接链接各自官网。新增页面须同步维护构建脚本和 sitemap。
