// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
    // Get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    // // Local Storage Test
    // localStorage.setItem('test', 'Hello World');
    // localStorage.getItem('test')

    if(localStorage.getItem('bookmarks') === null){
        // Init array
        let bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        // Get bookmarks from localstorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Reset back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    document.getElementById('myForm').reset();

    // Re*Fetch bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop throught bookmarks
    for(let i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Re*Fetch bookmarks
    fetchBookmarks();

}

// Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    let bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for(let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += `<div class="card"><h3>${name}
                                       <a class="btn btn-primary" target="_blank" href="${url}">Visit</a>`
                                       +'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
                                       +'</h3></div>';
    }
}

// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form')
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true
}