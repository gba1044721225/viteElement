import mitt, { EventHandlerMap } from 'mitt'
type ArgType = any

type Emits<EventType extends string | symbol, T> = {
    on(type: EventType, handler: (arg: T) => void): void
    off(type: EventType, handler: (arg: T) => void): void
    emit(type: EventType, arg: T): void
    all: EventHandlerMap<any>
}

type Emitter = Emits<string, ArgType>

const emitter: Emitter = mitt<Emitter>()
// console.log(emitter)
export default emitter
