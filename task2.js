var sock = new WebSocket("wss://cyberbot-qa.herokuapp.com");

sock.onopen = function(){
   console.log('Connection open!');
}
sock.onerror = function(error){
   console.log('Error detected: ' + error);

}
function chatBackUp()
{

   var userMessages =JSON.parse(sessionStorage.getItem('userMessages'));
    var botMessages =JSON.parse(sessionStorage.getItem('botMessages'));

var print='';
  
    for(var i=0;i<botMessages.length;i++)
    {
      print += "<div id=inputmsg><h3>" + userMessages[i] + "</h3></div>"
      + "<div id=outputmsg> <h3>" + botMessages[i] + "</h3></div>";
    }
   var backUp= document.getElementById("message");
   backUp.innerHTML=print;


}


function printMsg(msg)
{

var print='';
  print="<div id=outputmsg> <h3>"+ msg.text + "</h3></div>";
  if(msg.text == undefined)
  {}
  else
  {

      if(sessionStorage.getItem('botMessages') === null)
    {
        var botMessages=[];
        botMessages.push(msg.text);
         sessionStorage.setItem('botMessages',JSON.stringify(botMessages));
    }
      else
   {
        var botMessages =JSON.parse(sessionStorage.getItem('botMessages'));
         botMessages.push(msg.text);
        sessionStorage.setItem('botMessages',JSON.stringify(botMessages));

  }

      var para =document.createElement("div");
      var t = document.createTextNode(print);      
      para.appendChild(t);                                        
      var u = document.getElementById("message").appendChild(para);
      u.innerHTML= print; 
}
  var a='';
    for(x in msg.quick_replies)
    {
      var button_name=msg.quick_replies[x].title;
      a+='<div id="quick"> <button onclick="sendMsg(\''+button_name+'\')">'+button_name+'</button> </div>';
      

    }
    document.getElementById("quick").innerHTML=a;
    document.getElementById('quick').addEventListener('onclick',sendMsg);
}


function sendMsg(msg)
{

  if(sessionStorage.getItem('userMessages') === null)
  {
    var userMessages=[];
    userMessages.push(msg);
    sessionStorage.setItem('userMessages',JSON.stringify(userMessages));
  }
  else
  {
    var userMessages =JSON.parse(sessionStorage.getItem('userMessages'));


    userMessages.push(msg);
    sessionStorage.setItem('userMessages',JSON.stringify(userMessages));

  }
  var print='';
  print="<div id=inputmsg><h3>"+ msg + "</h3></div>";

  var para =document.createElement("div");
  var t = document.createTextNode(print);      
  para.appendChild(t);                                         
  var u =document.getElementById("message").appendChild(para);
  u.innerHTML=print;
Message={
channel:"sock",
text:msg,
type:"message",
user: "2adfdb38-1f43-2b22-a190-bc0336474fe7"
};
sock.send(JSON.stringify(Message));
sock.onmessage = function(e){
   var server_message = e.data;

   var msgobj= JSON.parse(server_message); 
   console.log(msgobj);
   printMsg(msgobj);
}
}


function loadMsg()
{
  var msg = document.getElementById('input').value;

  

    if(msg=="")
      {
      	alert("enter the message");
      }
    else
      {
    	sendMsg(msg);
      }
}
document.getElementById('send').addEventListener('click', loadMsg);

document.getElementById("input").addEventListener("keyup",function(e)
{
  e.preventDefault();
  if(e.keyCode === 13)
  {
    document.getElementById('send').click();
 //   document.getElementById('reset').reset();
  }

})