let searchBtn=document.querySelector('button')
let cards=document.getElementById('cards')
let searchHandle = async ()=>{
    try{
        
            let name = document.querySelector('input').value 
            await getSummary(name)

    }
    catch(err) {
        cards.innerHTML="<p>Error</p>"
    }
}
let input=document.querySelector('input')
input.addEventListener('keydown',(e)=>{
    if (e.key=='Enter') {
        searchBtn.click()
    }
})
searchBtn.addEventListener('click',searchHandle)
async function getSummary(n) {
    cards.innerHTML="<h2>Loading</h2>"
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(n)}`;
  
  const res = await fetch(url);
  if (!res.ok) throw new Error("Not found");
  
  let data=await res.json();
    cards.innerHTML=""
    let card=document.createElement('div')
  let name=document.createElement('h1')
  name.innerText=data.title
  if (data.thumbnail) {
      let img=document.createElement('img')
      img.src=data.thumbnail.source
      card.appendChild(img)
  }
  let desc=document.createElement('p')
  desc.innerText=data.extract
  card.appendChild(name)
  card.appendChild(desc)
  cards.appendChild(card)

}
