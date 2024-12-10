class AdventDisk {
    constructor(initialState) {
        this.nodes = [];
        var id = 0;
        for (let i = 0; i < initialState.length; i++) {
            if (i % 2 === 0) {
                this.nodes.push({
                    type: "file",
                    size: parseInt(initialState[i]),
                    id: id
                });
                id++;
            } else {
                var size = parseInt(initialState[i]);
                if (size > 0) {
                    this.nodes.push({
                        type: "free_space",
                        size: parseInt(initialState[i])
                    })
                }
            }
        }
    }

    print() {
        console.log(this.nodes);
    }

    // The disk is compacted when there is only free space at the end of the disk
    isCompacted() {
        if (this.nodes[this.nodes.length - 1].type === "free_space") {
            var fileSeen = false;
            for(let i = this.nodes.length - 2; i >= 0; i--) {
                if(this.nodes[i].type === "file") {
                    fileSeen = true;
                } else if(this.nodes[i].type === "free_space" && fileSeen) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    getLastFile() {
        for(let i = this.nodes.length - 1; i >= 0; i--) {
            if(this.nodes[i].type === "file") {
                return {
                    index: i,
                    file: {...this.nodes[i]}
                };
            }
        }
    }

    getFirstFreeSpace() {
        for(let i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].type === "free_space") {
                return {
                    index: i,
                    freeSpace: {...this.nodes[i]}
                };
            }
        }
    }

    moveFile(fileInfo, freeSpaceInfo) {
        if (fileInfo.file.size < freeSpaceInfo.freeSpace.size) {
            //console.log("Free space is larger than file");
            this.nodes[freeSpaceInfo.index].size -= fileInfo.file.size;
            this.nodes = [...this.nodes.slice(0, freeSpaceInfo.index), fileInfo.file, ...this.nodes.slice(freeSpaceInfo.index)];
            this.nodes[fileInfo.index + 1].type = "free_space";
            delete this.nodes[fileInfo.index + 1].id;
        } else if (fileInfo.file.size == freeSpaceInfo.freeSpace.size) {
            //console.log("Free space is equal to file");
            this.nodes[freeSpaceInfo.index]["type"] = fileInfo.file.type;
            this.nodes[freeSpaceInfo.index].id = fileInfo.file.id;
            this.nodes[fileInfo.index].type = "free_space";
            delete this.nodes[fileInfo.index].id;
        } else {
            //console.log("Free space is smaller than file");
            this.nodes[freeSpaceInfo.index].type = fileInfo.file.type;
            this.nodes[freeSpaceInfo.index].id = fileInfo.file.id;
            this.nodes[fileInfo.index].size -= freeSpaceInfo.freeSpace.size;
            this.nodes.push(freeSpaceInfo.freeSpace);
        }

    }

    compact() {
        var isCompacted = this.isCompacted();
        while (!isCompacted) {
            var lastFile = this.getLastFile();
            var firstFreeSpace = this.getFirstFreeSpace();
            this.moveFile(lastFile, firstFreeSpace);
            //this.print();
            isCompacted = this.isCompacted();
        }
    }

    checksum() {
        var sum = BigInt(0);
        var index = 0
        for(let i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].type === "file") {
                for(let j = index; j < index + this.nodes[i].size; j++) {
                    sum += BigInt(j * this.nodes[i].id);
                }
            }
            index += this.nodes[i].size;
        }

        return sum;
    }
}

module.exports = AdventDisk;