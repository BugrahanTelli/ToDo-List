const todoinput = document.querySelector(".todoinput")
const todolist = document.querySelector(".lists")
const form = document.querySelector(".form")
const header=document.querySelector(".header")
const body = document.querySelector(".body")
const clearbtn= document.querySelector(".clear")

eventlistener();

function eventlistener(){
    form.addEventListener("submit", addtodo)
    document.addEventListener("DOMContentLoaded",loadalltouı)
    body.addEventListener("click",deletetodofromUI)
    clearbtn.addEventListener("click",deleteeverything)
}
function addtodo(e){// yazılan veriyi alma
    const newtodo=todoinput.value.trim()

    addtodotouı(newtodo)
    addtostr(newtodo)

    e.preventDefault()
}
function addtodotouı(newtodo){// stringi arayüze list item olarak ekleyecek
    const listitem=document.createElement("li")//list oluşturma
    const link = document.createElement("a")//link oluşturma

    link.href="#"
    link.className="delete"
    link.innerHTML= "<i class='fa-solid fa-xmark'></i>"

    // Text node ekleme

    listitem.appendChild(document.createTextNode(newtodo))
    listitem.appendChild(link)
    todolist.appendChild(listitem)

    todoinput.value=""
    console.log(listitem);
}
function gettodosfromstr(){// strogedan todoları aldık
    let strtodos
    if(localStorage.getItem("strtodos")===null){
        strtodos=[]        
    }
    else{
        strtodos = JSON.parse(localStorage.getItem("strtodos"))
    }
    return strtodos
}
function addtostr(newtodo){ //storage a ekleme
    const strtodos=gettodosfromstr()

    strtodos.push(newtodo)
    localStorage.setItem("strtodos",JSON.stringify(strtodos))
}
function loadalltouı(){// arayüze ekleme
    let strtodos = gettodosfromstr()

    strtodos.forEach(function (strtodo) {
        addtodotouı(strtodo)
    });
}
function deletetodofromUI(e){// listeden silme 
    if(e.target.classList.contains("fa-xmark")){
        e.target.parentElement.parentElement.remove();
        deletetodofromstr(e.target.parentElement.parentElement.textContent)
    }
}
function deletetodofromstr(deletetodo){
    let strtodos = gettodosfromstr()
    strtodos.forEach(function(todo,index){
        if(todo===deletetodo){
            strtodos.splice(index,1) // arrayden değer silme
        }
    })

    localStorage.setItem("strtodos",JSON.stringify(strtodos))
}
function deleteeverything(e){
    if(confirm("Tüm taskları silmek istediğinizden amin misiniz")){
        // todolist.innerHTML="" yavaş bir yöntem
        while(todolist.firstElementChild !=null){
            todolist.removeChild(todolist.firstElementChild)
        }
        localStorage.removeItem("strtodos")
    }
}
