import { EventEmitter } from 'events'
import StrictEventEmitter from 'strict-event-emitter-types'
import UniqueItem from '../Base/UniqueItem'

enum EventEnum {
    BeforeNameChange = 'BeforeNameChange',
    AfterNameChange = 'AfterNameChange',
}

interface CallBack<T> {
    (sender: T, name: string, old: string): void
}

interface Event<T> {
    [EventEnum.BeforeNameChange]: CallBack<T>
    [EventEnum.AfterNameChange]: CallBack<T>
}

class NameChangeListener<T> {
    readonly ee: StrictEventEmitter<EventEmitter, Event<T>> = new EventEmitter()

    emitAfterNameChange(sender: T, name: string, old: string) {
        this.ee.emit(EventEnum.AfterNameChange, sender, name, old)
    }

    emitBeforeNameChange(sender: T, name: string, old: string) {
        this.ee.emit(EventEnum.BeforeNameChange, sender, name, old)
    }

    onAfterNameChange(callback: CallBack<T>) {
        this.ee.on(EventEnum.AfterNameChange, callback)
    }

    onBeforeNameChange(callback: CallBack<T>) {
        this.ee.on(EventEnum.BeforeNameChange, callback)
    }
}

const listener = new NameChangeListener<UniqueItem>()
listener.ee.setMaxListeners(111222333)

export default listener
