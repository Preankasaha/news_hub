// categories loaded
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const response = await fetch(url)
        const data = await response.json();
        displayCategories(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}



// categories dispalyed
const displayCategories = newsCategories => {

    const menu = document.getElementById('all-menu');

    newsCategories.forEach(newsCategory => {
        const listItems = document.createElement('li');

        const { category_id, category_name } = newsCategory;
        listItems.innerHTML = `
        <a onclick = "loadEachNewsCategories('${category_id}')">${category_name}</a>
        `

        menu.appendChild(listItems);

    });
}

// news of each category loaded
const loadEachNewsCategories = async (id) => {
    // spinner loaded
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try {
        const response = await fetch(url)
        const data = await response.json();
        displayEachNewsCategories(data.data);
    }

    catch (error) {
        console.log(error);
    }
}

// news of each category displayed
const displayEachNewsCategories = eachNewsCategories => {

    // spinner off
    toggleSpinner(false);

    const categoryDetails = document.getElementById('news-categories-detail');
    categoryDetails.textContent = '';

    // Number of items found
    const message = document.getElementById('message');
    message.textContent = '';

    message.innerHTML = `
        <h2 class = "text-2xl text-black-500 text-center">${eachNewsCategories.length ? eachNewsCategories.length + ' ' + 'Items Found' : 'No Itews Found'} for This Category</h2>
        `
    // sort by total view added
    eachNewsCategories.sort((a, b) => b.total_view - a.total_view);

    // news of each categories displayed

    eachNewsCategories.forEach(eachNewsCategory => {

        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('card');

        const { title, details, author, image_url, thumbnail_url, total_view } = eachNewsCategory;
        categoryDiv.innerHTML = `

        <div class="lg:h-96 my-8 card lg:card-side bg-base-100 shadow-xl hover:shadow-indigo-900/50">
        <figure><img class="w-96 h-full p-5" src="${thumbnail_url}" class="w-96 h-full" alt="Movie">
        </figure>
        <div class="card-body">
        <h2 class="card-title lg:text-3xl font-bolder mb-5">${title}</h2>
        <p class="text-justify lg:text-lg mb-3">${details.length > 90 ? details.slice(0, 98) : details}</p>
        <p class="text-justify lg:text-lg">${details.length > 150 ? details.slice(98, 255) + '...' : details}</p>
        <div class="flex gap-4 mt-5 justify-between items-center">
        <div class="flex items-center gap-4">
        <div class="avatar">
        <div class="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img src="${author.img}" />
        </div>
        </div>
        <div>
        <h1>${author.name ? author.name : 'No author found'}</h1> </br>
        <p> ${author.published_date ? author.published_date : 'No publishing date found'}<p> 
        </div>
        </div>
        <div class="items-center">
        <p>${total_view ? total_view : 'No view found'}</p> 
        </div>
        <!-- The button to open modal -->
        <div class="card-actions justify-end">
        <label for="my-modal-3" onclick = "loadNewsDetails('${eachNewsCategory._id}')" class="btn btn-outline btn-primary modal-button">Details</label>
        </div>

        `
        categoryDetails.appendChild(categoryDiv);

    })
}


// detail news loaded 
const loadNewsDetails = async (id) => {

    const url = `https://openapi.programming-hero.com/api/news/${id}`
    try {
        const response = await fetch(url)
        const data = await response.json();
        displayNewsDetail(data.data);

    }
    catch (error) {
        console.log(error);
    }
}

// detail news displayed
const displayNewsDetail = newsDetails => {


    newsDetails.forEach(newsDetail => {

        // details of news added on modal
        const newsDetailsModal = document.getElementById('modal-body');
        newsDetailsModal.textContent = '';
        const { title, details, image_url, img, author, total_view, rating } = newsDetail;
        newsDetailsModal.innerHTML = `
                <img src ="${image_url}"/>
                <h3 class="py-4">${title}</h3>
                <p class="py-4">${details}</p>
                <div class="avatar">
                <div class="w-24 rounded-full"><img src="${author.img}" /></div></div>
                <p>${author.name ? author.name : 'No author found'} 
                </br>
                ${author.published_date ? author.published_date : 'No date found'} 
                <span class ="mx-4">${total_view ? total_view : 'No view found'}</span> 
                <span class ="mx-4">${rating.number}</span> </p>
        `
    });

}

// arrow function for spinner 
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}

// function to add event handler to blog-btn 
const displayBlogPage = () => {
    window.location.href = "index2.html";
}


loadCategories();
loadEachNewsCategories('01');