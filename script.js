const toggleLoader = displayStyle => {
    document.getElementById('loader').style.display = displayStyle;
};

const toggleSearchResult = displayStyle => {
    document.getElementById('display-result').style.display = displayStyle;
};

const getSearchInput = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    toggleLoader('flex');
    toggleSearchResult('none')
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    if (searchText == '') {
        alert('Type Something!');
    }
    else {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    alert('No result found!');
                    throw new Error('No result found!');
                }
                return res.json();
            })
            .then((data) => displaySearchResult(data.docs));
    }
};


document.getElementById('search-btn').addEventListener('click', function () {
    getSearchInput();
});

const displaySearchResult = docs => {
    const displayResult = document.getElementById('display-result');
    displayResult.textContent = '';
    const div = document.createElement('div');
    let i = 0;

    if (docs == null || docs.length == 0) {
        alert('No result found!');
        return;
    }
    
    docs.forEach(doc => {
        i++
        console.log(doc);
        div.classList.add('col-6');
        div.innerHTML = `
            <div class="card box-shadow">
                <div class="card-body">
                    <h4 class="card-title">${doc.title}</h4>
                    <h6 class="card-text"><strong>Author:</strong> ${doc.author_name}</h6>
                    <h6 class="card-text"><strong>By:</strong> ${doc.publisher}</h6>
                    <a href="#info-display" class="btn bg-lavender">Learn More</a>
                </div>
            </div>
        `;
        displayResult.appendChild(div);
        toggleLoader('none');
        toggleSearchResult('block');
    });
};