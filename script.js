const toggleLoader = displayStyle => {
    document.getElementById('loader').style.display = displayStyle;
}

const toggleSearchResult = displayStyle => {
    document.getElementById('display-result').style.display = displayStyle;
}

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
            .then((data) => console.log(data));
    }
}

document.getElementById('search-btn').addEventListener('click', function() {
    getSearchInput();
})

const displaySearchResult = () => {
    
}



/* 
after appendChild of div
toggleLoader('none');
toggleSearchResult('block');
*/