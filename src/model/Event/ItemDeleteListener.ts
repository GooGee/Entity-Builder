import { EventEmitter } from 'events'
import StrictEventEmitter from 'strict-event-emitter-types'
import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'

enum EventEnum {
    BeforeFieldDelete = 'BeforeFieldDelete',
    AfterFieldDelete = 'AfterFieldDelete',
}

interface CallBack<T1, T2> {
    (sender: T1, item: T2): void
}

interface Event<T1, T2> {
    [EventEnum.BeforeFieldDelete]: CallBack<T1, T2>
    [EventEnum.AfterFieldDelete]: CallBack<T1, T2>
}

class ItemDeleteListener<T1, T2> {
    readonly ee: StrictEventEmitter<EventEmitter, Event<T1, T2>> = new EventEmitter()

    emitAfterFieldDelete(sender: T1, item: T2) {
        this.ee.emit(EventEnum.AfterFieldDelete, sender, item)
    }

    emitBeforeFieldDelete(sender: T1, item: T2) {
        this.ee.emit(EventEnum.BeforeFieldDelete, sender, item)
    }

    onAfterFieldDelete(callback: CallBack<T1, T2>) {
        this.ee.on(EventEnum.AfterFieldDelete, callback)
    }

    onBeforeFieldDelete(callback: CallBack<T1, T2>) {
        this.ee.on(EventEnum.BeforeFieldDelete, callback)
    }
}

const listener = new ItemDeleteListener<UniqueList<UniqueItem>, UniqueItem>()
listener.ee.setMaxListeners(111222333)

export default listener
