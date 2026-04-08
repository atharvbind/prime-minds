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
let suggestions=document.getElementById('suggestions')
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
    cards.innerHTML=''
    console.log(minds.length)
    console.log(minds)
}
input.addEventListener('keydown',(e)=>{
    if (e.key=='Enter') {
        searchBtn.click()
    }
})
input.addEventListener('input',handleSuggestions)
searchBtn.addEventListener('click',searchHandle)
function showSuggestions(ls) {
    suggestions.innerHTML=''
    ls.forEach((name)=>{
        let suggestion=document.createElement('div')
        suggestion.innerText=name
        suggestion.addEventListener('click',(e)=>{
            getSummary(e.target.innerText)
            suggestions.innerHTML=''
            input.value=''
        })
        suggestions.appendChild(suggestion)
    })
}
async function handleSuggestions() {
    let val = input.value.toLowerCase().trim()
    if (!val) {return}
    let matches=minds.filter((x)=>x.toLowerCase().startsWith(val))
    if (matches.length>0) {
        showSuggestions(matches.slice(0,5))
    } else {
        let res = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${val}&limit=5&origin=*`);
        let data=await res.json()
        let results = data[1];
        results = results.filter(name => {
            let n = name.toLowerCase();
            let words = name.split(" ");
            return (
                words.length >= 2 &&
                !n.includes("theorem") &&
                !n.includes("formula") &&
                !n.includes("equation") &&
                !n.includes("function") &&
                !n.includes("identity") &&
                !n.includes("constant") &&
                !n.includes("list") &&
                !n.includes("algorithm") &&
                !n.includes("method") &&
                !n.includes("law") &&
                !n.includes("city") &&
                !n.includes("district") &&
                !n.includes("university")
            ) })
        showSuggestions(results.slice(0,5))
    }

}
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
window.onload = () => {
    cards.innerHTML = "<h2>Loading mathematicians...</h2>";
    getMinds();
};