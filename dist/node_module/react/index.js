(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.React = factory());
})(this, (function () { 'use strict';

	const supportSymbol = typeof Symbol === 'function' && Symbol.for;
	// 为什么不选择直接导出一个Symbol,我的推测是如果直接创建一个symbol并进行导出,就没办法动态判断当前环境是否支持Symbol,通过这种情况,如果不支持Symbol就可以使用一个数字来代替
	const REACT_ELEMENT_TYPE = supportSymbol
	    ? Symbol.for('react.element')
	    : 0xeac1;

	const ReactElement = (type, key, ref, props) => {
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
	const jsx = (type, config, ...mabyChildren) => {
	    // react在内部构造整个props对象
	    const props = {};
	    let key = null;
	    let ref = null;
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
	    }
	    else if (mabyChildrenLen > 1) {
	        props.children = mabyChildren;
	    }
	    return ReactElement(type, key, ref, props);
	};

	var index = {
	    versions: '0.0.1',
	    createElement: jsx
	};

	return index;

}));
