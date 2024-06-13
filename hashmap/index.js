class Node {
    constructor(key,val=null) {
        this.key = key;
        this.val = val;
    }
}

class HashMap {
    constructor() {
        this.table = new Array(16).fill(null);
        this.load_factor = 0.75;
        this.capacity = this.table.length;
        this.loaded = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.capacity;
    }

    resize() {
        let old = this.table;
        this.capacity *= 2;
        this.table = new Array(this.capacity).fill(null);
        old.forEach((bucket) => {
            if (bucket != null) {
                set(bucket.key,bucket.val);
            }
        })

    }

    set(key, value) {
        // Grow if capacity is loaded
        if (this.loaded > this.load_factor * this.capacity) {
            this.resize();
        }
        this.table[this.hash(key)] = new Node(key,value);
        this.loaded++;
    }

    get(key) {
        return this.table[this.hash(key)];
    }

    has(key) {
        return (this.table[this.hash(key)] != null);
    }

    remove(key) {
        if (this.has(key)) {
            this.table[this.hash(key)] = null;
            return true;
        }
        return false;
    }

    length() {
        return this.loaded;
    }

    clear() {
        this.table.forEach((bucket) => {
            bucket = null;
        })
    }

    keys() {
        let keysArray = [];
        this.table.forEach((bucket) => {
            if (bucket != null) {
                keysArray.push(bucket.key);
            }
        })
        return keysArray;
    }

    values() {
        let valuesArray = [];
        this.table.forEach((bucket) => {
            if (bucket != null) {
                keysArray.push(bucket.val);
            }
        })
    }

    entries() {
        let entriesArray = [];
        this.table.forEach((bucket) => {
            let entry = [];
            if (bucket != null) {
                entry.push(bucket.key);
                entry.push(bucket.val);
            }
            entriesArray.push(entry);
        })
        return entriesArray;
    }
}

let hashmap = new HashMap();
console.log(hashmap.keys());
console.log(hashmap.entries());
console.log(hashmap.entries());
