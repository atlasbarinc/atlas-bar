import '@styles/sections/components/component-faq.scss'


// Drop down accordian --------------------------------------------- //
const acc = document.querySelectorAll('[data-faq-trigger]');
const accHD = document.querySelectorAll('.c-faq__item--title');
let i;

for (i = 0; i < acc.length; i++) {
  accHD[i].addEventListener('click', toggleItem, false);
}
function toggleItem() {
  console.log('clicked');
  let accClass = this.parentNode.className;
  for (i = 0; i < acc.length; i++) {
    acc[i].className = 'c-faq__item';
    acc[i].querySelector('.c-faq__item--title').classList.remove('c-faq__item--titleOpen');
    console.log(acc[i]);
  }

  if (accClass == 'c-faq__item') {
    console.log(this)
    this.parentNode.className = 'c-faq__item c-faq__open';
    this.classList.add('c-faq__item--titleOpen');
  }
}