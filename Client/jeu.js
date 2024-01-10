const token = localStorage.getItem('token');

if (!token) {
    document.location.href="index.html";
}

const socket = io('http://localhost:3000');

// socket.on('attente', () => {
//   console.log("Manque 1 joueur !");
//   document.getElementById('app').innerHTML = "En attente d'un joueur : 1/2 ...";
// });

// socket.on('ok', () => {
//   console.log("Prêt à lancer la partie !");
//   document.getElementById('app').innerHTML = "Joueur trouvé !<br> La partie va commencer !";
// });

socket.emit('getRoomList');

let page = document.getElementById('app');
let btn = document.createElement("button");
btn.addEventListener('click', (event) => {
    socket.emit('createRoom');
});
btn.innerText = "Créer une nouvelle partie";
page.appendChild(btn);

socket.on('roomList', (roomList) => {
    roomList.forEach(element => {
        let btn = document.createElement("button");
        btn.addEventListener('click', (event) => {
            socket.emit('joinRoom', element);
        });
        btn.innerText = element;
        page.appendChild(btn);
    });
})

socket.on('jouer', () => {
    let page = document.getElementById('app');
    let btn = document.createElement("button");
    btn.innerText = "Lancer";
    page.appendChild(btn);
});