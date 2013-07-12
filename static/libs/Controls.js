(function(window)
{

	/**
	 *	El constructor
	 **/
	function Controls()
	{
		this.initialize();
	}

	/**
	 *	Prototype
	 **/
	var p = Controls.prototype;

	/**
	 *	Init the class
	 **/
	p.initialize = function()
	{
		this.view = jQuery('#controls');
		this._color = 0xbada55;

		this.color = this.view.find('.picker')
								.colorpicker()
								.on('changeColor', jQuery.proxy(changeHandler, this))
		this.hue = this.view.find('#hue')
							.on('change', jQuery.proxy(changeHandler, this) );

		this.brightness = this.view.find('#brightness')
									.on('change', jQuery.proxy(changeHandler, this));

		this.saturation = this.view.find('#saturation')
									.on('change', jQuery.proxy(changeHandler, this));
	
		this.angle = this.view.find('#angle')
								.on('change', jQuery.proxy(changeHandler, this));
		
	}

	/**
	 *	Return the value
	 *
	 *	@return Object
	 **/
	p.getValues = function()
	{
		var ret = {};

		ret.color = this._color;
		ret.hue = this.hue.val() | 0;
		ret.brightness = this.brightness.val() | 0;
		ret.saturation = this.saturation.val() | 0;
		ret.angle = this.angle.val() | 0;

		return ret;
	}

	/**
	 *	Change handler
	 *
	 *	@param event Event
	 **/
	function changeHandler(event)
	{
		if (event.color)
		{
			this._color = event.color.toHex();
			this._color = this._color.substr(1);
			this._color = parseInt('0x'+this._color);

			this.hue.val(0);
			this.brightness.val(0);
			this.saturation.val(0);
			this.angle.val(0);
		}

		jQuery(this).trigger('update');
	}

	window.Controls = Controls;
})(window);