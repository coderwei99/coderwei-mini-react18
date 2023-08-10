import { FiberNode } from './fiber';
import { beginWork } from './beginWork';
import { completeWork } from './completeWork';

let workInProgress: FiberNode | null = null;

function renderRoot(root: FiberNode) {
	// 初始化workInProgress 我们需要给到一个节点 从这个根节点开始进行fiber树的遍历
	prepareFreshStack(root);
	do {
		workLoop(workInProgress);
	} while (true);
}
function prepareFreshStack(root: FiberNode) {
	workInProgress = root;
}
function workLoop(workInProgress: FiberNode | null) {
	while (workInProgress !== null) {
		performUnitOfWord(workInProgress);
	}
}
function performUnitOfWord(workInProgress: FiberNode) {
	// next可能有值 子fiber 也可能为null 那就意味着遍历到最底层了  时刻记得我们这里是dfs 深度优先算法 还需要回去遍历兄弟节点
	const next = beginWork(workInProgress);
	// beginWork执行完之后 就代表换这个fiber处理完毕 就将memoizedProps赋值为pendingProps
	workInProgress.memoizedProps = workInProgress.pendingProps;
	// 如果next就是 有子fiber的情况下: dfs 继续遍历子fiber
	if (next) {
		workInProgress = next;
	} else {
		// 如果没有 这要需要去切换执行逻辑 转而看看自己的兄弟节点 去遍历兄弟节点
		completeUnitOfWork(workInProgress);
	}
}
function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;

	do {
		completeWork(node);
		const sibling = node.sibling;
		if (sibling) {
			workInProgress = sibling;
			return; //这里直接return  然后就回到workLoop函数 遍历这里赋值的workInProgress(又去看他的子fiber 有子fiber遍历他的子fiber 没有又会来到这里函数遍历他的兄弟fiber)
		}
		node = node.return; // 兄弟fiber遍历完事了  就可以回到父fiber
	} while (node !== null);
}
