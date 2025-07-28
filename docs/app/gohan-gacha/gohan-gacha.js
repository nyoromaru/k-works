// スムーススクロール機能
function scrollToDownload() {
    document.getElementById('download').scrollIntoView({
        behavior: 'smooth'
    });
}

// ダウンロードボタンクリック時の処理
function downloadApp() {
    // 現在は準備中のため、Coming Soonページへリダイレクト
    showComingSoon();
}

// Coming Soon表示機能
function showComingSoon() {
    alert('現在準備中です。もうしばらくお待ちください！\nアプリのリリースをお楽しみに！');
}

// スクロール時のアニメーション
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // アニメーション対象の要素を監視
    const targets = document.querySelectorAll('.intro-item, .feature-card, .testimonial-card, .safety-item, .screenshot-item, .use-case-item');
    targets.forEach(target => {
        observer.observe(target);
    });
}

// ガチャボールのクリックアニメーション
function setupGachaBallAnimation() {
    const gachaBall = document.querySelector('.gacha-ball');
    if (gachaBall) {
        gachaBall.addEventListener('click', () => {
            gachaBall.style.animation = 'none';
            setTimeout(() => {
                gachaBall.style.animation = 'bounce 2s ease-in-out infinite, spin 0.5s ease-in-out';
            }, 10);
            
            // スパークルエフェクトを追加
            createSparkleEffect(gachaBall);
        });
    }
}

// スパークルエフェクト生成
function createSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '🌟', '💫'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
            sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
            sparkle.style.fontSize = '2rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, i * 100);
    }
}

// パララックス効果
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// カウントアップアニメーション
function setupCountUp() {
    const countElements = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.count);
                let current = 0;
                const increment = target / 100;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    element.textContent = Math.floor(current);
                }, 20);
                
                observer.unobserve(element);
            }
        });
    });
    
    countElements.forEach(element => {
        observer.observe(element);
    });
}

// ボタンのホバーエフェクト強化
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-download');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', (e) => {
            // クリック時のリップルエフェクト
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ローディングアニメーション
function setupLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // ヒーローセクションのアニメーション開始
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-visual, .hero-cta');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 200);
        });
    });
}

// スクロール進捗バー
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// レスポンシブメニュー（将来の拡張用）
function setupResponsiveMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// フォームバリデーション（将来の拡張用）
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // バリデーションロジック
            showComingSoon();
        });
    });
}

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    setupGachaBallAnimation();
    setupParallax();
    setupCountUp();
    enhanceButtonEffects();
    setupLoadingAnimation();
    setupScrollProgress();
    setupResponsiveMenu();
    setupFormValidation();
    
    // CSS アニメーションクラスを追加
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0.5);
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            animation: rippleEffect 0.6s ease-out;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(45deg, #ff6b35, #ffd700);
            z-index: 9999;
            transition: width 0.1s ease;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        body.loaded .hero-content > * {
            opacity: 0;
        }
        
        body.loaded .animate-in {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// パフォーマンス最適化
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
}

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('エラーが発生しました:', e.error);
    // 本番環境では適切なエラー報告サービスに送信
});

// 初期化
document.addEventListener('DOMContentLoaded', optimizeImages);