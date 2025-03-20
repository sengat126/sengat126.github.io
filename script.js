document.addEventListener('DOMContentLoaded', function() {
    // 轮播功能
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    // 初始化轮播
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        testimonials[index].classList.add('active');
    }
    
    // 下一个轮播
    function nextTestimonial() {
        currentIndex++;
        if (currentIndex >= testimonials.length) {
            currentIndex = 0;
        }
        showTestimonial(currentIndex);
    }
    
    // 上一个轮播
    function prevTestimonial() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = testimonials.length - 1;
        }
        showTestimonial(currentIndex);
    }
    
    // 添加点击事件
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
    }
    
    // 自动轮播
    setInterval(nextTestimonial, 5000);
    
    // 移动端菜单
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            
            // 切换图标
            const icon = this.querySelector('i');
            if (icon.classList.contains('bi-list')) {
                icon.classList.remove('bi-list');
                icon.classList.add('bi-x-lg');
            } else {
                icon.classList.remove('bi-x-lg');
                icon.classList.add('bi-list');
            }
        });
    }
    
    // 添加移动端菜单样式 (动态添加CSS)
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @media (max-width: 768px) {
            .nav-links.show {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: var(--white);
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                padding: 20px;
                z-index: 100;
            }
            
            .nav-links.show li {
                margin: 10px 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // 关闭移动端菜单
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                mobileMenuBtn.querySelector('i').classList.remove('bi-x-lg');
                mobileMenuBtn.querySelector('i').classList.add('bi-list');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 滚动时导航栏效果
    const mainNav = document.querySelector('.main-nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            mainNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            mainNav.style.padding = '10px 0';
        } else {
            mainNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            mainNav.style.padding = '15px 0';
        }
        
        lastScrollTop = scrollTop;
    });
}); 