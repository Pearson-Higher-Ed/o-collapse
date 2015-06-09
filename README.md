# o-collapse [![Build Status](https://travis-ci.org/aarmour/o-collapse.svg?branch=master)](https://travis-ci.org/aarmour/o-collapse)

## Quick start

Add `class="o-collapse"` and `data-o-component="o-collapse"` to the target element to enable collapse. You can use a link with `href` or a button with `data-target` as the trigger:

```html
<a href="#collapse-example" data-toggle="o-collapse" aria-controls="collapse-example" aria-expanded="false">Link trigger</a>
<button data-toggle="o-collapse" data-target="#collapse-example" aria-controls="collapse-example" aria-expanded="false">Button trigger</button>
<p id="collapse-example" class="o-collapse" data-o-component="o-collapse">Quisque in tortor finibus, dictum sem vel, convallis felis. Nunc ac mi in urna euismod eleifend in vitae augue. Suspendisse blandit feugiat vulputate. Praesent sit amet fringilla eros. Mauris nunc nisl, laoreet sit amet molestie vitae, sodales et diam.</p>
```

## Enabling using JavaScript

```js
new Collapse(document.querySelector('#collapse'));
```

You can use the static `init` method to initialize all collapsible elements within a specified element:

```js
Collapse.init(document.body);
```

This module will also listen for the `o.DOMContentLoaded` event; when fired, it will initialize all collapsible elements on the page.

## API

### Constructor

`Collapse(element)`

Initializes a collapsible element, where `element` is the target element and an instance of `HTMLElement`.

### Methods

`show()`

Expands the target element.

`hide()`

Collapses the target element.

`toggle()`

Toggles the target element, depending on its current state.

## Accessibility

The `aria-expanded` and `aria-controls` attributes should be added to the trigger element to help assistive devices, such as screen readers, determine the state and location of the collapsible element. The module will automatically update `aria-expanded` depending on the state of the target element.

## Browser support

Tested and working on:

|  Browser   | Versions                  |
|:----------:|:-------------------------:|
|   Chrome   |   36+                     |
|   Firefox  |   30+                     |
|   Safari   |   7.1+, 7.0 with polyfill |
|   IE       |   11+, 9/10 with polyfill |

Browser versions that do not support [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) must use a polyfill, for example via the [polyfill service](https://cdn.polyfill.io/v1/docs/):

```html
<script src="https://cdn.polyfill.io/v1/polyfill.min.js?features=WeakMap"></script>
```

## License

This software is published by Pearson Education under the [MIT license](LICENSE).
