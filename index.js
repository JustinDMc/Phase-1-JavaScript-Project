apiKeyTitles = "7022a16defmsh1d5202114094ee0p128749jsnd8e087308d39"
const movieResults = document.querySelector("#movieResults")
const watchList = document.querySelector("#watchList")
const seenList = document.querySelector(".seenList")

document.addEventListener("DOMContentLoaded", () => {
    getRelatedTitles();
    groupMembers();
})

let groupMembers = () => {
    fetch('http://localhost:3000/groupMembers')
    .then(res => res.json())
    .then(group => group.forEach(member => renderGroupMember(member)))
}

let renderGroupMember = (member) => {
    let mainDiv =  document.querySelector('#name')
    let memberContainer = document.createElement('div')
    memberContainer.className = "mainContainer"
    let linkDiv = document.createElement('div')
    let appendMainDiv = (value) => {
        memberContainer.append(value)
    }
    let appendLinkDiv = (imgLink) => {
        linkDiv.append(imgLink)
        linkDiv.className = "linkDiv"
        appendMainDiv(linkDiv)
    }
     Object.keys(member).forEach(item => {
         let createA = document.createElement('a')
         //I know it's forbidden and now i see why
         //But without jquery or react couldn't find another way
         switch (item) {
             case 'image':
                 let memPic = document.createElement('img')
                 memPic.src = `${member[item]}`
                 memPic.className = "memImg"
                 appendMainDiv(memPic)
                 break;
             case 'name':
                 let memName = document.createElement('h2')
                 memName.textContent = `${member[item]}`
                 memName.className = 'groupMember'
                 appendMainDiv(memName)
                 break;
             case 'github':
                 let memGit = createA
                 memGit.href = `${member[item]}`
                 memGit.innerHTML = "<img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'/>"
                 appendLinkDiv(memGit)
                 break;
                 case 'linkedIn':
                 let memLinked = createA
                 memLinked.href = `${member[item]}`
                 memLinked.innerHTML = "<img src='https://th.bing.com/th/id/OIP.oI1c_Wxmo9X4HZLGG47MBgHaGj?w=228&h=202&c=7&o=5&dpr=1.25&pid=1.7'/>"
                 appendLinkDiv(memLinked)
                 break;
                 case 'blog':
                 let memBlog = createA
                 memBlog.href = `${member[item]}`
                 memBlog.innerHTML = "<img src='https://th.bing.com/th/id/OIP.r7yP6vGO2LurQpddAIe3UQHaF4?w=261&h=207&c=7&o=5&dpr=1.25&pid=1.7'/>"
                 appendLinkDiv(memBlog)
                 break;
         } 
     }
 )
        // memberContainer.append(memPic, memName, memGit, memLinked, membBlog)
      mainDiv.append(memberContainer)
} 

const getRelatedTitles = () => {
    const searchForm = document.querySelector("form")
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        fetch(`https://imdb8.p.rapidapi.com/title/auto-complete?q=${e.target.querySelector("textarea").value}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": apiKeyTitles,
               "x-rapidapi-host": "imdb8.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then(movies => returnSearchList(movies))
        })
}


const returnSearchList = (movies) => {
    //const movieResults = document.querySelector("#movieResults")
        movieResults.innerHTML = " "
        movies.d.forEach(result => {
        const searchItem = document.createElement("li")
        searchItem.textContent = result.l
        movieResults.append(searchItem)

        const addToWatchList = document.createElement("button")
        addToWatchList.className = "add"
        addToWatchList.style.color = "blue"
        addToWatchList.textContent = "Add To WatchList"

        const seenButton = document.createElement("button")
        seenButton.className = "seen"
        seenButton.style.color = "blue"
        seenButton.textContent = "SEEN"

        const deleteButton=document.createElement("button")
        deleteButton.className = "delete"
        deleteButton.style.color = "red"
        deleteButton.textContent = "DELETE"

        searchItem.appendChild(addToWatchList)
        addToWatchList.addEventListener("click", (e) => {
            e.preventDefault()
            watchList.prepend(searchItem)
            addToWatchList.remove()
            searchItem.append(seenButton, deleteButton)
            seenButton.addEventListener("click", (e) => {
                alert("We loved that movie too!")
                seenButton.remove()
                deleteButton.remove()
                seenList.prepend(searchItem)

                const data = { title: searchItem};

                fetch(`http://localhost:3000/seenTitles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({data})
                })
                .then(res => res.json())
                .then(data => console.log(data))
            })
            deleteButton.addEventListener("click", (e) => {
                alert("We wouldn't watch that either.")
                searchItem.remove()
            })
        })
    })    
}