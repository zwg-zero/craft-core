/// <reference types="react" />
import { CoreEventHandlers, CreateHandlerOptions } from './CoreEventHandlers';
import { Indicator, NodeId, NodeTree } from '../interfaces';
declare type DraggedElement = NodeId | NodeTree;
/**
 * Specifies Editor-wide event handlers and connectors
 */
export declare class DefaultEventHandlers extends CoreEventHandlers {
    static draggedElementShadow: HTMLElement;
    static draggedElement: DraggedElement;
    static indicator: Indicator;
    currentSelectedElementIds: any[];
    handlers(): {
        connect: (el: HTMLElement, id: string) => () => void;
        select: (el: HTMLElement, id: string) => () => void;
        hover: (el: HTMLElement, id: string) => () => void;
        drop: (el: HTMLElement, targetId: string) => () => void;
        drag: (el: HTMLElement, id: string) => () => void;
        create: (el: HTMLElement, userElement: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any>) | (new (props: any) => import("react").Component<any, any, any>)>, options?: Partial<CreateHandlerOptions>) => () => void;
    };
    private dropElement;
}
export {};
