var backgroundBox = document.getElementById("backgroundBox");

var SendButton = document.getElementById("SendButton");
var TextInput = document.getElementById("TextInput");
var InputUser = document.getElementById("InputUser");

const TextBox = document.createElement("div");
const user = document.createElement("code");
const message = document.createElement("code");
const BoldUser = document.createElement("b");

var SentMessage = "";

var username = InputUser.innerHTML;

TextBox.id = "TextBox";
TextBox.style.bottom = "0%";

user.id = "Fonts";
user.className = "User";
user.textContent = username + ": ";

message.id = "Fonts";
message.className = "Message";
message.style.fontFamily = "Times";

if(InputUser.innerHTML == "ACCOUNTNULL")
{TextInput.innerHTML = "Please make an account to chat!";}
else
{TextInput.innerHTML = "";}

document.addEventListener("keyup",
function() {
    SentMessage = TextInput.innerHTML;
})

document.addEventListener("click",
function() {
    if(InputUser.innerHTML == "ACCOUNTNULL")
    {TextInput.innerHTML = "Please make an account to chat!";}
})

var TB = TextBox.cloneNode(true);
var valuenum = 0;

var i = 1;

SendButton.addEventListener("click",
function() {

    const registeredDate = new Date();

    let month = registeredDate.getMonth() + 1;
    let day = registeredDate.getDate();
    let year = registeredDate.getFullYear();

    let hour = registeredDate.getHours() + 0;
    let minute = registeredDate.getMinutes() + 0;

    let hourFormat = "";
    let minuteFormat = "";

    if(hour < 10)
    {hourFormat = "0" + hour;}
    else
    {hourFormat = hour;}

    if(minute < 10)
    {minuteFormat = "0" + minute;}
    else
    {minuteFormat = minute;}

    let date = month + "." + day + "." + year;
    let time = hourFormat + ":" + minuteFormat;

    UserMsgs = [
        SentMessage,
    ];
    UserMsgs.forEach(UserMsg => {
        message.textContent = UserMsg +
        " | " + date + " * " + time;
    });

    var EClass = "E" + i;

    TextBox.className = EClass;
    TextBox.style.bottom = valuenum + "%";
      
    var textRemoves = {
        "&nbsp;": " ",
        "&gt;": ">",
        "&lt;": "<",
        "&amp;": "&",
        "div": " ",

        "<": "",
        ">": "",
        "/": "",
    };
    var repMsg = message.textContent.replace(/&nbsp;|&gt;|&lt;|&amp;|div|<|>/gi, function (e) {
        return textRemoves[e]
    })
    message.textContent = repMsg;
    
    if(InputUser.innerHTML == "ACCOUNTNULL")
        {return}
    else
    if(TextInput.innerHTML == "" || TextInput.innerHTML == "<br>" || TextInput.innerHTML == "&nbsp;" || TextInput.innerHTML == "/" || TextInput.innerHTML.includes("<div><br>"))
        {return}
    else {
        var TB = TextBox.cloneNode(true);
        var U = user.cloneNode(true);
        var M = message.cloneNode(true);
        var BU = BoldUser.cloneNode(true);

        i += 1;

        BoxChat = document.querySelector(".E" + i);
        valuenum -= 11.1;

        TextInput.innerHTML = "";

        ScrollToBottom = setInterval(function() {
            backgroundBox.scrollBy(0, 50);
            clearInterval(ScrollToBottom);
        }, 100);

        backgroundBox.appendChild(TB);
        TB.appendChild(BU);
        TB.appendChild(M);
        BU.appendChild(U);
    }
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