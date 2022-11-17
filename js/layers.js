addLayer("wf", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "木鱼", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: n(0),
		    buymul: n(0),
		    wfa: n(0),
		    wfm: n(0),
		    wfp: n(0),
		    gd: n(0),
		    dy: n(0),
		    js: n(0),
		    wx: n(0),
    }},
    color: "#f5deb3",
    resource: "功德", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires:n(10),
    exponent:1,
    baseAmount(){return player.points},//基础资源数量
    baseResource:"点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = n(1)
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = n(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    branches(){return ["money"]},
    layerShown(){return true},
    clickables:{
      10:{
			title(){return "购买数量:"+player.wf.buymul.add(1).floor()},
			canClick(){return true},
			style(){return {"border-radius":"0px","width":"150px","height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"#deb887",}},
			onClick(){
			  if(player.wf.buymul==0) player.wf.buymul = n(9)
			  else if(player.wf.buymul==9) player.wf.buymul = n(99)
			  else if(player.wf.buymul==99) player.wf.buymul = n(999)
			  else if(player.wf.buymul==999) player.wf.buymul = n(0)
               },
	    },
      11:{
			title(){return "<h2>敲一下木鱼</h2>"},
			canClick(){return true},
			style(){return {"border-radius":"0px","width":"150px","height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"#deb887",}},
			onClick(){
			var x = n(player.wf.gd)
			var y = n(1)
			y=y.add(clickableEffect("wf",21))
			y=y.mul(clickableEffect("wf",22))
			y=y.mul(clickableEffect("wf",31)).mul(clickableEffect("wf",32)).mul(clickableEffect("wf",33))
			y=y.pow(clickableEffect("wf",23))
			if(y.gte(1e10))y=y.sub(1e10).pow(0.9).add(1e10)
      player.wf.gd = x.add(y)
      var mp3 = "/music/"+xnumber(0,2)+".wav"
      var mp3 = new Audio(mp3)
      mp3.play()
               },
	  },
	  21:{
			title(){return "<h2>木鱼强化α</h2><br>强化次数:"+format(player.wf.wfa,0)+"<br>将你的木鱼强化+"+format(this.effect(),2)+"<br>需求:"+format(this.cost(),2)+"功德"},
			canClick(){return player.wf.gd.gte(this.cost())},
			style(){
        if(layers.wf.clickables["21"].canClick())
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"#deb887",}
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
      cost(){
         var cost = n(10)
         var x = n(1.5)
         var y = n(player.wf.wfa)
         y = y.add(player.wf.buymul)
         cost=cost.mul(x.pow(y)).floor()
          return cost
		      	},
			onClick(){
        player.wf.gd=player.wf.gd.sub(this.cost())
        player.wf.wfa=player.wf.wfa.add(1).add(player.wf.buymul)
               },
      onHold(){
        this.onClick()
               },
      effect(){
        var eff=n(player.wf.wfa)
        return eff
               },
		},
		22:{
			title(){return "<h2>木鱼强化β</h2><br>强化次数:"+format(player.wf.wfm,0)+"<br>将你的木鱼强化*"+format(this.effect(),2)+"<br>需求:"+format(this.cost(),2)+"功德"},
			canClick(){return player.wf.gd.gte(this.cost())},
			style(){
        if(layers.wf.clickables["22"].canClick())
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"#deb887",}
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
      cost(){
         var cost = n(500)
         var x = n(1.8)
         var y = n(player.wf.wfm)
         y = y.add(player.wf.buymul)
         cost=cost.mul(x.pow(y)).floor()
          return cost
		      	},
			onClick(){
        player.wf.gd=player.wf.gd.sub(this.cost())
        player.wf.wfm=player.wf.wfm.add(1).add(player.wf.buymul)
               },
      onHold(){
        this.onClick()
               },
      effect(){
        var eff=n(player.wf.wfm)
        eff=eff.div(2).add(1)
        return eff
               },
		},
		23:{
			title(){return "<h2>木鱼强化γ</h2><br>强化次数:"+format(player.wf.wfp,0)+"<br>将你的木鱼强化^"+format(this.effect(),2)+"<br>需求:"+format(this.cost(),2)+"功德"},
			canClick(){return player.wf.gd.gte(this.cost())},
			style(){
        if(layers.wf.clickables["23"].canClick())
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"#deb887",}
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
      cost(){
         var cost = n(10000)
         var x = n(2)
         var y = n(player.wf.wfp)
         y = y.add(player.wf.buymul)
         cost=cost.mul(x.pow(y)).floor()
          return cost
		      	},
			onClick(){
        player.wf.gd=player.wf.gd.sub(this.cost())
        player.wf.wfp=player.wf.wfp.add(1).add(player.wf.buymul)
               },
      onHold(){
        this.onClick()
               },
      effect(){
        var eff=n(player.wf.wfp)
        eff=eff.div(20).add(1).pow(0.5)
        return eff
               },
		},
		31:{
			title(){return "<h2>净化地狱</h2><br>净化次数:"+format(player.wf.dy,0)+"<br>将你的功德获取*"+format(this.effect(),2)+"<br>需求:"+format(this.cost(),2)+"功德"},
			canClick(){return player.wf.gd.gte(this.cost())},
			style(){
        if(layers.wf.clickables["31"].canClick())
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"#8b0000",}
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
      cost(){
         var cost = n(100)
         var x = n(3)
         var y = n(player.wf.dy)
         y = y.add(player.wf.buymul)
         cost=cost.mul(x.pow(y)).floor()
          return cost
		      	},
			onClick(){
        player.wf.gd=player.wf.gd.sub(this.cost())
        player.wf.dy=player.wf.dy.add(1).add(player.wf.buymul)
               },
      onHold(){
        this.onClick()
               },
      effect(){
        var eff=n(player.wf.dy)
        eff=eff.pow(1.5).add(1)
        return eff
               },
		},
		32:{
			title(){return "<h2>救世之举</h2><br>救世次数:"+format(player.wf.js,0)+"<br>将你的功德获取*"+format(this.effect(),2)+"<br>需求:"+format(this.cost(),2)+"功德"},
			canClick(){return player.wf.gd.gte(this.cost())},
			style(){
        if(layers.wf.clickables["32"].canClick())
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"#87cefa",}
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
      cost(){
         var cost = n(2000)
         var x = n(5)
         var y = n(player.wf.js)
         y = y.add(player.wf.buymul)
         cost=cost.mul(x.pow(y)).floor()
          return cost
		      	},
			onClick(){
        player.wf.gd=player.wf.gd.sub(this.cost())
        player.wf.js=player.wf.js.add(1).add(player.wf.buymul)
               },
      onHold(){
        this.onClick()
               },
      effect(){
        var eff=n(player.wf.js)
        eff=eff.pow(1.6).add(1)
        return eff
               },
		},
		33:{
			title(){return "<h2>文明之心</h2><br>凝聚次数:"+format(player.wf.wx,0)+"<br>将你的功德获取*"+format(this.effect(),2)+"<br>需求:"+format(this.cost(),2)+"功德"},
			canClick(){return player.wf.gd.gte(this.cost())},
			style(){
        if(layers.wf.clickables["33"].canClick())
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"#ff0000",}
         return {"border-radius":"0px","width":"185px","height":"185px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
      cost(){
         var cost = n(10000)
         var x = n(10)
         var y = n(player.wf.wx)
         y = y.add(player.wf.buymul)
         cost=cost.mul(x.pow(y)).floor()
          return cost
		      	},
			onClick(){
        player.wf.gd=player.wf.gd.sub(this.cost())
        player.wf.wx=player.wf.wx.add(1).add(player.wf.buymul)
               },
      onHold(){
        this.onClick()
               },
      effect(){
        var eff=n(player.wf.wx)
        eff=eff.pow(1.8).add(1)
        return eff
               },
		},
    },
    tabFormat:{
      寺庙建设:{
      buttonStyle() {return  {'color': 'white'}},
      content:[
      ["row", [ ["clickable", 10] ] ] ,
      "blank",
      ["row", [ ["clickable", 11] ] ] ,
      ["display-text",function() { return "你有"+format(player.wf.gd)+"点功德" }] ,
      "blank","blank","blank",
      ["row", [ ["clickable", 21],["clickable", 22],["clickable", 23], ] ] ,
      ],
      },
      行使善事:{
      buttonStyle() {return  {'color': 'white'}},
      content:[
      ["row", [ ["clickable", 10] ] ] ,
      "blank",
      ["row", [ ["clickable", 11] ] ] ,
      ["display-text",function() { return "你有"+format(player.wf.gd)+"点功德" }] ,
      "blank","blank","blank",
      ["row", [ ["clickable", 31],["clickable", 32],["clickable",33] ] ] ,
      ],
      },
    },
}),
addLayer("money", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "M", // 这是节点上显示的字母
    position: 1, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
    }},
    color: "lime",
    resource: "重置点", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount(){return player.points},//基础资源数量
    baseResource:"点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return true},
})
