var sock = new WebSocket("wss://cyberbot-qa.herokuapp.com");

sock.onopen = function(){
   console.log('Connection open!');
}
sock.onerror = function(error){
   console.log('Error detected: ' + error);

}

function printMsg(msg)
{


  var print='';
  print="<div id=outputmsg> <h3>"+ msg.text + "</h3></div>";
  if(msg.text== undefined)
  {
  }
  else
  {

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
  console.log(msg);

  

    if(msg=="")
      {
      	alert("enter the message");
      }
    else
      {
    	sendMsg(msg);
      }
}

