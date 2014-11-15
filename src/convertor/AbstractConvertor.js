(function(window)
{
	'use strict';

	/**	
	 *	Abstract convertor
	 *	Base for all the convertor
	 *
	 *	@param value Object
	 **/
	function AbstractConvertor( value )
	{
		this.value = value;
	}

	/**
	 *	Prototype
	 **/
	var p = AbstractConvertor.prototype;
		
	/**
	 *	Convert
	 **/
	p.convert = function()
	{

	};

	window.klr.convertor.AbstractConvertor = AbstractConvertor;
})(window);