/**
 * @author alexandre
 */

(function(window)
{
	
	/**
	 *	Constructor
	 *
	 *	@param red uint
	 *	@param green uint
	 *	@param blue uint
	 **/
	var klr = function( red, green, blue )
	{
		this.initialize( red, green, blue );
	}
	
	/**
	 * 	Factory method to create a new color object from a hex rgb notation
	 *
	 *	@param uint hex Color in hex rgb notation
	 *	@return Color object
	 *	@example klr.fromHex(0xbada55);
	 */
	klr.fromHex = function( hex )
	{
		var rgb = klrtool.hexToRGB( hex );

		var ret = new klr( rgb.red, rgb.green, rgb.blue );
		return ret;
	}
	
	/**
	 *	Prototype
	 **/
	var p = klr.prototype;

	/**
	 *	red value
	 **/
	p._red = null;

	/**
	 *	blue value
	 **/
	p._blue = null;

	/**
	 *	green value
	 **/
	p._green = null;

	/**
	 *	original red value
	 **/
	p._originalRed = null;

	/**
	 *	original blue value
	 **/
	p._originalBlue = null;

	/**
	 *	original green value
	 **/
	p._originalGreen = null;
	
	/**
	 *	Initialize the color object 
	 *
	 *	@param red uint
	 *	@param green uint
	 *	@param blue uint
	 */
	p.initialize = function( red, green, blue )
	{
		this._red = red | 0;
		this._green = green | 0;
		this._blue = blue | 0;
	}

	/**
	 *	Reset the modification back to the original color
	 **/
	p.reset = function () 
	{
		this._red = this._originalRed;
		this._blue = this._originalBlue;
		this._green = this._originalGreen;
	}
	
	/**
	 * 	Returns the amount of red in this klr. 
	 * 	
	 *	@return a number from 0-255
	 */
	p.getRed = function() 
	{
		return this._red;
	}

	/**
	 * 	Returns the amount of green in this klr. 
	 * 	
	 *	@return a number from 0-255
	 */
	p.getGreen = function()
	{
		return this._green;
	}

	/**
	 *	Returns the amount of blue in this klr. 
	 *	 
	 *	@return a number from 0 to 255
	 */
	p.getBlue = function() 
	{
		return this._blue;
	}

	/**
	 *	Define the brightness
	 *
	 *	@param amount number 0 - 100
	 **/	
	p.setBrightness = function (amount)
	{
		amount = Math.max(0, Math.min(100, amount));
		var hsv = klrtool.RGBToHSV( this._red, this._green, this._blue );
		var result = klrtool.HSVToRGB(hsv.hue, hsv.saturation, amount);
		
		this._red = result.red;
		this._green = result.green;
		this._blue = result.blue;
	}

	/**
	 *	Return the brightness
	 *
	 *	@return int
	 **/
	p.getBrightness = function ()
	{
		var hsv = klrtool.RGBToHSV(this._red, this._green, this._blue);
		return hsv.value;
	}

	/**
	 *	Set the saturation
	 *
	 *	@param amount number 0 - 100
	 **/
	p.setSaturation = function (amount ) 
	{
		amount = Math.max(0, Math.min(100, amount));
		var hsv = klrtool.RGBToHSV( this._red, this._green, this._blue );
		var result = klrtool.HSVToRGB( hsv.hue, amount, hsv.value );
		this._red = result.red;
		this._green = result.green;
		this._blue = result.blue;
	}
	
	/** 
	 *	Return the saturation of the color
	 *
	 *	@return int
	 **/
	p.getSaturation = function () 
	{
		var hsv = klrtool.RGBToHSV( this._red, this._green, this._blue );
		return hsv.saturation;
	}

	/**
	 *	Define the hue
	 *
	 *	@param amout int 0 - 360
	 **/
	p.setHue = function (amount )
	{
		amount = Math.max(0, Math.min(360, amount));
		var hsv = klrtool.RGBToHSV(this._red, this._green, this._blue);
		var result = klrtool.HSVToRGB(amount, hsv.saturation, hsv.value);
		this._red = result.red;
		this._green = result.green;
		this._blue = result.blue;
	}

	/**
	 *	Return the hue 
	 *
	 *	@returns int 0 - 360
	 **/
	p.getHue = function () 
	{
		var hsv = klrtool.RGBToHSV(this._red, this._green, this._blue);
		return hsv.hue;
	}

	/**
	 *	Output the color to thr right format
	 *
	 *	@param value String
	 *	@return *
	 **/
	p.format = function( value )
	{
		var ret;
		switch(value)
		{
			case 'hex':
			default:
				ret = klrtool.RGBToHex( this._red, this._green, this._blue );
				break;
			case 'rgb':
				ret = 'rgb('+ this._red + ',' + this._green + ',' + this._blue + ')';
				break;
			case 'rgba':
				ret = 'rgb('+ this._red + ',' + this._green + ',' + this._blue + ',1)';
				break;
			case 'string':
				ret = klrtool.RGBToHex( this._red, this._green, this._blue ).toString(16);
				break;

			case 'hsl':
			case 'hsla':
			case 'hsv':
				console.log('format not implemented');
				break;
		}

		return ret;
	}

	/**
	 *	Return the original hex
	 *
	 *	@return int
	 **/
	p.getOriginalHex = function () 
	{
		return klrtool.RGBToHex( this._originalRed, this._originalGreen, this._originalBlue);
	}

	
	/**
	 * 	Creates a new color object and sets its color values to the opposite (180 degree) in the mathematical color wheel.
	 *
	 *	@return Color
	 */
	p.rgbComplement = function()
	{
		return this.rgbRotate(180);
	}
	
	/**
	 * 	Creates a new color object and sets its color values to the opposite (180 degree) in the artistic color wheel.
	 *	Using this method generates "nices" colors.
	 *
	 *	@return a new color object, the ryb complement of the klr.  
	 */
	p.rybComplement = function()
	{
		return this.rybRotate(180);
	}
	
	/**
	 * 	Rotates / Changes the color / hue using the mathematical rgb color model. 
	 * 	
	 *	@param angle the amount of the change, values from 0 - 360 make sense.
	 * 	@return a new color object with he changed color
	 */
	p.rgbRotate = function(angle) 
	{
		var hsv = klrtool.RGBToHSV(this._red, this._green, this._blue);
		var rgb = klrtool.HSVToRGB(hsv.hue - angle, hsv.saturation, hsv.value);
		return new klr(rgb.red, rgb.green, rgb.blue);
	}
	
	/**
	 * 	Rotates / Changes the color / hue using the artistic ryb color model.
	 * 	Using this method makes "nicer" colors. 
	 * 	
	 *	@param angle the amount of the change, values from 0 - 360 make sense.
	 * 	@return a new color object with he changed color
	 */
	p.rybRotate = function(angle)
	{
		var rybWheel = [[0, 0], [15, 8], [30, 17], [45, 26], [60, 34], [75, 41], [90, 48], [105, 54], [120, 60], [135, 81], [150, 103], [165, 123], [180, 138], [195, 155], [210, 171], [225, 187], [240, 204], [255, 219], [270, 234], [285, 251], [300, 267], [315, 282], [330, 298], [345, 329], [360, 0]];
		var hsv = klrtool.RGBToHSV( this._red, this._green, this._blue);
		var a;

		for (var i  = 0;i < rybWheel.length; i++) 
		{
			var x0 = rybWheel[i][0];
			var y0 = rybWheel[i][1];
       
			var x1 = rybWheel[i + 1][0];
			var y1 = rybWheel[i + 1][1];
			if(y1 < y0) 
				y1 += 360;

			if(y0 <= hsv.hue && hsv.hue <= y1) 
			{
				a = 1.0 * x0 + (x1 - x0) * (hsv.hue - y0) / (y1 - y0);
				break;
			}
		}

		a = (a + (angle % 360));
		if(a < 0)
			a = 360 + a;

		if (a > 360)
			a = a - 360;

		a = a % 360;

		var newHue;
		for (var k = 0;k < rybWheel.length; k++) 
		{
			var xx0 = rybWheel[k][0];
			var yy0 = rybWheel[k][1];
       
			var xx1 = rybWheel[k + 1][0];
			var yy1 = rybWheel[k + 1][1];
			if (yy1 < yy0)
				yy1 += 360;

			if (xx0 <= a && a <= xx1) 
			{
				newHue = 1.0 * yy0 + (yy1 - yy0) * (a - xx0) / (xx1 - xx0);
				break;
			}
		}

		newHue = newHue % 360;
		var rgb = klrtool.HSVToRGB(newHue, hsv.saturation, hsv.value);
		return new klr(rgb.red, rgb.green, rgb.blue);
	}
	
	//////////////////////////////////////////
 	//
 	//	Color Schemes
 	//
 	/////////////////////////////////////////

	/**
	 * 	Creates a klrlist with two colors. A copy of the current color and the ryb complement color of it.
	 * 	
	 *	@return klrlist 
	 */
	p.toComplementList = function()
	{
		var wheel = new klrlist( this.copy() );
		wheel.addColor( this.rybComplement() );
		return wheel;
	}

	/**
	 * 	Creates a klrlist with three colors, corresponding to the split complementary color scheme. 
	 * 	
	 *	@see http://en.wikipedia.org/wiki/Colour_scheme#Split-complementary_color_scheme
	 * 	@see "A color scheme that includes a main color and the two colors on each side of its complementary (opposite) color on the color wheel. (Wikipedia)" 
	 * 	@return klrlist 
	 */
	p.toSplitComplementList = function()
	{
		var wheel = new klrlist(this.copy());
		var one = this.rybComplement().rybRotate(-30);
		var two = this.rybComplement().rybRotate(30);
		one.setBrightness( one.getBrightness()+10 );
		two.setBrightness(10);
		wheel.addColor(one);
		wheel.addColor(two);
		return wheel;
	}

	/**
	 *	Create a klrlist with the complementary colors
	 *	
	 *	@see http://en.wikipedia.org/wiki/Colour_scheme#Complementary_color_scheme
	 *	@return klrlist
	 **/
	p.toComplementaryList = function()
	{
		var wheel = new klrlist();
		wheel.addColor(this.copy());

		var contrasting = this.copy();

		if(this.getBrightness() > 40)
			contrasting.setBrightness(10 + this.getBrightness() * 0.25);
		else
			contrasting.setBrightness(100 - this.getBrightness() * 0.25);
		wheel.addColor(contrasting);
		
		var supporting = this.copy();
		supporting.setBrightness(30 + this.getBrightness());
		supporting.setSaturation(10 + this.getSaturation() * 0.3);
		wheel.addColor(supporting);
		
		var complement = this.rybComplement();
		wheel.addColor(complement);
		
		var contrastingComplement = complement.copy();			
		if(complement.getBrightness() > 30) {
			contrastingComplement.setBrightness(10 + complement.getBrightness() * 0.25);
		} else {
			contrastingComplement.setBrightness(100 - complement.getBrightness() * 0.25);
		}
		wheel.addColor(contrastingComplement);
		
		var supportingComplement = complement.copy();
		supportingComplement.setBrightness(30 + complement.getBrightness());
		supportingComplement.setSaturation(10 + complement.getSaturation() * 0.3);
		wheel.addColor(supportingComplement);
		return wheel;
	}

	/**
	 *	Create a klrlist with the left complenentary colors
	 *
	 *	@see http://en.wikipedia.org/wiki/Colour_scheme
	 *	@return klrlist
	 **/
	p.toLeftComplementaryList = function()
	{
		var wheel = this.toComplementaryList();
		var left = this.toSplitComplementList().getAsList()[1];
		var colors = wheel.getAsList();
		colors[3].setHue(left.getHue());
		colors[4].setHue(left.getHue());
		colors[5].setHue(left.getHue());
		return wheel;
	}

	/**
	 *	Create a klrlist with the right complenentary colors
	 *
	 *	@see http://en.wikipedia.org/wiki/Colour_scheme
	 *	@return klrlist
	 **/
	p.toRightComplementaryList = function()
	{
		var wheel = this.toComplementaryList();
		var right = this.toSplitComplementList().getAsList()[2];
		var colors= wheel.getAsList();
		colors[3].setHue(right.getHue());
		colors[4].setHue(right.getHue());
		colors[5].setHue(right.getHue());
		return wheel;
	}
	
	/**
	 *	Create a klrlist with the monochrome colors
	 *
	 *	@see http://en.wikipedia.org/wiki/Colour_scheme
	 *	@return klrlist
	 **/
	p.toMonochrome = function()
	{
		var wheel = new klrlist(this.copy());
		var c1 = this.copy();
		c1.setBrightness(this.wrap(this.getBrightness(), 50, 20, 30));
		c1.setSaturation(this.wrap(this.getSaturation(), 30, 10, 20));
		wheel.addColor(c1);
		
		var c2 = this.copy();
		c2.setBrightness(this.wrap(this.getBrightness(), 20, 20, 60));
		wheel.addColor(c2);

		var c3 = this.copy();
		c3.setBrightness(Math.max(20, this.getBrightness() + (100 - this.getBrightness() ) * 0.2));
		c3.setSaturation(this.wrap(this.getSaturation(), 30, 10, 30));
		wheel.addColor(c3);

		var c4 = this.copy();
		c4.setBrightness(this.wrap(this.getBrightness(), 50, 20, 30));
		wheel.addColor(c4);
		return wheel;
	}

	/**
	 *	Create a klrlist with the triad colors
	 *
	 *	@see http://en.wikipedia.org/wiki/Colour_scheme
	 *	@return klrlist
	 **/
	p.toTriad = function(angle) 
	{
		angle = angle || 120;
		var wheel = new klrlist(this.copy());
		var color1 = this.rybRotate(angle);

		color1.brighten(10);
		wheel.addColor(color1);		

		var color2 = this.rybRotate(-angle);
		color2.brighten(10);
		wheel.addColor(color2);
		return wheel;
	}

	/**
	 *	Create a klrlist with the tetrad colors
	 *
	 *	@param angle int 0-360
	 *	@see http://en.wikipedia.org/wiki/Colour_scheme
	 *	@return klrlist
	 **/
	p.toTetrad = function (angle) 
	{
		angle = angle || 90;
		var wheel = new klrlist(this.copy());
		var c1 = this.rybRotate(angle);
		if(this.getBlue() < 50) {
			c1.setBrightness(c1.getBrightness() + 20);
		} else {
			c1.setBrightness(c1.getBrightness() - 20);
		}				   
		wheel.addColor(c1);
		
		var c2 = this.rybRotate(angle * 2);
		if(this.getBrightness() > 50) {
			c2.setBrightness(c2.getBrightness() + 10);
		} else {
			c2.setBrightness(c2.getBrightness() - 10);
		}
		wheel.addColor(c2);
		var c3 = this.rybRotate(angle * 3);
		c3.brighten(10);
		wheel.addColor(c3);
		return wheel;
	}

	/**
	 *	Create a klrlist with the tetrad colors
	 *
	 *	@param angle int 0-360
	 *	@param contrast Boolean
	 *	@see http://en.wikipedia.org/wiki/Colour_scheme
	 *	@return klrlist
	 **/
	p.toAnalogous = function(angle, contrast) 
	{
		angle = angle || 10;
		contrast = contrast || 25;
		contrast = Math.max(0, Math.min(contrast, 100));
		var wheel = new klrlist(this.copy());

		var array = new Array(new Array(1, 2.2), new Array(2, 1), new Array(-1, -0.5), new Array(-2, 1));
		for (var i = 0;i < array.length; i++) {
			var one = array[i][0];
			var two = array[i][1];
			var color = this.rybRotate(angle * one);
			var t = 0.44 - two * 0.1;
			if(this.getBrightness() - contrast * two < t) {
				color.setBrightness(t * 100);
			} else {
				color.setBrightness(this.getBrightness() - contrast * two);
			}
			color.setSaturation(color.getSaturation() - 5);
			wheel.addColor(color);
		}
		return wheel;
	}

	/**
	 *	Create a klrlist with the coupound colors
	 *
	 *	@param flip Boolean
	 *	@see http://en.wikipedia.org/wiki/Colour_scheme
	 *	@return klrlist
	 **/	
	p.toCompound = function (flip) 
	{
		flip = flip || false;
		var wheel = new klrlist(this.copy());
		var d = 1;
		if(flip) {
			d = -1;
		}
		var c1 = this.rybRotate(30 * d);
		c1.setBrightness(this.wrap(this.getBrightness(), 25, 60, 25));
		wheel.addColor(c1);

		var c2 = this.rybRotate(30 * d);
		c2.setBrightness(this.wrap(this.getBrightness(), 40, 10, 40));
		c2.setSaturation(this.wrap(this.getSaturation(), 40, 20, 40));
		wheel.addColor(c2);
		
		var c3 = this.rybRotate(160 * d);
		c3.setSaturation(this.wrap(this.getSaturation(), 25, 10, 25));
		c3.setBrightness(Math.max(20, this.getBrightness()));
		wheel.addColor(c3);

		var c4 = this.rybRotate(150 * d);
		c4.setSaturation(this.wrap(this.getSaturation(), 10, 80, 10));
		c4.setBrightness(this.wrap(this.getBrightness(), 30, 60, 30));
		wheel.addColor(c4);

		var c5 = this.rybRotate(150 * d);
		c5.setSaturation(this.wrap(this.getSaturation(), 10, 80, 10));
		c5.setBrightness(this.wrap(this.getBrightness(), 40, 20, 40));
		wheel.addColor(c5);
		
		return wheel;
	}

	//////////////////////////////////////////
 	//
 	//	Color Shades
 	//
 	/////////////////////////////////////////

 	/**
 	 *	Return the light shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toLight = function(count) 
	{
		count = count || 10;
		return this.getRange([30,70], [90,100], count);
	}

 	/**
 	 *	Return the light dark shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toLightBlack = function (count) 
	{
		count = count || 10;
		return this.getRange([30,70], [15,30], count);
	}

	/**
 	 *	Return the dark shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toDark = function (count) 
	{
		count = count || 10;
		return this.getRange([70,100], [15,40], count);
	}

	/**
 	 *	Return the dark white shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toDarkWhite = function (count)
	{
		count = count || 10;
		return this.getRange([70,100], [50,75], count);
	}

	/**
 	 *	Return the bright shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toBright = function (count )
	{
		count = count|| 10;
		return this.getRange([80,100], [80,100], count);
	}

	/**
 	 *	Return the weak shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toWeak = function (count )
	{
		count = count || 10;
		return this.getRange([15,30], [70,100], count);
	}

	/**
 	 *	Return the weak black shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toWeakBlack = function (count)
	{
		count = count || 10;
		return this.getRange([15,30], [20,20], count);
	}

	/**
 	 *	Return the neutral shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toNeutral = function (count)
	{
		count = count || 10;
		return this.getRange([25,35], [30,70], count);
	}

	/**
 	 *	Return the neutral black shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toNeutralBlack = function(count)
	{
		count = count || 10;
		return this.getRange([25,35], [15,15], count);
	}

	/**
 	 *	Return the neutral white shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toNeutralWhite = function (count)
	{
		count = count || 10;
		return this.getRange([25,35], [90,100], count);
	}

	/**
 	 *	Return the fresh shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toFresh = function (count)
	{
		count = count || 10;
		return this.getRange([40,80], [80,100], count);
	}

	/**
 	 *	Return the fresh black shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toFreshBlack = function (count)
	{
		count = count || 10;
		return this.getRange([40,80], [5,30], count);
	}

	/**
 	 *	Return the soft shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toSoft = function (count)
	{
		count = count || 10;
		return this.getRange([20,30], [60,90], count);
	}

	/**
 	 *	Return the soft black shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toSoftBlack = function (count)
	{
		count = count || 10;
		return this.getRange([20,30], [5,15], count);
	}

	/**
 	 *	Return the hard shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toHard = function (count)
	{
		count = count || 10;
		return this.getRange([90,100], [40,100], count);
	}

	/**
 	 *	Return the warm shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toWarm = function (count)
	{
		count = count || 10;
		return this.getRange([60,90], [40,90], count);
	}	

	/**
 	 *	Return the warm white shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toWarmWhite = function(count)
	{
		count = count || 10;
		return this.getRange([60,90], [80,100], count);
	}

	/**
 	 *	Return the warm black shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toWarmBlack = function (count)
	{
		count = count || 10;
		return this.getRange([60,90], [20,20], count);
	}

	/**
 	 *	Return the cool shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toCool = function (count)
	{
		count = count || 10;
		return this.getRange([5,20], [90,100], count);
	}

	/**
 	 *	Return the cool white shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toCoolWhite = function (count)
	{
		count = count || 10;
		return this.getRange([5,20], [95,100], count);
	}

	/**
 	 *	Return the intense shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toIntense = function (count)
	{
		count = count || 10;
		return this.getRange([90,100], [80,100], count);
	}

	/**
 	 *	Return the intense black shades
 	 *
 	 *	@param count int 
 	 *	@returns klrlist
 	 **/
	p.toIntenseBlack = function (count)
	{
		count = count || 10;
		return this.getRange([90,100], [20,35], count);
	}

	//////////////////////////////////////////
 	//
 	//	utility method
 	//
 	/////////////////////////////////////////

	p.copy = function () 
	{
		return new klr(this._red, this._green, this._blue);
	}

	p.blend = function (otherColor,  factor)
	{
		factor = factor || .5;
		var r = Math.max(0, Math.min(256, _red * (1 - factor) + otherklr.getRed() * factor));
		var g = Math.max(0, Math.min(256, _green * (1 - factor) + otherklr.getGreen() * factor));
		var b = Math.max(0, Math.min(256,_blue * (1 - factor) + otherklr.getBlue() * factor));
		return new klr(r, g, b);
	}

	p.gradientTo = function (otherColor , steps )
	{
		steps = steps || 20;
		var wheel = new klrlist(this.copy());
		steps -= 2;
		
		var factorStep = 1 / steps;
		for (var i = 0;i < steps; i++) {
			wheel.addColor(blend(otherColor, factorStep * i));
		}
		
		wheel.addColor(otherColor);
		return wheel;
	}

	p.rotateTo = function (otherColor , steps, flip) 
	{
		steps = steps || 10;
		flip = flip || false;
		
		var wheel = new klrlist(this.copy());
		steps -= 2;
		var hue = this.getHue();
		var sat = this.getSaturation();
		var brightness = this.getBrightness();
		var deltaHue = hue - otherklr.getHue();
		var deltaSat = sat - otherklr.getSaturation();
		var deltaBrightness = brightness - otherklr.getBrightness();
		if(deltaHue < 0) {
			deltaHue = Math.abs(deltaHue);
		}else if(deltaHue > 360) {
			deltaHue = deltaHue - 360;
		}
		
		var hueStep = deltaHue / steps;
		var satStep = deltaSat / steps;
		var brightnessStep = deltaBrightness / steps;

		var direction = -1;
		if(flip) {
			direction = 1;
		}
		for (var i = 0;i < steps; i++) {
			var rgb = klrtool.convertHSVToRGB(hue + ( direction * (i * hueStep)), sat - (satStep * i), brightness - (brightnessStep * i));
			var c = new klr(rgb[0], rgb[1], rgb[2]);
			wheel.addColor(c);
		} 
		wheel.addColor(otherklr.copy());
		return wheel;
	}


	p.getRange = function (saturation , brightness , count ) 
	{
		var wheel = new klrlist();
		for (var i = 0;i < count; i++) {
			var theSat = Math.random() * (saturation[1] - saturation[0]) + saturation[0] ;
			var theBright = Math.random() * (brightness[1] - brightness[0]) + brightness[0] ;
			var newklr = this.copy();
			newklr.setSaturation(theSat);
			newklr.setBrightness(theBright);
			if(!wheel.contains(newklr)) {
				wheel.addColor(newklr);
			}
		}
		return wheel;
	}

	p.getFullRange = function (color, saturation, brightness, count) 
	{
		count = count || 20;
		var wheel = new klrlist();
		for (var i = 0;i < count; i++) {
			var theSat = Math.random() * (saturation[1] - saturation[0]) + saturation[0] ;
			var theBright = Math.random() * (brightness[1] - brightness[0]) + brightness[0] ;
			var red = Math.abs(Math.random() * (color[1][0] - color[0][0]) + color[0][0]);
			var green = Math.abs(Math.random() * (color[1][1] - color[0][1]) + color[0][1]);
			var blue = Math.abs(Math.random() * (color[1][2] - color[0][2]) + color[0][2]);
			var newklr = new klr(red, green, blue);
			newklr.setSaturation(theSat);
			newklr.setBrightness(theBright);
			if(!wheel.contains(newklr)) {
				wheel.addColor(newklr);
			}
		}
		return wheel;
	}

	p.isEqual = function (otherklr) 
	{
		var result = false;
		if(otherklr.getRed() == this._red && otherklr.getBlue() == this._blue && otherklr.getGreen() == this._green) {
			result = true;
		}
		return result;
	}

	
	
	p.wrap = function(x , min ,threshold , plus)
	{
		var result = 0;
		if( x - min < threshold) {
			result = x + plus;
		} else {
			result = x - min;
		}
		return result;
	}

	/**
	 *	Brighten a color
	 *
	 *	@param amout int
	 **/
	p.brighten = function( amount )
	{
		this.setBrightness(Math.min(100, this.getBrightness() + amount));
	}

	/**
	 *	Darken a color
	 *
	 *	@param amout int
	 **/
	p.darken = function( amount )
	{
		this.setBrightness(Math.max(0, this.getBrightness() - amount));
	}
	
	/**
	 *	Saturate a color
	 *
	 *	@param amount int
	 **/
	p.saturate = function ( amount )
	{
		this.setSaturation(this.getSaturation() + amount);
	}

	/**
	 *	Desaturate a color
	 *
	 *	@param amount int
	 **/
	p.deSaturate = function (amount )
	{
		this.setSaturation(this.getSaturation() - amount);
	}

	window.klr = klr;
}(window));