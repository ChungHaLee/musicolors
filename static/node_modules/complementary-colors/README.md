# complementary-colors

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d6b2147ade304ed286ae1324673f7c06)](https://app.codacy.com/app/etoxin/complementary-colors?utm_source=github.com&utm_medium=referral&utm_content=etoxin/complementary-colors&utm_campaign=Badge_Grade_Dashboard)

Get complementary colors.

## Installtion

```console
$ npm install complementary-colors
```

## Usage

```js
var complementaryColors = require('complementary-colors');
```

## Constructors

```js
var myColor = new compColors('#00ff00');
```

## Getters

Base color in all examples is `#00ff00`

### Primary 

Returns the original color as a rgb object.

```js
myColor.primary();

// returns
// [ { r: 0, g: 255, b: 0 } ]
```

### Complementary color scheme

Complementary Colors are any two Hues positioned exactly opposite each other on the Basic Color Wheel. 

Returns an array with two rgb color objects.

```js
myColor.complementary();

// Returns
// [ { r: 0, g: 255, b: 0 }, { r: 255, g: 0, b: 255 } ]
```

### Triadic color scheme 

A triadic color scheme uses three colors that are evenly spaced around the color wheel. Triadic color harmonies tend to be quite vibrant, even if you use pale or unsaturated versions of your hues.

Returns an array with three rgb color objects.

```js
myColor.triad();

// Returns
// [ { r: 0, g: 255, b: 0 },
//   { r: 0, g: 0, b: 255 },
//   { r: 255, g: 0, b: 0 } ]
```
   
### Square color scheme

The square color scheme is similar to the Triadic, but with all four colors spaced evenly around the color circle.

Returns an array with four rgb color objects.

```js
myColor.square();

// Returns
// [ { r: 0, g: 255, b: 0 },
//   { r: 0, g: 127, b: 255 },
//   { r: 255, g: 128, b: 0 },
//   { r: 255, g: 0, b: 255 } ]
```

### Analogous color scheme

Analogous color schemes use colors that are next to each other on the color wheel.

Returns an array with three rgb color objects.

```js    
myColor.analogous();

// returns 
// [ { r: 128, g: 255, b: 0 },
//   { r: 128, g: 255, b: 0 },
//   { r: 0, g: 255, b: 0 } ]
```

### Split-Complementary color scheme 

The split-complementary color scheme is a variation of the complementary color scheme. In addition to the base color, it uses the two colors adjacent to its complement.

Returns an array with three rgb color objects.

```js
myColor.splitComplementary();

// returns 
// [ { r: 0, g: 255, b: 0 },
//   { r: 128, g: 255, b: 0 },
//   { r: 0, g: 255, b: 0 } ]
```

### Rectangle (tetradic) color scheme 

The rectangle or tetradic color scheme uses four colors arranged into two complementary pairs.

```js
myColor.tetradic();

// returns
// [ { r: 0, g: 255, b: 0 },
//   { r: 0, g: 127, b: 255 },
//   { r: 255, g: 128, b: 0 },
//   { r: 127, g: 0, b: 255 } ]
```
    
# Examples

```js
var compColors = require('complementary-colors');

var myColor = new compColors('#00ff00');

console.log(myColor.complementary());

// Returns
// [ { r: 0, g: 255, b: 0 }, { r: 255, g: 0, b: 255 } ]
```
