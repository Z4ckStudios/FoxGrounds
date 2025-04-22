var backgroundBox = document.getElementById("backgroundBox");

var SendButton = document.getElementById("SendButton");
var TextInput = document.getElementById("TextInput");
var InputUser = document.getElementById("InputUser");

const TextBox = document.createElement("div");
const user = document.createElement("code");
const message = document.createElement("code");
const BoldUser = document.createElement("b");

var prevMsgs = localStorage.getItem("prevMsgs");
var prevMsgText = localStorage.getItem("prevMsgText");
var prevMsgPos = localStorage.getItem("prevMsgPos");
var iValue = localStorage.getItem("iValue");
var VNum = localStorage.getItem("VNum");

var toLogBox = [];
// var toLogUser = [];
var toLogMsg = [];

var toLogBoxPos = [];

var tlb = -1;
var tlbp = -1;
var tlm = -1;

if(iValue == null)
{iValue = iValue;}
else
{var splitPrev = prevMsgs.split(",");
var splitPrevPos = prevMsgPos.split(",");
toLogBox = splitPrev;
toLogBoxPos = splitPrevPos;}

// location.replace("idle.html");

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

var valuenum = null;
var i = 1;

var parseValue = parseInt(iValue);
var parseVNum = parseInt(VNum);
parseValue += 1;

if(VNum == null)
{VNum = VNum;
valuenum = 0;}
else
{valuenum = parseVNum;}

if(parseValue > i)
{i = parseValue;}

function getHeight(eHeight) {
    var TBPerHeight = eHeight.offsetHeight;
    return TBPerHeight;
}

for(x = 1; x < toLogBox.length + 1; x++) {
    var TB = TextBox.cloneNode(true);
    var U = user.cloneNode(true);
    var M = message.cloneNode(true);
    var BU = BoldUser.cloneNode(true);

    var parseTLM = JSON.parse(prevMsgText);
    toLogMsg = parseTLM;

    tlb < toLogBox.length ? tlb++ : tlb - tlb;
    tlbp < toLogBoxPos.length ? tlbp++ : tlbp - tlbp;
    tlm < toLogMsg.length ? tlm++ : tlm - tlm;

    console.log(parseTLM[tlm]);

    TB.className = toLogBox[tlb];
    TB.style.bottom = toLogBoxPos[tlbp] + "px";
    M.textContent = parseTLM[tlm];

    backgroundBox.appendChild(TB);
    TB.appendChild(BU);
    TB.appendChild(M);
    BU.appendChild(U);
}

backgroundBox.scrollBy(0, -1 * valuenum);

function Formats() {
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

    localStorage.setItem("iValue", i);
    
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
}

function SendMessage() {
    var TB = TextBox.cloneNode(true);
    var U = user.cloneNode(true);
    var M = message.cloneNode(true);
    var BU = BoldUser.cloneNode(true);
    
    i += 1;

    toLogBox.push(TextBox.className);
    toLogMsg.push(message.textContent);

    var stringTLM = JSON.stringify(toLogMsg);

    localStorage.setItem("prevMsgs", toLogBox);
    localStorage.setItem("prevMsgText", stringTLM);

    TextInput.innerHTML = "";

    ScrollToBottom = setInterval(STBInt, 100);

    function STBInt() {
        backgroundBox.scrollBy(0, -1 * valuenum);
        clearInterval(ScrollToBottom);
    }

    var quickTimer = 0;
    var quickInterval = setInterval(quickInt, 1);

    function quickInt() {
        quickTimer++

        if(quickTimer > 1)
        {var MinusI = i - 1;
        var perE = ".E" + MinusI;

        var BoxNum = document.querySelector(perE);
    
        valuenum -= getHeight(BoxNum);
        TB.style.bottom = valuenum + "px";

        toLogBoxPos.push(valuenum);
        localStorage.setItem("prevMsgPos", toLogBoxPos);
        localStorage.setItem("VNum", valuenum);

        console.log(valuenum);
        
        clearInterval(quickInterval);}
    }

    backgroundBox.appendChild(TB);
    TB.appendChild(BU);
    TB.appendChild(M);
    BU.appendChild(U);
}

TextInput.addEventListener("keypress",
function(e) {
    if(e.key == "Enter")
    {
        Formats();

        if(InputUser.innerHTML == "ACCOUNTNULL")
            {return}
        else
        if(TextInput.innerHTML == "" || TextInput.innerHTML == "<br>" || TextInput.innerHTML == "&nbsp;" || TextInput.innerHTML == "/" || TextInput.innerHTML.includes("<div><br>"))
            {return}
        else {
            SendMessage();

            var msgTimer = 0;
            const msgInterval = setInterval(msgInt, 1);

            function msgInt() {
                msgTimer++

                if(msgTimer > 1)
                {TextInput.innerHTML = "";
                clearInterval(msgInterval);}
            }
        }
    }
})

SendButton.addEventListener("click",
function() {
    Formats();
    
    if(InputUser.innerHTML == "ACCOUNTNULL")
        {return}
    else
    if(TextInput.innerHTML == "" || TextInput.innerHTML == "<br>" || TextInput.innerHTML == "&nbsp;" || TextInput.innerHTML == "/" || TextInput.innerHTML.includes("<div><br>"))
        {return}
    else {
        SendMessage();
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