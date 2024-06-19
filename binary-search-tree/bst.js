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
        
        return this.merge(left,right);
    }

    merge(left,right) {
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
    };

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

    exists(value) {
        let temp = this.root;
        while (temp) {
            // traverse tree - left/right depending on value
            if (value == temp.val) return true;
            temp = (value > temp.val) ? temp.right : temp.left;
        }
        return false;
    }

    insert(value, root = this.root) {
        if (root === null) return new Node(value);

        if (value > root.val) root.right = this.insert(value, root.right);
        else if (value < root.val) root.left = this.insert(value, root.left);
        return root;
    }

    delete(value) {
        
    }

    preOrder(node = this.root, arr = [], callback = null) {
        if (node == null) return;
    
        if (callback) callback(node.val);
        else arr.push(node.val);
    
        this.preOrder(node.left, arr);
        this.preOrder(node.right, arr);

        return arr;
    }

    inOrder(node = this.root, arr = [], callback = null) {
        if (node == null) return;

        this.inOrder(node.left, arr);

        if (callback) callback(node.val);
        else arr.push(node.val);

        this.inOrder(node.right, arr);

        return arr;
    }
    
    postOrder(node = this.root, arr = [], callback = null) {
        if (node == null) return;

        this.postOrder(node.left, arr);

        this.postOrder(node.right, arr);

        if (callback) callback(node.val);
        else arr.push(node.val);

        return arr;
    }

    printTree() {
        console.log(this.root);
        prettyPrint(this.root);
    }
}

// Utility
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

let a = [5,2,3,4,9,7,1,3,1,5,99,6];
let b = [20, 30, 50, 70, 80, 85, 75, 20, 65, 60, 40, 36, 34, 32]
let tree = new Tree(b);

tree.printTree();
tree.insert(31)
tree.insert(22)
tree.insert(19)
tree.printTree();
