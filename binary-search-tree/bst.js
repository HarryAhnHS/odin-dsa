class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root =  this.buildTree(arr);
    }

    mergeSort(arr) {
        if (arr.length <= 1) {
            return arr; //BC
        }
        // // Recursive case - head recursion
        let left = this.mergeSort(arr.slice(0,arr.length/2));
        let right = this.mergeSort(arr.slice(arr.length/2));
        
        return merge(left,right);
    }

    unique(arr) {
        var seen = {};
        return arr.filter(function(num) {
            return seen.hasOwnProperty(num) ? false : (seen[num] = true);
        });
    }

    sortedArrayToBST(arr, start, end) {
        // Base case
        if (start > end) {
            return null;
        }
    
        let mid = Math.floor((start+end)/2);
        let root = new Node(arr[mid]);
    
        root.left = this.sortedArrayToBST(arr, start, mid-1);
        root.right = this.sortedArrayToBST(arr, mid+1, end);
    
        return root;
    }

    buildTree(arr) {
        return this.sortedArrayToBST(this.mergeSort(this.unique(arr)), 0, this.unique(arr).length-1);
    }

    callPreOrder(callback = null) {
        if (callback) preOrder(this.root, undefined, callback);
        else {
            let array = [];
            preOrder(this.root, array);
            return array;
        }
    }

    callInOrder(callback = null) {
        if (callback) inOrder(this.root, undefined, callback);
        else {
            let array = [];
            inOrder(this.root, array);
            return array;
        }
    }

    callPostOrder(callback = null) {
        if (callback) postOrder(this.root, undefined, callback);
        else {
            let array = [];
            postOrder(this.root, array);
            return array;
        }
    }

    printTree() {
        console.log(this.root);
        prettyPrint(this.root);
    }
}

// Utility
function merge(left,right) {
    // Merge 2 sorted halfs
    const merged = [];
    // Indices trackers for each half
    let l = 0;
    let r = 0;

    while (l < left.length && r < right.length) {
        // While both sides are not empty
        if (left[l] <= right[r]) {
            merged.push(left[l++])
        }
        else {
            merged.push(right[r++]);
        }
    }
    // One side is empty - fill merged with other side
    if (l == left.length){
        while (r < right.length) merged.push(right[r++]);
    }
    else if (r == right.length) {
        while (l < left.length) merged.push(left[l++]);
    };
    return merged;
}
function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}
function preOrder(node, arr, callback = null) {
    if (node == null) return;

    if (callback) callback(node.val);
    else arr.push(node.val);

    preOrder(node.left);
    preOrder(node.right);
}
function inOrder(node, arr, callback = null) {
    if (node == null) return;

    inOrder(node.left);
    if (callback) callback(node.val);
    else arr.push(node.val);
    inOrder(node.right);
}
function postOrder(node, arr, callback = null) {
    if (node == null) return;
    
    postOrder(node.left);
    postOrder(node.right);
    if (callback) callback(node.val);
    else arr.push(node.val);
}

let a = [5,2,3,4,8,7,1,3,1,5,99,6];
let tree = new Tree(a);

tree.printTree();
