import { REACT_ELEMENT_TYPE } from '@coderwei-mini-react18/shared/src/ReactSymbols';
import {
	Props,
	ReactElement,
	Ref,
	Type,
	Key,
	ElementType
} from '@coderwei-mini-react18/shared/src/ReactTypes';

const ReactElement = (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement => {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'coderwei'
	};

	return element;
};

export const jsx = (
	type: ElementType,
	config: Props,
	...mabyChildren: any[]
) => {
	// react在内部构造整个props对象
	const props: Props = {};
	let key: key = null;
	let ref: Ref = null;
	// 单独处理key 和 ref两个属性
	for (const prop of config) {
		if (prop === 'key') {
			key = '' + config[prop];
		}

		if (prop === 'ref' && config[key] !== undefined) {
			ref = config[key];
		}
		if (Object.prototype.hasOwnProperty.call(config, prop)) {
			props[prop] = config[prop];
		}
	}

	const mabyChildrenLen = mabyChildren.length;
	if (mabyChildrenLen === 1) {
		props.children = mabyChildren[0];
	} else if (mabyChildrenLen > 1) {
		props.children = mabyChildren;
	}
	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
