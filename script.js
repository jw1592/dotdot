function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomAnimalName() {
    var animals = ["dog", "cat", "lion", "tiger", "elephant", "penguin", "giraffe", "camel", "rabbit", "wolf", "fox", "bear", "deer", "koala", "kangaroo", "rhino", "hippopotamus", "zebra", "monkey", "gorilla"];
    var name = animals[Math.floor(Math.random() * animals.length)] + (Math.random() * 100000).toFixed();
    return name;
}

function createUserPoint(username, color) {
    var pointDiv = $('<div>', {
        'class': 'user-point',
        'style': `background-color: ${color}; width: 10px; height: 10px; left: 50%; top: 50%;`,
    });
    var nameDiv = $('<div>', {
        'class': 'username',
        'html': username,
    });
    if (isMyNickname(username)) {
        nameDiv.addClass('underline');
    }
    pointDiv.append(nameDiv);
    $('body').append(pointDiv);
    return pointDiv;
}

function isMyNickname(nickname) {
    // Add logic to check if the passed nickname is the user's own nickname
}

// Initialize WebRTC connection to get data about all users
// Create a user point for each connected user using createUserPoint()
// Update position and color of user points according to received WebRTC data

// Add event listeners to handle user interaction, such as clicking and moving
// Update the user's point position and send the new position data over the WebRTC connection

// Add event listeners to handle user profile display and input, such as changing the color or nickname
