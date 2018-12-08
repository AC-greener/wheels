/*
代码优化技巧1，如果存在类似的代码，就可以优化

*/
function getSiblings(node) {
  var allChildren = node.parentNode.children
  var siblings = {length:0}
  for(var i = 0; i < allChildren.length; i++) {
    if(allChildren[i] !== node) {
      siblings[siblings.length++] = allChildren[i]
    }
  }
  return siblings
}

function addClass(node, classes) {
  for(key in classes) {
    if(classes[key]) {
      node.classList.add(key)
    } else {
      node.classList.remove(key)
    }
  }
  return node
}