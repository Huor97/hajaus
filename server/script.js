// Crée une nouvelle instance de XMLHttpRequest
var xhr = new XMLHttpRequest();

// Charge le fichier cube.xyz de manière asynchrone
xhr.open('GET', 'cube.xyz', true);
xhr.onreadystatechange = function () {
    // Vérifie si la requête est terminée et la réponse est prête
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Obtient les données du fichier
        var data = xhr.responseText;

        // Divise les données en lignes
        var lines = data.split('\n');

        // Crée une nouvelle géométrie pour le cube
        var geometry = new THREE.Geometry();

        // Lit les coordonnées du fichier et ajoute les points à la géométrie
        for (var i = 0; i < lines.length; i++) {
            var coordinates = lines[i].split(' ');
            var x = parseFloat(coordinates[0]);
            var y = parseFloat(coordinates[1]);
            var z = parseFloat(coordinates[2]);

            // Ajoute le point à la géométrie
            geometry.vertices.push(new THREE.Vector3(x, y, z));
        }

        // Crée un matériau
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        // Crée un mesh en utilisant la géométrie et le matériau
        var cube = new THREE.Mesh(geometry, material);

        // Ajoute le cube à la scène
        scene.add(cube);
    }
};

// Envoie la requête pour charger le fichier
xhr.send();




// // Crée une scène
// var scene = new THREE.Scene();

// // Crée une caméra
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// // Crée une géométrie de cube
// var geometry = new THREE.BoxGeometry(1, 1, 1);

// // Crée un matériau de couleur verte
// var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// // Crée un mesh en utilisant la géométrie et le matériau
// var cube = new THREE.Mesh(geometry, material);

// // Ajoute le cube à la scène
// scene.add(cube);

// // Crée un rendu WebGL
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);

// // Ajoute le rendu au document
// document.body.appendChild(renderer.domElement);

// // Fonction d'animation
// function animate() {
//     requestAnimationFrame(animate);

//     // Rotation du cube
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

//     // Rendu de la scène avec la caméra
//     renderer.render(scene, camera);
// }

// // Appelle la fonction d'animation pour démarrer l'animation
// animate();
