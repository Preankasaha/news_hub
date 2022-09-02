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

        listItems.innerHTML = `<a onclick = "loadEachNewsCategories()">${newsCategory.category_name}</a>`
        menu.appendChild(listItems);
    });
}

