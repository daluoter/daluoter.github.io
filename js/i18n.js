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
            title: "開發工程師 & 技術愛好者",
            tagline: "以程式碼構建未來，一行一行創造可能。",
            resumeBtn: "下載履歷",
            contactBtn: "聯絡我"
        },
        about: {
            title: "01. 關於我",
            p1: "具 4 年以上雲端與軟體系統開發經驗，專注於 AWS 架構設計、系統自動化與安全監控。",
            p2: "擅長將既有系統遷移上雲並優化維運流程。"
        },
        experience: {
            title: "01. 工作經歷",
            job1: {
                title: "雲端開發工程師",
                company: "國家資通安全研究院 (NICS)",
                date: "2023 - 現在",
                a1: "於 AWS 上開發雲端惡意電郵陷阱。",
                a2: "將現有惡意電郵檢測系統遷移至 AWS。",
                a3: "維運既有 22 間機關地端惡意電郵檢測系統。",
                a4: "協助撰寫管理會議報告。"
            },
            job2: {
                title: "資安軟體工程師",
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
                year: "2018 - 2020",
                name: "國立台灣科技大學",
                degree: "電機工程系 碩士"
            },
            school2: {
                year: "2014 - 2018",
                name: "大同大學",
                degree: "電機工程系"
            }
        },
        certifications: {
            title: "03. 證照",
            cert1: {
                year: "2026 - 2029",
                name: "AWS Solutions Architect Associate",
                issuer: "Amazon Web Services"
            },
            cert2: {
                year: "2023 - 2026",
                name: "EC-Council Certified Ethical Hacker",
                issuer: "EC-Council"
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
            },
            post2: {
                title: "WSL 缺少 AES CPU Flag 導致 SIGILL：從 Google Antigravity 崩潰到 BIOS 設定的完整排查",
                excerpt: "記錄在 WSL 環境下因 BIOS 關閉 AES-NI 導致程式觸發 SIGILL 的排查過程。"
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
            credit: "由 黄英豪 (Oliver Huang) 設計與開發"
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
            p1: "Over 4 years of experience in cloud and software system development, specializing in AWS architecture design, system automation, and security monitoring.",
            p2: "Skilled in migrating existing systems to the cloud and optimizing operations workflows."
        },
        experience: {
            title: "01. Experience",
            job1: {
                title: "Cloud Development Engineer",
                company: "National Institute of Cyber Security (NICS)",
                date: "2023 - Present",
                a1: "Developed cloud-based malicious email traps on AWS.",
                a2: "Migrated existing malicious email detection systems to AWS.",
                a3: "Maintained on-premises malicious email detection systems for 22 agencies.",
                a4: "Assisted in drafting management meeting reports."
            },
            job2: {
                title: "Cybersecurity Software Engineer",
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
                year: "2018 - 2020",
                name: "National Taiwan University of Science and Technology",
                degree: "M.S. in Electrical Engineering"
            },
            school2: {
                year: "2014 - 2018",
                name: "Tatung University",
                degree: "Department of Electrical Engineering"
            }
        },
        certifications: {
            title: "03. Certifications",
            cert1: {
                year: "2026 - 2029",
                name: "AWS Solutions Architect Associate",
                issuer: "Amazon Web Services"
            },
            cert2: {
                year: "2023 - 2026",
                name: "EC-Council Certified Ethical Hacker",
                issuer: "EC-Council"
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
            },
            post2: {
                title: "WSL Missing AES CPU Flag Causes SIGILL: From Google Antigravity Crash to BIOS Settings Full Troubleshooting",
                excerpt: "Troubleshooting a SIGILL crash caused by AES-NI being disabled in BIOS on WSL."
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
            credit: "Designed & Built by Ying Hao Huang (Oliver)"
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
