(function() {
  var nm = module.Module('slots');
  (function(require, exports, moduleId) {
    var log = require('log');
    var monads = require('monads');
    var controller = require('controller');
    var events = require('events');
    var ConstsType = (function() {
      function ConstsType() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
        }
        return ctor.apply(this,args) || this;
      }
      ConstsType.columnWidth = 200;
      ConstsType.columnHeight = 200;
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.columnWidth = ConstsType.columnWidth;
        __.columnHeight = ConstsType.columnHeight;
        __.constructor = ConstsType;
        return new ConstsType(args && args.length && args[0]);
      };
    })();
    const Consts=ConstsType();
    var Ring = (function() {
      function Ring() {
        function privateData() {
          this.shape = null;
          this.moved = null;
        }
        var p_vars = new privateData();
        var shape = p_vars.shape;
        Object.getOwnPropertyDescriptor(this,'shape') || Object.defineProperty(this,'shape', {get: function(){return shape;},set: function(e){shape=e;}});
        var moved = p_vars.moved;
        Object.getOwnPropertyDescriptor(this,'moved') || Object.defineProperty(this,'moved', {get: function(){return moved;},set: function(e){moved=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.ontouchstart=this.ontouchstart.bind(this);
          this.ontouchmove=this.ontouchmove.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
          this.shape=properties.shape;
          this.moved=false;
          for(section in Ring.sections) {
            var ps=monads.DOMable({
              tagName:'div'
            }).on('load').attributes({
              'class':'plane ' + section
            });
            ps.on('touchstart').bind(this.ontouchstart.curry(ps)).on('touchmove').bind(this.ontouchmove.curry(ps)).on('touchend').bind(this.ontouchend.curry(ps));
            this.shape.add(ps);
          }
        }
        return ctor.apply(this,args) || this;
      }
      Ring.prototype['ontouchstart'] = function(ps,event) {
        this.moved=false;
      };
      Ring.prototype['ontouchmove'] = function(ps,event) {
        this.moved=true;
      };
      Ring.prototype['ontouchend'] = function(ps,event) {
        if(!this.moved) {
          var target=monads.DOMable({
            element:ps.child(0)
          }).on('load');
          var flipped=target.computed('-webkit-transform');
          if(flipped === 'none') {
            target.rotate({
              y:180
            });
          } else {
            target.rotate({
              y:0
            });
          }
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
          style:"position:absolute;height:" + ConstsType.columnHeight + "px;width:" + ConstsType.columnWidth + "px;border:transparent;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;text-align:center;font-family:Times,serif;font-size:24pt;color:black;background:transparent;-webkit-transition:-webkit-transform 2s,opacity 2s;-webkit-backface-visibility:hidden;-moz-transition:-moz-transform 2s, opacity 2s;-moz-backface-visibility: hidden;"
        },{
          selector:'.card',
          style:"width:100%;height:100%;-webkit-transform-style:preserve-3d;-webkit-transition:all 0.3s linear;"
        },{
          selector:'.face',
          style:"position:absolute;width:100%;height:100%;-webkit-backface-visibility:hidden;"
        },{
          selector:'.face.back',
          style:"display:block;-webkit-transform:rotateY(180deg);box-sizing:border-box;padding:10px;color:white;text-align:center;background-color:#aaa;-webkit-border-radius:12px;"
        }];
        monads.Styleable(styles).on("load").onstyle();
        styles=[];
        var i=0;
        for(section in Ring.sections) {
          styles.push({
            selector:'.ring > .' + section,
            style:"-webkit-transform:rotateX(" + i + "deg) translateZ(480px);-moz-transform:rotateX(" + i + "deg) translateZ(480px);"
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
          this.active = null;
          this.container = null;
          this.direction = null;
          this.lastY = null;
          this.moved = null;
          this.plane = null;
          this.stage = null;
          this.shape = null;
          this.startY = null;
          this.startTime = null;
          this.totalY = null;
        }
        var p_vars = new privateData();
        var active = p_vars.active;
        Object.getOwnPropertyDescriptor(this,'active') || Object.defineProperty(this,'active', {get: function(){return active;},set: function(e){active=e;}});
        var container = p_vars.container;
        Object.getOwnPropertyDescriptor(this,'container') || Object.defineProperty(this,'container', {get: function(){return container;},set: function(e){container=e;}});
        var direction = p_vars.direction;
        Object.getOwnPropertyDescriptor(this,'direction') || Object.defineProperty(this,'direction', {get: function(){return direction;},set: function(e){direction=e;}});
        var lastY = p_vars.lastY;
        Object.getOwnPropertyDescriptor(this,'lastY') || Object.defineProperty(this,'lastY', {get: function(){return lastY;},set: function(e){lastY=e;}});
        var moved = p_vars.moved;
        Object.getOwnPropertyDescriptor(this,'moved') || Object.defineProperty(this,'moved', {get: function(){return moved;},set: function(e){moved=e;}});
        var plane = p_vars.plane;
        Object.getOwnPropertyDescriptor(this,'plane') || Object.defineProperty(this,'plane', {get: function(){return plane;},set: function(e){plane=e;}});
        var stage = p_vars.stage;
        Object.getOwnPropertyDescriptor(this,'stage') || Object.defineProperty(this,'stage', {get: function(){return stage;},set: function(e){stage=e;}});
        var shape = p_vars.shape;
        Object.getOwnPropertyDescriptor(this,'shape') || Object.defineProperty(this,'shape', {get: function(){return shape;},set: function(e){shape=e;}});
        var startY = p_vars.startY;
        Object.getOwnPropertyDescriptor(this,'startY') || Object.defineProperty(this,'startY', {get: function(){return startY;},set: function(e){startY=e;}});
        var startTime = p_vars.startTime;
        Object.getOwnPropertyDescriptor(this,'startTime') || Object.defineProperty(this,'startTime', {get: function(){return startTime;},set: function(e){startTime=e;}});
        var totalY = p_vars.totalY;
        Object.getOwnPropertyDescriptor(this,'totalY') || Object.defineProperty(this,'totalY', {get: function(){return totalY;},set: function(e){totalY=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.ontouchstart=this.ontouchstart.bind(this);
          this.ontouchmove=this.ontouchmove.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
          this.active=false;
          this.direction=1;
          this.moved=false;
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
          this.lastY=0;
          this.startTime=0;
          this.startY=0;
          this.totalY=0;
        }
        return ctor.apply(this,args) || this;
      }
      Container.prototype['ontouchstart'] = function(event) {
        if(!this.active) {
          this.active=true;
          event.preventDefault();
          this.lastY=this.shape.pointerY(event);
          this.moved=false;
          this.startTime=new Date().getTime();
          this.shape.style({
            'webkitTransitionDuration':'0ms'
          });
        }
      };
      Container.prototype['ontouchmove'] = function(event) {
        if(this.active) {
          event.preventDefault();
          var Y=this.shape.pointerY(event);
          var deltaY=Y - this.lastY;
          deltaY/=4;
          this.lastY=Y;
          this.totalY+=deltaY;
          this.direction=deltaY > 0?1:-1;
          this.shape.rotate({
            x:-this.totalY
          });
          this.moved=true;
        }
      };
      Container.prototype['ontouchend'] = function(event) {
        if(this.active) {
          event.preventDefault();
          this.active=false;
          if(this.moved) {
            var newdistance=this.totalY + 40 * this.direction;
            var newtime=500;
            this.shape.style({
              webkitTransition:"-webkit-transform " + newtime + "ms cubic-bezier(0.33,0.66,0.66,1)"
            });
            this.shape.rotate({
              x:-newdistance
            });
            this.startY=this.totalY;
            this.moved=false;
          }
        }
      };
      Container.init = (function () {
        var styles=[{
          selector:'.container',
          style:"margin:25% 10px;-webkit-perspective:2000px;-webkit-perspective-origin:50% 0px;-moz-perspective:2000px;-moz-perspective-origin: 50% 0px;"
        },{
          selector:'.stage',
          style:"width:100%;height:100%;-webkit-transition:-webkit-transform 2s;-webkit-transform-style:preserve-3d;-moz-transition:-moz-transform 2s;-moz-transform-style:preserve-3d;"
        },{
          selector:'.shape',
          style:"-webkit-transform-style:preserve-3d;position:relative;margin:0 auto;height:" + ConstsType.columnHeight + "px;width:" + ConstsType.columnWidth + "px;-webkit-transition:-webkit-transform 1s;-moz-transition:-moz-transform 1s;"
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
          this.ontouchstart=this.ontouchstart.bind(this);
          this.ontouchmove=this.ontouchmove.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
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
          this.main.insert(document.body).on('touchstart').bind(this.ontouchstart).on('touchmove').bind(this.ontouchmove).on('touchend').bind(this.ontouchend);
          controller.Controller.subscribe('slotdata',this.onslotdata.bind(this));
        }
        return ctor.apply(this,args) || this;
      }
      Main.prototype['onslotdata'] = function(event) {
        event.detail.forEach(function (info,i) {
          var plane=monads.DOMable({
            element:this.container[info.slot].shape.child(info.index)
          }).on('load');
          var card=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'card'
          });
          plane.add(card);
          var front=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'face'
          });
          front.add(monads.DOMable({
            tagName:'img'
          }).on('load').attributes({
            src:info.image,
            height:ConstsType.columnHeight + "px",
            width:ConstsType.columnWidth + "px"
          }).round(12,12,12,12).shadow({
            horizontal:5,
            vertical:5,
            blurRadius:5,
            color:'#444',
            inset:false
          }));
          var back=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'face back'
          }).shadow({
            horizontal:5,
            vertical:5,
            blurRadius:5,
            color:'#444',
            inset:false
          });
          back.text('slot=' + info.slot + '\nindex=' + info.index);
          card.add(front).add(back);
        },this);
      };
      Main.prototype['ontouchstart'] = function(event) {
        event.preventDefault();
      };
      Main.prototype['ontouchmove'] = function(event) {
        event.preventDefault();
      };
      Main.prototype['ontouchend'] = function(event) {
        event.preventDefault();
      };
      Main.init = (function () {
        var styles=[{
          selector:'body',
          style:"background:-webkit-linear-gradient(63deg, #151515 5px, transparent 5px) 0 5px,-webkit-linear-gradient(243deg, #151515 5px, transparent 5px) 10px 0px,-webkit-linear-gradient(63deg, #222 5px, transparent 5px) 0px 10px,-webkit-linear-gradient(243deg, #222 5px, transparent 5px) 10px 5px,-webkit-linear-gradient(0deg, #1b1b1b 10px, transparent 10px),-webkit-linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%,transparent 50%,transparent 75%,#242424 75%, #242424);background-color:#131313;background-size:20px 20px;"
        },{
          selector:'#main',
          style:"display:-webkit-box;display:-moz-box;-webkit-box-pack:justify;-moz-box-pack:justify;width:100%;height:100%;"
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
            index:2,
            image:'../slots/images/Rapsel_elle.jpg'
          },{
            slot:0,
            index:3,
            image:'../slots/images/Rapsel_elle.jpg'
          },{
            slot:0,
            index:4,
            image:'../slots/images/Rapsel_elle.jpg'
          },{
            slot:0,
            index:5,
            image:'../slots/images/Rapsel_elle.jpg'
          },{
            slot:0,
            index:6,
            image:'../slots/images/Rapsel_elle.jpg'
          },{
            slot:0,
            index:7,
            image:'../slots/images/Rapsel_elle.jpg'
          },{
            slot:0,
            index:8,
            image:'../slots/images/Rapsel_elle.jpg'
          },{
            slot:0,
            index:9,
            image:'../slots/images/Rapsel_elle.jpg'
          },{
            slot:0,
            index:10,
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
            index:2,
            image:'../slots/images/thermastrand.jpg'
          },{
            slot:1,
            index:3,
            image:'../slots/images/thermastrand.jpg'
          },{
            slot:1,
            index:4,
            image:'../slots/images/thermastrand.jpg'
          },{
            slot:1,
            index:5,
            image:'../slots/images/thermastrand.jpg'
          },{
            slot:1,
            index:6,
            image:'../slots/images/thermastrand.jpg'
          },{
            slot:1,
            index:7,
            image:'../slots/images/thermastrand.jpg'
          },{
            slot:1,
            index:8,
            image:'../slots/images/thermastrand.jpg'
          },{
            slot:1,
            index:9,
            image:'../slots/images/thermastrand.jpg'
          },{
            slot:1,
            index:10,
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
            index:2,
            image:'../slots/images/kitchen_recess.jpg'
          },{
            slot:2,
            index:3,
            image:'../slots/images/kitchen_recess.jpg'
          },{
            slot:2,
            index:4,
            image:'../slots/images/kitchen_recess.jpg'
          },{
            slot:2,
            index:5,
            image:'../slots/images/kitchen_recess.jpg'
          },{
            slot:2,
            index:6,
            image:'../slots/images/kitchen_recess.jpg'
          },{
            slot:2,
            index:7,
            image:'../slots/images/kitchen_recess.jpg'
          },{
            slot:2,
            index:8,
            image:'../slots/images/kitchen_recess.jpg'
          },{
            slot:2,
            index:9,
            image:'../slots/images/kitchen_recess.jpg'
          },{
            slot:2,
            index:10,
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
            index:2,
            image:'../slots/images/solec.jpg'
          },{
            slot:3,
            index:3,
            image:'../slots/images/solec.jpg'
          },{
            slot:3,
            index:4,
            image:'../slots/images/solec.jpg'
          },{
            slot:3,
            index:5,
            image:'../slots/images/solec.jpg'
          },{
            slot:3,
            index:6,
            image:'../slots/images/solec.jpg'
          },{
            slot:3,
            index:7,
            image:'../slots/images/solec.jpg'
          },{
            slot:3,
            index:8,
            image:'../slots/images/solec.jpg'
          },{
            slot:3,
            index:9,
            image:'../slots/images/solec.jpg'
          },{
            slot:3,
            index:10,
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

