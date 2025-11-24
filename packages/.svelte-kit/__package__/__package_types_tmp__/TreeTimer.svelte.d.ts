import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        initialMinutes?: number;
        plantStages?: string[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TreeTimerProps = typeof __propDef.props;
export type TreeTimerEvents = typeof __propDef.events;
export type TreeTimerSlots = typeof __propDef.slots;
export default class TreeTimer extends SvelteComponent<TreeTimerProps, TreeTimerEvents, TreeTimerSlots> {
}
export {};
