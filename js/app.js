const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const response = await fetch(url)
    const data = await response.json();
    displayCategories(data.data.news_category);
}
loadCategories();

const displayCategories = newsCategories => {
    console.log(newsCategories);
    const menu = document.getElementById('all-menu');
    const uniqueArray = [];
    // for (const newsCategory of newsCategories)
    newsCategories.forEach(newsCategory => {
        console.log(newsCategory.category_name);
        if (uniqueArray.indexOf(newsCategory.category_name) === -1) {
            uniqueArray.push(newsCategory.category_name);
            const listItems = document.createElement('li');
            listItems.innerHTML = `<a>${newsCategory.category_name}</a>`
            menu.appendChild(listItems);
        }
    });
    // {
    //     console.log(category.category_name);
    //     //
}