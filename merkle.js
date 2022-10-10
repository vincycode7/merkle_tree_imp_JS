`
Merkle implementation in JS
`
// import * as keccak256 from 'keccak256.js'
const keccak256 = require('keccak256')
const utf8 = require("utf8")

function keccakDigestFunction(x){
    // implementation of keccak256 function
    k = keccak256(x)
    return k.toString('hex')
}

class MerkleNode{
    constructor(item) {
        `
            This  class can be used to instantiate a merkle node
        `
            if (!(item instanceof MerkleNode)){
                this.content = item;
            }  
            else{
                this.content = item.content;
            }
            this.hash_func = null;
            this.next_nodes = []
            this.prev_nodes = []
      }
        

    set_hash_func(hash_func){
        `
            This method is used to set the hash function for a node
        `
        this.hash_func = hash_func;
        return this
    }
    
    get_hash_func(){
        `
            This method gets the hash function for a specific node
        `
        return this.hash_func
    }
        
    get_hash_content(){
        if(this.hash_func===null){
            throw("please run set_hash_func to set a hash function for the node");
        } 
        return this.hash_func(utf8.encode(this.content))
    }

    le(node2){
        `
            Custom less than or equal to operator
        `
        if (!(node2 instanceof MerkleNode)){
            throw("node2 should be of type MerkleNode");
        }  
        if(this.hash_func===null){
            throw("please run set_hash_func to set a hash function for the node 1");
        } 
        if(node2.hash_func===null){
            throw("please run set_hash_func to set a hash function for the node 2");
        } 
        return utf8.encode(this.get_hash_content()) <= utf8.encode(node2.get_hash_content())
    }

  
    eq(node2){
        `
            Custom equal to operator
        `
        if (!(node2 instanceof MerkleNode)){
            throw("node2 should be of type MerkleNode");
        }  
        if(this.hash_func===null){
            throw("please run set_hash_func to set a hash function for the node 1");
        } 
        if(node2.hash_func===null){
            throw("please run set_hash_func to set a hash function for the node 2");
        } 
        return utf8.encode(this.get_hash_content()) === utf8.encode(node2.get_hash_content())
    }

    add(node2){
        `
            Custom addition to operator
        `
        if (!(node2 instanceof MerkleNode)){
            throw("node2 should be of type MerkleNode");
        }  
        if(this.hash_func===null){
            throw("please run set_hash_func to set a hash function for the node 1");
        } 
        if(node2.hash_func===null){
            throw("please run set_hash_func to set a hash function for the node 2");
        } 
        let content = this.get_hash_content() + node2.get_hash_content();
        let contentNode = new MerkleNode(content);
        contentNode = contentNode.set_hash_func(this.get_hash_func());
        return contentNode
    }
}

class MerkleTree{
    constructor(digestFunction,entries) {
        `
        This class contains the implementation of the merkle tree.
        `
        this.digestFunction = digestFunction;
        var merkle_nodes_ = []
        this.merkle_nodes = []
        this.max_content = entries.length
        this.treeMap = []
        this.pointers = []
        for (let each_entry in entries) {
            merkle_nodes_.push(new MerkleNode(entries[each_entry]));
          };
        
        for (let each_node in merkle_nodes_) {
            merkle_nodes_[each_node].set_hash_func(this.digestFunction)
            this.merkle_nodes.push(merkle_nodes_[each_node])
          };
      }
        
        
    getProofOfInclusion(index){
        let value_idx = null
        for (let each_entry in this.treeMap) {
            if (index===this.treeMap[each_entry]['value'].get_hash_content()){
                console.log(index,this.treeMap[each_entry]['value'].get_hash_content() )
                value_idx=each_entry
            }
          };
        return {
            peakBagging: this.treeMap.slice(value_idx),
            root: this.getRoot(),
            siblings: 2,
            width: this.max_content
        }
    }
    updateChild(index, value){
        let new_node = new MerkleNode(value)
        new_node.set_hash_func(this.digestFunction)
        this.merkle_nodes[index] = new_node
    }
    find_merkel_hash(hashed_contents){
        // Initialize the block
        let sorted_hased_contents = []
        if (!(Array.isArray(hashed_contents))){
            throw("Provide list of hash(es)");
        }  
        if (!(hashed_contents)){
            throw("There are no content for the merkle operator");
        }  

        // Sort the hashed_contents and assign to the block
        // sorted_hased_contents = sorted(hashed_contents)
        sorted_hased_contents = hashed_contents;

        // Check if block is of even length else balance out block to be of even length
        while (sorted_hased_contents.length !== 1 && sorted_hased_contents.length % 2 !== 0){
            // console.log(sorted_hased_contents.slice(-1))
            sorted_hased_contents.push(sorted_hased_contents.slice(-1)[0]);
        }

        // Store length of the block
        let sorted_hased_contents_len = sorted_hased_contents.length;

        // Get s
        if (sorted_hased_contents_len === 1){
            let value = sorted_hased_contents[0]
            this.treeMap.push({'type':'c', 'value':value})
            this.prev_nodes = [value]
            return value;
        }
        else if(sorted_hased_contents_len > 1){
            let div = ~~(sorted_hased_contents_len/2)
            // create a new node
            // var parent_node = MerkleNode(sorted_hased_contents)
            var node_1 = this.find_merkel_hash(sorted_hased_contents.slice(0,div))
            var node_2 = this.find_merkel_hash(sorted_hased_contents.slice(div))
        }
                        

        // This helps prevent the duplication of nodes
        // console.log(node_1.eq(node_2))
        // if (node_1.eq(node_2)){
        //      var new_node = node_1
        // }
        // else{            
        //     var new_node = node_1.add(node_2)
        //     console.log(new_node.get_hash_content())
        // }
        var new_node = node_1.add(node_2)
        new_node.next_nodes = [node_1, node_2]
        node_1.prev_nodes = [new_node]
        node_2.prev_nodes = [new_node]
        this.treeMap.push({'type':'n', 'value':new_node})
        return  new_node

    }


    getRoot(){

        // hashed_contents = [each_merkle_node for each_merkle_node in self.merkle_nodes]
        // print(hashed_contents)
        var root_ = this.find_merkel_hash(this.merkle_nodes) 
        // for(let each_node in root_.next_nodes){
        //     console.log(root_.next_nodes[each_node].prev_nodes)
        // }
        return root_.get_hash_content()
    }
}

module.exports = {
    MerkleTree, MerkleNode, keccakDigestFunction
}