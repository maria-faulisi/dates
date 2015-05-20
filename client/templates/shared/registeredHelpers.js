Template.registerHelper('arrayToObject', function(array){
	var obj = {};
	for(var i = 0; i < array.length; i++){
		obj[i] = array[i];
		return obj;
	}
});