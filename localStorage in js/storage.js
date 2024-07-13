// local storage is a one type of storage which store the information in the browser.
// It will not send on each request.
// The data will not go anywhere when we refresh the browser or re-start the browser.


// create local storage
localStorage.setItem("token", "ghghgdhyiosdhisdhisdhfsbfisdhi6843hf8sdyf6fzbfusdgsdbsdffgh")
localStorage.setItem("secret", "jay#jay*123")

// get local storage data by key
const data = localStorage.getItem("token")
console.log(data)

// remove item from local storage
localStorage.removeItem("secret")

// get length of local storage
console.log(localStorage.length)

// clear local storage
localStorage.clear();