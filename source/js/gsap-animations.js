/**
 * GSAP 動畫系統 - 現代化版本
 * 使用 GSAP + ScrollTrigger 實現專業級動畫效果
 */

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// ===== 配置 =====
const CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1
  },
  ease: {
    smooth: 'power3.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.5)'
  }
};

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
  // 檢查用戶是否偏好減少動畫
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.post').forEach(p => p.style.opacity = 1);
    return;
  }

  initPageTransition();
  initHeaderAnimation();
  initPostCardsAnimation();
  initScrollProgress();
  initFloatingElements();
  initMagneticButtons();
  initSmoothReveal();
  initParallaxBackground();
});

// ===== 頁面載入過渡 =====
function initPageTransition() {
  // 創建載入遮罩
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-spinner"></div>
    </div>
  `;
  loader.style.cssText = `
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  document.body.appendChild(loader);

  // 載入完成後移除
  window.addEventListener('load', () => {
    gsap.to(loader, {
      duration: 0.8,
      yPercent: -100,
      ease: 'power4.inOut',
      onComplete: () => loader.remove()
    });
  });
}

// ===== Header 動畫 =====
function initHeaderAnimation() {
  const header = document.querySelector('.site-header');
  const title = document.querySelector('.site-title');
  const navLinks = document.querySelectorAll('.site-nav a');

  if (!header) return;

  // 標題動畫
  gsap.from(title, {
    duration: CONFIG.duration.slow,
    y: -50,
    opacity: 0,
    ease: CONFIG.ease.bounce,
    delay: 0.5
  });

  // 導航連結依序出現
  gsap.from(navLinks, {
    duration: CONFIG.duration.normal,
    y: -30,
    opacity: 0,
    stagger: 0.1,
    ease: CONFIG.ease.smooth,
    delay: 0.7
  });

  // 滾動時 Header 效果
  let lastScroll = 0;
  
  ScrollTrigger.create({
    start: 'top top',
    end: 99999,
    onUpdate: (self) => {
      const scroll = self.scroll();
      
      if (scroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // 隱藏/顯示 Header
      if (scroll > lastScroll && scroll > 200) {
        gsap.to(header, { y: -100, duration: 0.3 });
      } else {
        gsap.to(header, { y: 0, duration: 0.3 });
      }
      
      lastScroll = scroll;
    }
  });
}

// ===== 文章卡片動畫 =====
function initPostCardsAnimation() {
  const posts = document.querySelectorAll('.post');
  
  posts.forEach((post, index) => {
    // 設置初始狀態
    gsap.set(post, { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
      rotateX: 10
    });

    // 滾動觸發動畫
    ScrollTrigger.create({
      trigger: post,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(post, {
          duration: 0.8,
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          ease: CONFIG.ease.smooth,
          delay: index % 3 * 0.1 // 錯開動畫
        });
      }
    });

    // 懸停效果
    post.addEventListener('mouseenter', () => {
      gsap.to(post, {
        duration: CONFIG.duration.fast,
        y: -8,
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
        ease: CONFIG.ease.smooth
      });
      
      // 標題顏色變化
      const title = post.querySelector('.post-title a');
      if (title) {
        gsap.to(title, {
          duration: CONFIG.duration.fast,
          color: '#6366f1'
        });
      }
    });

    post.addEventListener('mouseleave', () => {
      gsap.to(post, {
        duration: CONFIG.duration.fast,
        y: 0,
        scale: 1,
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        ease: CONFIG.ease.smooth
      });
      
      const title = post.querySelector('.post-title a');
      if (title) {
        gsap.to(title, {
          duration: CONFIG.duration.fast,
          color: '#1e293b'
        });
      }
    });
  });
}

// ===== 閱讀進度條 =====
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #06b6d4, #6366f1);
    background-size: 200% 100%;
    transform-origin: left;
    transform: scaleX(0);
    z-index: 9999;
    width: 100%;
    animation: gradientMove 2s linear infinite;
  `;
  document.body.appendChild(progressBar);

  // 添加漸層動畫
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
  `;
  document.head.appendChild(style);

  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}

// ===== 浮動元素效果 =====
function initFloatingElements() {
  // 為標籤添加浮動效果
  const tags = document.querySelectorAll('.post-tags a, .post-meta a');
  
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      gsap.to(tag, {
        duration: 0.2,
        y: -3,
        scale: 1.05,
        ease: 'power2.out'
      });
    });
    
    tag.addEventListener('mouseleave', () => {
      gsap.to(tag, {
        duration: 0.2,
        y: 0,
        scale: 1,
        ease: 'power2.out'
      });
    });
  });
}

// ===== 磁性按鈕效果 =====
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.read-more, .pagination a');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        duration: 0.3,
        x: x * 0.3,
        y: y * 0.3,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

// ===== 平滑顯示效果 =====
function initSmoothReveal() {
  // 文章內容段落動畫
  const paragraphs = document.querySelectorAll('.post-content p, .post-content h2, .post-content h3');
  
  paragraphs.forEach((p, i) => {
    gsap.set(p, { opacity: 0, y: 30 });
    
    ScrollTrigger.create({
      trigger: p,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(p, {
          duration: 0.6,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          delay: i * 0.05
        });
      }
    });
  });

  // 歸檔頁面動畫
  const archivePosts = document.querySelectorAll('.archive-post');
  
  archivePosts.forEach((post, index) => {
    gsap.set(post, { opacity: 0, x: -40 });
    
    ScrollTrigger.create({
      trigger: post,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(post, {
          duration: 0.5,
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          delay: index * 0.03
        });
      }
    });
  });
}

// ===== 視差背景 =====
function initParallaxBackground() {
  // 創建背景裝飾元素
  const bgDecor = document.createElement('div');
  bgDecor.className = 'bg-decoration';
  bgDecor.innerHTML = `
    <div class="bg-circle bg-circle-1"></div>
    <div class="bg-circle bg-circle-2"></div>
    <div class="bg-circle bg-circle-3"></div>
  `;
  bgDecor.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  document.body.appendChild(bgDecor);

  // 添加樣式
  const style = document.createElement('style');
  style.textContent = `
    .bg-circle {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.15;
    }
    .bg-circle-1 {
      width: 600px;
      height: 600px;
      background: #6366f1;
      top: -200px;
      right: -200px;
    }
    .bg-circle-2 {
      width: 400px;
      height: 400px;
      background: #06b6d4;
      bottom: 20%;
      left: -100px;
    }
    .bg-circle-3 {
      width: 300px;
      height: 300px;
      background: #8b5cf6;
      top: 50%;
      right: 10%;
    }
  `;
  document.head.appendChild(style);

  // 視差滾動
  const circles = document.querySelectorAll('.bg-circle');
  
  circles.forEach((circle, i) => {
    gsap.to(circle, {
      y: (i + 1) * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });
  });
}

// ===== 滑鼠跟隨效果 =====
function initCursorEffect() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #6366f1;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      duration: 0.1,
      x: e.clientX - 10,
      y: e.clientY - 10
    });
  });

  // 懸停在連結上時放大
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 2, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    });
  });
}

// ===== 數字計數動畫 =====
function animateNumbers() {
  const numbers = document.querySelectorAll('[data-count]');
  
  numbers.forEach(num => {
    const target = parseInt(num.dataset.count);
    
    ScrollTrigger.create({
      trigger: num,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(num, {
          duration: 2,
          innerHTML: target,
          snap: { innerHTML: 1 },
          ease: 'power2.out'
        });
      }
    });
  });
}

// ===== 工具函數 =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 視窗大小改變時重新計算
window.addEventListener('resize', debounce(() => {
  ScrollTrigger.refresh();
}, 250));
