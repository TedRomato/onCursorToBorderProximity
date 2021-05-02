# CursorToBorderProximity
<h2>Usage:</h2>
<p>Triggers a callback, when cursor is at distance from element borders.</p>
<h2>How to use:</h2>
<ol>
  <li>Import this file your js file</li>
  <li>Create CursorToBorderProximity instance</li>
  <li>Call onCursorToBorderProximity() on your instance, with callback as argument</li>
  <li>Call onCursorToBorderProximity() on your instance to cancel</li>
</ol>

<h3>Notes:</h3>
<p>Doesn't work with elements, which outer width, doesn't match their width. (Don't use margin :]) Requires jQuery to work. Data to onCursorToBorderProximity are passed as 
object with right, left, top, bottom, boolean parameters. If cursor is outside element, null is passed. </p>

<h3>Code example:</h3>


```javascript
import CursorToBorderProximity from "../ExtendedControls/CursorToBorderProximity.js"

let proximityTest = new CursorToBorderProximity( $("#Canvas") )


proximityTest.onCursorToBorderProximity( (borderProximity) => {callback(borderProximity)});


$("button").click( () => {
  proximityTest.offCursorToBorderProximity();
});


function callback(borderProximity){
  if (!borderProximity) {
    console.log("outside");
    return;
  }
  if(borderProximity.left){
    console.log("left");
  }
  if(borderProximity.right){
    console.log("right");
  }
  if(borderProximity.top){
    console.log("top");
  }
  if(borderProximity.bottom){
    console.log("bottom");
  }
}


```




