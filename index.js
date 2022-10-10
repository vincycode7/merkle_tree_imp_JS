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
console.log(output); //126a97e6963a8d86b53757446743db0d66e62dad392d29d2986a8a52348a2cea
// console.log(merkleTree.getProofOfInclusion('sff'))
// merkleTree.updateChild(2,'sffeefefegf')
// console.log(merkleTree.getProofOfInclusion(0))
// console.log(merkleTree.treeMap)
// verify 

