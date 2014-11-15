/**
 *	KLR
 *
 *
 *	@author Alexandre Masy
 *	@version 2.0
 **/
(function(window)
{

	/**
	 *	El constructor
	 **/
	function klr()
	{
		this._red = 0;
		this._green = 0;
		this._blue = 0;

		this._hue = 0; 
		this._saturation = 0;
		this._brightness = 0;
		
		this.list = [];
	}

	/**
	 *	El prototype
	 **/	
	var p = klr.prototype;

	/**
	 *	Return a random klr
	 *
	 **/
	klr.random = function()
	{
		
	}


	window.klr = klr;
})(window);