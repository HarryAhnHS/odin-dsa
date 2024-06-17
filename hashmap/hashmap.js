class Node {
    constructor(key, val) {
        this.key = key;
        this.val = val || null;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    // Append new node with val to end of list
    append(key, val) {
        if (this.head == null) {
            // List empty
            this.head = new Node(key, val);
        }
        else {
            // List not empty
            let temp = this.head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = new Node(key, val);
        }
    }

    // Prepend new node with val to start of list
    prepend(key, val) {
        if (this.head == null) {
            // List empty
            this.head = new Node(key, val);
        }
        else {
            // List not empty
            let temp = this.head; // Store original head
            this.head = new Node(key, val);
            this.head.next = temp; // Set original head to second
        }
    }

    // Return size of list
    size() {
        if (this.head == null) return 0; // List empty
        // List not empty
        let temp = this.head;
        let cnt = 1;
        while (temp.next != null) {
            cnt++;
            temp = temp.next;
        }
        return cnt;
    }

    // Return first element in list
    getHead() {
        if (this.head == null) return null;
        return this.head;
    }

    // Return last element in list
    getTail() {
        if (this.head == null) return null; // List empty
        let temp = this.head;
        while (temp.next != null) {
            temp = temp.next;
        }
        return temp;
    }

    // return node at index
    at(index) {
        let temp = this.head;
        for (let i = 0; i < index; i++) {
            temp = temp.next;
        }
        return temp;
    }

    // Pop last element out of list
    pop() {
        if (this.head != null) {
            // List not empty
            let temp = this.head;
            if (temp.next == null) {
                // EDGE - only 1 element in list
                this.head = null;
            }
            else {
                // More than 1 element in list
                let prev = this.head;
                while (temp.next != null) {
                    // Traverse to second to last element
                    prev = temp;
                    temp = temp.next;
                }
                prev.next = null; 
            }

        }
    }

    // Contains - returns true if the passed in value is in the list and otherwise returns false.
    contains(key) {
        if (this.head == null) return false; // List empty
        // List not empty
        let temp = this.head;

        while (temp != null) {
            if (temp.key == key) return true;
            temp = temp.next;
        }
        // If doesn't exist
        return false;
    }

    // Find key - return index
    find(key) {
        if (this.head == null) return null; // List empty
        // List not empty
        let temp = this.head;
        let idx = 0;

        while (temp != null) {
            if (temp.key == key) return idx;
            temp = temp.next;
            idx++;
        }
        // If doesn't exist
        return null;
    }

    remove(key) {
        let temp = this.head;
        let prev = null;
        if (this.head.key == key) {
            // EDGE If key is first element
            this.head = this.head.next;
        }
        else {
            while (temp != null) {
                if (temp.key == key) {
                    prev.next = temp.next;
                    return true;
                }
                prev = temp;
                temp = temp.next;
            }
        }
        return false;
    }

    getKeys() {
        if (this.head == null) return "Empty"; // List empty
        // List not empty
        let temp = this.head;
        let arr = [];
        while (temp != null) {
            arr.push(temp.key);
            temp = temp.next;
        }
        return arr;
    }

    getVals() {
        if (this.head == null) return "Empty"; // List empty
        // List not empty
        let temp = this.head;
        let arr = [];
        while (temp != null) {
            arr.push(temp.val);
            temp = temp.next;
        }
        return arr;
    }

    getEntries() {
        if (this.head == null) return "Empty"; // List empty
        // List not empty
        let temp = this.head;
        let arr = [];
        while (temp != null) {
            let pair = [];
            pair.push(temp.key);
            pair.push(temp.val);
            arr.push(pair);

            temp = temp.next;
        }
        return arr;
    }

    // Represent list to string
    toString() {
        if (this.head == null) return "Empty"; // List empty
        // List not empty
        let temp = this.head;
        let string = "";
        while (temp != null) {
            string += `( ${temp.val} ) => `;
            temp = temp.next;
        }
        string += 'null';

        return string;
    }
}

class HashMap {
    constructor() {
        this.table = new Array(16).fill(null);
        this.load_factor = 0.75;
        this.capacity = this.table.length;
    }

    getTable() {
        return this.table;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    resize() {
        let old = this.table;
        this.capacity *= 2;
        this.table = new Array(this.capacity).fill(null);
        old.forEach((bucket) => {
            if (bucket != null) {
                this.set(bucket.key, bucket.val);
            }
        })

        console.log('resizing to :' + this.capacity);

    }

    set(key, value) {
        if (this.table[this.hash(key)] == null) {
            // If empty bucket - create new LinkedList data structure
            this.table[this.hash(key)] = new LinkedList();
        }

        if (this.has(key)) {
            // If not empty, but same key exists in bucket
            let idx = this.table[this.hash(key)].find(key);
            this.table[this.hash(key)].at(idx).val = value; // Replace the key's value in bucket
        }
        else {
            // If key doesn't exist
            this.table[this.hash(key)].append(key,value);
        }

        console.log(key + ' hashed to ' + this.hash(key));

        // Grow if capacity is loaded
        if (this.length() > this.load_factor * this.capacity) {
            this.resize();
        }
    }

    get(key) {
        if (this.has(key)) {
            let idx = this.table[this.hash(key)].find(key);
            return this.table[this.hash(key)].at(idx).val;
        }
        else return null;
    }

    has(key) {
        return (this.table[this.hash(key)] != null && 
        this.table[this.hash(key)].contains(key));
    }

    remove(key) {
        if (this.has(key)) {
            this.table[this.hash(key)].remove(key);
            return true;
        }
        return false;
    }

    length() {
        let cnt = 0;
        this.table.forEach((bucket) => {
            if (bucket != null) {
                cnt += bucket.size();
            }
        })
        return cnt;
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
                bucket.getKeys().forEach((key) => {
                    keysArray.push(key);
                })
            }
        })
        return keysArray;
    }

    values() {
        let valuesArray = [];
        this.table.forEach((bucket) => {
            if (bucket != null) {
                bucket.getVals().forEach((val) => {
                    valuesArray.push(val);
                })
            }
        })
        return valuesArray;
    }

    entries() {
        let entriesArray = [];
        this.table.forEach((bucket) => {
            if (bucket !== null) {
                bucket.getEntries().forEach((pair) => {
                    entriesArray.push(pair);
                })
            }
        })
        return entriesArray;
    }
}