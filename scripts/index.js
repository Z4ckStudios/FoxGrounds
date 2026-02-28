import devtools from "../node_modules/devtools-detect/index.js";

if(document.baseURI == "https://z4ckstudios.github.io/FoxGrounds/") {
    var url = "../FoxGrounds/";
    window.history.replaceState(null, document.title);
}

// localStorage.clear();

var backgroundBox = document.getElementById("backgroundBox");

var SendButton = document.getElementById("SendButton");
var TextInput = document.getElementById("TextInput");
var InputUser = document.getElementById("InputUser");

var TextBox = document.getElementById("TextBox");
var User = document.querySelector(".User");
var Message = document.querySelector(".Message");
var DateTime = document.querySelector(".DateTime");

var prevMsgBox = localStorage.getItem("prevMsgBox");
var iValue = localStorage.getItem("iValue");
var VNum = localStorage.getItem("VNum");

// if(dataList == null) {
//     var dataList = [];
// }

// fetch("data/send/data.php")
// .then(reply => reply.json())
// .then(data => {
//     var value = data;
//     dataList.push(value);
// })

var checkListText = [
    "CHECKLIST:",
    "- Check if a message is inside of quotations before calling split at the position of a comma ✓",
    "- Check for a User in devtools to prevent them from sending a message ✓",
    "- Make a better date and time format ✓",
    "- Allow users to lengthen messages by pressing Shift + Enter",
    "- Make an accounts system",
    "- Connect FoxGrounds to firebase",
    "- Launch a development version!",
];

checkListText.forEach(text => {
    console.log(text);
})

var toLogBox = [];

var canSend = true;

if(iValue == null) {
    iValue = iValue;
}

function checkDevTools() {
    if(devtools.isOpen == true) {
        canSend = false;
    } else {
        canSend = true;
    }
}

// location.replace("idle.html");

var messageDelay = false;

var SentMessage = "";
var username = InputUser.innerHTML;

User.textContent = username + ": ";

if(InputUser.innerHTML == "ACCOUNTNULL") {
    TextInput.innerHTML = "Please make an account to chat!";
} else {
    TextInput.innerHTML = "";
}

document.addEventListener("keydown",
function() {
    SentMessage = TextInput.innerHTML;
})
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

if(VNum == null) {
    VNum = VNum;
valuenum = 30;
} else {
    valuenum = parseVNum;
}

if(parseValue > i) {
    i = parseValue;
}

function getHeight(eHeight) {
    var TBPerHeight = eHeight.offsetHeight;
    return TBPerHeight;
}

var TBList = [];

for(var x = 0; x < iValue; x++) {
    if(prevMsgBox !== "null") {
        var TB = TextBox.cloneNode();

        var parseTLBI = JSON.parse(prevMsgBox);
        toLogBox = parseTLBI;

        backgroundBox.appendChild(TB);
        TBList.push(TB);
    }
}

var a = 0;

for(var x = 0; x < TBList.length; x++) {
    if(prevMsgBox !== "null") {
        TBList[x].className = "M" + parseInt(x+1);
        TBList[x].outerHTML = toLogBox[x];
        
        a += 1;
    }
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

    if(hour < 10) {
        hourFormat = "0" + hour;
    } else {
        hourFormat = hour;
    }

    if(minute < 10) {
        minuteFormat = "0" + minute;
    } else {
        minuteFormat = minute;
    }

    let date = month + "/" + day + "/" + year;
    let time = hourFormat + ":" + minuteFormat;

    var UserMsgs = [
        SentMessage,
    ];
    UserMsgs.forEach(UserMsg => {
        Message.innerHTML = UserMsg;
    });

    DateTime.textContent = date + " * " + time;

    localStorage.setItem("iValue", i);

    // fetch("data/recieve/iV.php", {
    //     "method": "POST",
    //     "headers": {
    //         "Content-Type": "application/json; charset=utf-8"
    //     },
    //     "body": JSON.stringify(i)
    // }).then(function(reply) {
    //     return reply.text();
    // })

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
    var repMsg = Message.textContent.replace(/&nbsp;|&gt;|&lt;|&amp;|div|<|>/gi, function (e) {
        return textRemoves[e]
    })
    Message.textContent = repMsg;
}

function SendMessage() {
    var TB = TextBox.cloneNode(true);
    
    TB.className = "M" + i;
    i += 1;

    TextInput.innerHTML = "";

    var ScrollToBottom = setInterval(STBInt, 100);

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
        var perM = ".M" + MinusI;

        var BoxNum = document.querySelector(perM);
        var BNMsg = BoxNum.querySelector(".Message");
        
        TB.style.height = BNMsg.getBoundingClientRect().height + "px";

        valuenum -= getHeight(BoxNum);
        TB.style.bottom = valuenum + "px";
    
        toLogBox.push(TB.outerHTML);
        var stringTLBI = JSON.stringify(toLogBox);

        localStorage.setItem("prevMsgBox", stringTLBI);
        localStorage.setItem("VNum", valuenum);
        
        clearInterval(quickInterval);}
    }

    messageDelay = true;

    var DelayTimer = 0;
    var DelayInterval = setInterval(DelayInt, 100);

    function DelayInt() {
        DelayTimer++

        if(DelayTimer > 1) {
            messageDelay = false;
            clearInterval(DelayInterval);
        }
    }

    backgroundBox.appendChild(TB);
}

TextInput.addEventListener("keypress",
function(e) {
    checkDevTools();

    if(canSend == true) {
        if(e.key == "Enter") {
            Formats();

            if(InputUser.innerHTML == "ACCOUNTNULL") {
                return
            } else if(TextInput.innerHTML == "" || TextInput.innerHTML == "<br>" || TextInput.innerHTML == "&nbsp;" || TextInput.innerHTML == "/" || TextInput.innerHTML.includes("<div><br>")) {
                return
            } else if(messageDelay == false) {
                SendMessage();

                var msgTimer = 0;
                const msgInterval = setInterval(msgInt, 1);

                function msgInt() {
                    msgTimer++

                    if(msgTimer > 1) {
                        TextInput.innerHTML = "";
                        clearInterval(msgInterval);
                    }
                }
            }
        }
    }
})

SendButton.addEventListener("click",
function() {
    checkDevTools();

    if(canSend == true) {
        Formats();

        if(InputUser.innerHTML == "ACCOUNTNULL") {
            return
        } else if(TextInput.innerHTML == "" || TextInput.innerHTML == "<br>" || TextInput.innerHTML == "&nbsp;" || TextInput.innerHTML == "/" || TextInput.innerHTML.includes("<div><br>")) {
            return
        } else if(messageDelay == false) {
            SendMessage();
        }
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