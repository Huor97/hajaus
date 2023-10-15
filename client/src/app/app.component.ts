import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  OnDestroy,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  donnees: number[][] = [];
  // donnees: any;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  //private cube!: THREE.Mesh;
  // Coordonnées de la liste
  private data = [
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
  ];

  constructor(
    private ngZone: NgZone,
    private el: ElementRef,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.initThree();
    //this.createCube();
    this.createPoints();
    this.render();

    // this.apiService.getDonnees().subscribe(data => {
    //   this.donnees = data;
    //   this.donnees = this.transformApiData(apiData);
    //   console.log(this.donnees); // Vous pouvez afficher les données dans la console
    //   this.updatePoints();
    // });

    this.apiService.getDonnees().subscribe(
      (apiData: any) => {
        this.donnees = this.transformApiData(apiData);
        console.log(this.donnees);
        this.updatePoints();
      },
      (error) => {
        console.error('Erreur lors de la récupération des données API', error);
      }
    );
  }


  ngOnDestroy() {
    this.stopRendering();
  }
  

  private initThree() {
    // ... (le reste de votre code)

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    
    //this.camera.position.z = 5;
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);

    // Créez une instance de OrbitControls et ajoutez-la à la caméra et au rendu
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.rotateSpeed = 0.35;
  }

  private transformApiData(apiData: any): number[][] {
    const transformedData: number[][] = [];

    if (apiData && apiData.coordonnees) {
      apiData.coordonnees.forEach((coordinate: number[])  => {
        transformedData.push([coordinate[0], coordinate[1], coordinate[2]]);
      });
    }

    return transformedData;
  }

  //  private createCube() {
  //const geometry = new THREE.BoxGeometry();
  //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //this.cube = new THREE.Mesh(geometry, material);
  //this.scene.add(this.cube);

  //}

  private createPoints() {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];

    for (let i = 0; i < this.data.length; i++) {
      vertices.push(this.data[i][0], this.data[i][1], this.data[i][2]);

    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
    const points = new THREE.Points(geometry, material);
    this.scene.add(points);
  }

  private updatePoints() {
    // Supprimez les anciens points de la scène
    this.scene.children.forEach(child => {
      if (child instanceof THREE.Points) {
        this.scene.remove(child);
      }
    });

    // Créez de nouveaux points avec les données récupérées depuis l'API
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];

    for (let i = 0; i < this.donnees.length; i++) {
      // vertices.push(this.donnees[i].x, this.donnees[i].y, this.donnees[i].z);
      vertices.push(this.donnees[i][0], this.donnees[i][1], this.donnees[i][2]);

    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  
    const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
    const points = new THREE.Points(geometry, material);
    this.scene.add(points);
  }

  private render() {
    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        requestAnimationFrame(animate);

        // Mettez à jour les contrôles à chaque trame d'animation
        // Rotate the cube
        //this.cube.rotation.x += 0.01;
        //this.cube.rotation.y += 0.01;
        // Mettez à jour les contrôles à chaque trame d'animation
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      };

      animate();
    });
  }

  private stopRendering() {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.dispose();
    });
  }
}
