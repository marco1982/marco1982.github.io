// 调整字体大小
function adjustFontSize(element, minFontSize, maxFontSize) {
    // 隐藏的元素，不做任何处理
    if (isElementHidden(element)) {
        return;
    }

    let fontSize = maxFontSize;
    let textWidth;

    // 创建一个临时的span元素来测量文本宽度
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'nowrap';
    span.style.fontFamily = window.getComputedStyle(element).fontFamily;
    span.style.fontWeight = window.getComputedStyle(element).fontWeight;
    document.body.appendChild(span);

    // 迭代调整字体大小直到文本适合容器
    while (true) {
        span.style.fontSize = `${fontSize}px`;
        span.textContent = element.textContent;
        textWidth = span.offsetWidth;
        if (textWidth <= element.offsetWidth || fontSize === minFontSize) {
            break;
        }
        fontSize -= 1; // 每次减小1px，可以根据需要调整步长
    }

    // 应用最终的字体大小
    element.style.fontSize = `${fontSize}px`;

    // 移除临时的span元素
    document.body.removeChild(span);
}

// 获取字体最小大小
function getAdjustMinFontSize(className) {
    let fontSize = 9999;
    document.querySelectorAll('.' + className).forEach(paragraph => {
        // 隐藏的元素，不做任何处理
        if (isElementHidden(paragraph)) {
            return;
        }
        let currentFontSize = parseInt(paragraph.style.fontSize);
        fontSize = Math.min(fontSize, currentFontSize);
    });
    return fontSize;
}

// 设置指定的字体大小
function setElementFontSize(className, fontSize) {
    document.querySelectorAll('.' + className).forEach(paragraph => {
        paragraph.style.fontSize = `${fontSize}px`;
    });
}

// 动态调整字体大小
function dynamicallyAdjustFontSize(className, minFontSize, maxFontSize) {
    // 动态调整字体大小
    document.querySelectorAll('.' + className).forEach(paragraph => {
        adjustFontSize(paragraph, minFontSize, maxFontSize);
    });
    // 计算出最小字体后，重新设置字体大小
    let counts_p_min_font_size = getAdjustMinFontSize(className);
    setElementFontSize(className, counts_p_min_font_size);
}

// 检查element元素是否被隐藏
function isElementHidden(el) {
    // 获取元素的当前计算样式
    const style = window.getComputedStyle(el);

    // 检查元素自身的 display 属性是否为 none
    if (style.display === 'none') {
        return true;
    }

    // 检查元素自身的 visibility 属性是否为 hidden
    if (style.visibility === 'hidden') {
        return true;
    }

    // 检查元素的父级元素
    const parent = el.parentElement;
    if (parent) {
        // 递归检查父级元素
        return isElementHidden(parent);
    }

    // 如果没有找到任何隐藏条件，则元素是可见的
    return false;
}

// 根据className追加文本
function appendTextByClass(className, appendText) {
    const elements = document.querySelectorAll('.' + className);
    elements.forEach(function (element) {
        // 防止重复追加
        if (element.textContent.includes(appendText)) {
            return;
        }
        element.textContent = element.textContent + appendText;
    });
}

// 监听[公司实力]-start
const config = {characterData: true, subtree: true, childList: true};
const elements = document.querySelectorAll('.purecounter');
const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
        let oldText;
        let newText;
        if (mutation.type === 'characterData') {
            oldText = mutation.oldValue;
            newText = mutation.target.nodeValue;
        } else if (mutation.type === 'childList') {
            // 新文本节点添加
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    newText = node.nodeValue;
                }
            });
            // 文本节点移除
            mutation.removedNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    oldText = node.nodeValue;
                }
            });
        }
        if (oldText !== newText) {
            if (!newText.includes("+") && parseInt(newText) === 20000) {
                appendTextByClass("purecounter", "+");
            }
        }
    }
}
elements.forEach(element => {
    // 隐藏的元素，不做任何处理
    if (isElementHidden(element)) {
        return;
    }
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);
    // 开始观察
    observer.observe(element, config);
    // 停止观察
    // observer.disconnect();
});
// 监听[公司实力]-end
