klr
===

klr offers a set of tools to work with color more easely. With it you can create a color or group them into lists of wich you can then collectively manipulate hue, brightness and saturation, create lists of harmonious colors based on color theory rules, create lists of gradient colors.

Demonstration page: <http://ahsx.github.io/klr>

Inspired by [nodebox color library](http://nodebox.net/code/index.php/Colors)

## klr

### Create a klr

To create a new klr multiple options

```
javascript

new klr(red, green, blue);
new klr(186, 218, 85);
klr.fromHex(0xbada55);

```

### hue, saturation, brightness


```
javascript

var k = new klr(186, 218, 85);

// hue
k.setHue( 100 );
k.getHue();

// saturation
k.setSaturation( 100 );
k.getSaturation();

// brightness
k.setBrightness( 100 );
k.getBrightness();

```

### Schemes

Color theory provides a visual guidance to color mixing and the visual impact of specific color combinations. With the Colors library you can create schemes from the following rules:

- **complement**: the ryb complement color of the base color.
- **complementary**: colors that are opposite of each other on the color wheel.
- **split complement**: a combination of left complement and right complement.
- **left complementary**: a variation with colors a bit to the left of the actual complement.
- **right complementary**: a variation with colors a bit to the right of the actual complement.
- **analogous**: colors that are next to each other on the color wheel. These yield natural schemes, like shades of water or grass).
- **monochrome**: colors in the same hue that vary in brightness and saturation.
- **triad**: a color and two other colors that make up an equilateral triangle on the color wheel.
- **tetrad**: four colors that make up a cross on the color wheel.
- **compound**: a color with its complement and some analogs of those colors.

References: <http://en.wikipedia.org/wiki/Colour_scheme>


```
javascript

var k = new klr(186, 218, 85);

// complement
k.toComplementList();

// complementary
k.toComplementaryList();

// split complement
k.toSplitComplementList();

// left complement
k.toLeftComplementaryList();

// right complementary
k.toRightComplementaryList();

// monochrome
k.toMonochrome();

// triad
k.toTriad( angle );
k.toTriad( 120 );

// tetrad
k.toTetrad( angle );
k.toTetrad( 90 );

// analogous
k.toAnalogous( angle, contrast );
k.toAnalogous( 10, 25 );

// compound
k.toCompound( flip );
k.toCompound( false );

```

### Shades
