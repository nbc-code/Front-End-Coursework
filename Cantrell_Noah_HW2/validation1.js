var count = 0;//counter for number of entries

function validateForm(userInput)//validates input
{
	var userEntry = document.forms["v1Form"][userInput].value;
	var alphaNumChars = /^[a-z0-9]+$/i;
	var error = 0;
	
	isValid = true;
	
	if(userEntry == "")//detects empty field error
	{
		error = 1;//specific error identifier
		isValid = false;
	}
    else if (!userEntry.match(alphaNumChars))//detects special character error
	{
		isValid = false
	}

	var pic = makePicture(isValid, userInput);//gets correct picture
	var errMsg = errorNotification(isValid, userInput, error);//gets correct error (if applicable)
	
	document.getElementById(userInput).appendChild(pic);
	document.getElementById(userInput).appendChild(errMsg);
	
	nextPage(isValid);//Goes to next page if all entries are valid
	
	return isValid;
}

function makePicture(isCorrect, elementID)//gets the correct picture
{
    var picture = document.getElementById("pic_" + elementID);
	
	if(picture == null)//make sure pictures are unique, no duplicates
	{
		picture = new Image(15,15);
		picture.id = "pic_" + elementID;
	}

	if(isCorrect)//Chooses picture based on user input validity
	{
		picture.src = './correct.png';
	}
	else
	{
		picture.src = './wrong.png';
	}
	
    return picture;
}

function errorNotification(isCorrect, elementID, error)//creates error message based on input
{
	var errorMsg = document.getElementById("errMsg_" + elementID);
	
	
	if(errorMsg == null)//make sure each message is unique, no duplicates
	{
		errorMsg = document.createElement("MESSAGE");
		errorMsg.id = "errMsg_" + elementID;
		errorMsg.setAttribute('class', 'errorMessage');
	}
	
	if(isCorrect)//input was valid
	{
		errorMsg.innerHTML = "";
	}
	else if(error == 1)//input was an emply field (which is invalid)
	{
		errorMsg.innerHTML = "Field must not be empty!";
	}
	else//error must be invalid characters
	{
		errorMsg.innerHTML = "Field must contain only alphabetic or numeric characters!";
	}
	
	return errorMsg;
}

function nextPage(bool)//Automatically open next page if all fields are valid
{
	if(bool)//increments count based on number of correct fields
	{
		count = count + 1;
	}
	else//resets count if there is an invalid field
	{
		count = 0;
	}

	if(count == 4)
	{
		setTimeout(function(){ window.open("validation2.html"); }, 650); //short delay on opening of new window
	}

}