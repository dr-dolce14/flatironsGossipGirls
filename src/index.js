console.log("IS THIS THING ON???")

document.addEventListener('DOMContentLoaded', () => {
    CELEB_URL = "http://localhost:3000/celebrities"
    POST_URL = "http://localhost:3000/posts"
    const celebUl = document.querySelector('.flex-container')


    function fetchCelebs() {
        fetch(CELEB_URL)
        .then(response => response.json())
        .then(celebrities => renderAllCelebs(celebrities))
    }

    function renderAllCelebs(celebrities) {
        celebrities.forEach(celebrity => renderCeleb(celebrity))
    }

    function renderCeleb(celebrity) {
       const li = document.createElement('li')
       li.className = "box"
       li.innerText = celebrity.name
       li.dataset.name = celebrity.name
       li.setAttribute('src', `${celebrity.image}`) 
       li.dataset.occupation = celebrity.occupation
       li.dataset.id = celebrity.id
       celebUl.append(li)
    } 


    function renderPost(post){
        const newsFeed = document.getElementById("news-feed")
        newsFeed.innerHTML += `
        <div class="post-div" id=${post.id}>
        <h1>${post.headline}</h1>
        <img src= ${post.image}>
        <br/>
        <br/>
        <div class="caption"> ${post.content}</div>
        <br/>
        <div id="reaction-table">
            <ul id="reaction-list">
                <li id="joy">😍 
                    <span class="like-span">${post.joy}</span>
                </li>
                <li id="shock">😱
                    <span class="like-span">${post.shock}</span>
                </li>
                <li id="sad">😢
                    <span class="like-span">${post.sad}</span>
                </li>
                <li id="anger">😡
                    <span class="like-span">${post.anger}</span>
                </li>
                <li id="poop">💩
                    <span class="like-span">${post.poop}</span>
                </li>
            </ul>
        </div>
    </div
     `

     
    }

    

    const clickHandler = () => {
        document.addEventListener("click", function(e){
            if(e.target.matches(".box")){
                const thisCeleb = e.target
                thisCeleb.style.color = 'red'
                 
                fetch(`${CELEB_URL}/${thisCeleb.dataset.id}`)
                .then(res => res.json())
                .then(celebrityPost => renderPosts(celebrityPost.posts))

                const renderPosts = (PostsArray) => {
                    PostsArray.forEach(post => {
                        renderPost(post)
                    })
                }
            }
            if(e.target.matches("#joy")){
                const joyButton = e.target 
                const joySpan = joyButton.querySelector("span")
                const newJoyNumber = parseInt(joySpan.textContent, 10) + 1
                joySpan.textContent = newJoyNumber

                const id = joyButton.closest("div").parentElement.id

                fetch(`${POST_URL}/${id}`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json",
                      "accept": "application/json"
                    },
                    body: JSON.stringify({ joy: newJoyNumber })
                  })
            }

            if(e.target.matches("#shock")){
                const shockButton = e.target 
                const shockSpan = shockButton.querySelector("span")
                const newShockNumber = parseInt(shockSpan.textContent, 10) + 1
                shockSpan.textContent = newShockNumber

                const id = shockButton.closest("div").parentElement.id

                fetch(`${POST_URL}/${id}`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json",
                      "accept": "application/json"
                    },
                    body: JSON.stringify({ shock: newShockNumber })
                  })
            }

            if(e.target.matches("#sad")){
                const sadButton = e.target 
                const sadSpan = sadButton.querySelector("span")
                const newSadNumber = parseInt(sadSpan.textContent, 10) + 1
                sadSpan.textContent = newSadNumber

                const id = sadButton.closest("div").parentElement.id

                fetch(`${POST_URL}/${id}`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json",
                      "accept": "application/json"
                    },
                    body: JSON.stringify({ sad: newSadNumber })
                  })
            }

            if(e.target.matches("#anger")){
                const angerButton = e.target 
                const angerSpan = angerButton.querySelector("span")
                const newAngerNumber = parseInt(angerSpan.textContent, 10) + 1
                angerSpan.textContent = newAngerNumber

                const id = angerButton.closest("div").parentElement.id

                fetch(`${POST_URL}/${id}`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json",
                      "accept": "application/json"
                    },
                    body: JSON.stringify({ anger: newAngerNumber })
                  })
            }

            if(e.target.matches("#poop")){
                const poopButton = e.target 
                const poopSpan = poopButton.querySelector("span")
                const newPoopNumber = parseInt(poopSpan.textContent, 10) + 1
                poopSpan.textContent = newPoopNumber

                const id = poopButton.closest("div").parentElement.id

                fetch(`${POST_URL}/${id}`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json",
                      "accept": "application/json"
                    },
                    body: JSON.stringify({ poop: newPoopNumber })
                  })
            }


        })
    }

    fetchCelebs()
    clickHandler()
}) // end of DOM Content Loaded