class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function sortedArrayToBST(arr, start, end) {
    // Base case
    if (start > end) {
        return;
    }

    let mid = Math.floor((start+end)/2);
    let root = new Node(arr[mid]);

    root.left = sortedArrayToBST(arr, start, mid-1);
    root.right = sortedArrayToBST(arr, mid+1, end);

    return root;
}

function preOrder(node) {
    if (node == null) return;
    console.log(node.val);
    preOrder(node.left);
    preOrder(node.right);
}

let arr = [1,2,3,4,5,6,7,8,9,10];
let root = sortedArrayToBST(arr, 0, 9);

console.log(root);

preOrder(root);