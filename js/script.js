

// Load All Post

const loadAllPost = async(category) => {
    /* when search by category name then all post container will be empty 
    and add only search post display in post container.*/
    document.getElementById('post-container').innerHTML = ""
    
    // Featch Post Data from Api
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category?`?category=${category}`: ""}`)
    const data = await response.json()
    displayAllPost(data.posts)

    // use turnary operator for search by category
    // console.log(`https://openapi.programming-hero.com/api/retro-forum/posts${category?`?category=${category}`: ""}`)

    // using If else condition for search by category
    // if(category){
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
    // }
    // else{
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts`)        
    // }
}
// Call Function
loadAllPost()

// Display All data
const displayAllPost = (posts) => {
    // Get post container id from index file 
    const postContainer = document.getElementById('post-container')
    posts.forEach(post => {
        const {id,category,image,isActive,title,author,description,comment_count,view_count,posted_time} = post
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="w-full bg-gray-100 rounded-xl border border-green-400 p-4 flex gap-4">
                <div class="w-2/12 relative">
                    <div class="w-28 h-28 rounded-md border border-green-400 overflow-hidden">
                      <img src="${image}" alt="" class="w-full ">
                    </div>
                    
                    <div class="badge  badge-md absolute -top-1 -right-1 ${isActive ? "bg-green-500" : "bg-red-500"}"></div>
                    
                </div>
    
                <div class="w-10/12  ">
                    <div class="flex gap-20">
                      <p class=" text-gray-400  mb-3">Category: <span class="text-green-500 font-semibold"> ${category} </span> </p>
                      <p class=" text-gray-400  mb-3 ">Author : <span class="text-green-500 font-semibold"> ${author.name} </span> </p>
                    </div>
    
                    <div>
                      <h3 class="text-xl text-green-500 font-semibold mt-2 mb-3">${title} </h3>
                      <p class=" text-gray-400  mb-3"> ${description}</p>
                    </div>
                    <hr>
    
                    <div class="flex justify-between mt-4 items-center">
                      <div  class="flex gap-6">
                        <p class=" text-gray-400  mb-3"><i class="fa-regular fa-comment-dots text-green-400"></i> Comment : <span class="text-green-500 font-semibold">  ${comment_count} </span> </p>
                        <p class=" text-gray-400  mb-3"><i class="fa-regular fa-eye text-green-400"></i> View :  <span class="text-green-500 font-semibold"> ${view_count} </span> </p>
                        <p class=" text-gray-400  mb-3"><i class="fa-regular fa-clock text-green-400"></i> Post :  <span class="text-green-500 font-semibold"> ${posted_time} </span> </p>
                    </div>
    
                    <div>
                        <button onclick="markAsRead('${post.title}', ' ${ post.description}' ,' ${post.author.name} ' ,' ${post.category} ' ,' ${post.comment_count } ' ,' ${post.view_count} ' ,' ${ post.posted_time} ')"><i class="fa-solid fa-envelope-open bg-green-600 p-3 rounded-full text-white cursor-pointer"></i></button>
                      </div>
                    </div>
    
                </div>
            </div>
        
        `;
        postContainer.appendChild(div)
    });

    
}

// Selection / Mark as Read BUtton
const markAsRead = (title,description,author, category,  comment_count, view_count, posted_time) => {
    // displayMarkPost(title,description,author, category,comment_count,view_count,posted_time)
    const markAsReadContainer = document.getElementById('markAsReadContainer')
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="flex items-center bg-green-200 rounded-lg p-3 shadow-lg gap-2 border border-green-600">
                  
            <div class="">
                <h3 class="mb-2 text-md font-semibold">${title}</h3>
                <p class="text-sm">${description}</p>
                <div class="flex items-center border-t border-green-500 mt-2 justify-between">
                    <span class="mt-2 mb-2  text-sm font-semibold">Author:${author}</span>
                    <span class=" text-sm font-semibold">Category:${category}</span>
                </div>

                <div class=" flex justify-between items-center">
                    <span class=" "><i class="fa-regular fa-comment-dots text-green-400"></i>${comment_count} </span>
                    <span class=" "><i class="fa-regular fa-eye text-green-400"></i>${view_count} </span>
                    <span class=" "><i class="fa-regular fa-clock text-green-400"></i>${posted_time} </span>
                </div>
            </div>
            
        </div>   
    
    `
    markAsReadContainer.appendChild(div)

    // Count Function
    markPostCount()
}

// Count display marking post 
const markPostCount = () => {
    const previewCount = document.getElementById('markAsReadCounter').innerText;
    const convertCount = parseInt(previewCount);
    const sum = convertCount + 1;
    document.getElementById('markAsReadCounter').innerText = sum
}


// Search by category

const handleSearchByCategory = () => {
    const searchText = document.getElementById('searchPosts').value
    loadAllPost(searchText)
}




