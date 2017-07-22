var wheelChars = "0123456789abcdef";
var codeField = document.getElementById("code");
var keyField = document.getElementById("key");
var resultField = document.getElementById("result");

function decode(code, key) {
	key = key.replace(/ /g, "").replace(/-/g, "").trim().toLowerCase() + "lr";
	code = code.toLowerCase().trim();
	var result = "";
	var position = 0;
	
	for (var i = 0; i < code.length; i++) {
		var movementString = key.substring(0, Math.min(key.indexOf("l"), key.indexOf("r")));
		
		var movement = parseInt(movementString);
		if (key.charAt(movementString.length) == "r") {
			movement *= -1;
		}
		
		key = key.substring(movementString.length + 1, key.length);
		
		position += movement;
		while (position < 0) {
			position += wheelChars.length;
		}
		charCode = wheelChars.indexOf(code.charAt(i));
		result += wheelChars.charAt((charCode + position) % wheelChars.length);
	}
	return result.toUpperCase();
}

function update() {
	var code = codeField.value;
	var key = keyField.value;
	resultField.value = decode(code, key);
}

codeField.addEventListener("input", update);
keyField.addEventListener("input", update);
update();