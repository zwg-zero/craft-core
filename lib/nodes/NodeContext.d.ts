import { ChainableConnectors } from '@craftjs/utils';
import React from 'react';
import { NodeId } from '../interfaces';
export declare type NodeContextType = {
    id: NodeId;
    related?: boolean;
    connectors: ChainableConnectors<{
        connect: (element: HTMLElement) => void;
        drag: (element: HTMLElement) => void;
    }, React.ReactElement>;
};
export declare const NodeContext: React.Context<NodeContextType>;
export declare type NodeProviderProps = Omit<NodeContextType, 'connectors'>;
export declare const NodeProvider: React.FC<NodeProviderProps>;
