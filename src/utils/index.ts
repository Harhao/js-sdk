
interface extendHTMLELEMENT extends HTMLLIElement {
    [keyName: string]: any
}
export default class JSSDK {
    /**
     * 为元素添加兼容事件
     * @param element 需要绑定事件的HTML元素节点
     * @param eventName 需要绑定的事件类型
     * @param fn 绑定事件的回调函数
     */
    addEventHandler(element:extendHTMLELEMENT, eventName: string, fn: EventListenerOrEventListenerObject): void {
        if(element.addEventListener) {
           element.addEventListener(eventName, fn, false);
        }else if(element.attachEvent) {
            element.attachEvent('on'+ eventName, fn);
        }else {
            element['on'+ eventName] = fn;        
        }
    }
    /**
     * 
     * @param element 需要解绑事件的HTML元素节点
     * @param eventName 需要解绑的事件
     * @param fn  需要解绑的回调函数
     * 
     */
    removeEventHandler(element:extendHTMLELEMENT, eventName: string, fn: EventListenerOrEventListenerObject): boolean {
       if(element.eventList.includes(eventName)) {
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
    startWithString(Str:string, checkText: string): boolean {
        return Str.startsWith(checkText);
    }
}