
![Screenshot0](https://user-images.githubusercontent.com/5965718/194774397-5befbc2c-4bf0-43d1-958f-9d13e76b0a79.png)
Step1:

install keccak256 using `npm install keccak256` <br>
install utf8 using `npm install utf8`

Step 2
run `node index.js`

Getroot
```
//usage
let entries = [A,B,C,D,E];
let merkleTree = new MerkleTree(keccakDigestFunction,entries);
let output = merkleTree.getRoot();
console.log(output); //126a97e6963a8d86b53757446743db0d66e62dad392d29d2986a8a52348a2cea
```

updateChild and getProofOfInclusion
```
//usage
let entries = [A,B,C,D,E];
let merkleTree = new MerkleTree(keccakDigestFunction,entries);
let output = merkleTree.getRoot();
console.log(output); //126a97e6963a8d86b53757446743db0d66e62dad392d29d2986a8a52348a2cea
merkleTree.updateChild(2,'sffeefefegf')
console.log(merkleTree.getProofOfInclusion(0))
console.log(merkleTree.treeMap)
```
![Screenshot1](https://user-images.githubusercontent.com/5965718/194120697-6a3f423d-b376-497c-9a2b-24b4d9341a93.png)

![Screenshot2](https://user-images.githubusercontent.com/5965718/194119930-bc9d92cf-b70c-4a6b-90ac-d74bf9c4b482.png)