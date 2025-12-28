/**
 * Cyberpunk 2077 風格 - 絲滑動畫系統
 * 參考 Cyberpunk 2077 Logo 動畫實現
 * 使用 GSAP Timeline 實現高效能動畫
 */

(function() {
  'use strict';

  // 等待 DOM 和 GSAP 載入
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // 確保 GSAP 已載入
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded');
      return;
    }

    // 註冊 ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 初始化所有模組
    initLoader();
    initParticles();
    initCursorGlow();
    initCardAnimations();
    initPostAnimations();
    initScrollEffects();
  }

  /**
   * 載入動畫
   */
  function initLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;

    const progress = loader.querySelector('.loader-progress');
    const percent = loader.querySelector('.loader-percent');
    
    let currentProgress = 0;
    const targetProgress = 100;
    
    // 模擬載入進度
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= targetProgress) {
        currentProgress = targetProgress;
        clearInterval(interval);
        
        // 完成後隱藏 loader
        setTimeout(() => {
          gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
              loader.classList.add('loaded');
              // 觸發頁面動畫
              animatePageIn();
            }
          });
        }, 300);
      }
      
      if (progress) progress.style.width = currentProgress + '%';
      if (percent) percent.textContent = Math.round(currentProgress) + '%';
    }, 50);
  }

  /**
   * 頁面進入動畫
   */
  function animatePageIn() {
    const hero = document.querySelector('.hero-section');
    if (hero) {
      gsap.set(hero, { opacity: 1 });
    }

    // 創建主時間軸
    const masterTimeline = gsap.timeline();
    
    // 添加 Cyberpunk Logo 動畫
    masterTimeline.add(createLogoAnimation());
    
    // 側邊裝飾
    masterTimeline.to('.side-decor', { 
      opacity: 1, 
      duration: 0.8,
      ease: 'power2.out'
    }, '-=1');
  }

  /**
   * Cyberpunk 2077 風格 Logo 動畫 - 核心動畫
   */
  function createLogoAnimation() {
    const tl = gsap.timeline();
    
    const logoMain = document.querySelector('.logo-main');
    const logoCyan = document.querySelector('.logo-cyan');
    const logoPink = document.querySelector('.logo-pink');
    const logoSub = document.querySelector('.logo-sub');
    const subBg = document.querySelector('.sub-bg');
    const subText = document.querySelector('.sub-text');
    
    if (!logoMain) return tl;

    // 確保所有元素初始可見
    gsap.set([logoMain, logoCyan], { opacity: 1, visibility: 'visible' });
    if (logoSub) {
      gsap.set(logoSub, { opacity: 1, visibility: 'visible' });
    }
    if (subText) {
      gsap.set(subText, { opacity: 1, visibility: 'visible' });
    }

    // ===== 主標題動畫 =====
    // 1. Skew 扭曲效果
    tl.from(logoMain, {
      skewX: -30,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      clearProps: 'opacity'  // 動畫完成後清除 opacity
    });

    // 2. Glitch 閃爍
    if (logoPink) {
      tl.to(logoPink, { opacity: 0.7, x: -5, duration: 0.05 })
        .to(logoPink, { opacity: 0, x: 0, duration: 0.05 })
        .to(logoPink, { opacity: 0.5, x: 3, duration: 0.04 })
        .to(logoPink, { opacity: 0, x: 0, duration: 0.05 });
    }

    // 3. 抖動效果
    tl.to(logoMain, { x: 3, duration: 0.02 })
      .to(logoMain, { x: -2, duration: 0.02 })
      .to(logoMain, { x: 0, duration: 0.03 });

    // ===== 副標題動畫 =====
    // 背景展開
    if (subBg) {
      tl.to(subBg, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.1');
    }

    // 副標題文字淡入（從下方滑入）
    if (subText) {
      tl.from(subText, {
        y: 15,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        clearProps: 'all'  // 動畫完成後清除所有 inline styles
      }, '-=0.3');
    }

    // ===== 裝飾和統計 =====
    tl.to('.decor-line', {
      scaleX: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.1');

    tl.to('.hero-desc', {
      opacity: 1,
      y: 0,
      duration: 0.4
    }, '-=0.1');

    // 統計數據動畫
    const statItems = document.querySelectorAll('.stat-item');
    const statDividers = document.querySelectorAll('.stat-divider');
    
    if (statItems.length) {
      tl.from(statItems, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.2');
    }
    
    if (statDividers.length) {
      tl.from(statDividers, {
        scaleY: 0,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.3');
    }

    // 數字計數動畫
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      gsap.to(el, {
        textContent: target,
        duration: 1.5,
        ease: 'power2.out',
        snap: { textContent: 1 },
        delay: 0.8
      });
    });

    // 啟動 Glitch 循環
    if (logoCyan && logoPink) {
      tl.call(() => startGlitchLoop(logoCyan, logoPink, logoMain), null, '+=0.5');
    }

    return tl;
  }

  /**
   * 持續的 Glitch 效果循環
   */
  function startGlitchLoop(logoCyan, logoPink, logoMain) {
    if (!logoCyan || !logoPink) return;

    function triggerGlitch() {
      if (Math.random() > 0.6) {
        const glitchTL = gsap.timeline();
        const glitchType = Math.floor(Math.random() * 3);
        
        switch(glitchType) {
          case 0: // Skew 扭曲
            if (logoMain) {
              glitchTL.to(logoMain, {
                skewX: -8 + (Math.random() - 0.5) * 20,
                duration: 0.03
              })
              .to(logoMain, {
                skewX: -8,
                duration: 0.04
              });
            }
            break;
            
          case 1: // 粉色層閃爍
            glitchTL.to(logoPink, {
              opacity: 0.6,
              x: (Math.random() - 0.5) * 10,
              duration: 0.04
            })
            .to(logoPink, {
              opacity: 0,
              x: 0,
              duration: 0.05
            });
            break;
            
          case 2: // 位移抖動
            glitchTL.to(logoCyan, {
              x: (Math.random() - 0.5) * 6,
              duration: 0.03
            })
            .to(logoCyan, {
              x: 0,
              duration: 0.04
            });
            break;
        }
      }
      
      gsap.delayedCall(Math.random() * 3 + 2, triggerGlitch);
    }
    
    triggerGlitch();
  }

  /**
   * 粒子背景
   */
  function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouseX = 0, mouseY = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '0, 240, 255' : '255, 42, 109';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.02;
          this.x -= dx * force;
          this.y -= dy * force;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  }

  /**
   * 滑鼠光暈效果
   */
  function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    gsap.ticker.add(() => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      gsap.set(glow, { x: currentX, y: currentY });
    });
  }

  /**
   * 卡片動畫
   */
  function initCardAnimations() {
    const section = document.querySelector('.series-section');
    const cards = document.querySelectorAll('.series-card');
    
    if (!section || !cards.length) return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to(section, {
        opacity: 1,
        duration: 0.01,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.from(cards, {
              y: 60,
              opacity: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
              clearProps: 'all'  // 動畫完成後清除所有 inline styles
            });
          }
        }
      });
    } else {
      gsap.set(section, { opacity: 1 });
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 1.5,
        clearProps: 'all'  // 動畫完成後清除所有 inline styles
      });
    }

    // 卡片 hover 3D 效果（動畫完成後才啟用）
    setTimeout(() => {
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 25;
          const rotateY = (centerX - x) / 25;
          
          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            clearProps: 'transform'
          });
        });
      });
    }, 2500);  // 等入場動畫完成後才啟用
  }

  /**
   * 文章列表動畫
   */
  function initPostAnimations() {
    const section = document.querySelector('.recent-section');
    const posts = document.querySelectorAll('.post-item');
    
    if (!section || !posts.length) return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to(section, {
        opacity: 1,
        duration: 0.01,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(posts, {
              x: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out'
            });
          }
        }
      });
    } else {
      gsap.set(section, { opacity: 1 });
      gsap.to(posts, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 2
      });
    }
  }

  /**
   * 滾動效果
   */
  function initScrollEffects() {
    if (typeof ScrollTrigger === 'undefined') return;

    gsap.to('.cyber-grid', {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });
  }

  // 暴露給全局
  window.CyberpunkUI = {
    init: init
  };

})();
