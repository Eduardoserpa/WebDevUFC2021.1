function validate() {
	var result = "";
	result += validateName();
	result += validateEmail();
	result += validatePassword();
	result += validateTerms();
	
	if (result == "") return true;
	
	alert("Validation Result:\n\n" + result);
	return false;
}

function validateName() {
	var name = document.getElementsByName("name")[0].value;
	if (name.length <= 3)
		return "Name should be at least three characters.\n";
	return "";
}

function validatePassword() {
	var password = valueOf("password");
	var retype = valueOf("retype_password");
	
	if (password.length <= 6)
		return "A senha deve ter pelo menos 6 caracteres.\n";
	
	if (password != retype)
		return "As senhas inseridas não coincidem.\n";
	return "";
}

function validateEmail() {
	var email = valueOf("email");
	var retype = valueOf("retype_email");
	
	if (email.indexOf('@') == -1)
		return "O email deve ser um endereço válido.\n";
	
	if (email != retype)
		return "Os emails inseridos não coincidem.\n";
	return "";	
}

function validateTerms() {
	var terms = document.getElementsByName("terms")[0];
	if (!terms.checked)
		return "Você deve aceitar os Termos de Serviço e a Política de Privacidade.\n";
	return "";
}

function valueOf(name) {
	return document.getElementsByName(name)[0].value;
}
