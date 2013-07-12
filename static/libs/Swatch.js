(function(window)
{

	/**
	 *	El constructor
	 **/
	function Swatch( view )
	{
		this.view = view;

		if (this.view.length>0)
			this.initialize();
	}

	/**
	 *	Prototype
	 **/
	var p = Swatch.prototype;

	/**
	 *	Init the class
	 **/
	p.initialize = function()
	{
		this.canvas = this.view.find('canvas').width( this.view.width() );
		this.context = this.canvas[0].getContext('2d');
		this.width = this.canvas.width();
		this.height = this.canvas.height();
	}

	/**
	 *	Update the swatch
	 *
	 *	@param wheel ColorWheel
	 **/
	p.update = function( wheel )
	{
		var list = wheel.getAsList();
		var i = -1;
		var n = list.length-1;

		if ( n == 0 )
		{
			c = list[0];

			this.context.fillStyle = c.format('rgb');
			this.context.fillRect(0, 0, this.width, this.height);
		}
		else
		{
			var px = 0;
			var c;
			var w = this.width/list.length;
			while(i++<n)
			{
				c = list[i];

				this.context.fillStyle = c.format('rgb');
				this.context.fillRect(px, 0, w, this.height);
			
				px += w;
			}
		}
	}

	window.Swatch = Swatch;
})(window);