export default class EventEmitter {
    private cbs: object;
    constructor() {
        this.cbs = {};
    }
    /**
     * 
     * @param eventName 自定义的事件名
     * @param cb 自定义事件的回调函数
     * @return void
     */
    public on(eventName:string, cb: Function, isOnce: Boolean = false): void {
        !this.isContain(eventName) && (this.cbs[eventName] = {
            isOnce,
            events: []
        });
        !this.cbs[eventName]['events'].includes(cb) ? this.cbs[eventName]['events'].push(cb) : console.error('The Function has Already add');
    }
    /**
     * 
     * @param eventName 要触发的事件名字
     * @param args 可选，需要传入事件参数
     * @return void
     */
    public emit(eventName: string, ...args: Array<unknown>): void {
        if ( this.cbs.hasOwnProperty(eventName)) {
            this.cbs[eventName]['events'].forEach( eventListener => {
                eventListener.call(null, ...args);
            })
            this.cbs[eventName]['isOnce'] && this.remove(eventName)
        }
    }
    /**
     * 
     * @param eventName 需要绑定的事件名称
     * @param cb 事件需要绑定的事件回调
     * @return void
     */
    public once(eventName:string, cb: Function): void {
        this.on(eventName, cb, true)
    }
    /**
     * 
     * @param eventName 可选，需要移除的事件名称。如果缺省，删除所有的事件注册
     * @param cb 可选，需要移除的事件回调。如果缺省，删除该事件名下所有事件注册
     * @return void
     */
    public remove(eventName:string, cb?: Function): void {
        if (eventName && eventName in this.cbs) {
            if (!cb) {
                delete this.cbs[eventName];
            } else {
                const index = this.cbs[eventName]['events'].findIndex(eventListener => eventListener === cb);
                this.cbs[eventName]['events'].splice(index, 1);
            }
        } else if (!eventName) {
            this.cbs = {};
        }
    }
    private isContain(key:string): Boolean {
        return this.cbs.hasOwnProperty(key);
    }
}