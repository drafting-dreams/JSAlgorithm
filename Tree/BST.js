class TreeNode {
  constructor(key, p = null, left = null, right = null) {
    this.key = key;
    this.p = p;
    this.left = left;
    this.right = right;
  }
}

function search(T, key) {
  if (T === null || T.key === key) {
    return T;
  }

  if (key < T.key) {
    search(T.left, key);
  } else {
    search(T.right, key);
  }
}

function iterativelySearch(T, key) {
  while (T && T.key !== key) {
    if (key < T.key) {
      T = T.left;
    } else {
      T = T.right;
    }
  }
  return T;
}

function findMax(T) {
  while (T.right) {
    T = T.right;
  }
  return T;
}

function findMin(T) {
  while (T.left) {
    T = T.left;
  }
  return T;
}

// find next node, of which the key is bigger than x
function succesor(x) {
  if (x.right) {
    return findMin(x.right);
  }

  let y = x.p;
  while (y && y.right === x) {
    x = y;
    y = y.p;
  }
  return y;
}

function predecessor() {
  if (x.left) {
    return findMax(x.left);
  }

  let y = x.p;
  while (y && y.left === x) {
    x = y;
    y = y.p;
  }
  return y;
}

function insert(v, T) {
  const z = new TreeNode(v);

  y = null;
  x = T;

  while (x) {
    y = x;
    if (z.key < x.key) {
      x = x.left;
    } else {
      x = x.right;
    }
  }

  z.p = y;
  if (z.p === null) {
    T = z;
  }
  if (z.key > y.key) {
    y.right = z;
  } else {
    y.left = z;
  }
}

// Transplant v to u
function transplant(T, u, v) {
  if (u.p.left === u) {
    u.p.left = v;
  } else {
    u.p.right = v;
  }
  v.p = u.p;
  if (T === u) {
    T = v;
  }
}

// When removing z node from tree, there're 4 conditions. z has both left and right children( the most complex one )
// z only has one child, z has no child
function remove(T, z) {
  if (!z.left) {
    transplant(T, z, z.right);
  } else if (!z.right) {
    transplant(T, z, z.left);
  } else {
    // has both children
    let y = findMin(z.right);
    if (y.p !== z) {
      transplant(T, z, z.right);
      y.right = z.right;
      y.right.p = y;
    }
    transplant(T, z, y);
    y.left = z.left;
    y.left.p = y;
  }
}
