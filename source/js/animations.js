/**
 * 輕量級動畫系統
 * 零依賴，高性能
 */

(function() {
  'use strict';

  // ===== 滾動動畫觀察器 =====
  class ScrollAnimator {
    constructor(options = {}) {
      this.options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        animateClass: 'is-visible',
        ...options
      };
      
      this.observer = null;
      this.init();
    }

    init() {
      // 檢查瀏覽器支持
      if (!('IntersectionObserver' in window)) {
        // 降級處理：直接顯示所有元素
        this.fallback();
        return;
      }

      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          threshold: this.options.threshold,
          rootMargin: this.options.rootMargin
        }
      );

      this.observe();
    }

    observe() {
      const elements = document.querySelectorAll('.scroll-animate, .card-animate');
      elements.forEach(el => this.observer.observe(el));
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(this.options.animateClass);
          // 動畫完成後停止觀察（性能優化）
          this.observer.unobserve(entry.target);
        }
      });
    }

    fallback() {
      const elements = document.querySelectorAll('.scroll-animate, .card-animate');
      elements.forEach(el => el.classList.add(this.options.animateClass));
    }
  }

  // ===== 閱讀進度條 =====
  class ReadingProgress {
    constructor() {
      this.progressBar = null;
      this.init();
    }

    init() {
      // 創建進度條
      this.progressBar = document.createElement('div');
      this.progressBar.className = 'progress-bar';
      document.body.appendChild(this.progressBar);

      // 監聽滾動
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.update();
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    update() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = scrollTop / (documentHeight - windowHeight);
      
      this.progressBar.style.transform = `scaleX(${progress})`;
    }
  }

  // ===== 視差效果 =====
  class ParallaxEffect {
    constructor() {
      this.elements = [];
      this.init();
    }

    init() {
      this.elements = Array.from(document.querySelectorAll('.parallax'));
      
      if (this.elements.length === 0) return;

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.update();
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    update() {
      const scrollY = window.pageYOffset;
      
      this.elements.forEach(el => {
        const speed = el.dataset.parallaxSpeed || 0.5;
        const yPos = -(scrollY * speed);
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    }
  }

  // ===== 平滑滾動到錨點 =====
  function smoothScrollToAnchor() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ===== 卡片懸停效果 =====
  function initCardHoverEffects() {
    const cards = document.querySelectorAll('.post, .archive-post');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
    });
  }

  // ===== 打字機效果 =====
  class TypeWriter {
    constructor(element, options = {}) {
      this.element = element;
      this.text = element.textContent;
      this.options = {
        speed: 50,
        delay: 0,
        ...options
      };
      this.index = 0;
    }

    start() {
      this.element.textContent = '';
      this.element.style.borderRight = '2px solid';
      this.element.style.animation = 'blink 0.7s step-end infinite';
      
      setTimeout(() => {
        this.type();
      }, this.options.delay);
    }

    type() {
      if (this.index < this.text.length) {
        this.element.textContent += this.text.charAt(this.index);
        this.index++;
        setTimeout(() => this.type(), this.options.speed);
      } else {
        this.element.style.borderRight = 'none';
        this.element.style.animation = 'none';
      }
    }
  }

  // ===== 數字計數動畫 =====
  function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // ===== 淡入淡出切換 =====
  function fadeToggle(element, duration = 300) {
    if (element.style.opacity === '0' || !element.style.opacity) {
      fadeIn(element, duration);
    } else {
      fadeOut(element, duration);
    }
  }

  function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      element.style.opacity = Math.min(progress / duration, 1);
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }

  function fadeOut(element, duration = 300) {
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      element.style.opacity = Math.max(1 - progress / duration, 0);
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    }
    requestAnimationFrame(animate);
  }

  // ===== 初始化所有動畫 =====
  function init() {
    // 檢查用戶是否偏好減少動畫
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      console.log('用戶偏好減少動畫，跳過動畫初始化');
      return;
    }

    // 初始化滾動動畫觀察器
    const scrollAnimator = new ScrollAnimator();

    // 標記 JS 已啟用，啟用動畫
    document.documentElement.classList.add('js-enabled');

    // 立即觸發已在視窗內的元素動畫
    setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-animate, .card-animate');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible');
        }
      });
    }, 50);

    // 初始化閱讀進度條（僅在文章頁）
    if (document.querySelector('.post-content')) {
      new ReadingProgress();
    }

    // 初始化視差效果
    new ParallaxEffect();

    // 初始化平滑滾動
    smoothScrollToAnchor();

    // 初始化卡片懸停效果
    initCardHoverEffects();
  }

  // ===== 導出到全局 =====
  window.AnimationUtils = {
    ScrollAnimator,
    ReadingProgress,
    ParallaxEffect,
    TypeWriter,
    animateNumber,
    fadeToggle,
    fadeIn,
    fadeOut
  };

  // ===== DOM 載入完成後初始化 =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
