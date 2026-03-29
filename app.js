let searchBtn=document.querySelector('button')
let cards=document.getElementById('cards')
searchBtn.addEventListener('click',async ()=>{
    try{
        
            let name = document.querySelector('input').value 
            await getSummary(name)

    }
    catch(err) {
        cards.innerHTML="<p>Error</p>"
    }

})
async function getSummary(n) {
    cards.innerHTML=""
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(n)}`;
  
  const res = await fetch(url);
  if (!res.ok) throw new Error("Not found");
  
  let data=await res.json();
  let name=document.createElement('h1')
  name.innerText=data.title
  if (data.thumbnail) {
      let img=document.createElement('img')
      img.src=data.thumbnail.source
      cards.appendChild(img)
  }
  let desc=document.createElement('p')
  desc.innerText=data.extract
  cards.appendChild(name)
  cards.appendChild(desc)

}
