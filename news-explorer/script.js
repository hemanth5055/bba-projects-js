import newsDate from "./news_explorer_project_data.js"
const categoryBtn = document.querySelectorAll(".category-btn")
const articlesArea = document.querySelector("main")
const showMore = document.querySelector(".show-more")
const all = document.querySelector(".all")
const search = document.getElementById("search")

const selectedCategories = new Set();
let currentData = randomizeData(newsDate)
let limit = 5;
let query = ""

RenderData();

function randomizeData(data) {
    const shuffled = [...data]; // Create a copy so you don't mutate the original import
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
    }
    return shuffled;
}

categoryBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.classList[1];
        if (category === "all") {
            selectedCategories.clear();
            btn.classList.add("active");
            removeActiveFromOtherCategories();
        } else {
            all.classList.remove("active");
            if (selectedCategories.has(category)) {
                selectedCategories.delete(category); 
                btn.classList.remove('active');
            } else {
                selectedCategories.add(category);
                btn.classList.add('active');
            }
            if (selectedCategories.size === 0) {
                all.classList.add("active");
            }
        }
        RenderData()
    });
});

function removeActiveFromOtherCategories(){
    categoryBtn.forEach((btn)=>{
        if(btn.classList[1]!=="all")btn.classList.remove("active")
    })
}

function RenderData(data = currentData) {
    const regex = new RegExp(query, "ig");

    const filtered = data.filter(curr => {
        const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(curr.category);
        const matchesSearch = regex.test(curr.content) || regex.test(curr.title);
        return matchesCategory && matchesSearch;
    });

    const visibleData = filtered.slice(0, limit);

    articlesArea.innerHTML = visibleData.map(curr => {
        let title = curr.title;  
        let content = curr.content;
        let highlightedTitle = title.replace(regex,match=>`<span>${match}</span>`)
        let highlightedContent= content.replace(regex,match=>`<span>${match}</span>`)
        return `<div class="news-article">
            <div class="news-article-details">
                <h2>${highlightedTitle}</h2>
                <p>${highlightedContent}</p>
            </div>
            <div class="news-article-content">
                <p class="news-content">${curr.content}</p>
            </div>
        </div>
    `}).join("");

    // Hide button if we've reached the end of the filtered results
    showMore.style.display = filtered.length > limit ? "block" : "none";
}

showMore.addEventListener("click", () => {
    limit += 5;
    RenderData();
});

function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer); 
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const handleSearch = debounce(() => {
    limit = 5;
    RenderData();
}, 500); 

search.addEventListener('input', (e) => {
    query = e.target.value;
    handleSearch();
});