class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
// traverse
function preorder(node) {
  // process node
  node.preorder(node.left);
  node.preorder(node.right);
}

function inorder(node) {
  node.preorder(node.left);
  // process node
  node.preorder(node.right);
}

function postorder(node) {
  preorder(node.left);
  preorder(node.right);
  // process node
}

// traverse iteratively
function preorderI(node) {
  const list = [];
  const stack = [];
  while (stack.length > 0 || node) {
    if (node) {
      list.push(node.val);
      node.right && stack.push(node.right);
      node = node.left;
    } else {
      node = stack.pop();
    }
  }
  return list;
}

function inorderI(node) {
  const list = [];
  const stack = [];
  while (stack.length > 0 || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      const temp = stack.pop();
      list.push(temp.val);
      node = temp.right;
    }
  }
  return list;
}

function postorderI(node) {
  const list = [];
  const stack = [];
  while (stack.length > 0 || node) {
    if (node) {
      list.unshift(node.val);
      node.left && stack.push(node.left);
      node = node.right;
    } else {
      node = stack.pop();
    }
  }
  return list;
}
/*
  1
   \
    2
   /
  3
*/
const a = new TreeNode(1);
const b = new TreeNode(2);
const c = new TreeNode(3);
a.right = b;
b.left = c;
console.log(preorderI(a));
console.log(inorderI(a));
console.log(postorderI(a));
