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