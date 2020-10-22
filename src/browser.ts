import { extendHTMLELEMENT } from './types/index';

export default class Browser {
    // 回滚到头部
    scrollToTop(): void {
        const scrollDis: number = document.documentElement.scrollTop || document.body.scrollTop
        if(scrollDis > 0) {
            window.requestAnimationFrame(this.scrollToTop)
            window.scrollTo(0, scrollDis - scrollDis/8);
        }
    }
    /**
     * 为元素添加兼容事件
     * @param element 需要绑定事件的HTML元素节点
     * @param eventName 需要绑定的事件类型
     * @param fn 绑定事件的回调函数
     */
    addEventHandler(element: extendHTMLELEMENT, eventName: string, fn: EventListenerOrEventListenerObject): void {
        if (element.addEventListener) {
            element.addEventListener(eventName, fn, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, fn);
        } else {
            element['on' + eventName] = fn;
        }
    }
    /**
     * 
     * @param element 需要解绑事件的HTML元素节点
     * @param eventName 需要解绑的事件
     * @param fn  需要解绑的回调函数
     * 
     */
    removeEventHandler(element: extendHTMLELEMENT, eventName: string, fn: EventListenerOrEventListenerObject): boolean {
        if (element.eventList.includes(eventName)) {
            element.removeEventListener && element.removeEventListener(eventName, fn);
            element.detachEvent && element.detachEvent(eventName, fn);
            element[eventName] && (element[eventName] = null);
            return true;
        }
        return false;
    }
    /**
     * 
     * @param Str 需要检查的字符串
     * @param checkText 需要匹配的子字符串
     */
    startWithString(Str: string, checkText: string): boolean {
        return Str.startsWith(checkText);
    }
    /**
     * 转移html元素
     * @param text 
     */
    escapeHtmlCode(text: string): string {
        return text.replace(/&/gi, "&").replace(/\"/g, "").replace(/</g, "<").replace(/>/g, ">");
    }
    /**
     * 从cookie中获取字段值
     * @param name 获取的字段值
     */
    getCookie(name: string): any {
        const arr = document.cookie.match(new RegExp("(^|)" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    }
    /**
     * 
     * @param name 需要设置的cookiename
     * @param value 需要设置的cookieValue
     * @param Hours 需要设置的过期距今多少小时
     * @param domain 域名，可选
     */
    setCookie(name:string, value:string, Hours: number, domain?: string): Boolean {
        const now = new Date();
        const offset = 8;
        const utc = now.getTime() + now.getTimezoneOffset() * 6000;
        const nd = utc + 3600000 * offset;
        const exp = new Date(nd);
        exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toUTCString() + ';domain=' + (domain || window.location.host)
        return true;
    }
    getViewHeight(): number {
        const root = document.body || document.documentElement;
        return root.clientHeight;
    }
    getViewWidth(): number {
        const root = document.body || document.documentElement;
        return root.clientWidth;
    }
    isAndroidDevice(): boolean {
        return /android/i.test(navigator.userAgent.toLowerCase());
    }
    isAppleDevice(): boolean {
        return /iphone|ipad|ipod|Macintosh/i.test(navigator.userAgent.toLowerCase());
    }
    isMobileUserAgent(): boolean {
        return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(navigator.userAgent.toLowerCase());
    }
}