/**
 * @author alexandre
 */
(function()
{

	/**
	 *	Constructor
	 *
	 *	@param first klr
	 **/
	klrlist = function( first )
	{
		this.init(first);
	}
	
	/**
	 *	Prototype
	 **/
	var p = klrlist.prototype;
	
	/**
	 * 	init the wheel
	 *
	 *	@param first klr
	 */
	p.init = function( first )
	{
		this.list = [];
		this.index = 0;
		if (first != null)
			this.addColor(first);
	}
	
	/**
	 *	Add a color to the wheel 
	 *
	 *	@param color Color
	 */
	p.addColor = function( color )
	{
		this.list.push( color );
	}
	
	/** 
	 *	Return the color at the current index, or the given index if provided
	 *
	 *	@param index int
	 **/
	p.getColor = function( index )
	{
		index = index || this.index;
		var ret = this.list[index];
		this.rotate();

		return ret;
	}
	
	/** 
	 *	Return the color list
	 *	
	 *	@return Array
	 **/
	p.getList = function()
	{
		return this.list;
	}

	/**
	 *	Rotate to the next color
	 **/
	p.rotate = function()
	{
		if(this.index == this.list.length - 1) 
			this.index = 0;			
		else 
			this.index++;
	}

	/**
	 *	Brighten all the colors by the given amount
	 *
	 *	@param amount int
	 **/
	p.brighten = function (amount)
	{
		amount = amount || 10;
		var n = this.list.length-1, i = -1, color;
		while(i++<n)
		{
			color = this.list[i];
			color.brighten( amount );
		}
	}

	/**
	 *	Darken all the colors by the given amount
	 *
	 *	@param amount int
	 **/
	p.darken = function (amount) 
	{
		amount = amount || 10;
		var n = this.list.length-1, i = -1, color;
		while(i++<n)
		{
			color = this.list[i];
			color.darken(amount);
		}
	}

	/**
	 * Saturate all the colors by the given amount
	 *
	 *	@param amount int
	 **/
	p.saturate = function (amount)
	{
		amount = amount || 10;
		var n = this.list.length-1, i = -1, color;
		while(i++<n)
		{
			color = this.list[i];
			color.saturate(amount);
		}
	}

	/**
	 * Desaturate all the colors by the given amount
	 *
	 *	@param amount int
	 **/
	p.deSaturate = function (amount)
	{
		amount = amount || 10;
		var n = this.list.length-1, i = -1, color;
		while(i++<n)
		{
			color = this.list[i];
			color.deSaturate(amount);
		}
	}
	
	/**
	 *	Return a copied version of the klrlist
	 *
	 *	@return klrlist
	 **/
	p.copy = function()
	{
		var newWheel = new klrlist();
		var n = this.list.length-1, i = -1, color;
		while(i++<n)
		{
			color = this.list[i];
			newWheel.addColor(color.copy());
		}
		return newWheel;
	}

	/**
	 *	Is the newColor contained in the list
	 *
	 *	@param newColor klr
	 *	@return Boolean
	 **/
	p.contains = function (newColor)
	{
		var n = this.list.length-1, i = -1, color;
		var ret = false;
		while(i++<n)
		{
			color = this.list[i];
			if(color.isEqual(newColor)) 
			{
				ret = true;
			}
		}
		return ret;
	}

	/**
	 *	Mix two list together
	 *
	 *	@param second klrlist
	 **/
	p.mix = function (second)
	{
		var cw2 = second.getList();
		var n = cw2.length-1, i = -1;
		while(i++<n)
		{
			this.addColor( cw2[i] );
		} 
	}

	/**
	 *	Shuffle the list
	 **/
	p.shuffle = function () 
	{
		this.list.sort( onShuffle );
	}

	/**
	 *	Sort the list by brightness
	 **/
	p.sortByBrightness = function() 
	{
		this.list.sort( onBrightness );
	}

	/**
	 *	Sort the list by saturation
	 **/	
	p.sortBySaturation = function()
	{
		this.list.sort(onSaturation);
	}

	/**
	 *	Sort the list by hue
	 **/
	p.sortByHue = function()
	{
		this.list.sort(onHue);
	}

	/**
	 *	Sort by hue utility method
	 *
	 *	@param c1 
	 *	@param c2
	 *	@return int
	 **/
	function onHue(c1, c2)  
	{
		var ret = -1;
		if(c1.getHue() > c2.getHue()) 
			ret = -1;
		else if(c1.getHue() == c2.getHue()) 
			ret = 0;	
		else if(c1.getHue() < c2.getHue()) 
			ret = 1;

		return -1;
	}

	/**
	 *	Sort by saturation utility method
	 *
	 *	@param c1 
	 *	@param c2
	 *	@return int
	 **/
	function onSaturation (c1, c2)
	{
		var ret = -1;
		if(c1.getSaturation() > c2.getSaturation()) 
			ret =  -1;
		else if(c1.getSaturation() == c2.getSaturation()) 
			ret =  0;	
		else if(c1.getSaturation() < c2.getSaturation()) 
			ret =  1;
		
		return ret;
	}

	/**
	 *	Sort by shuffle utility method
	 *
	 *	@param ob1
	 *	@param ob2
	 **/
	function onShuffle (ob1, ob2)
	{
		var ret = -1;
		var rnd = (Math.random() * 1.2) - 0.6;

		if(rnd < 0.2 && rnd > -0.2) 
			ret = 0;

		if(rnd > 0.2) 
			ret = 1;

		if(rnd < -0.2) 
			ret = -1;

		return ret;
	}


	/**
	 *	Sort by brightness utility method
	 *	
	 *	@param c1 
	 *	@param c2
	 *	@return int
	 **/
	function onBrightness (c1, c2)
	{
		var ret = -1;

		if(c1.getBrightness() > c2.getBrightness()) 
			ret = -1;
		else if(c1.getBrightness() == c2.getBrightness()) 
			ret = 0;
		else if(c1.getBrightness() < c2.getBrightness()) 
			ret = 1;

		return ret;
	}

	/**
	 *	Return the length of the list
	 *
	 *	@return int
	 **/
	p.length = function()
	{
		return this.list.length;
	}
	
	window.klrlist = klrlist; 
}(window));
