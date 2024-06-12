function factorial(n) {
    if (n == 1 || n == 0) {
        return n;
    }
    return n * factorial(n-1);
}

function collatz(n) {
    if (n == 1) return 0;
    else if (n % 2 == 0) return 1+collatz(n/2);
    else if (n % 2 == 1) return 1+collatz(3*n+1);
}

function fib(n, a=[0,1]) {
    if (n <= a.length) {
        return a;
    }
    return fib(n,[...a, a[a.length-2]+a[a.length-1]]); // Recursive case
}

function mergeSort(a) {
    if (a.length <= 1) {
        return a; //BC
    }
    // // Recursive case - head recursion
    let left = mergeSort(a.slice(0,a.length/2));
    let right = mergeSort(a.slice(a.length/2));
    
    return merge(left,right);
}

// Helper
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