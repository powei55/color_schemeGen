const displayColor = document.querySelector('#color-container')
const inputColor = document.querySelector('#fav-color')
const selectMode = document.querySelector('#color-mode')
let colorArray = []

let url = "https://www.thecolorapi.com/scheme?hex=0047AB&mode=analogic"
fetchColor(url)


function fetchColor(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
                const totalColors = data.colors.length
                for (let i = 0; i < totalColors; i++ )
                colorArray.push(data.colors[i].hex.value)
                renderColor() 
        })
}



function renderColor() {
    let getHtml = ""
     for (let color of colorArray) {
         getHtml += `
            <div class="bg-color" style="background:${color}
                "onclick="copytext(this.style.background)">
                <div class="color-text" >${color}</div>
                
            </div>
             
         `
     }
     displayColor.innerHTML = getHtml
}
 

document.getElementById('get-color').addEventListener('click', e => {
        e.preventDefault()
    const postColor = inputColor.value.slice(1)
    const  postMode = selectMode.value
    
    
    const data = {
        color: postColor,
        mode: postMode  
    }
    
    
    const option = {
        method: 'POST',
        body: JSON.stringify(data),
        'headers':{'content-Type':'Application/JSON'} 
    }

        const baseUrl = "https://www.thecolorapi.com/scheme?"
        let finalUrl = `${baseUrl}hex=${data.color}&mode=${data.mode}`
        colorArray = []
        fetchColor(finalUrl,option)
        
    
})
function copytext(color) {
  const elem = document.createElement('textarea');
  elem.value = color;
  document.body.appendChild(elem);
  elem.select();
  elem.focus()
  document.execCommand('copy');
  document.body.removeChild(elem);
 alert(color + ":"  + " copied to clipboard")
}




