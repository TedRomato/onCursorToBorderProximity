export default class CursorToBorderProximity{
  constructor(element, borderWidth = 15, checkInterval_ms = 100){
    this.element = element;
    this.mousePosition = [0,0];
    this.borderWidth = borderWidth;
    this.checkInterval = checkInterval_ms;
    this.callback = undefined;
    this.running = true;

    this.handleElementMouseMove = ( e ) => {
      this.cursorInElement = true;
      const positionX = this.element.position().left;
      const positionY = this.element.position().top;
      this.mousePosition = [e.pageX - positionX, e.pageY - positionY]
    }

    this.handleWindowMouseMove = ( ) => {
      if(!this.cursorInElement){
        this.mousePosition = [null, null]
      }
      this.cursorInElement = false;
    }

  }

  onCursorToBorderProximity(callback){
    this.callback = callback;
    this.running = true;

    //If mouse move didnt happen on element this global mouse move
    //cursor is outside the element
    //so we set mouse position to null, not to trigger border proximity

    $( window ).on('mousemove',this.handleWindowMouseMove);

    $( this.element ).on('mousemove', this.handleElementMouseMove);

    this.listen();

  }


  offCursorToBorderProximity(){
    $( this.element ).off('mousemove', this.handleWindowMouseMove);
    $( this.element ).off('mousemove', this.handleElementMouseMove);
    this.running = false;
  }


  async listen(){

    setTimeout(() => {
      this.callback(this.isInBorders());
      if(this.running){
        this.listen(this.callback, this.checkInterval);
      }
    },this.checkInterval);

  }

  isInBorders(){
    if (!this.mousePosition[0] || !this.mousePosition[1]) return null;

    let right = between(this.mousePosition[0],0 - 1, this.borderWidth);
    let left = between(this.mousePosition[0], this.element.width() - this.borderWidth, this.element.width() + 1);
    let top = between(this.mousePosition[1], 0 - 1, this.borderWidth);
    let bottom = between(this.mousePosition[1], this.element.height() - this.borderWidth, this.element.height() + 1);

    //if(!right && !left && !top && !bottom) return null;

    return {
      left: left,
      right: right,
      top: top,
      bottom: bottomted
    }
  }
}

function between(a,b,c){
  let min = Math.min.apply(Math, [b, c]);
  let max = Math.max.apply(Math, [b, c]);
  return a > min && a < max;
}
