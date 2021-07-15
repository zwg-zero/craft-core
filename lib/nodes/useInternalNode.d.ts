import { NodeContextType } from './NodeContext';
import { Node } from '../interfaces';
declare type internalActions = NodeContextType & {
    inNodeContext: boolean;
    actions: {
        setProp: (cb: (props: any) => void, throttleRate?: number) => void;
        setCustom: (cb: (custom: any) => void, throttleRate?: number) => void;
        setHidden: (bool: boolean) => void;
    };
};
export declare type useInternalNodeReturnType<S = null> = S extends null ? internalActions : S & internalActions;
export declare function useInternalNode(): useInternalNodeReturnType;
export declare function useInternalNode<S = null>(collect?: (node: Node) => S): useInternalNodeReturnType<S>;
export {};
