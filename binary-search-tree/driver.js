console.log("Driver")

// TEST1
let a = [20, 30, 50, 70, 80, 85, 75, 20, 65, 60, 40, 36, 34, 32]
let tree = new Tree(a);

tree.printTree();
tree.insert(19)
tree.printTree();
tree.delete(19);
tree.printTree();
tree.delete(60);
tree.printTree();
console.log(tree.find(22));

console.log(tree.levelOrder());

function log(thing) {
    console.log(thing);
}
console.log(tree.levelOrder(log));

console.log(tree.height(tree.find(20)));
console.log(tree.height(tree.find(50)));

console.log(tree.depth(tree.find(20)));
console.log(tree.depth(tree.find(50)));
console.log(tree.depth(tree.find(31)));
console.log(tree.depth(tree.find(-1)));

// Return array of random length with random values
const randomArray = () => {
    const maxVal = 100;
    const maxLength = 100;
    let randLength = Math.floor(Math.random() * maxLength);

    let arr = [];
    for (let i = 0; i < randLength; i++) {
        arr.push(Math.floor(Math.random() * maxVal));
    }
    return arr;
}

console.log("TEST2: Random Array = " + randomArray());

tree = new Tree(randomArray());
tree.printTree();

console.log(tree.isBalanced());

console.log("Preorder: " + tree.preOrder());
console.log("Inorder: " + tree.inOrder());
console.log("Postorder: " + tree.postOrder());

// Unbalancing tree
tree.insert(101);
tree.insert(112);
tree.insert(123);
tree.insert(134);
tree.printTree();

console.log(tree.isBalanced()); // Output: false

// Rebalancing tree
tree.rebalance();
tree.printTree();

console.log(tree.isBalanced()); // Output: true


