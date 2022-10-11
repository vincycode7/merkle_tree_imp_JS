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
merkleTree.updateChild(1,'sffeefefegf')
merkleTree.updateChild(0,'sffeeejefefefegf')
// merkleTree.updateChild(2,'sffeeeklwdjefefefegf')
// merkleTree.updateChild(3,'sffeealskjnceklwdjefefefegf')
output = merkleTree.getRoot();
console.log(output); //8fb61de24708ddae9b89fc0f97f14ea6d88ec64ad879c229f44d7bcf2b5c609c
hash = keccakDigestFunction('566219a21fa845dac884ad694f1e4861f7fb5f9216bc10d412c0adeddecd7f4633e406e29108896bad70e8e624cc088301e5fcc2925e6c4c865a108117e10ef5')
console.log("\n\nGetting the proof of inclusion of a node with hash, ", hash)
included_node = merkleTree.getProofOfInclusion(hash)
console.log(included_node.peakBagging.get_hash_content())
console.log(included_node)
// verify 

