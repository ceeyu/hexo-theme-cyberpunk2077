# Hexo Theme Cyberpunk2077

> 🎮 A Cyberpunk 2077 style theme for Hexo with stunning neon effects, glitch animations, and futuristic design.

<img width="1024" height="825" alt="image" src="https://github.com/user-attachments/assets/3f826373-fff4-43b7-9e34-7c2e89384bd9" />


[English](#english) | [繁體中文](#繁體中文)

---

## English

### ✨ Features

- 🌃 **Cyberpunk 2077 Style** - Neon colors, glitch effects, scanlines
- ⚡ **GSAP Animations** - Smooth, professional animations
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Customizable** - Easy to configure colors and effects
- 🚀 **Performance Optimized** - Lazy loading, minimal dependencies
- 💻 **Code Highlighting** - Prism.js with Tomorrow Night theme
- 🔤 **Beautiful Typography** - LXGW WenKai TC for Chinese, Inter for English

### 📸 Screenshots

| Home Page | Article Page |
|-----------|--------------|
| <img width="2552" height="978" alt="image" src="https://github.com/user-attachments/assets/e6b5d67a-83c7-4b11-b091-c036a13332c0" /> |<img width="1458" height="1193" alt="image" src="https://github.com/user-attachments/assets/70bac38e-ee9d-4314-bdad-3fb601671a75" />|

### 🚀 Installation

#### Method 1: Git Clone

```bash
cd your-hexo-site
git clone https://github.com/ceeyu/hexo-theme-cyberpunk2077.git themes/cyberpunk2077
```

#### Method 2: npm

```bash
npm install hexo-theme-cyberpunk2077
```

### ⚙️ Configuration

1. Edit your site's `_config.yml`:

```yaml
theme: cyberpunk2077
```

2. Copy theme config to your site root (optional):

```bash
cp themes/cyberpunk2077/_config.yml _config.cyberpunk2077.yml
```

### 🎨 Theme Configuration

Edit `themes/cyberpunk2077/_config.yml` or `_config.cyberpunk2077.yml`:

```yaml
# Navigation Menu
menu:
  Home: /
  Archives: /archives
  About: /about

# Social Links
social:
  GitHub: https://github.com/yourusername
  Twitter: https://twitter.com/yourusername

# Performance
performance:
  lazyload: true
  minify: true
  preload: true

# Code Highlighting
highlight:
  theme: tomorrow-night
  line_number: true

# Post Settings
post:
  show_updated: true
  show_word_count: true
  show_reading_time: true
```

### 🎭 Customization

#### Change Neon Colors

Edit `source/css/cyberpunk2077.css`:

```css
:root {
  --neon-cyan: #00f0ff;
  --neon-pink: #ff2a6d;
  --neon-yellow: #fcee0a;
  --neon-purple: #9d4edd;
}
```

#### Disable Animations

Set in theme config:

```yaml
animations:
  enable: false
```

### 📝 Creating Content

#### New Post

```bash
hexo new post "My Cyberpunk Article"
```

#### New Page

```bash
hexo new page "about"
```

### 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

MIT License - see [LICENSE](LICENSE) file

### 🙏 Credits

- [GSAP](https://greensock.com/gsap/) - Animation library
- [Prism.js](https://prismjs.com/) - Code highlighting
- [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) - Chinese font
- Inspired by Cyberpunk 2077 by CD Projekt Red

---

## 繁體中文

### ✨ 特色功能

- 🌃 **賽博龐克 2077 風格** - 霓虹燈色彩、故障效果、掃描線
- ⚡ **GSAP 動畫** - 流暢專業的動畫效果
- 📱 **完全響應式** - 支援所有裝置
- 🎨 **高度可自訂** - 輕鬆配置顏色和效果
- 🚀 **效能優化** - 延遲載入、最小依賴
- 💻 **程式碼高亮** - Prism.js Tomorrow Night 主題
- 🔤 **優美字體** - 霞鶩文楷中文字體、Inter 英文字體

### 🚀 安裝方式

#### 方法一：Git Clone

```bash
cd your-hexo-site
git clone https://github.com/ceeyu/hexo-theme-cyberpunk2077.git themes/cyberpunk2077
```

#### 方法二：npm

```bash
npm install hexo-theme-cyberpunk2077
```

### ⚙️ 設定

1. 編輯網站的 `_config.yml`：

```yaml
theme: cyberpunk2077
```

2. 複製主題設定到網站根目錄（選用）：

```bash
cp themes/cyberpunk2077/_config.yml _config.cyberpunk2077.yml
```

### 🎨 主題設定

編輯 `themes/cyberpunk2077/_config.yml` 或 `_config.cyberpunk2077.yml`：

```yaml
# 導航選單
menu:
  首頁: /
  文章總覽: /archives
  關於: /about

# 社交連結
social:
  GitHub: https://github.com/yourusername

# 效能優化
performance:
  lazyload: true
  minify: true
  preload: true
```

### 📄 授權

MIT License - 詳見 [LICENSE](LICENSE) 文件

---

**Made with 💜 by [ceeyu](https://github.com/ceeyu)**
