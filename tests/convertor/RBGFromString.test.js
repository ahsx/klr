describe("RGBFromString", function() 
{

	it("should be able to handle #ff0000", function() 
	{
		var c = new klr.conversion.RGBFromString('#ff0000');
		var o = c.convert();

		expect(o.r).toBe(255);
		expect(o.g).toBe(0);
		expect(o.b).toBe(0);
	});

});