// Fast Theme - 極速主題腳本
// 使用原生 JavaScript，零依賴

(function() {
  'use strict';

  // 圖片延遲加載
  function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // 降級方案：直接加載所有圖片
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
      });
    }
  }

  // 平滑滾動
  function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // 外部連結在新視窗打開
  function externalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
      if (!link.hostname.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // 代碼複製按鈕
  function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
      const pre = block.parentElement;
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = '複製';
      button.style.cssText = `
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 4px 8px;
        font-size: 12px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 3px;
        cursor: pointer;
      `;
      
      pre.style.position = 'relative';
      pre.appendChild(button);
      
      button.addEventListener('click', async () => {
        const code = block.textContent;
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = '已複製！';
          setTimeout(() => {
            button.textContent = '複製';
          }, 2000);
        } catch (err) {
          button.textContent = '複製失敗';
        }
      });
    });
  }

  // 閱讀進度條
  function readingProgress() {
    const article = document.querySelector('.post-content');
    if (!article) return;

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--primary-color, #0066cc);
      z-index: 9999;
      transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      progressBar.style.width = Math.min(progress, 100) + '%';
    });
  }

  // 返回頂部按鈕
  function backToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: var(--primary-color, #0066cc);
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 1000;
    `;
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        button.style.opacity = '1';
      } else {
        button.style.opacity = '0';
      }
    });

    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 初始化
  function init() {
    lazyLoadImages();
    smoothScroll();
    externalLinks();
    addCopyButtons();
    
    // 只在文章頁顯示
    if (document.querySelector('.post-content')) {
      readingProgress();
      backToTop();
    }
  }

  // DOM 載入完成後執行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
