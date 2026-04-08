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
let minds=[]


async function getMinds() {
    //indina
    let res1 = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Indian mathematicians&cmlimit=100&format=json&origin=*')
    let data1 = await res1.json()
    let arr1 = data1.query.categorymembers
        .filter(x => x.ns == 0 && !x.title.toLowerCase().includes('list'))
        .map(x => x.title)
    //american
    let res2 = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:American mathematicians&cmlimit=100&format=json&origin=*')
    let data2 = await res2.json()
    let arr2 = data2.query.categorymembers
        .filter(x => x.ns == 0 && !x.title.toLowerCase().includes('list'))
        .map(x => x.title)
    //british
    let res3 = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:British mathematicians&cmlimit=100&format=json&origin=*')
    let data3 = await res3.json()
    let arr3 = data3.query.categorymembers
        .filter(x => x.ns == 0 && !x.title.toLowerCase().includes('list'))
        .map(x => x.title)
    minds = [...new Set([...arr1, ...arr2, ...arr3])]
    console.log(minds.length)
    console.log(minds)
}
getMinds()
input.addEventListener('keydown',(e)=>{
    if (e.key=='Enter') {
        searchBtn.click()
    }
})
searchBtn.addEventListener('click',searchHandle)
async function getSummary(query) {
    cards.innerHTML="<h2>Loading</h2>"
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
  
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
