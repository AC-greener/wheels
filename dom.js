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
    var value = classes[key]
    var methodName = value ? 'add' : 'remove'
    node.classList[methodName](key)
  }
  return node
}

//命名空间设计模式   防止覆盖变量
window.zhuDOM = {}
zhuDOM.getSiblings = getSiblings
zhuDOM.addClass = addClass

//直接在原型上面加方法
Node.prototype.getSiblings = function() {
  var allChildren = this.parentNode.children
  var siblings = {length:0}
  for(var i = 0; i < allChildren.length; i++) {
    if(allChildren[i] !== this) {
      siblings[siblings.length++] = allChildren[i]
    }
  }
  console.log(siblings)
  return siblings
}

//不用call 用隐式的帮你传一个this
var el = document.getElementById('app')
// el.getSiblings.call(el)


//万一原型上吧别人的方法覆盖呢？  jQuery设计模式  给我node 我给你返回一个全新的node
window.jQuery = function(nodeOrSelector) {
  var nodes = {}
  if(typeof nodeOrSelector === 'string') {
    var temp = document.querySelectorAll(nodeOrSelector)   //伪数组
    for(let i = 0; i <temp.length; i++) {
      nodes[i] = temp[i]
    }
    nodes.length = temp.length
  } else if(nodeOrSelector instanceof Node) {
    nodes = {0: nodeOrSelector, length: 1}
  }

  console.log('nodes', nodes)
  nodes.getSiblings =  function() {
    var allChildren = node.parentNode.children
    var siblings = {length:0}
    for(var i = 0; i < allChildren.length; i++) {
      if(allChildren[i] !== node) {
        siblings[siblings.length++] = allChildren[i]
      }
    }
    console.log(siblings) 

    return siblings
  },

  nodes.addClass = function(classes) {
    classes.forEach((value) => {
      for(var i = 0; i < nodes.length; i++) {
        nodes[i].classList.add(value)
      }
    })
   
  },
  nodes.text = function(text) {
    if(text === undefined) {  //getText
      var texts = []
      for(var i = 0; i < nodes.length; i++) {
        texts.push(nodes[i].textContent)
      }
      console.log(texts)
      return texts
    } else { //setText
      for(var i = 0; i < nodes.length; i++) {
        nodes[i].textContent = text
      }
    }
  }
  return nodes
}
var node2 = jQuery('ul>li')

node2.addClass(['red'])
node2.text('1')
