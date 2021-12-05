import './lite-yt-embed';
import './svgxuse.min';

var $services = document.querySelector('.services__block');

$services.addEventListener('click', function (e) {
  if (e.target.closest('.services__header')) {
    e.target.closest('.services__item').classList.toggle('services__item--active')
  }
})

var $teamTabs = document.querySelector('.team__tabs');
var $contentTabs = document.querySelector('.team__content');

$teamTabs.addEventListener('click', function (e) {
  e.preventDefault();
  var tabs = $teamTabs.children;
  var content = $contentTabs.children;
  if (e.target.closest('.team__tab')) {
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('team__tab--active')
      content[i].classList.remove('team__item--active')
    }
    e.target.closest('.team__tab').classList.toggle('team__tab--active')
    content[+e.target.closest('.team__tab').getAttribute('data-tab')-1].classList.add('team__item--active')
    
  }
})
