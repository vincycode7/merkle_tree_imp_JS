merkle = require('./merkle.js')
const MerkleNode = merkle.MerkleNode
const MerkleTree = merkle.MerkleTree
const keccakDigestFunction = merkle.keccakDigestFunction

let A = `
# Introduction

This is the thesis for the whitepaper
`

let B = `
# Main Point 1

Lorem ipsum
`


let C = `
# Main Point 2

Lorem ipsum
`


let D = `
# Main Point 3

Lorem ipsum
`


let E = `
# Conclusion

In conclusion our whitepaper proves the following thesis
`

//usage
let entries = [A,B,C,D,E];
let merkleTree = new MerkleTree(keccakDigestFunction,entries);
let output = merkleTree.getRoot();
console.log("Initial output of root")
console.log(output); //126a97e6963a8d86b53757446743db0d66e62dad392d29d2986a8a52348a2cea

console.log("\n\nOutput of root when node 0 and 1 are updated and the new root is calculatedd and displayed")
merkleTree.updateChild(1,'sffeefefegf') //Replace the content of A
merkleTree.updateChild(0,'sffeeejefefefegf') // Replace the content of B
// merkleTree.updateChild(2,'sffeeeklwdjefefefegf')
// merkleTree.updateChild(3,'sffeealskjnceklwdjefefefegf')
output = merkleTree.getRoot();
console.log(output); //8fb61de24708ddae9b89fc0f97f14ea6d88ec64ad879c229f44d7bcf2b5c609c
hash = keccakDigestFunction(C)
console.log("\n\nGetting the proof of inclusion of a node with hash, ", hash)
included_node = merkleTree.getProofOfInclusion(hash)
if (Object.keys(included_node).length === 0){
    console.log(included_node) // This helps prevent error when a node is node found
}
else{
    console.log(included_node.peakBagging.get_hash_content())
    console.log(included_node)
}
// verify 

