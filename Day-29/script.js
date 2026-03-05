// Day 29 Logic Practice
console.log('Lab Session 29 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...

const themeToggle=document.getElementById("themeToggle")
const editor=document.getElementById("editorModal")
const openEditor=document.getElementById("openEditor")
const closeBtns=document.querySelectorAll(".closeModal")

themeToggle.onclick=()=>{

document.body.classList.toggle("dark")

}

openEditor.onclick=()=>{

editor.style.display="flex"

}

closeBtns.forEach(btn=>{

btn.onclick=()=>{

editor.style.display="none"
document.getElementById("postView").style.display="none"

}

})
fetch("/api/posts")
.then(res=>res.json())
.then(data=>console.log(data))
{
"routes": [
{
"src": "/api/(.*)",
"dest": "/api/index.js"
}
]
}
