import { Props, Key, Ref } from 'shared/src/ReactTypes';
import { FlagType, NoFlags } from './filerFlags';

export class FiberNode {
	tag;
	pendingProps: Props;
	key: Key;
	type: any;
	stateNode: any;

	return: FiberNode | null;
	index: FiberNode | number;
	child: FiberNode | null;
	sibling: FiberNode | null;

	ref: Ref | null;

	memoizedProps: Props | null;
	alternate: FiberNode | null;
	flags: FlagType;

	constructor(tag: any, pendingProps: Props, key: Key) {
		// 实例上的属性
		this.tag = tag; // 标志这个工作单元是什么类型的节点 比如说:函数组件/根节点/dom元素等等
		this.key = key; // diff算法用的key
		this.type = null; // 这个type是这个工作单元本身 比如说: 如果tag是FunctionComponent那么这个type就是那个函数 对于普通的don元素这个type就是他的标签名
		this.stateNode = null; // 可以理解为保存的真实dom(todo:猜测组件应该是组件实例)

		// 表示节点关系的字段
		this.return = null; //指向父节点的工作单元 tips: 为什么叫return? fiber是一个个的工作单元,当前的工作单元执行完了就该父的工作单元去执行,用return更具有语义化一点
		this.sibling = null; //指向的他右边的兄弟工作单元 可以理解为同级下一个
		this.child = null; // 指向他的儿子工作单元
		this.index = 0; // index指的是同级存在多个工作单元的时候 标志的这个工作单元的索引

		// 特殊的ref
		this.ref = null;

		// 作为工作单元具备的基本属性
		this.pendingProps = pendingProps; //当前刚开始的props
		this.memoizedProps = null; //工作完毕之后的props(确定下来的props)

		// 保存着旧的的fiber节点 目前我的理解就是react在遍历的时候只会遍历新树,然后根据新树的fiber节点的alternate属性来获取旧的fiber节点,进行对比,全程不依赖旧的fiber树,可以降低空间复杂度.
		this.alternate = null;
		// 标志着节点的状态,删除/插入/更新等等 和vue3的ShapeFlags + patchFlags有异曲同工之妙
		this.flags = NoFlags;
	}
}
