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

    delete(value, root = this.root) {
        // Base case - delete leaf
        if (root === null) return null;
        // Traverse down to find value
        if (value > root.val) root.right = this.delete(value, root.right);
        else if (value < root.val) root.left = this.delete(value, root.left);
        else {
            // Value Matches Root
            if (root.left === null) {
                // Has right child only
                return root.right;
            }
            else if (root.right === null) {
                // Has left child only
                return root.left;
            }
            else {
                // Has 2 children
                // Find min value - traverse right side of tree until no left node
                const min = this.findMinimum(root.right);
                // Replace current root value with min value
                root.val = min;
                // Delete min value - recursive call
                root.right = this.delete(min, root.right);
            }
        }
        return root;
    }

    // Find min value of subtree
    findMinimum(root = this.root) {
        let current = root;
        while (current.left != null) {
            current = current.left;
        }
        return current.val;
    }

    // opted for recursive find method
    find(value, root = this.root) {
        if (root === null) return "Not found";

        if (value > root.val) return this.find(value, root.right);
        else if (value < root.val) return this.find(value, root.left);
        else {
            // Found node - return subtree root node
            return root;
        }
    }

    // Provide each argument as callback in BFS order, or as an array if no callback 
    // Iterative - using queue
    levelOrder(callback = null) {
        let queue = [];
        let array = [];
        queue.push(this.root);

        while (queue.length > 0) {
            let curr = queue[0];
            if (callback) callback(curr);
            else array.push(curr.val);
            
            if (curr.left !== null) queue.push(curr.left);
            if (curr.right !== null) queue.push(curr.right);

            queue = queue.slice(1); // FIFO
        }
        if (!callback) return array;
    }

    preOrder(callback = null, root = this.root, arr = []) {
        if (root === null) return;
    
        if (callback) callback(root);
        else arr.push(root.val);
    
        this.preOrder(callback, root.left, arr);
        this.preOrder(callback, root.right, arr);

        if (!callback) return arr;
    }

    inOrder(callback = null, root = this.root, arr = []) {
        if (root === null) return;
    
        this.inOrder(callback, root.left, arr);

        if (callback) callback(root);
        else arr.push(root.val);

        this.inOrder(callback, root.right, arr);

        if (!callback) return arr;
    }
    
    postOrder(callback = null, root = this.root, arr = []) {
        if (root === null) return; 
    
        this.postOrder(callback, root.left, arr);
        this.postOrder(callback, root.right, arr);

        if (callback) callback(root);
        else arr.push(root.val);

        if (!callback) return arr;
    }

    // max # of edges to a leaf node
    height = (node, h=-1) => {
        if (node === null) return h;
        let left = this.height(node.left, h+1); 
        let right = this.height(node.right, h+1);

        return Math.max(left,right);
    }

    //  # of edges to root node - returns 0 if not found
    depth = (node, root = this.root, d = 0) => {
        if (root === null || node === null) return;
        if (node.val > root.val) return this.depth(node,root.right, d + 1);
        else if (node.val < root.val) return this.depth(node, root.left, d + 1);
        else {
            return d;
        }
    }

    isBalanced() {
        let leftHeight = this.height(this.root.left);
        let rightHeight = this.height(this.root.right);

        return Math.abs(leftHeight - rightHeight) <= 1;
    }

    rebalance() {
        let arr = this.inOrder(); // Sorted array
        this.root = this.buildTree(arr);

    }

    printTree() {
        prettyPrint(this.root);
    }
}

// Pretty Print Utility
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