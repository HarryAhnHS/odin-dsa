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