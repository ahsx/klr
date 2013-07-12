/**
 * @author alexandre
 */

(function()
{
	var klrlist = function( first )
	{
		this.initialize(first);
	}
	
	var p = klrlist.prototype;
	p._list = null;
	p._index = 0;
	
	/**
	 * 	Initialize the wheel
	 */
	p.initialize = function( first )
	{
		this._list = [];
		this._index = 0;
		if (first != null)
		{
			this.addColor(first);
		}
	}
	
	/**
	 *	Add a color to the wheel 
	 *
	 *	@param color Color
	 */
	p.addColor = function( color )
	{
		this._list.push( color );
	}
	
	p.getColor = function()
	{
		var ret = this._list[this._index];
		rotate();
		return ret;
	}
	
	p.getAsList = function()
	{
		return this._list;
	}

	p.rotate = function()
	{
		if(this._index == this._list.length - 1) 
		{
			this._index = 0;			
		} 
		else 
		{
			this._index++;
		}
	}

	p.brighten = function (amount)
	{
		amount = amount || 10;
		var n = this._list.length-1, i = -1, color;
		while(i++<n)
		{
			color = this._list[i];
			color.brighten( amount );
		}
	}

	p.darken = function (amount) 
	{
		amount = amount || 10;
		var n = this._list.length-1, i = -1, color;
		while(i++<n)
		{
			color = this._list[i];
			color.darken(amount);
		}
	}

	p.saturate = function (amount)
	{
		amount = amount || 10;
		var n = this._list.length-1, i = -1, color;
		while(i++<n)
		{
			color = this._list[i];
			color.saturate(amount);
		}
	}

	p.deSaturate = function (amount)
	{
		amount = amount || 10;
		var n = this._list.length-1, i = -1, color;
		while(i++<n)
		{
			color = this._list[i];
			color.deSaturate(amount);
		}
	}
	
	p.copy = function()
	{
		var newWheel = new klrlist();
		var n = this._list.length-1, i = -1, color;
		while(i++<n)
		{
			color = this._list[i];
			newWheel.addColor(color.copy());
		}
		return newWheel;
	}

	p.contains = function (newColor)
	{
		var n = this._list.length-1, i = -1, color;
		while(i++<n)
		{
			color = this._list[i];
			if(color.isEqual(newColor)) 
			{
				return true;
			}
		}
		return false;
	}

	p.mix = function (secondWheel)
	{
		var cw2 = secondWheel.getAsList();
		var n = cw2.length-1, i = -1;
		while(i++<n)
		{
			this.addColor( cw2[i] );
		} 
	}

	p.shuffle = function () 
	{
		this._list.sort(onShuffle);
	}

	p.sortByBrightness = function() 
	{
		this._list.sort(onBrightness);
	}

	p.sortBySaturation = function()
	{
		this._list.sort(onSaturation);
	}


	p.sortByHue = function()
	{
		this._list.sort(onHue);
	}

	p.onHue = function(c1, c2)  
	{
		if(c1.getHue() > c2.getHue()) 
		{
			return -1;
		}
		else if(c1.getHue() == c2.getHue()) 
		{
			return 0;	
		}
		else if(c1.getHue() < c2.getHue()) 
		{
			return 1;
		}
		return -1;
	}

	p.onSaturation = function (c1, c2)
	{
		if(c1.getSaturation() > c2.getSaturation()) 
		{
			return -1;
		}
		else if(c1.getSaturation() == c2.getSaturation()) 
		{
			return 0;	
		}
		else if(c1.getSaturation() < c2.getSaturation()) 
		{
			return 1;
		}
		return -1;
	}

	p.onShuffle = function (ob1, ob2)
	{
		var rnd = (Math.random() * 1.2) - 0.6;
		if(rnd < 0.2 && rnd > -0.2) 
		{
			return 0;
		}
		if(rnd > 0.2) 
		{
			return 1;
		}
		if(rnd < -0.2) 
		{
			return -1;
		}
		return -1;
	}

	p.onBrightness = function(c1, c2)
	{
		if(c1.getBrightness() > c2.getBrightness()) 
		{
			return -1;
		}
		else if(c1.getBrightness() == c2.getBrightness()) 
		{
			return 0;
		}
		else if(c1.getBrightness() < c2.getBrightness()) 
		{
			return 1;
		}
		return -1;
	}

	p.length = function()
	{
		return this._list.length;
	}
	
	window.klrlist = klrlist; 
}(window));
