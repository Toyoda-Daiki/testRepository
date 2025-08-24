'use strict';

// ナビゲーションのスムーズスクロール
/*   document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const offset = 50;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const scrollPosition = elementPosition - offset;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    });
  }); */

// ナビリンクだけを対象にする
  document.querySelectorAll('header nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const offset = 50;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const scrollPosition = elementPosition - offset;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    });
  });





  // メニューリンククリックで閉じる
  document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });



// タイピングライター風アニメーション
  async function typing({ target, speed, word }) {
    for (const obj of word) {
      const text = Object.keys(obj)[0]; // 表示する最終文字列
      const sequences = Object.values(obj)[0]; // タイピング過程の配列
      
      const span = document.createElement('span');
      target.appendChild(span);

      for (const seq of sequences) {
        for (let i = 0; i < seq.length; i++) {
          span.textContent += seq[i] === "\n" ? "\n" : seq[i];
          await wait(speed);
        }
        span.textContent = seq.join("").replace("\n", "\n");
        await wait(speed);
      }
    }
    // 全文表示後にカーソルを削除
    target.style.borderRight = "none";
  }

  // 待機用の関数
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 表示文字列定義
  const obj1 = { "Welcome ": [["W","e","l","c","o","m","e"," "]] };
  const obj2 = { "To ": [["T","o"," "]] };
  const obj3 = { "\nMy ": [["\n","M","y"," "]] };
  const obj4 = { "Portfolio ": [["P","o","r","t","f","o","l","i","o"," "]] };
  const obj5 = { "Website": [["W","e","b","s","i","t","e"]] };

  const typingString = [obj1, obj2, obj3, obj4, obj5];

  // ページ読み込み時に自動スタート
  window.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.innerWidth <= 768;
    const typingStringFiltered = typingString.filter(obj => !(isMobile && obj === obj2));

    typing({
      target: document.getElementById("typing_text"),
      speed: 100,
      word: typingStringFiltered
    });
  });



// Intersection Observer でセクション表示制御
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, { threshold: 0.02 });

  sections.forEach(section => observer.observe(section));


// Intersection Observerでフェードイン制御
  document.addEventListener("DOMContentLoaded", () => {
    const options = {
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("schoolSec1")) {
            entry.target.classList.add("animate-left");
          } else if (entry.target.classList.contains("schoolSec2")) {
            entry.target.classList.add("animate-right");
          }
          obs.unobserve(entry.target); // 一度アニメーションしたら監視を解除
        }
      });
    }, options);

    document.querySelectorAll(".fade-element").forEach(el => {
      observer.observe(el);
    });
  });

  // Intersection Observerでフェードイン制御
  document.addEventListener("DOMContentLoaded", () => {
    const options = {
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("PersonalSec1")) {
            entry.target.classList.add("animate-left");
          } else if (entry.target.classList.contains("PersonalSec2")) {
            entry.target.classList.add("animate-right");
          }
          obs.unobserve(entry.target); // 一度アニメーションしたら監視を解除
        }
      });
    }, options);

    document.querySelectorAll(".fade-element").forEach(el => {
      observer.observe(el);
    });
  });



// About タイムラインの表示アニメーション
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => timelineObserver.observe(item));


// トップへ戻るボタン制御
  const backToTop = document.getElementById("backToTop");
  const footer = document.querySelector("footer");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (footerRect.top < windowHeight) {
      const overlap = windowHeight - footerRect.top;
      backToTop.style.bottom = `${30 + overlap}px`;
    } else {
      backToTop.style.bottom = "30px";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });