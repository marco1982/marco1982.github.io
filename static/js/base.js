function changeLanguage(language) {
  $.ajax({
    type: 'PUT',
    url: '/api/language',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({'lan': language}),
    success: function(response) {
      if (language === 'cn') {
        if (!window.location.pathname.startsWith('/cn')) {
          window.location.href = '/cn' + window.location.pathname
        }
      } else {
        if (window.location.pathname.startsWith('/cn')) {
          window.location.href = window.location.pathname.replace(/\/cn\//, '/')
        }
      }
    }
  });
};

function closeLanguageAlert() {
  $('.language-alert').alert('close');
  $('.navbar-fixed-top').css('top', '0');
  $('.title-bar').css('margin-top', '0');
  window.localStorage.setItem('hideLanguageAlert', true);
};

function confirmLanguage() {
  if ($('#language-dropdown').text().trim() === 'English') {
    changeLanguage('en');
  } else {
    changeLanguage('cn');
  }
  closeLanguageAlert();
};

$(function() {
  if (window.localStorage.getItem('hideLanguageAlert')) {
    return false
  }

  var browserLanguage = navigator.language||navigator.userLanguage;
  browserLanguage = browserLanguage.substr(0, 2);
  var urlLanguage = 'en'
  if (window.location.pathname.startsWith('/cn')) {
    urlLanguage = 'zh'
  }
  if (browserLanguage !=  urlLanguage) {
    $('.language-alert').css('display', 'block');
    $('.navbar-fixed-top').css('top', '50px');
    $('.title-bar').css('margin-top', '50px');
  }

  if (browserLanguage === 'zh') {
    $('#language-dropdown').html('简体中文 <span class="caret"></span>');
    $('#language-label').text('请根据国家或地区选择语言。');
    $('.btn.continue').text('继续');
    $('.dropdown-menu .cn-li').addClass('disabled');
  } else {
    $('#language-dropdown').html('English <span class="caret"></span>');
    $('.dropdown-menu .en-li').addClass('disabled');
  }
});
