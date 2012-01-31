module slots {
  module log from 'log';
  module monads from 'monads';
  class Ring {
    constructor(properties={}) {
      private sections, shape;
      @shape = properties.shape;
      @sections = {"one":1, 
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
                   "twelve":12};
      for(var section in sections) {
        shape.add(
          monads.DOMable({tagName:'div'}).on('load').attributes({'class':'plane '+section}).text(sections[section])
        );
      }
    }
  }
  class Container {
    constructor(properties={}) {
      private container, stage, shape, plane;
      @shape = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'shape ring'});
      Ring({shape:@shape});
      @stage = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'stage'}).translate({z:'-100px'});
      @stage.add(@shape);
      @container = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'container'});
      @container.add(@stage);
      return @container;
    }
  };
  class Main {
    constructor() {
      private wrapper;
      @wrapper = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'wrapper'});
      for(var i = 0; i < 4; ++i) {
        @wrapper.add(Container());
      }
      @wrapper.insert(document.body);
    }
  }
  class AppType {
    constructor() {
      Main();
    }
  }
  export const App = AppType();
}
