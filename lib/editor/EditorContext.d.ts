/// <reference types="react" />
import { EditorStore } from './store';
export declare type EditorContext = EditorStore;
export declare const EditorContext: import("react").Context<import("@craftjs/utils").SubscriberAndCallbacksFor<{
    methods: (state: import("..").EditorState, query: {
        node: (id: string) => {
            isCanvas(): boolean;
            isRoot(): boolean;
            isLinkedNode(): boolean;
            isTopLevelNode(): any;
            isDeletable(): boolean;
            isParentOfTopLevelNodes: () => boolean;
            isParentOfTopLevelCanvas(): any;
            get(): import("..").Node;
            ancestors(deep?: boolean): string[];
            descendants(deep?: boolean, includeOnly?: "linkedNodes" | "childNodes"): string[];
            linkedNodes(): string[];
            childNodes(): string[];
            isDraggable(onError?: (err: string) => void): boolean;
            isDroppable(target: string | import("..").Node, onError?: (err: string) => void): boolean;
            toSerializedNode(): import("..").SerializedNode;
            toNodeTree(includeOnly?: "linkedNodes" | "childNodes"): {
                rootNodeId: string;
                nodes: any;
            };
            decendants(deep?: boolean): any;
            isTopLevelCanvas(): boolean;
        };
        getDropPlaceholder: (source: string | import("..").Node, target: string, pos: {
            x: number;
            y: number;
        }, nodesToDOM?: (node: import("..").Node) => HTMLElement) => import("..").Indicator;
        getOptions: () => import("..").Options;
        getSerializedNodes: () => Record<string, import("..").SerializedNode>;
        serialize: () => string;
        parseReactElement: (reactElement: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any>) | (new (props: any) => import("react").Component<any, any, any>)>) => {
            toNodeTree(normalize?: (node: import("..").Node, jsx: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any>) | (new (props: any) => import("react").Component<any, any, any>)>) => void): import("..").NodeTree;
        };
        parseSerializedNode: (serializedNode: import("..").SerializedNode) => {
            toNode(normalize?: (node: import("..").Node) => void): import("..").Node;
        };
        parseFreshNode: (node: import("..").FreshNode) => {
            toNode(normalize?: (node: import("..").Node) => void): import("..").Node;
        };
        createNode: (reactElement: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any>) | (new (props: any) => import("react").Component<any, any, any>)>, extras?: any) => any;
        getState: () => import("..").EditorState;
    } & {
        history: {
            canUndo: () => boolean;
            canRedo: () => boolean;
        };
    }) => {
        setState(cb: (state: import("..").EditorState, actions: Pick<{
            setDOM: (id: string, dom: HTMLElement) => void;
            setNodeEvent: (eventType: import("..").NodeEventTypes, id: string) => void;
            selectNode: (nodeId?: string) => void;
            clearEvents: () => void;
            setOptions: (cb: (options: Partial<import("..").Options>) => void) => void;
            setIndicator: (indicator: import("..").Indicator) => void;
            addLinkedNodeFromTree: (tree: import("..").NodeTree, parentId: string, id: string) => void;
            add: (nodeToAdd: import("..").Node | import("..").Node[], parentId: string, index?: number) => void;
            addNodeTree: (tree: import("..").NodeTree, parentId?: string, index?: number) => void;
            delete: (id: string) => void;
            deserialize: (input: string | Record<string, import("..").SerializedNode>) => void;
            move: (targetId: string, newParentId: string, index: number) => void;
            replaceNodes: (nodes: Record<string, import("..").Node>) => void;
            reset: () => void;
            setCustom: (id: string, cb: (data: any) => void) => void;
            setHidden: (id: string, bool: boolean) => void;
            setProp: (id: string, cb: (props: any) => void) => void;
        } & {
            history: {
                undo: () => void;
                redo: () => void;
                throttle: (rate?: number) => Pick<{
                    setDOM: (id: string, dom: HTMLElement) => void;
                    setNodeEvent: (eventType: import("..").NodeEventTypes, id: string) => void;
                    selectNode: (nodeId?: string) => void;
                    clearEvents: () => void;
                    setOptions: (cb: (options: Partial<import("..").Options>) => void) => void;
                    setIndicator: (indicator: import("..").Indicator) => void;
                    addLinkedNodeFromTree: (tree: import("..").NodeTree, parentId: string, id: string) => void;
                    add: (nodeToAdd: import("..").Node | import("..").Node[], parentId: string, index?: number) => void;
                    addNodeTree: (tree: import("..").NodeTree, parentId?: string, index?: number) => void;
                    delete: (id: string) => void;
                    deserialize: (input: string | Record<string, import("..").SerializedNode>) => void;
                    move: (targetId: string, newParentId: string, index: number) => void;
                    replaceNodes: (nodes: Record<string, import("..").Node>) => void;
                    reset: () => void;
                    setCustom: (id: string, cb: (data: any) => void) => void;
                    setHidden: (id: string, bool: boolean) => void;
                    setProp: (id: string, cb: (props: any) => void) => void;
                }, "setDOM" | "setNodeEvent" | "selectNode" | "clearEvents" | "setOptions" | "setIndicator" | "addLinkedNodeFromTree" | "add" | "addNodeTree" | "delete" | "deserialize" | "move" | "replaceNodes" | "reset" | "setCustom" | "setHidden" | "setProp">;
                merge: () => Pick<{
                    setDOM: (id: string, dom: HTMLElement) => void;
                    setNodeEvent: (eventType: import("..").NodeEventTypes, id: string) => void;
                    selectNode: (nodeId?: string) => void;
                    clearEvents: () => void;
                    setOptions: (cb: (options: Partial<import("..").Options>) => void) => void;
                    setIndicator: (indicator: import("..").Indicator) => void;
                    addLinkedNodeFromTree: (tree: import("..").NodeTree, parentId: string, id: string) => void;
                    add: (nodeToAdd: import("..").Node | import("..").Node[], parentId: string, index?: number) => void;
                    addNodeTree: (tree: import("..").NodeTree, parentId?: string, index?: number) => void;
                    delete: (id: string) => void;
                    deserialize: (input: string | Record<string, import("..").SerializedNode>) => void;
                    move: (targetId: string, newParentId: string, index: number) => void;
                    replaceNodes: (nodes: Record<string, import("..").Node>) => void;
                    reset: () => void;
                    setCustom: (id: string, cb: (data: any) => void) => void;
                    setHidden: (id: string, bool: boolean) => void;
                    setProp: (id: string, cb: (props: any) => void) => void;
                }, "setDOM" | "setNodeEvent" | "selectNode" | "clearEvents" | "setOptions" | "setIndicator" | "addLinkedNodeFromTree" | "add" | "addNodeTree" | "delete" | "deserialize" | "move" | "replaceNodes" | "reset" | "setCustom" | "setHidden" | "setProp">;
                ignore: () => Pick<{
                    setDOM: (id: string, dom: HTMLElement) => void;
                    setNodeEvent: (eventType: import("..").NodeEventTypes, id: string) => void;
                    selectNode: (nodeId?: string) => void;
                    clearEvents: () => void;
                    setOptions: (cb: (options: Partial<import("..").Options>) => void) => void;
                    setIndicator: (indicator: import("..").Indicator) => void;
                    addLinkedNodeFromTree: (tree: import("..").NodeTree, parentId: string, id: string) => void;
                    add: (nodeToAdd: import("..").Node | import("..").Node[], parentId: string, index?: number) => void;
                    addNodeTree: (tree: import("..").NodeTree, parentId?: string, index?: number) => void;
                    delete: (id: string) => void;
                    deserialize: (input: string | Record<string, import("..").SerializedNode>) => void;
                    move: (targetId: string, newParentId: string, index: number) => void;
                    replaceNodes: (nodes: Record<string, import("..").Node>) => void;
                    reset: () => void;
                    setCustom: (id: string, cb: (data: any) => void) => void;
                    setHidden: (id: string, bool: boolean) => void;
                    setProp: (id: string, cb: (props: any) => void) => void;
                }, "setDOM" | "setNodeEvent" | "selectNode" | "clearEvents" | "setOptions" | "setIndicator" | "addLinkedNodeFromTree" | "add" | "addNodeTree" | "delete" | "deserialize" | "move" | "replaceNodes" | "reset" | "setCustom" | "setHidden" | "setProp">;
            };
        }, "setDOM" | "setNodeEvent" | "selectNode" | "clearEvents" | "setOptions" | "setIndicator" | "addLinkedNodeFromTree" | "add" | "addNodeTree" | "delete" | "deserialize" | "move" | "replaceNodes" | "reset" | "setCustom" | "setHidden" | "setProp">) => void): void;
        addLinkedNodeFromTree(tree: import("..").NodeTree, parentId: string, id: string): void;
        add(nodeToAdd: import("..").Node | import("..").Node[], parentId: string, index?: number): void;
        addNodeTree(tree: import("..").NodeTree, parentId?: string, index?: number): void;
        delete(id: string): void;
        deserialize(input: string | Record<string, import("..").SerializedNode>): void;
        move(targetId: string, newParentId: string, index: number): void;
        replaceNodes(nodes: Record<string, import("..").Node>): void;
        clearEvents(): void;
        reset(): void;
        setOptions(cb: (options: Partial<import("..").Options>) => void): void;
        setNodeEvent(eventType: import("..").NodeEventTypes, id: string): void;
        setCustom<T extends string>(id: T, cb: (data: any) => void): void;
        setDOM(id: string, dom: HTMLElement): void;
        setIndicator(indicator: import("..").Indicator): void;
        setHidden(id: string, bool: boolean): void;
        setProp(id: string, cb: (props: any) => void): void;
        selectNode(nodeId?: string): void;
    };
    ignoreHistoryForActions: readonly ["setDOM", "setNodeEvent", "selectNode", "clearEvents", "setOptions", "setIndicator"];
    normalizeHistory: (state: import("..").EditorState) => void;
}, typeof import("./query").QueryMethods>>;
