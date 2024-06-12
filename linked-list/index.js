class Node {
    constructor(val) {
        this.val = val || null;
        this.next = null;
    }
}

class linkedList {
    constructor() {
        this.head = null;
    }

    // Append new node with val to end of list
    append(val) {
        if (this.head == null) {
            // List empty
            this.head = new Node(val);
        }
        else {
            // List not empty
            let temp = this.head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = new Node(val);
        }
    }

    // Prepend new node with val to start of list
    prepend(val) {
        if (this.head == null) {
            // List empty
            this.head = new Node(val);
        }
        else {
            // List not empty
            let temp = this.head; // Store original head
            this.head = new Node(val);
            this.head.next = temp; // Set original head to second
        }
    }

    // Return size of list
    size() {
        if (this.head == null) return 0; // List empty
        // List not empty
        let temp = this.head;
        let cnt = 0;
        while (temp.next != null) {
            cnt++;
            temp = temp.next;
        }
        return cnt;
    }

    // Return first element in list
    head() {
        return this.head;
    }

    // Return last element in list
    tail() {
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
    contains(value) {
        if (this.head == null) return false; // List empty
        // List not empty
        let temp = this.head;

        while (temp != null) {
            if (temp.val == value) return true;
            temp = temp.next;
        }
        // If doesn't exist
        return false;
    }

    // Find value - return index
    find(value) {
        if (this.head == null) return null; // List empty
        // List not empty
        let temp = this.head;
        let idx = 0;

        while (temp != null) {
            if (temp.val == value) return idx;
            temp = temp.next;
            idx++;
        }
        // If doesn't exist
        return null;
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

// Testing
let list = new linkedList;
list.append(1);
list.append(2);
list.prepend(10);
list.pop();
list.pop();
list.pop();
console.log(list.toString());