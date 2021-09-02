// Loader Function 
const toggleLoader = displayStyle => {
    document.getElementById('loader').style.display = displayStyle;
};

// Toggle Search Result
const toggleSearchResult = displayStyle => {
    document.getElementById('display-result').style.display = displayStyle;
};

// Toggle Counter
const toggleCounter = displayStyle => {
    document.getElementById('counter').style.display = displayStyle;
};
toggleCounter('none');

// Toggle Footer
const toggleFooter = displayStyle => {
    document.getElementById('footer').style.display = displayStyle;
};
toggleFooter('none');


// Search Input Function & API Calling
const getSearchInput = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    toggleLoader('flex');
    toggleSearchResult('none');
    toggleCounter('none');
    toggleFooter('none')
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    if (searchText == '') {
        alert('Type Something!');
        toggleLoader('none');
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


// Button Event Listener
document.getElementById('search-btn').addEventListener('click', function () {
    getSearchInput();
});

// Search Result Function
const displaySearchResult = docs => {
    const displayResult = document.getElementById('display-result');
    displayResult.textContent = '';
    const counterNum = document.getElementById('counter-number');

    if (docs == null || docs.length == 0) {
        alert('No result found!');
        return;
    }

    toggleCounter('block');
    docs.forEach(doc => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card box-shadow h-100">
                <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top height" alt="Book Cover Image">
                <div class="card-body">
                    <h4 class="card-title">${doc.title}</h4>
                    <h6 class="card-text"><strong>Author:</strong> ${doc.author_name}</h6>
                    <h6 class="card-text"><strong>Published By:</strong> ${doc.publisher}</h6>
                    <h6 class="card-text"><strong>First Publish:</strong> ${doc.publish_year}</h6>
                    <h6 class="card-text"><strong>Language:</strong> ${doc.language}</h6>
                    <button onclick="displayInfo()" class="btn bg-lavender mt-3">LEARN MORE</button>
                </div>
            </div>
        `;
        displayResult.appendChild(div);
        toggleLoader('none');
        toggleSearchResult('flex');
        toggleFooter('block')
    });

    // For Counting Array Length
    counterNum.innerText = docs.length;
    if (docs.length <= 20) {
        toggleFooter('none');
    }
};