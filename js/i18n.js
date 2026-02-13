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
            title: "01. 工作經歷",
            job1: {
                title: "DevOps 工程師",
                company: "國家資通安全研究院 (NICS)",
                date: "2023 - 現在",
                a1: "於 AWS 上開發雲端惡意電郵陷阱。",
                a2: "將現有惡意電郵檢測系統遷移至 AWS。",
                a3: "維運既有 22 間機關地端惡意電郵檢測系統。",
                a4: "協助撰寫管理會議報告。"
            },
            job2: {
                title: "系統開發工程師",
                company: "國家資通安全會報技術服務中心 (NCCST)",
                date: "2021 - 2023",
                a1: "開發新版惡意電郵檢測系統。",
                a2: "佈署惡意電郵檢測系統至 4 間政府機關。",
                a3: "協助分析惡意電郵來源。",
                a4: "協助撰寫管理會議報告。"
            }
        },
        education: {
            title: "02. 學歷",
            school1: {
                name: "某某大學",
                degree: "資訊工程碩士"
            },
            school2: {
                name: "某某大學",
                degree: "軟體工程學士"
            }
        },
        certifications: {
            title: "03. 證照",
            cert1: {
                name: "AWS Solutions Architect Associate",
                issuer: "Amazon Web Services"
            },
            cert2: {
                name: "AWS Developer Associate",
                issuer: "Amazon Web Services"
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
            frameworks: "框架與工具",
            interests: "興趣",
            interest1: "加密貨幣",
            interest2: "傳統武術"
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
            title: "01. Experience",
            job1: {
                title: "DevOps Engineer",
                company: "National Institute of Cyber Security (NICS)",
                date: "2023 - Present",
                a1: "Developed cloud-based malicious email traps on AWS.",
                a2: "Migrated existing malicious email detection systems to AWS.",
                a3: "Maintained on-premises malicious email detection systems for 22 agencies.",
                a4: "Assisted in drafting management meeting reports."
            },
            job2: {
                title: "System Development Engineer",
                company: "National Center for Cyber Security Technology (NCCST)",
                date: "2021 - 2023",
                a1: "Developed a new version of the malicious email detection system.",
                a2: "Deployed the malicious email detection system to 4 government agencies.",
                a3: "Assisted in analyzing sources of malicious emails.",
                a4: "Assisted in drafting management meeting reports."
            }
        },
        education: {
            title: "02. Education",
            school1: {
                name: "University Name",
                degree: "Master of Computer Science"
            },
            school2: {
                name: "University Name",
                degree: "Bachelor of Software Engineering"
            }
        },
        certifications: {
            title: "03. Certifications",
            cert1: {
                name: "AWS Solutions Architect Associate",
                issuer: "Amazon Web Services"
            },
            cert2: {
                name: "AWS Developer Associate",
                issuer: "Amazon Web Services"
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
            frameworks: "Frameworks & Tools",
            interests: "Interests",
            interest1: "Cryptocurrency",
            interest2: "Traditional Martial Arts"
        },
        blog: {
            title: "06. Blog",
            intro: "Sharing tech insights, learning notes, and development experiences.",
            readMore: "Read more →",
            viewAll: "View all posts →",
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
