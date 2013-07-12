/**
*	@author Masy Alexandre
**/

(function(window)
{

	/**
	 *	Controller
	 **/
	var Demo = function()
	{
		this.initialize();
	}
	
	/**
	 *	Prototype
	 **/	
	var p = Demo.prototype;
	
	/**
	 *	Initialize
	 **/
	p.initialize = function()
	{
		this.controls = new Controls();
		jQuery(this.controls).bind('update', jQuery.proxy(updateHandler, this));

		this.color = new Swatch( jQuery('#color') );

		// color scheme
		this.complement = new Swatch( jQuery('#complement') );	
		this.splitComplement = new Swatch( jQuery('#split-complement') );
		this.complementary = new Swatch( jQuery('#complementary') );
		this.leftComplementary = new Swatch( jQuery('#left-complementary') );
		this.rightComplementary = new Swatch( jQuery('#right-complementary') );
		this.monochrome = new Swatch( jQuery('#monochrome') );
		this.triad = new Swatch( jQuery('#triad') );
		this.tetrad = new Swatch( jQuery('#tetrad') );
		this.analogous = new Swatch( jQuery('#analogous') );
		this.compound = new Swatch( jQuery('#compound') );

		// color shade
		this.light = new Swatch( jQuery('#light') );
		this.dark = new Swatch( jQuery('#dark') );
		this.bright = new Swatch( jQuery('#bright') );
		this.weak = new Swatch( jQuery('#weak') );
		this.neutral = new Swatch( jQuery('#neutral') );
		this.fresh = new Swatch( jQuery('#fresh') );
		this.soft = new Swatch( jQuery('#soft') );
		this.hard = new Swatch( jQuery('#hard') );
		this.warm = new Swatch( jQuery('#warm') );
		this.cool = new Swatch( jQuery('#cool') );
		this.intense = new Swatch( jQuery('#intense') );

		this.update();
	}

	/**
	 *	Update the swatches
	 **/
	p.update = function()
	{
		var values = this.controls.getValues();
		var c = klr.fromHex( values.color );
		var q = 7;

		if (values.hue >0)
			c.setHue( values.hue );
		if (values.saturation >0)
			c.setSaturation( values.saturation );
		if (values.brightness >0)
			c.setBrightness( values.brightness );


		this.color.update( new klrlist(c) );

		// scheme
		this.complement.update( c.toComplementList() );
		this.splitComplement.update( c.toSplitComplementList() ); 
		this.complementary.update( c.toComplementaryList() ); 
		this.leftComplementary.update( c.toLeftComplementaryList() ); 
		this.rightComplementary.update( c.toRightComplementaryList() ); 
		this.monochrome.update( c.toMonochrome() ); 
		this.triad.update( c.toTriad() ); 
		this.tetrad.update( c.toTetrad(values.angle != 0 ? values.angle : null) ); 
		this.analogous.update( c.toAnalogous(values.angle != 0 ? values.angle : null) ); 
		this.compound.update( c.toCompound() ); 

		// shade
		this.light.update( c.toLight(q) );
		this.dark.update( c.toDark(q) );
		this.bright.update( c.toBright(q) );
		this.weak.update( c.toWeak(q) );
		this.neutral.update( c.toNeutral(q) );
		this.fresh.update( c.toFresh(q) );
		this.soft.update( c.toSoft(q) );
		this.hard.update( c.toHard(q) );
		this.warm.update( c.toWarm(q) );
		this.cool.update( c.toCool(q) );
		this.intense.update( c.toIntense(q) );
	}

	/**
	 *	Update handler
	 *	
	 *	@param event Event
	 **/
	function updateHandler(event)
	{
		this.update();
	}
	
	jQuery(window).ready(function()
	{
		new Demo();
	});
}(window));
