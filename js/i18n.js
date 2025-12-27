// i18n.js - Internationalization Support

const translations = {
    zh: {
        nav: {
            logo: "作品集",
            home: "首頁",
            about: "關於我",
            experience: "經歷",
            projects: "作品",
            skills: "技能",
            blog: "文章",
            contact: "聯絡"
        },
        hero: {
            greeting: "你好，我是",
            title: "個人開發者 & 技術愛好者",
            tagline: "以程式碼構建未來，一行一行創造可能。",
            resumeBtn: "下載履歷",
            contactBtn: "聯絡我"
        },
        about: {
            title: "01. 關於我",
            p1: "這是一個關於我的簡介段落。我是誰、我擅長什麼、我正在尋找什麼樣的機會。",
            p2: "我熱愛探索新技術，並致力於打造高效能、高互動性的網頁應用。"
        },
        experience: {
            title: "02. 工作經歷",
            job1: {
                title: "資深開發者",
                company: "科技公司 A",
                date: "2023 - 現在",
                a1: "帶領前端團隊重構核心產品，效能提升 30%。",
                a2: "引入 CI/CD 流程，部署時間縮短 50%。",
                a3: "指導初階工程師，提升團隊整體代碼品質。"
            },
            job2: {
                title: "網頁開發者",
                company: "創意公司 B",
                date: "2021 - 2023",
                a1: "開發超過 10 個響應式網站，客戶滿意度 100%。",
                a2: "優化 SEO 策略，有機流量增長 20%。"
            }
        },
        education: {
            title: "03. 學歷",
            school1: {
                name: "某某大學",
                degree: "資訊工程碩士"
            },
            school2: {
                name: "某某大學",
                degree: "軟體工程學士"
            }
        },
        projects: {
            title: "04. 作品集",
            mediaPlaceholder: "預覽媒體",
            project1: {
                name: "專案名稱 A",
                desc: "一句話介紹這個專案解決了什麼問題。"
            },
            project2: {
                name: "專案名稱 B",
                desc: "一句話介紹這個專案的功能。"
            }
        },
        skills: {
            title: "05. 技能",
            languages: "程式語言",
            frameworks: "框架與工具"
        },
        blog: {
            title: "06. 技術文章",
            intro: "分享技術心得、學習筆記與開發經驗。",
            readMore: "閱讀更多 →",
            viewAll: "查看所有文章 →",
            moreComing: "更多文章即將推出...",
            post1: {
                title: "Hello World - 我的第一篇文章",
                excerpt: "歡迎來到我的技術 Blog！這是第一篇測試文章。"
            }
        },
        contact: {
            title: "07. 聯絡我",
            intro: "我目前正在尋找新的機會。無論您有任何問題或只是想打聲招呼，我都會盡快回覆您！",
            findMe: "找到我",
            or: "或",
            sendMessage: "傳送訊息",
            form: {
                name: "姓名",
                email: "電子郵件",
                message: "訊息",
                submit: "發送訊息"
            }
        },
        footer: {
            credit: "由 Your Name 設計與開發"
        }
    },
    en: {
        nav: {
            logo: "PORTFOLIO",
            home: "Home",
            about: "About",
            experience: "Experience",
            projects: "Projects",
            skills: "Skills",
            blog: "Blog",
            contact: "Contact"
        },
        hero: {
            greeting: "Hello, I'm",
            title: "Developer & Tech Enthusiast",
            tagline: "Building the future of the web, one pixel at a time.",
            resumeBtn: "Download Resume",
            contactBtn: "Contact Me"
        },
        about: {
            title: "01. About Me",
            p1: "This is a brief introduction about me. Who I am, what I'm good at, and what opportunities I'm looking for.",
            p2: "I love exploring new technologies and am dedicated to building high-performance, interactive web applications."
        },
        experience: {
            title: "02. Experience",
            job1: {
                title: "Senior Developer",
                company: "Tech Company A",
                date: "2023 - Present",
                a1: "Led frontend team to refactor core product, improving performance by 30%.",
                a2: "Introduced CI/CD pipeline, reducing deployment time by 50%.",
                a3: "Mentored junior engineers, enhancing overall team code quality."
            },
            job2: {
                title: "Web Developer",
                company: "Creative Agency B",
                date: "2021 - 2023",
                a1: "Developed over 10 responsive websites with 100% client satisfaction.",
                a2: "Optimized SEO strategies, increasing organic traffic by 20%."
            }
        },
        education: {
            title: "03. Education",
            school1: {
                name: "University Name",
                degree: "Master of Computer Science"
            },
            school2: {
                name: "University Name",
                degree: "Bachelor of Software Engineering"
            }
        },
        projects: {
            title: "04. Projects",
            mediaPlaceholder: "Preview Media",
            project1: {
                name: "Project Name A",
                desc: "A one-liner describing the problem this project solves."
            },
            project2: {
                name: "Project Name B",
                desc: "A one-liner describing the features of this project."
            }
        },
        skills: {
            title: "05. Skills",
            languages: "Languages",
            frameworks: "Frameworks & Tools"
        },
        blog: {
            title: "06. Blog",
            intro: "Sharing tech insights, learning notes, and development experiences.",
            readMore: "Read more \u2192",
            viewAll: "View all posts \u2192",
            moreComing: "More posts coming soon...",
            post1: {
                title: "Hello World - My First Post",
                excerpt: "Welcome to my tech blog! This is the first test post."
            }
        },
        contact: {
            title: "07. Contact",
            intro: "I am currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
            findMe: "Find Me",
            or: "or",
            sendMessage: "Send Message",
            form: {
                name: "Name",
                email: "Email",
                message: "Message",
                submit: "Send Message"
            }
        },
        footer: {
            credit: "Designed & Built by Your Name"
        }
    }
};

// Get nested value from object using dot notation
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Apply translations to elements
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getNestedValue(translations[lang], key);
        if (translation) {
            el.textContent = translation;
        }
    });

    // Handle placeholders separately
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translation = getNestedValue(translations[lang], key);
        if (translation) {
            el.placeholder = translation;
        }
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
}

// Initialize i18n
function initI18n() {
    // Check localStorage for saved preference, default to 'zh'
    let currentLang = localStorage.getItem('lang') || 'zh';

    const langSelect = document.getElementById('langSelect');

    // Set dropdown to current language
    if (langSelect) {
        langSelect.value = currentLang;
    }

    // Apply initial translations
    applyTranslations(currentLang);

    // Dropdown change event
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('lang', currentLang);
            applyTranslations(currentLang);
        });
    }
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', initI18n);
