export default class EventEmitter {
    private cbs: object;
    constructor() {
        this.cbs = {};
    }
    public on(eventName:string, cb: Function, isOnce: Boolean = false): void {
        !this.isContain(eventName) && (this.cbs[eventName] = {
            isOnce,
            events: []
        });
        !this.cbs[eventName]['events'].includes(cb) ? this.cbs[eventName]['events'].push(cb) : console.error('The Function has Already add');
    }
    public emit(eventName: string, ...args: Array<any>): void {
        if (eventName in this.cbs) {
            this.cbs[eventName]['events'].forEach( eventListener => {
                eventListener.call(null, ...args);
            })
            this.cbs[eventName]['isOnce'] && this.remove(eventName)
        }
    }
    public once(eventName:string, cb: Function): void {
        this.on(eventName, cb, true)
    }
    // 函数重载
    public remove(eventName:string): void
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
        return key in this.cbs;
    }
}