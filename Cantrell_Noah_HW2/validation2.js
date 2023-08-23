isValid = true;//Variable for validity of current element

function validateForm(userInput)//validates current element
{
	var elementValue = document.forms["contactForm"][userInput].value;
	
	var error = getErrorMessage(userInput, elementValue);
	var pic = getPicture(isValid, userInput);
	
	document.getElementById(userInput).appendChild(pic);
	document.getElementById(userInput).appendChild(error);
	
}

function getErrorMessage(userInput, elementValue)//Gets error message for current element (if applicable)
{
	var errorMsg = document.getElementById("errMsg_" + userInput);
	
	if(errorMsg == null)//Make sure each message is unique, no duplicates
	{
		errorMsg = document.createElement("ERROR_MESSAGE");
		errorMsg.id = "errMsg_" + userInput;
		errorMsg.setAttribute('class', 'errorMessage');
	}
	
	switch(userInput)//determine what element it's validating
	{
		case 'Email':
			isValid = checkEmail(elementValue, errorMsg);
			break;
		case 'Phone':
			isValid = checkPhoneNumber(elementValue, errorMsg);
			break;
		case 'Address':
			isValid = checkAddress(elementValue, errorMsg);
			break;
		default:
			break;
	}
	
	return errorMsg;
}

function getPicture(isCorrect, elementID)//Gets picture for element based on it's validity
{
	var picture = document.getElementById("pic_" + elementID);
	
	if(picture == null)//Make sure each picture is unique, no duplicates
	{
		picture = new Image(15,15);
		picture.id = "pic_" + elementID;
	}

	if(isCorrect)
	{
		picture.src = './correct.png';
	}
	else
	{
		picture.src = './wrong.png';
	}
	
    return picture;
}

function checkEmail(email, message)//Checks user's email input and determines it's validity
{
	message.innerHTML = "Field should only contain alphanumeric characters and be in the form xxx@xxx.xxx!";
	
	if(!email.includes('@') || !email.includes('.') || email == "")//Email must have @ and . and not be empty
	{
		return false;
	}
	
	var atSplit = email.split('@');
	var periodSplit = atSplit[1].split('.');

	
	if(checkAlphaNum(atSplit[0]) && checkAlphaNum(periodSplit[0]) && checkAlphaNum(periodSplit[1]))//Make sure each part of email contains the correct characters
	{
		message.innerHTML = "";
		return true;
	}
	
	return false;
}

function checkPhoneNumber(phone, message)//Checks user's phone number and determines it's validity
{
	numberSplit = phone.split('-');
	let numbers = /^[0-9]+$/i;
	var totalNumbers = 0;
	
	message.innerHTML = " 'x' should be numbers and field must be in form of xxx-xxx-xxxx!";
	
	if(numberSplit.length < 3)//Check number of 
	{
		return false;
	}
	for(i = 0; i < numberSplit.length; i++)
	{
		if(!numberSplit[i].match(numbers))//Each part of phone number must only be numbers
		{
			return false;
		}
		if(numberSplit[i].length > numberSplit[2].length)//last section of phone number must be longest
		{
			return false;
		}
		totalNumbers = totalNumbers + numberSplit[i].length;
	}
	
	if(totalNumbers != 10)//Make sure phone number has correct number of digits
	{
		return false;
	}
	else
	{
		message.innerHTML = "";//update message
		return true;
	}
	
}

function checkAddress(address, message)//Check user input for address and determines it's validity
{
	addrSplit = address.split(",");
	let alphabet = /^([a-z]+[\s]*)+$/i;
	
	message.innerHTML = "Must be in the form of city,state (Example: Ames,IA)!";
	
	if(address == "" || addrSplit.length < 2)//address cant be empty and the split array length should be exactly 2
	{
		return false;
	}
	
	if(addrSplit[0].match(alphabet) && (addrSplit[1].match(alphabet) && addrSplit[1].length == 2))//Validates address
	{
		message.innerHTML = "";//update if input is valid
		return true;
	}
	else
	{
		return false;
	}
}

function checkAlphaNum(userInput)//Checks input for alphabetic and numeric characters
{
	var alphaNumChars = /^[a-z0-9]+$/i;

	if(userInput == "" || !userInput.match(alphaNumChars))//false if input contains non alphabetic or numeric characters
	{
		return false;
	}
	
	return true;
}