(function() {
  var nm = module.Module('slots');
  (function(require, exports, moduleId) {
    var log = require('log');
    var monads = require('monads');
    var controller = require('controller');
    var events = require('events');
    var Ring = (function() {
      function Ring() {
        function privateData() {
          this.shape = null;
          this.flipped = null;
        }
        var p_vars = new privateData();
        var shape = p_vars.shape;
        Object.getOwnPropertyDescriptor(this,'shape') || Object.defineProperty(this,'shape', {get: function(){return shape;},set: function(e){shape=e;}});
        var flipped = p_vars.flipped;
        Object.getOwnPropertyDescriptor(this,'flipped') || Object.defineProperty(this,'flipped', {get: function(){return flipped;},set: function(e){flipped=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.onclick=this.onclick.bind(this);
          this.shape=properties.shape;
          this.flipped={};
          for(section in Ring.sections) {
            this.shape.add(monads.DOMable({
              tagName:'div'
            }).on('load').attributes({
              'class':'plane ' + section
            }).on('click').bind(this.onclick).continuation);
          }
        }
        return ctor.apply(this,args) || this;
      }
      Ring.prototype['onclick'] = function(event) {
        var target=monads.DOMable({
          element:event.target
        }).on('load');
        if(target.element().tagName.toLowerCase() !== 'img') {
          var img=target.child(0);
          target=monads.DOMable({
            element:img
          }).on('load');
        }
        var f=this.flipped[target.id()];
        if(f) {
          this.flipped[target.id()]=null;
          target.transition({
            property:'transform',
            timing:'1s'
          }).rotate({
            y:0
          });
        } else {
          this.flipped[target.id()]=target;
          target.transition({
            property:'transform',
            timing:'1s'
          }).rotate({
            y:180
          });
        }
      };
      Ring.sections = {
        "one":1,
        "two":2,
        "three":3,
        "four":4,
        "five":5,
        "six":6,
        "seven":7,
        "eight":8,
        "nine":9,
        "ten":10,
        "eleven":11,
        "twelve":12
      };
      Ring.init = (function () {
        var styles=[{
          selector:'.plane',
          style:"position:absolute;height:200px;width:200px;border:transparent;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;text-align:center;font-family:Times,serif;font-size:124pt;color:black;background:transparent;-webkit-transition:-webkit-transform 2s,opacity 2s;-webkit-backface-visibility:hidden;-moz-transition:-moz-transform 2s, opacity 2s;-moz-backface-visibility: hidden;"
        }];
        monads.Styleable(styles).on("load").onstyle();
        styles=[];
        var i=0;
        for(section in Ring.sections) {
          styles.push({
            selector:'.ring > .' + section,
            style:"-webkit-transform:rotateX(" + i + "deg) translateZ(380px);-moz-transform:rotateX(" + i + "deg) translateZ(380px);"
          });
          i+=30;
        }
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.sections = Ring.sections;
        __.init = Ring.init;
        __.constructor = Ring;
        return new Ring(args && args.length && args[0]);
      };
    })();
    var Container = (function() {
      function Container() {
        function privateData() {
          this.container = null;
          this.stage = null;
          this.shape = null;
          this.plane = null;
          this.lastY = null;
          this.offsetY = null;
        }
        var p_vars = new privateData();
        var container = p_vars.container;
        Object.getOwnPropertyDescriptor(this,'container') || Object.defineProperty(this,'container', {get: function(){return container;},set: function(e){container=e;}});
        var stage = p_vars.stage;
        Object.getOwnPropertyDescriptor(this,'stage') || Object.defineProperty(this,'stage', {get: function(){return stage;},set: function(e){stage=e;}});
        var shape = p_vars.shape;
        Object.getOwnPropertyDescriptor(this,'shape') || Object.defineProperty(this,'shape', {get: function(){return shape;},set: function(e){shape=e;}});
        var plane = p_vars.plane;
        Object.getOwnPropertyDescriptor(this,'plane') || Object.defineProperty(this,'plane', {get: function(){return plane;},set: function(e){plane=e;}});
        var lastY = p_vars.lastY;
        Object.getOwnPropertyDescriptor(this,'lastY') || Object.defineProperty(this,'lastY', {get: function(){return lastY;},set: function(e){lastY=e;}});
        var offsetY = p_vars.offsetY;
        Object.getOwnPropertyDescriptor(this,'offsetY') || Object.defineProperty(this,'offsetY', {get: function(){return offsetY;},set: function(e){offsetY=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.ontouchstart=this.ontouchstart.bind(this);
          this.ontouchmove=this.ontouchmove.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
          this.shape=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'shape ring'
          }).on('touchstart').bind(this.ontouchstart).on('touchmove').bind(this.ontouchmove).on('touchend').bind(this.ontouchend).continuation;
          Ring({
            shape:this.shape
          });
          this.stage=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'stage'
          }).translate({
            z:'-200px'
          });
          this.stage.add(this.shape);
          this.container=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'container'
          });
          this.container.add(this.stage);
          this.lastY=undefined;
          this.offsetY=0;
        }
        return ctor.apply(this,args) || this;
      }
      Container.prototype['ontouchstart'] = function(event) {
        event.preventDefault();
        var top=this.container.element().style.top;
        this.lastY=parseInt(top,10);
        this.lastY=Math.isNumber(this.lastY)?this.lastY:0;
        this.offsetY=this.shape.pointerY(event) - this.lastY;
      };
      Container.prototype['ontouchmove'] = function(event) {
        event.preventDefault();
        this.lastY=this.shape.pointerY(event) - this.offsetY;
        this.shape.rotate({
          x:-this.lastY
        });
      };
      Container.prototype['ontouchend'] = function(event) {
        event.preventDefault();
        this.lastY=undefined;
      };
      Container.init = (function () {
        var styles=[{
          selector:'.container',
          style:"margin:25% 70px 0 70px;-webkit-perspective:800px;-webkit-perspective-origin:50% 0px;-moz-perspective:800px;-moz-perspective-origin: 50% 0px;"
        },{
          selector:'.stage',
          style:"width:100%;height:100%;-webkit-transition:-webkit-transform 2s;-webkit-transform-style:preserve-3d;-moz-transition:-moz-transform 2s;-moz-transform-style:preserve-3d;"
        },{
          selector:'.shape',
          style:"position:relative;margin:0 auto;height:200px;width:200px;-webkit-transform-style:preserve-3d;-webkit-transition:-webkit-transform 1s;-moz-transform-style:preserve-3d;-moz-transition:-moz-transform 1s;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Container.init;
        __.constructor = Container;
        return new Container(args && args.length && args[0]);
      };
    })();
    var Main = (function() {
      function Main() {
        function privateData() {
          this.main = null;
          this.container = null;
        }
        var p_vars = new privateData();
        var main = p_vars.main;
        Object.getOwnPropertyDescriptor(this,'main') || Object.defineProperty(this,'main', {get: function(){return main;},set: function(e){main=e;}});
        var container = p_vars.container;
        Object.getOwnPropertyDescriptor(this,'container') || Object.defineProperty(this,'container', {get: function(){return container;},set: function(e){container=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.main=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'id':'main'
          });
          this.container=[];
          for(var i=0;i < 4;++i) {
            container.push(Container());
            this.main.add(container.top().container);
          }
          this.main.insert(document.body);
          controller.Controller.subscribe('slotdata',this.onslotdata.bind(this));
        }
        return ctor.apply(this,args) || this;
      }
      Main.prototype['onslotdata'] = function(event) {
        console.log('event received!!!');
        event.detail.forEach(function (info,i) {
          monads.DOMable({
            element:this.container[info.slot].shape.child(info.index)
          }).on('load').add(monads.DOMable({
            tagName:'img'
          }).on('load').attributes({
            src:info.image
          }).round(12,12,12,12));
        },this);
      };
      Main.init = (function () {
        var styles=[{
          selector:'body',
          style:"background-color:black;color:white;font-family:'Lucida Grande',Verdana,Arial;font-size:12px;"
        },{
          selector:'#main',
          style:"display:-webkit-box;display:-moz-box;-webkit-box-pack:center;-moz-box-pack:center;width:100%;height:100%;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Main.init;
        __.constructor = Main;
        return new Main(args && args.length && args[0]);
      };
    })();
    var AppType = (function() {
      function AppType() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          Main();
          var images=[{
            slot:0,
            index:0,
            image:'../slots/images/solec.jpg'
          },{
            slot:0,
            index:1,
            image:'../slots/images/Rapsel_elle.jpg'
          },{
            slot:0,
            index:11,
            image:'../slots/images/carlisle.jpg'
          },{
            slot:1,
            index:0,
            image:'../slots/images/gp_radiantbarrier.jpg'
          },{
            slot:1,
            index:1,
            image:'../slots/images/thermastrand.jpg'
          },{
            slot:1,
            index:11,
            image:'../slots/images/unicosystem.jpg'
          },{
            slot:2,
            index:0,
            image:'../slots/images/gsky-com.jpg'
          },{
            slot:2,
            index:1,
            image:'../slots/images/kitchen_recess.jpg'
          },{
            slot:2,
            index:11,
            image:'../slots/images/whiteglass_counters.jpg'
          },{
            slot:3,
            index:0,
            image:'../slots/images/hafele_loaxled.jpg'
          },{
            slot:3,
            index:1,
            image:'../slots/images/solec.jpg'
          },{
            slot:3,
            index:11,
            image:'../slots/images/silentFx.jpg'
          }];
          controller.Controller.publish(events.CustomEvent({
            type:'slotdata',
            canBubble:false,
            isCanceleable:true,
            detail:images
          }));
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = AppType;
        return new AppType(args && args.length && args[0]);
      };
    })();
    const App=AppType();
    exports.App = App;
  })(require, nm.getExports(), nm.getId());
})();

