(function( window, klr )
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
		Convertor.call(this, value);
	}

	/**
	 * 	Inheritance
	 **/
	RGBFromString.prototype = Object.create(Convertor.prototype);
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
		
	}

	klr.conversion.RGBFromString = RGBFromString;
})(window, klr);