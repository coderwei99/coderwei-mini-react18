const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// 为什么不选择直接导出一个Symbol,我的推测是如果直接创建一个symbol并进行导出,就没办法动态判断当前环境是否支持Symbol,通过这种情况,如果不支持Symbol就可以使用一个数字来代替
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac1;
