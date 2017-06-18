
var color = ['rgb(20,50,120)','rgb(255,255,255)','rgb(20,150,220)','rgb(50,200,240)']

var functions = [
  {
    args: [100],
    fn: function(el,h){
      el.style.height = h + 'px'
      return el
    }
  },
  {
    args: [100],
    fn: function(el,w){
      el.style.width = w + 'px'
      return el
    }
  },
  {
    args: [100],
    fn: function(el,p){
      el.style.padding = p + 'px'
      return el
    }
  },
  {
    args: [100],
    fn: function(el,p){
      el.style.paddingLeft = p + 'px'
      return el
    }
  },
  {
    args: [100],
    fn: function(el,p){
      el.style.paddingRight = p + 'px'
      return el
    }
  },
  {
    args: [100],
    fn: function(el,p){
      el.style.paddingTop = p + 'px'
      return el
    }
  },
  {
    args: [100],
    fn: function(el,p){
      el.style.paddingBottom = p + 'px'
      return el
    }
  },
  {
    args: [color.length],
    fn: function(el,i){
      el.style.backgroundColor = color[i]
      return el
    }
  },
  {
    args: [color.length],
    fn: function(el,i){
      el.style.color = color[i]
      return el
    }
  },
  {
    args: [50],
    fn: function(el,r){
      el.style.borderRadius = r + 'px'
      return el
    }
  },
  {
    args: [color.length],
    fn: function(el,i){
      el.style.borderColor = color[i]
      return el
    }
  },
  {
    args: [1],
    fn: function(el,b){
      if(b == 0)
        el.style.border = 'none'
      return el
    }
  },
  {
    args: [3],
    fn: function(el,i){
      if(i == 1) el.style.textAlign = 'left'
      else if(i == 2) el.style.textAlign = 'center'
      else el.style.textAlign = 'right'
      return el
    }
  },
  {
    args: [50,color.length,100],
    fn: function(el,s,c,o){
      var col = color[c].replace('rgb','rgba').replace(')',','+ (o/100) +')')
      el.style.boxShadow = '0px 0px ' + s + 'px 0px ' + col + ' inset';
      return el
    }
  },
  {
    args: [50,color.length,100],
    fn: function(el,s,c,o){
      var col = color[c].replace('rgb','rgba').replace(')',','+ (o/100) +')')
      el.style.boxShadow = '0px 0px ' + s + 'px 0px ' + col;
      return el
    }
  }
]

var compositeFunctions = [
  {
    args: [],
    fn: function(el){
      var children = el.children
      for(var i = 0; i < children.length; i++){
        if(children[i].style){
          var ref = Math.floor(Math.random() * 10) + 1
          if(ref > 5) ref = 1;
          else ref = 0;
          children[i].style.padding = children[ref].style.padding || 'auto'
        }
      }
      return el
    }
  },
  {
    args: [50],
    fn: function(el,p){
      var children = el.children
      for(var i = 0; i < children.length; i++){
        if(children[i].style){
          children[i].style.padding = p + 'px'
        }
      }
      return el
    }
  },
  {
    args: [40],
    fn: function(el,m){
      var children = el.children
      for(var i = 0; i < children.length; i++){
        if(children[i].style){
          children[i].style.margin = m + 'px'
        }
      }
      return el
    }
  },
  {
    args: [4],
    fn: function(el,p){
      if(p == 1) el.style.flexDirection = 'row'
      if(p == 2) el.style.flexDirection = 'row-reverse'
      if(p == 3) el.style.flexDirection = 'column'
      if(p == 4) el.style.flexDirection = 'column-reverse'
      return el
    }
  },
  {
    args: [5],
    fn: function(el,p){
      if(p == 1) el.style.alignItems = 'flex-start'
      if(p == 2) el.style.alignItems = 'flex-end'
      if(p == 3) el.style.alignItems = 'center'
      if(p == 4) el.style.alignItems = 'stretch'
      if(p == 5) el.style.alignItems = 'baseline'
      return el
    }
  },
  {
    args: [5],
    fn: function(el,p){
      if(p == 1) el.style.alignContent = 'flex-start'
      if(p == 2) el.style.alignContent = 'flex-end'
      if(p == 3) el.style.alignContent = 'center'
      if(p == 4) el.style.alignContent = 'stretch'
      if(p == 5) el.style.alignContent = 'baseline'
      return el
    }
  },
  {
    args: [3],
    fn: function(el,p){
      if(p == 1) el.style.flexWrap = 'nowrap'
      if(p == 2) el.style.flexWrap = 'wrap'
      if(p == 3) el.style.flexWrap = 'wrap-reverse'
      return el
    }
  },
  {
    args: [color.length],
    fn: function(el,i){
      el.style.backgroundColor = color[i]
      return el
    }
  },
  {
    args: [50],
    fn: function(el,i){
      el.style.borderRadius = i + 'px'
      return el
    }
  },
  {
    args: [1],
    fn: function(el,m){
      var children = el.children
      for(var i = 0; i < children.length; i++){
        if(children[i].style){
          if((i+1) % 2 == 0){
            children[i].style.borderTopLeftRadius = m + 'px'
            children[i].style.borderBottomLeftRadius = m + 'px'
          } else {
            children[i].style.borderTopRightRadius = m + 'px'
            children[i].style.borderBottomRightRadius = m + 'px'
          }
        }
      }
      return el
    }
  },
  {
    args: [100],
    fn: function(el,p){
      el.style.padding = p + 'px'
      return el
    }
  },
  {
    args: [50,color.length,100],
    fn: function(el,s,c,o){
      var col = color[c].replace('rgb','rgba').replace(')',','+ (o/100) +')')
      el.style.boxShadow = '0px 0px ' + s + 'px 0px ' + col + ' inset';
      return el
    }
  },
]
