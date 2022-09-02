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

loadCategories();

const displayCategories = newsCategories => {
    // console.log(newsCategories);
    const menu = document.getElementById('all-menu');
    newsCategories.forEach(newsCategory => {
        // console.log(newsCategory.category_name);
        const listItems = document.createElement('li');

        listItems.innerHTML = `<a onclick = "loadEachNewsCategories('${newsCategory.category_id}')">${newsCategory.category_name}</a>`
        menu.appendChild(listItems);
    });
}
// news of each category loaded
const loadEachNewsCategories = async (id) => {
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

    // console.log(eachNewsCategories);
    const categoryDetails = document.getElementById('news-categories-detail');
    categoryDetails.textContent = '';
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
            <p>${details.length > 155 ? details.slice(0, 155) + '...' : details}</p>
            <div class="avatar">
            <div class="w-24 rounded-full"><img src="${author.img}" /></div></div>

            <p>${author.name} </br>
            ${author.published_date} <span class ="mx-4">${total_view}</span> <span class ="mx-4">${rating.number}</span> </p>
            
            <div class="card-actions justify-end">
                <button  class="btn btn-primary">Details</button>
        </div>
        `


        categoryDetails.appendChild(categoryDiv);
    })

}
