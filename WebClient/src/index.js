// Backend URL. 
let url = "http://localhost:5001/";
let messageBox; 
let inputBox; 
let keyBox;
let dbImage;

// ------------------------- Button Callback  --------------------------
function saveToDb() {
    let key = keyBox.value; 
    let message = inputBox.value; 

    // JSON bundle.  
    let jsonBundle = {};
    // Load text. 
    jsonBundle['text'] = [message]; 

    // Load images and save.
    fetch('src/images/hello.png')
    .then(response => {
        return response.blob()
    })
    .then(blob => {
        let reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = function() {
            var base64data = reader.result;    
            // Populate images.            
            jsonBundle['images'] = [base64data, base64data, base64data, base64data, base64data]; 
            jsonBundle = JSON.stringify(jsonBundle);
            saveBundle(key, jsonBundle);
        }
    });
}

function retrieve() {
    let key = document.getElementById("key").value; 
    retrieveBundle(key);
}


// ------------------------- SERVER REQUESTS --------------------------
function saveBundle(key, jsonBundle) {
    let postData = {'key': key, 'bundle': jsonBundle};
    let postUrl = url + 'save';
    httpPost(postUrl, postData, function(response) {
        messageBox.innerHTML = response; 
    });
}

function retrieveBundle(key) {
    let postData = {'key': key };
    let postUrl = url + 'retrieve';
    httpPost(postUrl, postData, function(response) {
        console.log('Hello');
        if (response === 'empty') {
            messageBox.innerHTML = 'No Data';
        } else {
            response = JSON.parse(response);
            console.log(response);
            let text = response['text'][0];

            // TODO: Save some metadata here as well like the
            // size of the image, its position, etc. 
            let imgSource = response['images'][0];

            // Update input box.
            inputBox.value = text;
            dbImage.src = imgSource; 

            // Update message box.
            messageBox.innerHTML = 'Data Found';
        }
    });
}

// Raw P5.js methods. 
function setup() {
    // Retrieve all the dom elements. 
    messageBox = document.getElementById('message');
    inputBox = document.getElementById("intext");
    keyBox = document.getElementById("key"); 
    dbImage = document.getElementById('set');
}

function draw() {

}










































// let giphy = new Giphy(); 

// function onResponse(result) {
//     console.log(result);
// }

// function setup() {
//     noCanvas();
//     giphy.search("hello", 20, onResponse);
// }


// let url = 'http://localhost:5000/confirmation'
// function sendGetRequest() {
//     let getUrl = url + '?hash=123&email=amayk@gmail.com';
//     httpGet(getUrl, function(response) {
//         console.log(response);
//     });
// }

// function setup() {
//     noCanvas();
// }



// let url = 'http://localhost:5000/';

// function sendGetRequest() {
//     let getUrl = url + 'error';
//     httpGet(getUrl, function(response) {
//         console.log(response);
//     });
// }

// function sendPostRequest() {
//     let postData = { username: 'amayk', password: 'abc123'};
//     let postUrl = url + 'login'
//     httpPost(postUrl, postData, function(response) {
//         console.log(response); 
//     });
// }

// function sendPutRequest() {
//     console.log('Put request');
//     let putUrl = url + 'item'
//     putData = { item: 'shampoo', price: '10'}
//     httpDo(putUrl, 'PUT', putData, function(response) {
//         console.log(response);
//     });
// }

// function sendDeleteRequest() {
//     console.log('Delete request');
//     let putUrl = url + 'item'
//     putData = { item: 'shampoo', price: '10'}
//     // putData = JSON.stringify(putData);
//     httpDo(putUrl, 'DELETE', putData, function(response) {
//         console.log(response);
//     });
// }

// // P5.js request. 
// function setup() {
//     noCanvas();
// }




// Vanilla HTTP request using XMLHttpRequest
// function get() {
//     const Http = new XMLHttpRequest();
//     Http.open("GET", url);
//     Http.send();

//     Http.onreadystatechange = (e) => {
//         if(Http.readyState === XMLHttpRequest.DONE) {
//             var status = Http.status;
//             if (status === 0 || (status >= 200 && status < 400)) {
//               // The request has been completed successfully
//               console.log(Http.responseText);
//             } else {
//               // Oh no! There has been an error with the request!
//             }
//         }
//     }
// }

// // Vanilla javascript. 
// get();



