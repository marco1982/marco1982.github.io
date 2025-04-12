let defaultLang = getBrowserLanguage();
let res;
//获取cookie中的语言
function getCookie(name) {
    let arr = document.cookie.split('; ');
    for (let i = 0; i < arr.length; i++) {
        let arr1 = arr[i].split('=');
        if (arr1[0] === name) {
            return arr1[1];
        }
    }
    return '';
}
//设置cooike
function setCookie(name, value, myDay) {
    let oDate = new Date();
    oDate.setDate(oDate.getDate() + myDay);
    document.cookie = name + '=' + value + '; expires=' + oDate;
}
//加载资源包数据
function getData() {
    if (res === null || res === undefined) {
        $.ajax({
            url: "assets/js/i18n1_" + defaultLang + ".json?v=" + new Date().getTime(),
            dataType: 'text',
            async: false,
            success: function (response) {
                res = JSON.parse(response);
            },
            error: function (response) {
                res = JSON.parse(response);
            }
        });
    }
    return res;
}
//获取加载的语言
if (getCookie('i18n_lang') !== "" && getCookie('i18n_lang') !== "undefined" && getCookie('i18n_lang') != null) {
    defaultLang = getCookie('i18n_lang');
}


let data = getData();
function render() {
    $("[data-i18n]").each(function (i) {
        let i18nText = data[$(this).data("i18n")];
        $(this).html(i18nText);
        $(this).attr('placeholder', i18nText);
        $(this).attr('title', i18nText);
        if ($(this).attr('type') === 'button') {
            $(this).attr('value', i18nText);
        }
    });
}


function getBrowserLanguage() {
    if (window.location.href.indexOf("jp.gudaoweb.com") != -1) {
        return 'jp';
    }
    let lang = navigator.language || navigator.userLanguage;
    lang = lang.substr(0, 2);
    console.log(lang);
    if (lang == 'zh') {
        return 'cn';
    } else if (lang == 'en') {
        return 'en';
    } else if (lang == 'ja') {
        return 'jp';
    } else {
        return 'cn';
    }
}

let obj = {
    text(key) {
        let data = getData();
        return data[key];
    },
    //设置语言。 cn:中文  en:英语
    setLanguage(language) {
        defaultLang = language;
        setCookie('i18n_lang', language);
        location.reload();
    },
    getLanguage() {
        return defaultLang;
    },
    render() {
        render();
    }
};
