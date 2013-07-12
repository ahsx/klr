/**
 * @author alexandre
 */

(function(window)
{
	
	var klrtool = function(){};
	
	/**
	 *	Return the RGB values for a hex color string
	 *
	 *	@param hex String or int
	 *	@returns Object
	 **/
	klrtool.hexToRGB = function( hex )
	{
		if (typeof hex == 'string')
			hex = hex.indexOf('#') == 0 ? hex.substr(1) : hex;


		if (typeof hex != 'number')
			hex = parseInt(hex, 16);

		var ret = {}
		ret.red = hex >> 16 & 0xFF;
		ret.green = hex >> 8 & 0xFF;
		ret.blue = hex & 0xFF;
		
		return ret;
	}
	
	/**
	 * 	Convert to hex from rgb
	 * 	
	 *	@param red uint
	 *	@param green uint
	 *	@param blue uint
	 *	@return int
	 */
	klrtool.RGBToHex = function( red, green, blue )
	{
		return (red << 16 | green << 8 | blue) | 0;
	}
	
	/**
	 *	 Convert a hsv value to rgb
	 *	
	 *	@param h uint
	 *	@param s uint
	 *	@param v uint
	 *	@see http://www.koders.com/python/fidB2FE963F658FE74D9BF74EB93EFD44DCAE45E10E.aspx
	 */
	klrtool.HSVToRGB = function( h, s, v )
	{
		s = s / 100;
		v = v / 100;
		
		var i, f, p, q, t, red = 0, green = 0, blue = 0;
		var ret;

		if( s == 0 ) 
		{
			red = green = blue = v;

			ret = {
				red: Math.round(red*255),
				green: Math.round(green*255),
				blue: Math.round(blue*255)
			};
			return ret;
		}
		if(h > 360) 
			h = h - 360;

		if(h < 0) 
			h = 360 + h;

		h = h / 60;		

		i = Math.floor(h);
		f = h - i;			
		p = v * (1 - s);
		q = v * (1 - s * f);
		t = v * (1 - s * ( 1 - f ));

		switch( i ) 
		{
			case 0:
				red = v;
				green = t;
				blue = p;
				break;
			case 1:
				red = q;
				green = v;
				blue = p;
				break;
			case 2:
				red = p;
				green = v;
				blue = t;
				break;
			case 3:
				red = p;
				green = q;
				blue = v;
				break;
			case 4:
				red = t;
				green = p;
				blue = v;
				break;
			default:		
				// case 5:
				red = v;
				green = p;
				blue = q;
				break;
		}

		ret = {
			red: Math.round(red*255),
			green: Math.round(green*255),
			blue: Math.round(blue*255)
		};

		return ret;
	}
	
	/**
	 *	Convert a rgb color to hsv 
	 *
	 *	@param red uint
	 *	@param green uint
	 *	@param blue uint
	 *	@return Object
	 */
	klrtool.RGBToHSV = function( red, green, blue )
	{
		red /= 255, green /= 255, blue /= 255;
		var min, max, delta, h, s;
		var ret = {};

		min = Math.min(red, green, blue);
		max = Math.max(red, green, blue);
		var v = max;				
		delta = max - min;
		if( max != 0 ) 
			s = delta / max;
		else 
		{
			s = 0;
			h = -1;

			ret.hue = h |0;
			ret.saturation = s * 100|0;
			ret.value = v|0;

			return ret;
		}

		if( red == max ) 
			h = ( green - blue ) / delta;		// between yellow & magenta
		else if( green == max ) 
			h = 2 + ( blue - red ) / delta;	// between cyan & yellow
		else 
			h = 4 + ( red - green ) / delta;	// between magenta & cyan
		
		h *= 60;				
		// degrees
		if( h < 0 )
			h += 360;

		ret.hue = Math.round(h);
		ret.saturation = Math.round(s * 100);
		ret.value = Math.round(v * 100);

		return ret;
	}

	/**
	 *	Convert the rgb to hsl
	 *	http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
	 *	
	 *	@param red uint
	 *	@param green uint
	 *	@param blue uint
	 **/
	klrtool.RGBToHSL = klrtool.RGBToHSB = function (red, green, blue)
	{
		red /= 255, green /= 255, blue /= 255;
	    var max = Math.max(red, green, blue), min = Math.min(red, green, blue);
	    var h, s, l = (max + min) / 2;

	    if(max == min)
	        h = s = 0;
	    else
	    {
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        
	        if( red == max ) 
				h = ( green - blue ) / d;		// between yellow & magenta
			else if( green == max ) 
				h = 2 + ( blue - red ) / d;	// between cyan & yellow
			else 
				h = 4 + ( red - green ) / d;	// between magenta & cyan
			
			h *= 60;				
			// degrees
			if( h < 0 )
				h += 360;
	    }

	    ret = {
	    	hue: Math.round(h),
	    	saturation: Math.round(s*100),
	    	brightness: Math.round(l*100)
	    }

	    return ret;
	}
	
	window.klrtool = klrtool;
}(window));
