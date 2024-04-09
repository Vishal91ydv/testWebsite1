function emailSend(){

    let name=document.getElementById('name').value;
    let phone=document.getElementById('phone').value;
    let email=document.getElementById('email').value;
    let message=document.getElementById('message').value;

    let messageBody="<h3>This is the message from your Pixel Perfect Films Website <br><br>Name : " + name +
    "<br> Phone : " + phone +
    "<br> Email : " + email +
    "<br> Message : " + message + "</h3>";

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "vishalyadav29279@gmail.com",
        Password : "25686EBD9808847C81422C55FBB164047941",
        To : 'bhanupandey0843@gmail.com',
        From : "vishalyadav29279@gmail.com",
        Subject : "Contact",
        Body : messageBody
    }).then(
      message => { 
        if(message =='OK'){
          swal("Successful", "Your message is sent. Our Consultative contact you soon!", "success");
        }
        else{
          swal("Error!", "You are  Failed to send meassage! Try Again!!", "error");

        }
      }
    );
}