var backgroundBox = document.getElementById("backgroundBox");
var TextBox = document.getElementById("TextBox");

var SendButton = document.getElementById("SendButton");
var TextInput = document.getElementById("TextInput");
var InputUser = document.getElementById("InputUser");

const registeredDate = new Date();

let month = registeredDate.getMonth() + 1;
let day = registeredDate.getDate();
let year = registeredDate.getFullYear();
let date = month + "." + day + "." + year;

let hour = registeredDate.getHours();
let minute = registeredDate.getMinutes();
let time = hour + ":" + minute;

const user = document.createElement("code");
const message = document.createElement("code");
const BoldUser = document.createElement("b");

var username = InputUser.innerHTML;

var TBoffsetHeight = TextBox.offsetHeight;
var TBoffsetTop = TextBox.offsetTop;

document.addEventListener("input",
function() {
    
    let diff = TBoffsetHeight -= TBoffsetTop;
    TextBox.style.bottom = diff + "%";
})

user.id = "Fonts";
user.className = "User";
user.textContent = username + ": ";

message.id = "Fonts";
message.className = "Message";
message.style.fontFamily = "Times";

function append() {
    backgroundBox.appendChild(TextBox);
    
    TextBox.appendChild(BoldUser);
    TextBox.appendChild(message);
    BoldUser.appendChild(user);
}

document.addEventListener("click",
function() {
    if(InputUser.innerHTML == "ACCOUNTNULL")
    {TextInput.innerHTML = "Please make an account to chat!";}
})

if(InputUser.innerHTML == "ACCOUNTNULL")
{TextInput.innerHTML = "Please make an account to chat!";}
else
{TextInput.innerHTML = "";}

TextInput.addEventListener("keyup",
function() {
    
    message.textContent = TextInput.innerHTML + " | " + date + " * " + time
})

SendButton.addEventListener("click",
function() {

    var wordFilter = {
        "Nigger": "nigger",
        "Nigga": "nigga",
    
        "Faggot": "faggot",
        "Fags": "fags",
        "Fag": "fag",
    };
    var wordBan = {
        "nigger": "******",
        "nigga": "*****",
        
        "faggot": "******",
        "fags": "****",
        "fag": "***",

        "&nbsp;": " ",
        "&gt;": ">",
        "&lt;": "<",
        "&amp;": "&",
        "div": " ",

        "<": "",
        ">": "",
        "/": "",
    };
    var repFilter = message.textContent.replace(/Nigger|Nigga|Faggot|Fags|Fag/gi, function (e) {return wordFilter[e] || wordBan[e]})
    var repMsg = repFilter.replace(/Nigger|[/]|Nigga|Faggot|Fags|Fag|&nbsp;|&gt;|&lt;|&amp;|div|<|>/gi, function (e) {return wordBan[e]})
    
    message.textContent = repFilter;
    message.textContent = repMsg;

    if(message.textContent == "")
    {TextBox.style.display = "none";}
    else
    {TextBox.style.display = "inline";}

    if(InputUser.innerHTML == "ACCOUNTNULL")
    {return}
    else
    if(TextInput.innerHTML == "" || TextInput.innerHTML == "<br>" || TextInput.innerHTML == "&nbsp;" || TextInput.innerHTML == "/" || TextInput.innerHTML.includes("<div><br>"))
    {return}
    else
    {TextInput.innerHTML = "";
    append();}
})
SendButton.addEventListener("mouseover",
function() {

    SendButton.style.cursor = "pointer";
    SendButton.style.color = "#FFAAFF";
    SendButton.style.textDecoration = "underline";
})
SendButton.addEventListener("mouseout",
function() {

    SendButton.style.color = "#FFFFFF";
    SendButton.style.textDecoration = "none";
})