//Fetch Data
const searchFood = () => {
    const searchField = document.getElementById('searchField');
    const searchText  = searchField.value;
    console.log(searchText);
    searchField.value = '';
    const url =  `https://openlibrary.org/search.json?q=${searchText}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));
}

//Found Data Count
const searchCount = result => {
    // console.log(result);
    const dataFound = document.getElementById('total-found');
    dataFound.innerHTML = '';
    const div = document.createElement('div');
        div.innerHTML = `
            <div class="alert alert-success text-center mx-auto" role="alert" style="width:400px;">
                <h2>Total Data Found: ${result}<h2/>
            </div>
        `;
    dataFound.appendChild(div);
}

//Display Search Result
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    let count = 0;
    //Display Not Found Data
    if(books.length == 0){
        console.log('Empty');
        const notFound = document.getElementById('data-found');
        notFound.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="alert alert-danger text-center mx-auto" role="alert" style="width:400px;">
                <h2>No Result Found<h2/>
            </div>
        `;
        notFound.appendChild(div);
    }else{
        //Display Found Data
        books.forEach(book => {
            count++;
            console.log(book);
            const div = document.createElement('div');
            div.classList.add('col-sm-6');
            div.innerHTML = `
            <div class="mb-3">
                <div onclick="loadCoverPhoto(${book.cover_i})" class="card shadow text-primary mb-3 scroll" style="height:300px;">
                    <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title"><span class="text-danger">Book Title:</span> ${book.title}</h5>
                            <h5 class="card-title"><span class="text-danger">Author Name:</span> ${book.author_name}</h5>
                            <h5 class="card-title"><span class="text-danger">Publish Date:</span> ${book.publish_date}</h5>
                            <h5 class="card-title"><span class="text-danger">Publish Year:</span> ${book.publish_year}</h5>
                            <h5 class="card-title"><span class="text-danger">Publish place:</span> ${book.publish_place}</h5>
                            <h5 class="card-title"><span class="text-danger">Publisher:</span> ${book.publisher}</h5>
                            <h5 class="card-title"><span class="text-danger">Language:</span> ${book.language}</h5>
                            <h5 class="card-title"><span class="text-danger">Contributor:</span> ${book.contributor}</h5>
                            <h5 class="card-title"><span class="text-danger">ISBN:</span> ${book.isbn}</h5>    
                        <button onclick="loadCoverPhoto(${book.cover_i})" type="button" class="btn btn-success">Show Cover Photo</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
        searchCount(count);
    }
}

//Display Cover Photo
const loadCoverPhoto = cover_i => {
    const url = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

    //display cover photo if data not found
    if(url === 'https://covers.openlibrary.org/b/id/undefined-M.jpg'){
        // console.log("Undefined");
        const notFound = document.getElementById('data-found');
        notFound.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="alert alert-danger text-center mx-auto" role="alert" style="width:400px;">
                <h2>Cover Photo Not Found<h2/>
            </div>
        `;
        notFound.appendChild(div);
    }else{
    //display cover photo if data found
        const coverPhoto = document.getElementById('cover-photo');
        const notFound = document.getElementById('data-found');
        coverPhoto.innerHTML = '';
        notFound.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML =  `
            <div class="card mx-auto">
                <img src="${url}" class="card-img-top" alt="..." style="height: 300px; weight:250px;">
            </div>
        `;
        coverPhoto.appendChild(div);
        notFound.appendChild(div);
    }
}


