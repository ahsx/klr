
/**
 *	Test constructor function
 **/
test('Color', function()
{
	var c = new klr( red, green, blue );

	equal( c.getRed(), red, 'red' );
	equal( c.getGreen(), green, 'green' );
	equal( c.getBlue(), blue, 'blue' );

});

/**
 *	Format
 **/
test('format', function()
{
	var c = new klr( red, green, blue );

	equal( c.format(), color );
	equal( c.format('hex'), color );
	equal( c.format('rgb'), 'rgb('+ red +','+ green +','+ blue +')' );
	equal( c.format('rgba'), 'rgb('+ red +','+ green +','+ blue +',1)' );
});

test('brightness', function()
{
	var c = new klr( red, green, blue );

	equal( c.getBrightness(), value );

	c.setBrightness( 10 );
	equal( c.getBrightness(), 10 );
	equal( c.getRed(), 22 );
	equal( c.getGreen(), 26 );
	equal( c.getBlue(), 10 );
});

test('saturation', function()
{
	var c = new klr( red, green, blue );

	equal( c.getSaturation(), saturation1 );

	c.setSaturation( 10 );
	equal( c.getSaturation(), 10 );
	equal( c.getRed(), 212 );
	equal( c.getGreen(), 217 );
	equal( c.getBlue(), 195 );

	console.log( c );
});