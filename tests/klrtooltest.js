/**
 *	Test hexToRGB function
 **/
test('hexToRGB', function()
{
	var c = klrtool.hexToRGB( color );
	strictEqual( c.red, red);
	strictEqual( c.green, green );
	strictEqual( c.blue, blue );

	c = klrtool.hexToRGB( colorString );
	strictEqual( c.red, red);
	strictEqual( c.green, green );
	strictEqual( c.blue, blue );
});

/**
 *	Test RGBToHex function
 **/
test('RGBToHex', function()
{
	strictEqual( color, klrtool.RGBToHex(red, green, blue) );
});

/**
 *	Test HSVToRGB function
 **/
test('HSVToRGB', function()
{
	var r = klrtool.HSVToRGB( hue, saturation1, value );

	equal( r.red, red, 'red' );
	equal( r.green, green, 'green' );
	equal( r.blue, blue, 'blue' );
});

/**
 *	Test RGBToHSV function
 **/
test('RGBToHSV', function()
{
	var r = klrtool.RGBToHSV( red, green, blue );

	equal( r.hue, hue, 'hue' );
	equal( r.saturation, saturation1, 'saturation' );
	equal( r.value, value, 'value' );
});


/**
 *	Test RGBToHSB function
 **/
test('RGBToHSB', function()
{
	var r = klrtool.RGBToHSB( red, green, blue );

	equal( r.hue, hue, 'hue' );
	equal( r.saturation, saturation2, 'saturation' );
	equal( r.brightness, brightness, 'brightness' );
});
