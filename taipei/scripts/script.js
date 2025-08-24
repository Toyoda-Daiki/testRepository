'use strict';

// モーダル開く
const getModal = document.querySelectorAll('.modalBtn');
const modalArray = Array.from(getModal);

modalArray.forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modal;
    document.getElementById(modalId).classList.add('active');
    document.body.classList.add('modalOpen');
   });
});

// モーダル閉じる
document.querySelectorAll('.closeBtn').forEach(close => {
  close.addEventListener('click', () => {
    close.closest('.modalOverlay').classList.remove('active');
    document.body.classList.remove('modalOpen');
  });
});

// オーバーレイ（背景）クリックで閉じる
document.querySelectorAll('.modalOverlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.classList.remove('modalOpen');
    }
  });
});


// トップへ戻るボタン
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.querySelector('.backToTop');
  const footer = document.querySelector('footer');

  function handleBackToTopPosition() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const footerTop = footer.getBoundingClientRect().top + scrollY;
    const backToTopHeight = backToTop.offsetHeight;

    //フッターの上位置
    if (scrollY + windowHeight >= footerTop) {
      backToTop.classList.remove('fixed');
      backToTop.classList.add('stop');
    } else {
      backToTop.classList.remove('stop');
      backToTop.classList.add('fixed');
    }
  }

  window.addEventListener('scroll', handleBackToTopPosition);
  window.addEventListener('resize', handleBackToTopPosition);
  handleBackToTopPosition();
});

