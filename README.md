# o-collapse [![Build Status](https://travis-ci.org/Pearson-Higher-Ed/o-collapse.svg?branch=master)](https://travis-ci.org/Pearson-Higher-Ed/o-collapse) [![Coverage Status](https://coveralls.io/repos/Pearson-Higher-Ed/o-collapse/badge.svg?branch=master&service=github)](https://coveralls.io/github/Pearson-Higher-Ed/o-collapse?branch=master)

## Quick start

Add `class="o-collapse"` to the target element to enable collapse. You can use a link with `href` or a button with `data-target` as the toggle:

```html
<a href="#collapse-example" data-toggle="o-collapse" aria-controls="collapse-example" aria-expanded="false">Link toggle</a>
<button data-toggle="o-collapse" data-target="#collapse-example" aria-controls="collapse-example" aria-expanded="false">Button toggle</button>
<p id="collapse-example" class="o-collapse" data-o-component="o-collapse">Quisque in tortor finibus, dictum sem vel, convallis felis. Nunc ac mi in urna euismod eleifend in vitae augue. Suspendisse blandit feugiat vulputate. Praesent sit amet fringilla eros. Mauris nunc nisl, laoreet sit amet molestie vitae, sodales et diam.</p>
```

Multiple collapse targets can be grouped under a single parent element by adding the `data-target` attribute to the toggle. When targets are grouped, expanding an element will close all other expanded elements. Refer to the accordion [demo](https://origami.pearsoned.com/registry/components/o-collapse) for an example.

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

### Events

| Event Name               | Description                                         |
|--------------------------|-----------------------------------------------------|
| oCollapse.show           | Fires immediately when the `show` method is called. |
| oCollapse.hide           | Fires immediately when the `hide` method is called. |

```js
document.querySelector('#collapse').addEventListener('oCollapse.show', function (e) {
	// Do something
});
```

## Accessibility

The `aria-expanded` and `aria-controls` attributes should be added to the toggle element to help assistive devices, such as screen readers, determine the state and location of the collapsible element. The module will automatically update `aria-expanded` depending on the state of the target element.

## License

This software is published by Pearson Education under the [MIT license](LICENSE).
