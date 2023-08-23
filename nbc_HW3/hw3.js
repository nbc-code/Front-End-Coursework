var rs = require('readline-sync');

var fNum1 = rs.question('1st Number: ');
var fNum2 = rs.question('2nd Number: ');
var fNum3 = rs.question('3rd Number: ');
var fNum4 = rs.question('4th Number: ');
var result1 = 1;

for(i = fNum1; i > 0; i--)
{
    result1 *= i;
}

result1 = eval(result1);
console.log("\nFactorial of " + fNum1 + ": " + result1);

var result2 = 0;
var myArr = fNum2.toString();

for(i = 0; i < myArr.length; i++)
{
    result2 += parseInt(myArr[i]);
}

result2 = eval(result2);
console.log("Sum of " + fNum2 + ": " + result2);

var result3 = "";
var revArr = fNum3.toString();

for(i = revArr.length - 1; i >= 0; i--)
{
    result3 += revArr[i];
}

result3 = eval(result3);
console.log("Reverse of " + fNum3 + ": " + result3);

var result4 = "";
var isPali = false;
var backwardsArr = fNum4.toString();

for(i = backwardsArr.length - 1; i >= 0; i--)
{
    result4 += backwardsArr[i];

    if(result4 === backwardsArr)
    {
        isPali = true;
    }
}

result4 = eval(result4);
console.log("Is " + fNum4 + " a palindrome: " + isPali);