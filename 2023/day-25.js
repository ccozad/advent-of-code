const fs = require('fs');
const fileName = "data/day-25-test.txt";

class Node {
    constructor(uuid, parentIndex, index, size) {
        this.uuid = uuid;
        this.parentIndex = parentIndex;
        this.index = index;
        this.size = size;
    }
}

class Client {
    constructor() {
        this.nodes = [];
        this.node_map = {};
        this.set_count = 0;

        let rootNode = new Node("root", 0, 0, 0);
        this.nodes.push(rootNode);
    }

    addNode(uuid) {
        if (!this.nodeExists(uuid)) {
            let node = new Node(uuid, this.nodes.length, this.nodes.length, 1);
            console.log(`Adding node ${uuid} at index ${node.index}`);
            this.nodes.push(node);
            this.node_map[uuid] = node.index;
            this.set_count++;
            console.log(`Set count: ${this.set_count}`);
        }
    }

    connectNodes(uuid1, uuid2) {
        let root1 = this.findRootIndex(uuid1);
        let root2 = this.findRootIndex(uuid2);
        console.log(`Connecting ${uuid1} <-> ${uuid2}`);
        if (root1 == root2) {
            console.log(`Nodes ${uuid1} and ${uuid2} are already connected`);
            console.log(`root1: ${root1} root2: ${root2}`);
            return;
        } else {
            let node1 = this.nodes[root1];
            let node2 = this.nodes[root2];
            if (node1.size < node2.size) {
                node1.parentIndex = node2.index;
                node2.size += node1.size;
            } else {
                node2.parentIndex = node1.index;
                node1.size += node2.size;
            }
            this.set_count--;
            console.log(`Set count: ${this.set_count}`);
            console.log(`${JSON.stringify(this.nodes, null, 2)}`);
        }
    }

    disjointSetCount() {
        return this.set_count;
    }

    findRootIndex(uuid) {
        let nodeIndex = this.nodeIndex(uuid);
        if ( nodeIndex > 0) {
            let node = this.nodes[nodeIndex];
            while (node.parentIndex != node.index) {
                node = this.nodes[node.parentIndex];
            }
            return node.index;
        } else {
            return 0;
        }
    }

    nodeCount() {
        return this.nodes.length;
    }

    nodeExists(uuid) {
        return this.node_map.hasOwnProperty(uuid);
    }

    nodeIndex(uuid) {
        if (this.nodeExists(uuid)) {
            return this.node_map[uuid];
        } else {
            return 0;
        }
    }

    nodesConnected(uuid1, uuid2) {
        let root1 = this.findRootIndex(uuid1);
        let root2 = this.findRootIndex(uuid2);
        return root1 > 0 && root1 == root2;
    }
}

function part1() {
    const file = fs.readFileSync(fileName, 'utf8');
    const lines = file.split(/\r?\n/);
    const ignoreConnections = {
        "pzl-hfx": true
    }

    let client = new Client();
    let output = {
        rawGraph:{
            nodes: [],
            edges: []
        }
    };
    let nodeLookup = {};
    let setCount = 0;
    let key = "";
    for(let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(":", "");
        let elements = lines[i].split(" ");
        client.addNode(elements[0]);
        if (!nodeLookup.hasOwnProperty(elements[0])) {
            nodeLookup[elements[0]] = {
                id: elements[0],
                node_id: elements[0],
            };
            output.rawGraph.nodes.push(nodeLookup[elements[0]]);
        }
        for(let j = 1; j < elements.length; j++) {
            key = `${elements[0]}-${elements[j]}`;
            if (ignoreConnections.hasOwnProperty(key)) {
                continue;
            }

            //console.log(key);

            client.addNode(elements[j]);
            if (!nodeLookup.hasOwnProperty(elements[j])) {
                nodeLookup[elements[j]] = {
                    id: elements[j],
                    node_id: elements[j],
                };
                output.rawGraph.nodes.push(nodeLookup[elements[j]]);
            }
            client.connectNodes(elements[0], elements[j]);
            output.rawGraph.edges.push({
                source_id: elements[0],
                target_id: elements[j]
            });
            //console.log(`Connected ${elements[0]} <-> ${elements[j]}`);
            if (client.disjointSetCount() == 1 && setCount > client.disjointSetCount()) {
                console.log(`Set count: ${setCount} New count: ${client.disjointSetCount()}`)
                console.log(`Disconnect candidate: ${elements[0]} <-> ${elements[j]}`);
            }
            setCount = client.disjointSetCount();
        }
    }

    let outputLines = [];
    outputLines.push("graph G {");
    for(let i = 0; i < output.rawGraph.edges.length; i++) {
        outputLines.push(`    ${output.rawGraph.edges[i].source_id} -- ${output.rawGraph.edges[i].target_id};`);
    }
    outputLines.push("}");

    fs.writeFileSync("data/day-25-test.dot", outputLines.join("\n"));
}

part1();