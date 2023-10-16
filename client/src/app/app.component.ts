import { Component, ElementRef, OnInit, NgZone } from '@angular/core';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { OrbitControls } from 'three-orbitcontrols-ts';

@Component({
  selector: 'app-root',
  template: '<div id="scene-container"></div>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  constructor(private el: ElementRef, private ngZone: NgZone) {}
  ngOnInit() {
    this.initThree();
    this.generateSTL();
  }

  initThree() {
    // Initialiser la scène
    this.scene = new THREE.Scene();

    // Initialiser la caméra
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);

    // Initialiser le rendu
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.nativeElement.querySelector('#scene-container').appendChild(this.renderer.domElement);

    // Initialiser OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }
  generateSTL() {
    // Coordonnées XYZ de votre modèle
   
      const apiCoordinates = [
          [0, 0, 0],
          [0, 0, 1],
          [0, 0, 2],
          [0, 0, 3],
          [0, 0, 4],
          [1, 0, 0],
          [1, 0, 1],
          [1, 0, 2],
          [1, 0, 3],
          [1, 0, 4],
          [2, 0, 0],
          [2, 0, 1],
          [2, 0, 2],
          [2, 0, 3],
          [2, 0, 4],
          [3, 0, 0],
          [3, 0, 1],
          [3, 0, 2],
          [3, 0, 3],
          [3, 0, 4],
          [4, 0, 0],
          [4, 0, 1],
          [4, 0, 2],
          [4, 0, 3],
          [4, 0, 4],
          [5, 0, 0],
          [5, 0, 1],
          [5, 0, 2],
          [5, 0, 3],
          [5, 0, 4],
          [0, 3, 0],
          [0, 3, 1],
          [0, 3, 2],
          [0, 3, 3],
          [0, 3, 4],
          [1, 3, 0],
          [1, 3, 1],
          [1, 3, 2],
          [1, 3, 3],
          [1, 3, 4],
          [2, 3, 0],
          [2, 3, 1],
          [2, 3, 2],
          [2, 3, 3],
          [2, 3, 4],
          [3, 3, 0],
          [3, 3, 1],
          [3, 3, 2],
          [3, 3, 3],
          [3, 3, 4],
      ]

    // Créez une géométrie à partir des coordonnées XYZ
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(apiCoordinates.flat());
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Créez un mesh à partir de la géométrie
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111, shininess: 200 });
    const mesh = new THREE.Mesh(geometry, material);

    // Exportez le mesh au format STL
    const exporter = new STLExporter();
    const stlString = exporter.parse(mesh);
    console.log(stlString, "positons")

    // Chargez le fichier STL avec Three.js
    const stlGeometry = new STLLoader().parse(stlString);
    const stlMesh = new THREE.Mesh(stlGeometry, material);
    this.scene.add(stlMesh);


    // Ajout d'une lumière ambiante pour éclairer le modèle
    const ambientLight = new THREE.AmbientLight(0x808080);
    this.scene.add(ambientLight);

    // Animation de la scène
    const animate = () => {
      this.ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      });
    };

    animate();
  }
}



















// import { Component, ElementRef, OnInit } from '@angular/core';
// import * as THREE from 'three';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
// import { OrbitControls } from 'three-orbitcontrols-ts';
// import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

// @Component({
//   selector: 'app-root', 
//   template: '<div id="scene-container"></div>',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   constructor(private el: ElementRef) {}

//   ngOnInit() {

//     // Récupérez les coordonnées XYZ depuis votre API (remplacez cela par votre logique d'appel API)
//     const apiCoordinates = [
//       // [0, 0, 0],
//       // [1, 0, 0],
//       // [1, 1, 0],
//       // [0, 1, 0],
//       // [0, 0, 1],
//       // [1, 0, 1]
//       [1, 0, 0],
//       [1, 1, 0],
//       [0, 0, 1],
//       [0, 1, 1],
//       [1, 0, 1],
//       [1, 1, 1],
//     ];

    
//     let content = 'solid myShape\n';
//     for (let i = 0; i < apiCoordinates.length; i += 3) {
//         content += `facet normal 0 0 0\nouter loop\n`;
//         for (let j = 0; j < 3; j++) {
//             const coord = apiCoordinates[i + j];
//             content += `vertex ${coord[0]} ${coord[1]} ${coord[2]}\n`;
//         }
//         content += 'endloop\nendfacet\n';
//     }
//     content += 'endsolid myShape';
//     const stl = content; //=========================================================
//     console.log('apiCoordinates:', stl);
//     // Chargez le fichier STL avec Three.js
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     this.el.nativeElement.querySelector('#scene-container').appendChild(renderer.domElement);

//     // Chargez le fichier STL
//     const geometry = new STLLoader().parse(stl);
//     const material = new THREE.MeshPhongMaterial({ color: 0xfffff, specular: 0x111111, shininess: 200 });
//     const mesh = new THREE.Mesh(geometry, material);

//     scene.add(mesh);

//     // Positionnez et orientez votre caméra selon vos besoins
//     camera.position.set(1, 1, 1);
//     camera.lookAt(0, 0, 0);

//     // Ajout d'une lumière ambiante pour éclairer le modèle
//     const ambientLight = new THREE.AmbientLight(0x404040);
//     scene.add(ambientLight);

//     // Animation de la scène
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };

//     animate();
//   }
// }


















// import {
//   Component,
//   ElementRef,
//   NgZone,
//   OnInit,
//   OnDestroy,
// } from '@angular/core';
// import * as THREE from 'three';
// import { OrbitControls } from 'three-orbitcontrols-ts';
// import { ApiService } from './api.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent implements OnInit, OnDestroy {
//   donnees: number[][] = [];
//   // donnees: any;
//   private renderer!: THREE.WebGLRenderer;
//   private scene!: THREE.Scene;
//   private camera!: THREE.PerspectiveCamera;
//   private controls!: OrbitControls;

//   //private cube!: THREE.Mesh;
//   // Coordonnées de la liste
//   private data = [
//     [0, 0, 0],
//     [0, 0, 1],
//     [0, 0, 2],
//     [0, 0, 3],
//     [0, 0, 4],
//     [1, 0, 0],
//     [1, 0, 1],
//     [1, 0, 2],
//     [1, 0, 3],
//     [1, 0, 4],
//     [2, 0, 0],
//     [2, 0, 1],
//     [2, 0, 2],
//     [2, 0, 3],
//     [2, 0, 4],
//     [3, 0, 0],
//     [3, 0, 1],
//     [3, 0, 2],
//     [3, 0, 3],
//     [3, 0, 4],
//     [4, 0, 0],
//     [4, 0, 1],
//     [4, 0, 2],
//     [4, 0, 3],
//     [4, 0, 4],
//     [5, 0, 0],
//     [5, 0, 1],
//     [5, 0, 2],
//     [5, 0, 3],
//     [5, 0, 4],
//     [0, 3, 0],
//     [0, 3, 1],
//     [0, 3, 2],
//     [0, 3, 3],
//     [0, 3, 4],
//     [1, 3, 0],
//     [1, 3, 1],
//     [1, 3, 2],
//     [1, 3, 3],
//     [1, 3, 4],
//     [2, 3, 0],
//     [2, 3, 1],
//     [2, 3, 2],
//     [2, 3, 3],
//     [2, 3, 4],
//     [3, 3, 0],
//     [3, 3, 1],
//     [3, 3, 2],
//     [3, 3, 3],
//     [3, 3, 4],
//   ];

//   constructor(
//     private ngZone: NgZone,
//     private el: ElementRef,
//     private apiService: ApiService,
//   ) {}

//   ngOnInit() {
//     this.initThree();
//     //this.createCube();
//     this.createPoints();
//     this.render();

//     // this.apiService.getDonnees().subscribe(data => {
//     //   this.donnees = data;
//     //   this.donnees = this.transformApiData(apiData);
//     //   console.log(this.donnees); // Vous pouvez afficher les données dans la console
//     //   this.updatePoints();
//     // });

//     this.apiService.getDonnees().subscribe(
//       (apiData: any) => {
//         this.donnees = this.transformApiData(apiData);
//         console.log(this.donnees);
//         this.updatePoints();
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des données API', error);
//       }
//     );
//   }


//   ngOnDestroy() {
//     this.stopRendering();
//   }
  

//   private initThree() {
//     // ... (le reste de votre code)

//     this.renderer = new THREE.WebGLRenderer();
//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//     this.el.nativeElement.appendChild(this.renderer.domElement);

//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000,
//     );
    
//     //this.camera.position.z = 5;
//     this.camera.position.set(5, 5, 5);
//     this.camera.lookAt(0, 0, 0);

//     // Créez une instance de OrbitControls et ajoutez-la à la caméra et au rendu
//     this.controls = new OrbitControls(this.camera, this.renderer.domElement);
//     this.controls.enableDamping = true;
//     this.controls.dampingFactor = 0.25;
//     this.controls.rotateSpeed = 0.35;
//   }

//   private transformApiData(apiData: any): number[][] {
//     const transformedData: number[][] = [];

//     if (apiData && apiData.coordonnees) {
//       apiData.coordonnees.forEach((coordinate: number[])  => {
//         transformedData.push([coordinate[0], coordinate[1], coordinate[2]]);
//       });
//     }

//     return transformedData;
//   }

//   //  private createCube() {
//   //const geometry = new THREE.BoxGeometry();
//   //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//   //this.cube = new THREE.Mesh(geometry, material);
//   //this.scene.add(this.cube);

//   //}

//   private createPoints() {
//     const geometry = new THREE.BufferGeometry();
//     const vertices: number[] = [];

//     for (let i = 0; i < this.data.length; i++) {
//       vertices.push(this.data[i][0], this.data[i][1], this.data[i][2]);

//     }

//     geometry.setAttribute(
//       'position',
//       new THREE.Float32BufferAttribute(vertices, 3),
//     );
//     const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
//     const points = new THREE.Points(geometry, material);
//     this.scene.add(points);
//   }

//   private updatePoints() {
//     // Supprimez les anciens points de la scène
//     this.scene.children.forEach(child => {
//       if (child instanceof THREE.Points || child instanceof THREE.LineSegments) {
//         this.scene.remove(child);
//       }
//     });

//     // Créez de nouveaux points avec les données récupérées depuis l'API
//     const geometry = new THREE.BufferGeometry();
//     const vertices: number[] = [];

//     for (let i = 0; i < this.donnees.length; i++) {
//       // vertices.push(this.donnees[i].x, this.donnees[i].y, this.donnees[i].z);
//       vertices.push(this.donnees[i][0], this.donnees[i][1], this.donnees[i][2]);

//     }

//     geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  
//     const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
//     const points = new THREE.Points(geometry, material);
//     this.scene.add(points);

//   // Créez des lignes entre les points pour former une forme ============================
//   // const lineGeometry = new THREE.BufferGeometry();
//   // const lineVertices: number[] = [];

//   // for (let i = 0; i < this.donnees.length; i++) {
//   //   // Ajoutez les coordonnées du point actuel
//   //   lineVertices.push(this.donnees[i][0], this.donnees[i][1], this.donnees[i][2]);

//   //   // Ajoutez les coordonnées du point suivant (s'il y en a un)
//   //   if (i < this.donnees.length - 1) {
//   //     lineVertices.push(this.donnees[i + 1][0], this.donnees[i + 1][1], this.donnees[i + 1][2]);
//   //   }
//   // }

//   // lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3));

//   // // Créez des lignes entre les points
//   // const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
//   // const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
//   // this.scene.add(lines);
//   }

//   private render() {
//     this.ngZone.runOutsideAngular(() => {
//       const animate = () => {
//         requestAnimationFrame(animate);

//         // Mettez à jour les contrôles à chaque trame d'animation
//         // Rotate the cube
//         //this.cube.rotation.x += 0.01;
//         //this.cube.rotation.y += 0.01;
//         // Mettez à jour les contrôles à chaque trame d'animation
//         this.controls.update();
//         this.renderer.render(this.scene, this.camera);
//       };

//       animate();
//     });
//   }

//   private stopRendering() {
//     this.ngZone.runOutsideAngular(() => {
//       this.renderer.dispose();
//     });
//   }
// }
