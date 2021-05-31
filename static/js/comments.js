//existing user
document.getElementById("btn").addEventListener("click", userLogin)

function userLogin(e){
    e.preventDefault();

    var xhr_rc = new XMLHttpRequest();

    xhr_rc.open("POST", "/login", true);

    xhr_rc.onload = function(){
        if(this.status == 200){
            readFile();
        }
        function readFile(){
            var xhr1 = new XMLHttpRequest();
            
            
            xhr1.onload = function(){
                if(this.status == 200){
                    var csvDetails = JSON.parse(this.responseText);
                    console.log(csvDetails);
                    for(i=0;i<csvDetails.length;i++){
                    var uid_f = csvDetails[i].UID;
                    var name_f = csvDetails[i].Name;
                    var comment_f = csvDetails[i].Comment;
                    table(name_f, comment_f,uid_f);
                    }
            }}
            xhr1.open("GET", "/comments", true);
            xhr1.send();
        };
    }
    var log_name = document.getElementById("uname").value;
    var log_pword = document.getElementById("pword").value;

    var log_det = JSON.stringify({"name":log_name, "password": log_pword});

    xhr_rc.send(log_det);
    
var login = document.getElementById("login").style.display='none';
var register = document.getElementById("register").style.display='none';
var details = document.getElementById("comments").style.display='block';
};

//new user
document.getElementById("btn_new_user").addEventListener("click", newUser);

function newUser(e){
    e.preventDefault();
    var nu_xhr = new XMLHttpRequest();

    nu_xhr.open("POST", "/newuser", true);

    nu_xhr.onload = function(){
        if(this.status == 200){
            setTimeout(alert("Log in with Username and Password", 2000));
        }
    }
    var name_u = document.getElementById('new_user_name').value;
    var pass_u = document.getElementById('new_user_pword').value;
    var con_pass_u = document.getElementById('new_user_confirm_pword').value;

    var obj = JSON.stringify({"name": name_u, "password":pass_u});
    
    nu_xhr.send(obj);

var login = document.getElementById("login").style.display='block';
var register = document.getElementById("register").style.display='none';
// var details = document.getElementById("comments").style.display='block';
};

//comments page
document.getElementById("btn1").addEventListener("click", loadComments)

function loadComments(e){  
    e.preventDefault();

    var com = new XMLHttpRequest();

    com.open("POST", "/comments", true);

    com.onload = function(){
        if(this.status == 200){
            console.log(this.responseText);
            var obje = JSON.parse(this.responseText);
            console.log(obje);
            var namecsv = obje.name;
            var commentcsv = obje.comment;
            var uid = obje.UID;
            table(namecsv,commentcsv, uid); 
        }
    }
    var user_name = document.getElementById("name_detail").value;
    var user_comment = document.getElementById("comments_detail").value;

    var log_det = JSON.stringify({"name":user_name, "comment": user_comment});

    com.send(log_det);
};


var row = 1; 

function table(name,comment, uid){
    var table =  document.getElementById("display");
    var newRow = table.insertRow(row);
            
    var cell0 = newRow.insertCell(0);
    var cell1 = newRow.insertCell(1);
    var cell2 = newRow.insertCell(2);

    cell0.innerHTML = uid;
    cell1.innerHTML = name;
    cell2.innerHTML = comment;

    row++;        
};

