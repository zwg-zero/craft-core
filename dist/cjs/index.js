"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var utils=require("@craftjs/utils"),React=require("react"),invariant=require("tiny-invariant"),lodash=require("lodash"),shortid=require("shortid"),cloneDeep=require("lodash/cloneDeep");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var React__default=_interopDefaultLegacy(React),invariant__default=_interopDefaultLegacy(invariant),shortid__default=_interopDefaultLegacy(shortid),cloneDeep__default=_interopDefaultLegacy(cloneDeep),_extendStatics=function(e,t){return(_extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};function __extends(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}_extendStatics(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var _assign=function(){return(_assign=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function __rest(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n}function __spreadArrays(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),a=0;for(t=0;t<n;t++)for(var o=arguments[t],d=0,s=o.length;d<s;d++,a++)r[a]=o[d];return r}var EventHandlerContext=React.createContext(null),useEventHandler=function(){return React.useContext(EventHandlerContext)},CoreEventHandlers=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.handlers=function(){return{connect:function(e,t){},select:function(e,t){},hover:function(e,t){},drag:function(e,t){},drop:function(e,t){},create:function(e,t,n){}}},t}(utils.EventHandlers),DerivedCoreEventHandlers=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(utils.DerivedEventHandlers),createShadow=function(e,t){var n=e.currentTarget,r=t.getBoundingClientRect(),a=r.top,o=r.left,d=r.width,s=r.height;if(n){var i=document.createElement("div");i.style.position="fixed",i.style.left="-100%",i.style.top="-100%",i.style.width="100%",i.style.height="100%",i.style.pointerEvents="none";var u=t.cloneNode(!0);return u.style.position="absolute",u.style.width=d+"px",u.style.height=s+"px",u.style.left=o+"px",u.style.top=a+"px",i.appendChild(u),document.body.appendChild(i),e.dataTransfer.setDragImage(u,0,0),i}},DefaultEventHandlers=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.currentSelectedElementIds=[],t}return __extends(t,e),t.prototype.handlers=function(){var e=this,n=this.options.store;return{connect:function(t,r){return n.actions.setDOM(r,t),e.reflect((function(e){e.select(t,r),e.hover(t,r),e.drop(t,r)}))},select:function(t,r){var a=e.addCraftEventListener(t,"mousedown",(function(t){t.craft.stopPropagation(),e.options.store.actions.setNodeEvent("selected",r)}));return function(){n.actions.setNodeEvent("selected",null),a()}},hover:function(t,r){var a=e.addCraftEventListener(t,"mouseover",(function(e){e.craft.stopPropagation(),n.actions.setNodeEvent("hovered",r)}));return function(){n.actions.setNodeEvent("hovered",null),a()}},drop:function(r,a){var o=e.addCraftEventListener(r,"dragover",(function(e){e.craft.stopPropagation(),e.preventDefault()})),d=e.addCraftEventListener(r,"dragenter",(function(e){e.craft.stopPropagation(),e.preventDefault();var r=t.draggedElement;if(r){var o=r;r.rootNodeId&&(o=r.nodes[r.rootNodeId]);var d=n.query.getDropPlaceholder(o,a,{x:e.clientX,y:e.clientY});d&&(n.actions.setIndicator(d),t.indicator=d)}}));return function(){d(),o()}},drag:function(r,a){if(!n.query.node(a).isDraggable())return function(){};r.setAttribute("draggable","true");var o=e.addCraftEventListener(r,"dragstart",(function(e){e.craft.stopPropagation(),t.draggedElementShadow=createShadow(e,n.query.node(a).get().dom),t.draggedElement=a})),d=e.addCraftEventListener(r,"dragend",(function(t){t.craft.stopPropagation(),e.dropElement((function(e,t){n.actions.move(e,t.parent.id,t.index+("after"===t.where?1:0))}))}));return function(){r.setAttribute("draggable","false"),o(),d()}},create:function(r,a,o){r.setAttribute("draggable","true");var d=e.addCraftEventListener(r,"dragstart",(function(e){e.craft.stopPropagation();var r=n.query.parseReactElement(a).toNodeTree();t.draggedElementShadow=createShadow(e,e.currentTarget),t.draggedElement=r})),s=e.addCraftEventListener(r,"dragend",(function(t){t.craft.stopPropagation(),e.dropElement((function(e,t){n.actions.addNodeTree(e,t.parent.id,t.index+("after"===t.where?1:0)),o&&lodash.isFunction(o.onCreate)&&o.onCreate(e)}))}));return function(){r.removeAttribute("draggable"),d(),s()}}}},t.prototype.dropElement=function(e){var n=this.options.store,r=t.draggedElement,a=t.draggedElementShadow,o=t.indicator;r&&o&&!o.error&&e(r,o.placement),a&&(a.parentNode.removeChild(a),t.draggedElementShadow=null),t.draggedElement=null,t.indicator=null,n.actions.setIndicator(null),n.actions.setNodeEvent("dragged",null)},t.indicator=null,t}(CoreEventHandlers);function movePlaceholder(e,t,n,r){void 0===r&&(r=2);var a=0,o=0,d=0,s=0,i=e.where;return n?n.inFlow?(d=n.outerWidth,s=r,a="before"===i?n.top:n.bottom,o=n.left):(d=r,s=n.outerHeight,a=n.top,o="before"===i?n.left:n.left+n.outerWidth):t&&(a=t.top+t.padding.top,o=t.left+t.padding.left,d=t.outerWidth-t.padding.right-t.padding.left-t.margin.left-t.margin.right,s=r),{top:a+"px",left:o+"px",width:d+"px",height:s+"px"}}var EditorContext=React.createContext({});function useInternalEditor(e){var t=useEventHandler(),n=React.useContext(EditorContext),r=utils.useCollector(n,e),a=React.useMemo((function(){return t&&utils.wrapConnectorHooks(t.connectors)}),[t]);return _assign(_assign({},r),{connectors:a,inContext:!!n,store:n})}var Events=function(e){var t=e.children,n=useInternalEditor((function(e){return{enabled:e.options.enabled,indicator:e.events.indicator,indicatorOptions:e.options.indicator,handlers:e.handlers,handlersFactory:e.options.handlers,hydrationTimestamp:e.nodes.ROOT&&e.nodes.ROOT._hydrationTimestamp}})),r=n.actions,a=n.indicator,o=n.indicatorOptions,d=n.store,s=n.handlers,i=n.handlersFactory,u=n.enabled,l=n.hydrationTimestamp,c=React.useRef(d);c.current=d;var f=React.useRef(s);return f.current=s,React.useEffect((function(){return r.history.ignore().setState((function(e){return e.handlers=i(c.current)})),function(){f.current&&f.current.cleanup()}}),[r,i,l]),React.useEffect((function(){s&&(u?s.enable():s.disable())}),[u,s]),s?React__default.default.createElement(EventHandlerContext.Provider,{value:s},a&&React__default.default.createElement(utils.RenderIndicator,{style:_assign(_assign({},movePlaceholder(a.placement,utils.getDOMInfo(a.placement.parent.dom),a.placement.currentNode&&utils.getDOMInfo(a.placement.currentNode.dom),o.thickness)),{backgroundColor:a.error?o.error:o.success,transition:o.transition||"0.2s ease-in"}),parentDom:a.placement.parent.dom}),t):null},NodeContext=React__default.default.createContext(null),NodeProvider=function(e){var t=e.id,n=e.related,r=void 0!==n&&n,a=e.children,o=useEventHandler(),d=React.useMemo((function(){return utils.wrapConnectorHooks({connect:function(e){return o.connectors.connect(e,t)},drag:function(e){return o.connectors.drag(e,t)}})}),[o,t]);return React__default.default.createElement(NodeContext.Provider,{value:{id:t,related:r,connectors:d}},a)};function useInternalNode(e){var t=React.useContext(NodeContext),n=t.id,r=t.related,a=t.connectors,o=useInternalEditor((function(t){return n&&t.nodes[n]&&e&&e(t.nodes[n])})),d=o.actions,s=__rest(o,["actions","query"]),i=React.useMemo((function(){return{setProp:function(e,t){t?d.history.throttle(t).setProp(n,e):d.setProp(n,e)},setCustom:function(e,t){t?d.history.throttle(t).setCustom(n,e):d.setCustom(n,e)},setHidden:function(e){return d.setHidden(n,e)}}}),[d,n]);return _assign(_assign({},s),{id:n,related:r,inNodeContext:!!t,actions:i,connectors:a})}function useNode(e){var t=useInternalNode(e),n=t.id,r=t.related,a=t.actions,o=t.inNodeContext,d=t.connectors,s=__rest(t,["id","related","actions","inNodeContext","connectors"]);return _assign(_assign({},s),{actions:a,id:n,related:r,setProp:function(e){return utils.deprecationWarning("useNode().setProp()",{suggest:"useNode().actions.setProp()"}),a.setProp(e)},inNodeContext:o,connectors:d})}var SimpleElement=function(e){var t=e.render,n=useNode().connectors;return"string"==typeof t.type?(0,n.connect)((0,n.drag)(React__default.default.cloneElement(t))):t},DefaultRender=function(){var e=useInternalNode((function(e){return{type:e.data.type,props:e.data.props,nodes:e.data.nodes,hydrationTimestamp:e._hydrationTimestamp}})),t=e.type,n=e.props,r=e.nodes;return React.useMemo((function(){var e=n.children;r&&r.length>0&&(e=React__default.default.createElement(React__default.default.Fragment,null,r.map((function(e){return React__default.default.createElement(NodeElement,{id:e,key:e})}))));var a=React__default.default.createElement(t,n,e);return"string"==typeof t?React__default.default.createElement(SimpleElement,{render:a}):a}),[t,n,e.hydrationTimestamp,r])},RenderNodeToElement=function(e){var t=e.render,n=useInternalNode((function(e){return{hidden:e.data.hidden}})).hidden,r=useInternalEditor((function(e){return{onRender:e.options.onRender}})).onRender;return n?null:React__default.default.createElement(r,{render:t||React__default.default.createElement(DefaultRender,null)})},NodeElement=function(e){return React__default.default.createElement(NodeProvider,{id:e.id},React__default.default.createElement(RenderNodeToElement,{render:e.render}))},defaultElementProps={is:"div",canvas:!1,custom:{},hidden:!1},elementPropToNodeData={is:"type",canvas:"isCanvas"};function Element(e){var t=e.id,n=e.children,r=__rest(e,["id","children"]),a=_assign(_assign({},defaultElementProps),r).is,o=useInternalEditor(),d=o.query,s=o.actions,i=useInternalNode((function(e){return{node:{id:e.id,data:e.data}}})),u=i.node,l=i.inNodeContext,c=React.useState(null),f=c[0],p=c[1];return utils.useEffectOnce((function(){invariant__default.default(!!t,utils.ERROR_TOP_LEVEL_ELEMENT_NO_ID);var e=u.id,o=u.data;if(l){var i,c=o.linkedNodes&&o.linkedNodes[t]&&d.node(o.linkedNodes[t]).get();if(c&&c.data.type===a)i=c.id;else{var f=React__default.default.createElement(Element,r,n),v=d.parseReactElement(f).toNodeTree();i=v.rootNodeId,s.history.ignore().addLinkedNodeFromTree(v,e,t)}p(i)}})),f?React__default.default.createElement(NodeElement,{id:f}):null}var deprecateCanvasComponent=function(){return utils.deprecationWarning("<Canvas />",{suggest:"<Element canvas={true} />"})};function Canvas(e){var t=__rest(e,[]);return React.useEffect((function(){return deprecateCanvasComponent()}),[]),React__default.default.createElement(Element,_assign({},t,{canvas:!0}))}var Frame=function(e){var t=e.children,n=e.json,r=e.data,a=useInternalEditor(),o=a.actions,d=a.query,s=React.useState(null),i=s[0],u=s[1];n&&utils.deprecationWarning("<Frame json={...} />",{suggest:"<Frame data={...} />"});var l=React.useRef({initialChildren:t,initialData:r||n});return React.useEffect((function(){var e=l.current,t=e.initialChildren,n=e.initialData;if(n)o.history.ignore().deserialize(n);else if(t){var r=React__default.default.Children.only(t),a=d.parseReactElement(r).toNodeTree((function(e,t){return t===r&&(e.id=utils.ROOT_NODE),e}));o.history.ignore().addNodeTree(a)}u(React__default.default.createElement(NodeElement,{id:utils.ROOT_NODE}))}),[o,d]),i},getPublicActions=function(e){return __rest(e,["addLinkedNodeFromTree","setDOM","setNodeEvent","replaceNodes","reset"])};function useEditor(e){var t=useInternalEditor(e),n=t.connectors,r=t.actions,a=__rest(t.query,["deserialize"]),o=t.store,d=__rest(t,["connectors","actions","query","store"]),s=getPublicActions(r),i=React.useMemo((function(){return _assign(_assign({},s),{history:_assign(_assign({},s.history),{ignore:function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return getPublicActions((e=s.history).ignore.apply(e,t))},throttle:function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return getPublicActions((e=s.history).throttle.apply(e,t))}})})}),[s]);return _assign({connectors:n,actions:i,query:a,store:o},d)}function connectEditor(e){return function(t){return function(n){var r=e?useEditor(e):useEditor();return React__default.default.createElement(t,_assign({},r,n))}}}function connectNode(e){return function(t){return function(n){var r=useNode(e);return React__default.default.createElement(t,_assign({},r,n))}}}var fromEntries=function(e){return Object.fromEntries?Object.fromEntries(e):e.reduce((function(e,t){var n,r=t[0],a=t[1];return _assign(_assign({},e),((n={})[r]=a,n))}),{})},removeNodeFromEvents=function(e,t){return Object.keys(e.events).forEach((function(n){e.events[n]&&e.events[n]===t&&(e.events[n]=null)}))},Methods=function(e,t){var n=function(t,n,r){var o=a(n);o.data.nodes||(o.data.nodes=[]),o.data.props.children&&delete o.data.props.children,null!=r?o.data.nodes.splice(r,0,t.id):o.data.nodes.push(t.id),t.data.parent=o.id,e.nodes[t.id]=t},r=function(t,a,o){var d=t.nodes[t.rootNodeId];if(null!=a&&n(d,a,o),d.data.nodes){var s=__spreadArrays(d.data.nodes);d.data.nodes=[],s.forEach((function(e,n){return r({rootNodeId:e,nodes:t.nodes},d.id,n)}))}d.data.linkedNodes&&Object.keys(d.data.linkedNodes).forEach((function(n){var a=d.data.linkedNodes[n];e.nodes[a]=t.nodes[a],r({rootNodeId:a,nodes:t.nodes})}))},a=function(t){invariant__default.default(t,utils.ERROR_NOPARENT);var n=e.nodes[t];return invariant__default.default(n,utils.ERROR_INVALID_NODEID),n},o=function(t){var n=e.nodes[t],r=e.nodes[n.data.parent];if(n.data.nodes&&__spreadArrays(n.data.nodes).forEach((function(e){return o(e)})),n.data.linkedNodes&&Object.values(n.data.linkedNodes).map((function(e){return o(e)})),r.data.nodes.includes(t)){var a=r.data.nodes;a.splice(a.indexOf(t),1)}else{var d=Object.keys(r.data.linkedNodes).find((function(e){return r.data.linkedNodes[e]===e}));d&&delete r.data.linkedNodes[d]}removeNodeFromEvents(e,t),delete e.nodes[t]};return{addLinkedNodeFromTree:function(t,n,d){var s=a(n);s.data.linkedNodes||(s.data.linkedNodes={});var i=s.data.linkedNodes[d];i&&o(i),s.data.linkedNodes[d]=t.rootNodeId,t.nodes[t.rootNodeId].data.parent=n,e.nodes[t.rootNodeId]=t.nodes[t.rootNodeId],r(t)},add:function(e,t,r){var a=[e];Array.isArray(e)&&(utils.deprecationWarning("actions.add(node: Node[])",{suggest:"actions.add(node: Node)"}),a=e),a.forEach((function(e){n(e,t,r)}))},addNodeTree:function(t,n,a){var o=t.nodes[t.rootNodeId];n||(invariant__default.default(t.rootNodeId===utils.ROOT_NODE,"Cannot add non-root Node without a parent"),e.nodes[t.rootNodeId]=o),r(t,n,a)},delete:function(e){invariant__default.default(!t.node(e).isTopLevelNode(),utils.ERROR_DELETE_TOP_LEVEL_NODE),o(e)},deserialize:function(e){var n="string"==typeof e?JSON.parse(e):e,r=Object.keys(n).map((function(e){var r=e;return e===utils.DEPRECATED_ROOT_NODE&&(r=utils.ROOT_NODE),[r,t.parseSerializedNode(n[e]).toNode((function(e){return e.id=r}))]}));this.replaceNodes(fromEntries(r))},move:function(n,r,a){var o=e.nodes[n],d=o.data.parent,s=e.nodes[r].data.nodes;t.node(r).isDroppable(o,(function(e){throw new Error(e)}));var i=e.nodes[d].data.nodes;i[i.indexOf(n)]="marked",s.splice(a,0,n),e.nodes[n].data.parent=r,i.splice(i.indexOf("marked"),1)},replaceNodes:function(t){this.clearEvents(),e.nodes=t},clearEvents:function(){this.setNodeEvent("selected",null),this.setNodeEvent("hovered",null),this.setNodeEvent("dragged",null),this.setIndicator(null)},reset:function(){this.clearEvents(),this.replaceNodes({})},setOptions:function(t){t(e.options)},setNodeEvent:function(t,n){var r=e.events[t];r&&n!==r&&(e.nodes[r].events[t]=!1),n?(e.nodes[n].events[t]=!0,e.events[t]=n):e.events[t]=null},setCustom:function(t,n){n(e.nodes[t].data.custom)},setDOM:function(t,n){e.nodes[t]&&(e.nodes[t].dom=n)},setIndicator:function(t){t&&(!t.placement.parent.dom||t.placement.currentNode&&!t.placement.currentNode.dom)||(e.events.indicator=t)},setHidden:function(t,n){e.nodes[t].data.hidden=n},setProp:function(t,n){invariant__default.default(e.nodes[t],utils.ERROR_INVALID_NODEID),n(e.nodes[t].data.props)},selectNode:function(e){this.setNodeEvent("selected",null!=e?e:null),this.setNodeEvent("hovered",null)}}},ActionMethods=function(e,t){return _assign(_assign({},Methods(e,t)),{setState:function(t){var n=__rest(this,["history"]);t(e,n)}})},resolveComponent=function(e,t){var n=t.name||t.displayName;if(t===Canvas)return"Canvas";if(e[n])return n;for(var r=0;r<Object.keys(e).length;r++){var a=Object.keys(e)[r];if(e[a]===t)return a}return"string"==typeof t?t:void 0},reduceType=function(e,t){return"string"==typeof e?e:{resolvedName:resolveComponent(t,e)}},serializeComp=function(e,t){var n=e.type,r=e.isCanvas,a=e.props;return a=Object.keys(a).reduce((function(e,n){var r=a[n];return null==r?e:(e[n]="children"===n&&"string"!=typeof r?React.Children.map(r,(function(e){return"string"==typeof e?e:serializeComp(e,t)})):r.type?serializeComp(r,t):r,e)}),{}),{type:reduceType(n,t),isCanvas:!!r,props:a}},serializeNode=function(e,t){var n=e.type,r=e.props,a=e.isCanvas,o=__rest(e,["type","props","isCanvas","name"]),d=serializeComp({type:n,isCanvas:a,props:r},t);return _assign(_assign({},d),o)};function NodeHelpers(e,t){invariant__default.default("string"==typeof t,utils.ERROR_INVALID_NODE_ID);var n=e.nodes[t],r=function(t){return NodeHelpers(e,t)};return{isCanvas:function(){return!!n.data.isCanvas},isRoot:function(){return n.id===utils.ROOT_NODE},isLinkedNode:function(){return n.data.parent&&r(n.data.parent).linkedNodes().includes(n.id)},isTopLevelNode:function(){return this.isRoot()||this.isLinkedNode()},isDeletable:function(){return!this.isTopLevelNode()},isParentOfTopLevelNodes:function(){return n.data.linkedNodes&&Object.keys(n.data.linkedNodes).length>0},isParentOfTopLevelCanvas:function(){return utils.deprecationWarning("query.node(id).isParentOfTopLevelCanvas",{suggest:"query.node(id).isParentOfTopLevelNodes"}),this.isParentOfTopLevelNodes()},get:function(){return n},ancestors:function(t){return void 0===t&&(t=!1),function n(r,a,o){void 0===a&&(a=[]),void 0===o&&(o=0);var d=e.nodes[r];return d?(a.push(r),d.data.parent?((t||!t&&0===o)&&(a=n(d.data.parent,a,o+1)),a):a):a}(n.data.parent)},descendants:function(n,a){return void 0===n&&(n=!1),function t(o,d,s){return void 0===d&&(d=[]),void 0===s&&(s=0),(n||!n&&0===s)&&e.nodes[o]?("childNodes"!==a&&r(o).linkedNodes().forEach((function(e){d.push(e),d=t(e,d,s+1)})),"linkedNodes"!==a&&r(o).childNodes().forEach((function(e){d.push(e),d=t(e,d,s+1)})),d):d}(t)},linkedNodes:function(){return Object.values(n.data.linkedNodes||{})},childNodes:function(){return n.data.nodes||[]},isDraggable:function(t){try{var a=n;return invariant__default.default(!this.isTopLevelNode(),utils.ERROR_MOVE_TOP_LEVEL_NODE),invariant__default.default(NodeHelpers(e,a.data.parent).isCanvas(),utils.ERROR_MOVE_NONCANVAS_CHILD),invariant__default.default(a.rules.canDrag(a,r),utils.ERROR_CANNOT_DRAG),!0}catch(e){return t&&t(e),!1}},isDroppable:function(t,a){var o="object"==typeof t&&!e.nodes[t.id],d=function(t){return"string"==typeof t?e.nodes[t]:t}(t),s=n;try{if("string"==typeof t&&invariant__default.default(!r(t).isTopLevelNode(),utils.ERROR_MOVE_TOP_LEVEL_NODE),invariant__default.default(this.isCanvas(),utils.ERROR_MOVE_TO_NONCANVAS_PARENT),invariant__default.default(s.rules.canMoveIn(d,s,r),utils.ERROR_MOVE_INCOMING_PARENT),invariant__default.default(d.rules.canDrop(s,d,r),utils.ERROR_MOVE_CANNOT_DROP),o)return!0;var i=r(d.id).descendants(!0);invariant__default.default(!i.includes(s.id)&&s.id!==d.id,utils.ERROR_MOVE_TO_DESCENDANT);var u=d.data.parent&&e.nodes[d.data.parent];return invariant__default.default(u.data.isCanvas,utils.ERROR_MOVE_NONCANVAS_CHILD),invariant__default.default(u||!u&&!e.nodes[d.id],utils.ERROR_DUPLICATE_NODEID),n!==u&&invariant__default.default(u.rules.canMoveOut(d,u,r),utils.ERROR_MOVE_OUTGOING_PARENT),!0}catch(e){return a&&a(e),!1}},toSerializedNode:function(){return serializeNode(n.data,e.options.resolver)},toNodeTree:function(e){var n=__spreadArrays([t],this.descendants(!0,e)).reduce((function(e,t){return e[t]=r(t).get(),e}),{});return{rootNodeId:t,nodes:n}},decendants:function(e){return void 0===e&&(e=!1),utils.deprecationWarning("query.node(id).decendants",{suggest:"query.node(id).descendants"}),this.descendants(e)},isTopLevelCanvas:function(){return!this.isRoot()&&!n.data.parent}}}function findPosition(e,t,n,r){for(var a={parent:e,index:0,where:"before"},o=0,d=0,s=0,i=0,u=0,l=0,c=0,f=t.length;c<f;c++){var p=t[c];if(l=p.top+p.outerHeight,i=p.left+p.outerWidth/2,u=p.top+p.outerHeight/2,!(d&&p.left>d||s&&u>=s||o&&p.left+p.outerWidth<o))if(a.index=c,p.inFlow){if(r<u){a.where="before";break}a.where="after"}else r<l&&(s=l),n<i?(d=i,a.where="before"):(o=i,a.where="after")}return a}var getRandomNodeId=shortid__default.default,getNodeTypeName=function(e){return"string"==typeof e?e:e.name};function createNode(e,t){var n=e.data.type,r={id:e.id||getRandomNodeId(),_hydrationTimestamp:Date.now(),data:_assign({type:n,name:getNodeTypeName(n),displayName:getNodeTypeName(n),props:{},custom:{},parent:null,isCanvas:!1,hidden:!1,nodes:[],linkedNodes:{}},e.data),related:{},events:{selected:!1,dragged:!1,hovered:!1},rules:{canDrag:function(){return!0},canDrop:function(){return!0},canMoveIn:function(){return!0},canMoveOut:function(){return!0}},dom:null};if(r.data.type===Element||r.data.type===Canvas){var a=_assign(_assign({},defaultElementProps),r.data.props);r.data.props=Object.keys(r.data.props).reduce((function(e,t){return Object.keys(defaultElementProps).includes(t)?r.data[elementPropToNodeData[t]||t]=a[t]:e[t]=r.data.props[t],e}),{}),r.data.name=getNodeTypeName(n=r.data.type),r.data.displayName=getNodeTypeName(n),r.data.type===Canvas&&(r.data.isCanvas=!0,deprecateCanvasComponent())}t&&t(r);var o=n.craft;if(o&&(r.data.displayName=o.displayName||o.name||r.data.displayName,r.data.props=_assign(_assign({},o.props||o.defaultProps||{}),r.data.props),r.data.custom=_assign(_assign({},o.custom||{}),r.data.custom),null!=o.isCanvas&&(r.data.isCanvas=o.isCanvas),o.rules&&Object.keys(o.rules).forEach((function(e){["canDrag","canDrop","canMoveIn","canMoveOut"].includes(e)&&(r.rules[e]=o.rules[e])})),o.related)){var d={id:r.id,related:!0};Object.keys(o.related).forEach((function(e){r.related[e]=function(){return React__default.default.createElement(NodeProvider,d,React__default.default.createElement(o.related[e]))}}))}return r}var restoreType=function(e,t){return"object"==typeof e&&e.resolvedName?"Canvas"===e.resolvedName?Canvas:t[e.resolvedName]:"string"==typeof e?e:null},deserializeComp=function(e,t,n){var r=e.props,a=restoreType(e.type,t);if(a){r=Object.keys(r).reduce((function(e,n){var a=r[n];return e[n]=null==a?null:"object"==typeof a&&a.resolvedName?deserializeComp(a,t):"children"===n&&Array.isArray(a)?a.map((function(e){return"string"==typeof e?e:deserializeComp(e,t)})):a,e}),{}),n&&(r.key=n);var o=_assign({},React__default.default.createElement(a,_assign({},r)));return _assign(_assign({},o),{name:resolveComponent(t,o.type)})}},deserializeNode=function(e,t){var n=e.type,r=__rest(e,["type","props"]);invariant__default.default(void 0!==n&&"string"==typeof n||void 0!==n&&void 0!==n.resolvedName,utils.ERROR_DESERIALIZE_COMPONENT_NOT_IN_RESOLVER.replace("%displayName%",e.displayName).replace("%availableComponents%",Object.keys(t).join(", ")));var a=deserializeComp(e,t),o=a.name;return{type:a.type,name:o,displayName:r.displayName||o,props:a.props,custom:r.custom||{},isCanvas:!!r.isCanvas,hidden:!!r.hidden,parent:r.parent,linkedNodes:r.linkedNodes||r._childCanvas||{},nodes:r.nodes||[]}},mergeNodes=function(e,t){var n,r;if(t.length<1)return(n={})[e.id]=e,n;var a=t.map((function(e){return e.rootNodeId})),o=_assign(_assign({},e),{data:_assign(_assign({},e.data),{nodes:a})}),d=((r={})[e.id]=o,r);return t.reduce((function(t,n){var r,a=n.nodes[n.rootNodeId];return _assign(_assign(_assign({},t),n.nodes),((r={})[a.id]=_assign(_assign({},a),{data:_assign(_assign({},a.data),{parent:e.id})}),r))}),d)},mergeTrees=function(e,t){return{rootNodeId:e.id,nodes:mergeNodes(e,t)}};function parseNodeFromJSX(e,t){var n=e;return"string"==typeof n&&(n=React__default.default.createElement(React.Fragment,{},n)),createNode({data:{type:n.type,props:_assign({},n.props)}},(function(e){t&&t(e,n)}))}function QueryMethods(e){var t=e&&e.options,n=function(){return QueryMethods(e)};return{getDropPlaceholder:function(t,r,a,o){if(void 0===o&&(o=function(t){return e.nodes[t.id].dom}),t!==r){var d="string"==typeof t&&e.nodes[t],s=e.nodes[r],i=n().node(s.id).isCanvas()?s:e.nodes[s.data.parent];if(i){var u=i.data.nodes||[],l=findPosition(i,u?u.reduce((function(t,n){var r=o(e.nodes[n]);if(r){var a=_assign({id:n},utils.getDOMInfo(r));t.push(a)}return t}),[]):[],a.x,a.y),c=u.length&&e.nodes[u[l.index]],f={placement:_assign(_assign({},l),{currentNode:c}),error:!1};return d&&n().node(d.id).isDraggable((function(e){return f.error=e})),n().node(i.id).isDroppable(t,(function(e){return f.error=e})),f}}},getOptions:function(){return t},node:function(t){return NodeHelpers(e,t)},getSerializedNodes:function(){var t=this,n=Object.keys(e.nodes).map((function(e){return[e,t.node(e).toSerializedNode()]}));return fromEntries(n)},serialize:function(){return JSON.stringify(this.getSerializedNodes())},parseReactElement:function(t){return{toNodeTree:function(r){var a=parseNodeFromJSX(t,(function(t,n){var a=resolveComponent(e.options.resolver,t.data.type);invariant__default.default(null!==a,utils.ERROR_NOT_IN_RESOLVER),t.data.displayName=t.data.displayName||a,t.data.name=a,r&&r(t,n)})),o=[];return t.props&&t.props.children&&(o=React__default.default.Children.toArray(t.props.children).reduce((function(e,t){return React__default.default.isValidElement(t)&&e.push(n().parseReactElement(t).toNodeTree(r)),e}),[])),mergeTrees(a,o)}}},parseSerializedNode:function(t){return{toNode:function(r){var a=deserializeNode(t,e.options.resolver);invariant__default.default(a.type,utils.ERROR_NOT_IN_RESOLVER);var o="string"==typeof r&&r;return o&&utils.deprecationWarning("query.parseSerializedNode(...).toNode(id)",{suggest:"query.parseSerializedNode(...).toNode(node => node.id = id)"}),n().parseFreshNode(_assign(_assign({},o?{id:o}:{}),{data:a})).toNode(!o&&r)}}},parseFreshNode:function(t){return{toNode:function(n){return createNode(t,(function(t){t.data.parent===utils.DEPRECATED_ROOT_NODE&&(t.data.parent=utils.ROOT_NODE);var r=resolveComponent(e.options.resolver,t.data.type);invariant__default.default(null!==r,utils.ERROR_NOT_IN_RESOLVER),t.data.displayName=t.data.displayName||r,t.data.name=r,n&&n(t)}))}}},createNode:function(e,t){utils.deprecationWarning("query.createNode("+e+")",{suggest:"query.parseReactElement("+e+").toNodeTree()"});var n=this.parseReactElement(e).toNodeTree(),r=n.nodes[n.rootNodeId];return t?(t.id&&(r.id=t.id),t.data&&(r.data=_assign(_assign({},r.data),t.data)),r):r},getState:function(){return e}}}var editorInitialState={nodes:{},events:{dragged:null,selected:null,hovered:null,indicator:null},handlers:null,options:{onNodesChange:function(){return null},onRender:function(e){return e.render},resolver:{},enabled:!0,indicator:{error:"red",success:"rgb(98, 196, 98)"},handlers:function(e){return new DefaultEventHandlers({store:e})}}},ActionMethodsWithConfig={methods:ActionMethods,ignoreHistoryForActions:["setDOM","setNodeEvent","selectNode","clearEvents","setOptions","setIndicator"],normalizeHistory:function(e){Object.keys(e.events).forEach((function(t){var n=e.events[t];n&&!e.nodes[n]&&(e.events[t]=null)})),Object.keys(e.nodes).forEach((function(t){var n=e.nodes[t];Object.keys(n.events).forEach((function(t){n.events[t]&&e.events[t]&&e.events[t]!==n.id&&(n.events[t]=!1)}))}))}},useEditorStore=function(e){return utils.useMethods(ActionMethodsWithConfig,_assign(_assign({},editorInitialState),{options:_assign(_assign({},editorInitialState.options),e)}),QueryMethods)},Editor=function(e){var t=e.children,n=__rest(e,["children"]);void 0!==n.resolver&&invariant__default.default("object"==typeof n.resolver&&!Array.isArray(n.resolver),utils.ERROR_RESOLVER_NOT_AN_OBJECT);var r=useEditorStore(n);return React.useEffect((function(){r&&n&&r.actions.setOptions((function(e){}))}),[r,n]),React.useEffect((function(){r.subscribe((function(e){return{json:r.query.serialize()}}),(function(){r.query.getOptions().onNodesChange(r.query)}))}),[r]),r?React__default.default.createElement(EditorContext.Provider,{value:r},React__default.default.createElement(Events,null,t)):null},getTestNode=function(e){var t=e.events,n=e.data,r=n.nodes,a=n.linkedNodes,o=__rest(e,["events","data"]),d=createNode(cloneDeep__default.default(e));return{node:e=_assign(_assign(_assign({},d),o),{events:_assign(_assign({},d.events),t),dom:e.dom||d.dom}),childNodes:r,linkedNodes:a}},expectEditorState=function(e,t){var n=t.nodes,r=__rest(t,["nodes"]),a=e.nodes,o=__rest(e,["nodes"]);expect(o).toEqual(r);var d=Object.keys(n).reduce((function(e,t){var r=__rest(n[t],["_hydrationTimestamp","rules"]);return e[t]=r,e}),{}),s=Object.keys(a).reduce((function(e,t){var n=__rest(a[t],["_hydrationTimestamp","rules"]);return e[t]=n,e}),{});expect(s).toEqual(d)},createTestNodes=function(e){var t={},n=function(e){var r=getTestNode(e),a=r.node,o=r.childNodes,d=r.linkedNodes;t[a.id]=a,o&&o.forEach((function(e,r){var o=getTestNode(e),d=o.node,s=o.childNodes,i=o.linkedNodes;d.data.parent=a.id,t[d.id]=d,a.data.nodes[r]=d.id,n(_assign(_assign({},d),{data:_assign(_assign({},d.data),{nodes:s||[],linkedNodes:i||{}})}))})),d&&Object.keys(d).forEach((function(e){var r=getTestNode(d[e]),o=r.node,s=r.childNodes,i=r.linkedNodes;a.data.linkedNodes[e]=o.id,o.data.parent=a.id,t[o.id]=o,n(_assign(_assign({},o),{data:_assign(_assign({},o.data),{nodes:s||[],linkedNodes:i||{}})}))}))};return n(e),t},createTestState=function(e){void 0===e&&(e={});var t=e.nodes,n=e.events;return _assign(_assign(_assign({},editorInitialState),e),{nodes:t?createTestNodes(t):{},events:_assign(_assign({},editorInitialState.events),n||{})})};Object.defineProperty(exports,"ROOT_NODE",{enumerable:!0,get:function(){return utils.ROOT_NODE}}),exports.ActionMethodsWithConfig=ActionMethodsWithConfig,exports.Canvas=Canvas,exports.CoreEventHandlers=CoreEventHandlers,exports.DefaultEventHandlers=DefaultEventHandlers,exports.DerivedCoreEventHandlers=DerivedCoreEventHandlers,exports.Editor=Editor,exports.Element=Element,exports.Events=Events,exports.Frame=Frame,exports.NodeElement=NodeElement,exports.NodeHelpers=NodeHelpers,exports.NodeProvider=NodeProvider,exports.QueryMethods=QueryMethods,exports.connectEditor=connectEditor,exports.connectNode=connectNode,exports.createTestNodes=createTestNodes,exports.createTestState=createTestState,exports.defaultElementProps=defaultElementProps,exports.deprecateCanvasComponent=deprecateCanvasComponent,exports.editorInitialState=editorInitialState,exports.elementPropToNodeData=elementPropToNodeData,exports.expectEditorState=expectEditorState,exports.useEditor=useEditor,exports.useEditorStore=useEditorStore,exports.useEventHandler=useEventHandler,exports.useNode=useNode;
