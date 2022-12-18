var container = document.getElementById("container");
var containerdatadiv = document.getElementById("container-form");
var inputbox = document.getElementById("input-box");
var input = document.getElementById("input");
var Message = document.getElementById("message");
var ul = document.getElementById("ul");
var loader = document.getElementById("loader")
function addedd() {
  if (input.value === "") {
    Message.style.color = "red";
    Message.innerHTML = "Please Enter Something";
    setTimeout(() => {
      Message.innerHTML = "";
    }, 2000);
    input.focus();
  } else {
    Message.style.color = "green";
    Message.innerHTML = "Added Successfully";
    //add data in firebase
    firebase
      .database()
      .ref("users/")
      .push({
        inputvalue: input.value,
      })
      .then(() => {
        setTimeout(function () {
          Message.innerHTML = "";
        }, 1000);
      });
  }
}

firebase
  .database()
  .ref("users/")
  .on("value", (data) => {
    loader.style.display = "none"
    if (data.val() === null) {
      Message.innerHTML = "No Data....";
      Message.style.color = "red";
    } else {
      ul.innerHTML = "";
      data.forEach((userdata) => {
        var userkey = userdata.key;
        var listitem = document.createElement("li");
        ul.appendChild(listitem);
        listitem.setAttribute("class", "list-item col-12");
        listitem.setAttribute("id", input.value);

        var para = document.createElement("p");
        listitem.appendChild(para);
        para.setAttribute("class", "Data-lsit");
        para.innerHTML = userdata.val().inputvalue;
        para.setAttribute("id", para.innerHTML);

        var editbutton = document.createElement("img");
        listitem.appendChild(editbutton);
        editbutton.setAttribute("class", "icons");
        editbutton.setAttribute("src", "./icons/pencil.png");

        var deleteuserbuttons = document.createElement("img");
        listitem.appendChild(deleteuserbuttons);
        deleteuserbuttons.setAttribute("class", "icons");
        deleteuserbuttons.setAttribute("src", "./icons/clear.png");

        //edit User
        editbutton.addEventListener("click", function () {
          var editdata = prompt("Add Data" , userdata.val().inputvalue);
          firebase
          .database()
          .ref("users/" + userkey)
          .update({
            inputvalue : editdata
          })
        });

        //delete User
        deleteuserbuttons.addEventListener("click", function () {
          //alert
          swal({
            title: "Are you sure?",
            text: "You will not be able to recover this User!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
          },
          function(){
            swal("Deleted!", "User has been deleted.", "success");
            firebase
            .database()
            .ref("users/" + userkey)
            .remove().then(() =>{
              ul.innerHTML = "";
            })
          });
        });
      });
    }
  });
