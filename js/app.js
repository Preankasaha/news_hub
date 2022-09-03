// category loaded
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



const displayCategories = newsCategories => {
    console.log(newsCategories);
    const menu = document.getElementById('all-menu');
    const home = document.getElementById('home');
    newsCategories.forEach(newsCategory => {
        const listItems = document.createElement('li');
        home.innerText = 'Home';
        const { category_id, category_name } = newsCategory;
        listItems.innerHTML = `
        <a onclick = "loadEachNewsCategories('${category_id}')">${category_name}</a>`

        menu.appendChild(listItems);

    });
}
loadCategories('${category_name}');
// news of each category loaded
const loadEachNewsCategories = async (id) => {
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

const displayEachNewsCategories = eachNewsCategories => {
    toggleSpinner(false);
    console.log(eachNewsCategories);
    const categoryDetails = document.getElementById('news-categories-detail');
    categoryDetails.textContent = '';

    // Number of items found
    const message = document.getElementById('message');
    message.textContent = '';

    message.innerHTML = `
        <h2 class = "text-2xl text-black-500 text-center">${eachNewsCategories.length ? eachNewsCategories.length + ' ' + 'Items Found' : 'No Itews Found'}</h2>
        `
    // sort by total view added
    eachNewsCategories.sort((a, b) => b.total_view - a.total_view);
    // news of each categories displayed

    eachNewsCategories.forEach(eachNewsCategory => {
        // console.log(eachNewsCategory);

        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('card');

        const { title, details, author, image_url, thumbnail_url, rating, total_view } = eachNewsCategory;
        categoryDiv.innerHTML = `
        <figure>
        <img src="${thumbnail_url}" class="w-1/2" alt="Movie">
        </figure>
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${details.length > 255 ? details.slice(0, 255) + '...' : details}</p>
            <div class="avatar">
            <div class="w-24 rounded-full"><img src="${author.img}" /></div></div>

            <p>${author.name ? author.name : 'no-info-found'} </br>
            ${author.published_date ? author.published_date : 'no-info-found'} <span class ="mx-4">${total_view ? total_view : 'no-info-found'}</span> <span class ="mx-4">${rating.number}</span> </p>
            
            <!-- The button to open modal -->
           <div>
            <label for="my-modal-3" onclick = "loadNewsDetails('${eachNewsCategory._id}')" class="btn modal-button">Details</label>
            </div>

        `

        categoryDetails.appendChild(categoryDiv);


    })


}

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

const displayNewsDetail = newsDetails => {

    console.log(newsDetails);
    newsDetails.forEach(newsDetail => {
        // console.log(newsDetail);

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
                <p>${author.name ? author.name : 'no-info-found'} 
                </br>
                ${author.published_date ? author.published_date : 'no-info-found'} 
                <span class ="mx-4">${total_view ? total_view : 'no-info-found'}</span> 
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




