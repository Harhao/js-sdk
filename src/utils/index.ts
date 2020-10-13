
interface extendHTMLELEMENT extends HTMLLIElement {
    [keyName: string]: any
}
export default class JSSDK {
    /**
     * 
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
    
}