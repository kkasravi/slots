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
        }
        var p_vars = new privateData();
        var shape = p_vars.shape;
        Object.getOwnPropertyDescriptor(this,'shape') || Object.defineProperty(this,'shape', {get: function(){return shape;},set: function(e){shape=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.shape=properties.shape;
          for(section in Ring.sections) {
            this.shape.add(monads.DOMable({
              tagName:'div'
            }).on('load').attributes({
              'class':'plane ' + section
            }));
          }
        }
        return ctor.apply(this,args) || this;
      }
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
          style:"position:absolute;height:200px;width:200px;border:1px solid white;-webkit-border-radius:12px;-webkit-box-sizing:border-box;-moz-border-radius:12px;-moz-box-sizing:border-box;margin-top:400px;text-align:center;font-family:Times,serif;font-size:124pt;color:black;background-color:rgba(255, 255, 255, 0.6);-webkit-transition:-webkit-transform 2s,opacity 2s;-webkit-backface-visibility:hidden;-moz-transition:-moz-transform 2s, opacity 2s;-moz-backface-visibility: hidden;"
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
      Container.prototype = monads.Touchable();
      Container.prototype.constructor = Container;
      function Container() {
        function privateData() {
          this.container = null;
          this.stage = null;
          this.shape = null;
          this.plane = null;
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
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          monads.Touchable.call(this,properties);
          this.continuationConstructor=ContainerContinuation;
          this.shape=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'shape ring'
          });
          Ring({
            shape:this.shape
          });
          this.stage=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'stage'
          }).translate({
            z:'-100px'
          });
          this.stage.add(this.shape);
          this.container=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'container'
          });
          this.container.add(this.stage);
        }
        return ctor.apply(this,args) || this;
      }
      Container.init = (function () {
        var styles=[{
          selector:'.container',
          style:"margin:0 70px 0 70px;-webkit-perspective:700px;-webkit-perspective-origin:50% 500px;-moz-perspective:700px;-moz-perspective-origin: 50% 500px;"
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
    var ContainerContinuation = (function() {
      ContainerContinuation.prototype = monads.TouchContinuation();
      ContainerContinuation.prototype.constructor = ContainerContinuation;
      function ContainerContinuation() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          monads.TouchContinuation.call(this,properties);
        }
        return ctor.apply(this,args) || this;
      }
      ContainerContinuation.prototype['bindBehaviors'] = function() {
        try {
          this.monad.on('touchstart').bind(this.ontouchstart.bind(this));
          this.monad.on('touchmove').bind(this.ontouchmove.bind(this),document,true);
          this.monad.on('touchend').bind(this.ontouchend.bind(this),document,true);
        } catch(e) {
          log.Logger.error(this,e);
        }
      };
      ContainerContinuation.prototype['ontouchstart'] = function(event) {
        console.log('ontouchstart');
      };
      ContainerContinuation.prototype['ontouchmove'] = function(event) {
        console.log('ontouchmove');
      };
      ContainerContinuation.prototype['ontouchend'] = function(event) {
        console.log('ontouchend');
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = ContainerContinuation;
        return new ContainerContinuation(args && args.length && args[0]);
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
            container.top().on('load').bindBehaviors(container.top());
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
          }));
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

