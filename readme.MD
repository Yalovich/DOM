# DOM interactions as natural language
 
[![npm version](https://img.shields.io/npm/v/@yalovich/dom)](https://www.npmjs.com/package/@yalovich/dom)

Dom is a JavaScript wrapper built for making DOM interactions easy and intuitive when working with JS Vanilla. 

**The project intends to turn working with DOM to natural as a human language** --- for example --- querying an element from the DOM and adding a "transition end" listener turns from:

```js
let elm = document.querySelector(".selector");
let prefixes = ["webkitTransitionEnd", "transitionend"];

prefixes.map(prefix => elm.addEventListener(prefix,  () => {}, false));

```
to:

```js
(new Dom).transitionEnd(".selector", () => {});
```

## Installation

```bash
npm install --save @yalovich/dom
```

## Usage

```js
import { Dom } from "@yalovich/dom";

class App
{
    constructor() {
        this.dom = new Dom;
    }

    init() {
        this.dom.animationEnd('.selector', event => this.dom.addClass(event.target, 'ready'));
    }
}

```

## API Reference

Method               | Description 
------               | ----------- 
`.elm(selector)`  | Document.querySelector shortcut. Performing a single DOM query for an element.
`.elms(selector)` | Document.querySelectorAll shortcut. Performing a DOM query for plural elements.
`.fromTop(selector)` | Returns element's distance from the viewport top edge.
`.clientRect(selector)` | Return DOMRect object for the supplied element
`.absTop(selector)` | Returns the element's absolute distance from the document top
`.absLeft(selector)` | Returns the element's absolute distance from the document left edge
`.scrollTo(distance, duration)` | Scroll viewport to the assigned point
`.css(elm, key, value)` | Add CSS property to an element
`.cookie(name, value, numberOfdays)` | Creating a cookie
`.addListener(selector, eventName, callback)` | EventTarget.addEventListener() shortcut. Add an event listener to an element or elements.
`.removeListener(selector, eventName, callback)` | EventTarget.removeEventListener() shortcut. Remove an event listener to an element or elements.
`.animationEnd(selector, callback)` | Add "animationend" event listener 
`.transitionEnd(selector, callback)` | Add "transitionend" event listener 
`.toggleClass(selector, className)` | classList.toggle() shortcut. Toggle CSS class to/from an element
`.addClass(selector, className)` | classList.add() shortcut. Add CSS class to an element (one or many)
`.removeClass(selector, className)` | classList.remove() shortcut. Remove CSS class from an element (one or many)
`.pathLen(selector)` | SVGPathElement.getTotalLength() shortcut. Returns the user agent's computed value for the total length of the path in user units.
`.height(selector)` | Returns the element computed height as number
`.heightCenter(selector)` | Returns element height center point
`.width(selector)` | Returns the element computed width as number
`.widthCenter(element)` | Returns element width center point
`.hide(selector, softHide = false)` | Hide element using CSS >> display: none;
`.show(selector, displayType = "block")` | Show element using CSS >> display: block|inline|grid|flex|inline-flex;
`.is(selector)` | Inquiry helper for boolean features. See .is Inquery
`.input(selector)` | Inquiry helper for input handling. See .input Inquery
**getter** `.scrollTop` | Returns scrolling distance from the top.
**getter** `.winWidth` | Returns the window inner width
**getter** `.winHeight` | Returns the window inner height


### The `.is()` Inquery

Making DOM elemnts available to 

### The `.input()` Inquery

More info here 

### Contributions or Suggestions

Any help is most welcomed to turn the Vanilla DOM interactions more concise and intuitive. Create pull requests, or contact me at [idan.yalovich@gmail.com](mailto:idan.yalovich@gmail.com).

### License

Copyright 2020 [Idan Yalovich](https://yalovich.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
