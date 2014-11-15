(function( klr )
{
	"use strict";

	/**
	 *	Convert the current value to a rgb
	 *	If the value is not a valid string (e.g "foo") 
	 *	then it will result a black color.
	 *
	 *	Supported format:
	 *	 	long rgb	#ff0000
	 *		short rgb 	#f00
	 *		rgba 		#ff0000ff
	 *
	 *	@param value
	 **/
	function RGBFromString( value )
	{
		klr.conversion.AbstractConvertor.call(this, value);
	}

	/**
	 * 	Inheritance
	 **/
	RGBFromString.prototype = Object.create(klr.conversion.AbstractConvertor.prototype);
	RGBFromString.prototype.constructor = RGBFromString;
	
	/**
	 *	Prototype
	 **/
	var p = RGBFromString.prototype;

	/**
	 *	Conversion process
	 **/
	p.convert = function()
	{
		var ret = {
			r: 0,
			g: 0,
			b: 0
		}

		return ret;
	};

	klr.conversion.RGBFromString = RGBFromString;
})(klr);