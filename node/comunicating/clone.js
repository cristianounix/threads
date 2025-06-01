import v8 from 'v8'

function structuredClone(obj) {
  return v8.deserialize(v8.serialize(obj))
}

const obj = {
  func: () => {}, // Function is not suported pass to threads
  name: "Joe",
  more: {
    items: ["1","2"],
    test: {
      foo: "bar"
    }
  },
  created: new Date(),
}

const clonedObj = structuredClone(obj)
clonedObj.name = 'Cris'
clonedObj.more.test.foo = 'ddd'

console.log("Original Obj: ", obj)
console.log("Cloned Obj: ", clonedObj)
