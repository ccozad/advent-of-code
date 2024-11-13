const { group } = require('console');
const fs = require('fs');
const fileName = "data/day-25-test.txt";

class Node {
    constructor(uuid, index) {
        this.uuid = uuid;
        this.neighbors = [];
        this.index = index;
    }
}

class Client {
    constructor() {
        this.nodes = [];
        this.node_map = {};
    }

    addNode(uuid) {
        if (!this.nodeExists(uuid)) {
            let node = new Node(uuid, this.nodes.length);
            console.log(`Adding node ${uuid} at index ${node.index}`);
            this.nodes.push(node);
            this.node_map[uuid] = node.index;
        }
    }

    connectNodes(uuid1, uuid2) {
        let node1 = this.nodes[this.nodeIndex(uuid1)];
        let node2 = this.nodes[this.nodeIndex(uuid2)];

        if (node1 == node2) {
            return;
        } else {
            console.log(`Connecting ${uuid1} <-> ${uuid2}`);
            if (!node1.neighbors.includes(node2.index)) {
                node1.neighbors.push(node2.index);
            }
    
            if (!node2.neighbors.includes(node1.index)) {
                node2.neighbors.push(node1.index);
            }
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
        let node1 = this.nodes[this.nodeIndex(uuid1)];
        let node2 = this.nodes[this.nodeIndex(uuid2)];

        return node1.neighbors.includes(node2.index) && node2.neighbors.includes(node1.index);
    }
}

function itemsInCommon(arr1, arr2, uuid1) {
    let count = arr2.includes(uuid1) ? 1 : 0;
    for(let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
            count++;
        }
    }
    return count;
}

function part1() {
    const file = fs.readFileSync(fileName, 'utf8');
    const lines = file.split(/\r?\n/);

    let client = new Client();
    for(let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(":", "");
        let elements = lines[i].split(" ");
        client.addNode(elements[0]);

        for(let j = 1; j < elements.length; j++) {
            client.addNode(elements[j]);
            client.connectNodes(elements[0], elements[j]);
        }
    }

    for(let i = 0; i < client.nodes.length; i++) {
        client.nodes[i].neighbors.sort();
    }

    console.log(client.nodes);

    /*let connections = {
        strongConnections: [],
        weakConnections: [],
        noConnections: []
    }

    for(let i = 0; i < client.nodes.length; i++) {
        let node = client.nodes[i];
        for(let j = 0; j < client.nodes.length; j++) {
            if( i != j) {
                let node2 = client.nodes[j];

                let shareditems = itemsInCommon(node.neighbors, node2.neighbors, node.index);
                console.log(`Shared items between ${node.uuid} <-> ${node2.uuid}: ${shareditems}`);
                if (shareditems > 1) {
                    //console.log(`Strong connection between ${node.uuid} <-> ${node2.uuid}`);
                    connections.strongConnections.push( {a: node.uuid, b: node2.uuid});
                } else if(shareditems == 1) {
                    //console.log(`Weak connection between ${node.uuid} <-> ${node2.uuid}`);
                    connections.weakConnections.push( {a: node.uuid, b: node2.uuid})
                } else {
                    //console.log(`No connection between ${node.uuid} <-> ${node2.uuid}`);
                    connections.noConnections.push( {a: node.uuid, b: node2.uuid})
                }
            }
        }
    }

    console.log(connections);*/

    /*let group1 = {};
    let group2 = {};

    group1[connections.strongConnections[0].a] = true;
    group1[connections.strongConnections[0].b] = true;
    for(let i = 1; i < connections.strongConnections.length; i++) {
        let connection = connections.strongConnections[i];
        if (group2.hasOwnProperty(connection.a) || group1.hasOwnProperty(connection.b)) {
            group1[connection.a] = true;
            group1[connection.b] = true;
        } else {
            group2[connection.a] = true;
            group2[connection.b] = true;
        }
    }*/
}

part1();