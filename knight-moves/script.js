function knightMoves(start, finish) {
    let pred = new Array(8).fill(null).map(() => new Array(8).fill(null)); // Predecessor array to trace steps (coords)
    let visited = new Array(8).fill(null).map(() => []); // Visited array - adjacency list
    let queue = []; // Queue to hold all visited coords
    let path = [];

    // Bounds check start and finish
    if (start[0] > 7 || start[1] > 7 || finish[0] > 7 || finish[1] > 7 || 
        start[0] < 0 || start[1] < 0 || finish[0] < 0 || finish[1] < 0) {
        console.log("Start/finish out of bounds");
        return -1;
    }

    queue.push(start);
    pred[start[0]][start[1]] = "S"; // Set start in pred

    while (queue.length > 0) {
        let node = queue[0];
        visited[node[0]].push(node[1]);

        console.log(node);

        if (node[0] == finish[0] && node[1] == finish[1]) {
            // If match, trace back
            let steps = 0;
            let curr = node;
            path.push(curr); // Add finish to path

            while (pred[curr[0]][curr[1]] != 'S') {
                curr = pred[curr[0]][curr[1]]; // set curr as predecessor
                path.unshift(curr); // Add each predecessor step to front of path array
                steps++;
            }
            console.log(`Shortest Path took ${steps} step(s): ` + JSON.stringify(path));
            return path;
        }
        else {
            // If no match, add all 8 neighbors to queue - if bounds check + no visited
            let ne = [node[0]+1, node[1]+2];
            let nw = [node[0]-1, node[1]+2];
            let se = [node[0]+1, node[1]-2];
            let sw = [node[0]-1, node[1]-2];
            let en = [node[0]+2, node[1]+1];
            let es = [node[0]+2, node[1]-1];
            let wn = [node[0]-2, node[1]+1];
            let ws = [node[0]-2, node[1]-1];

            [ne, nw, se, sw, en, es, wn, ws].forEach((next) => {
                if  (next[0] >= 0 && next[0] <= 7 && next[1] >= 0 && next[1] <= 7 
                    && !(visited[next[0]].includes(next[1]))) {
                        // If neighbor is within bounds + not visited: 
                        queue.push(next); // Add neighbor to queue
                        pred[next[0]][next[1]] = node; // Set neighbor's predecessor as original node
                    }
            })
        }
        queue.shift(); // Pop out first node FIFO
    }
}

knightMoves([0,1], [1,3]);
