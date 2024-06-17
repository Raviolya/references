import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
const ThreeScene = () => {
  const containerRef = useRef();
  useEffect(() => {
    let scene,camera, renderer, stats, controls;;
    const init = () => {
      const container = containerRef.current; 
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
     
      camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 60;
      scene.rotateY(Math.PI);

     const loader = new GLTFLoader();

     stats = new Stats();
      container.appendChild(stats.dom);

     const textureLoader = new THREE.TextureLoader();
     const spriteTexture1 = textureLoader.load('../assets/sprites/103L.png');
     const spriteTexture2 = textureLoader.load('../assets/sprites/kit1.svg');

     const spriteMaterial1 = new THREE.SpriteMaterial({ map: spriteTexture1 });
    const  spriteMaterial2 = new THREE.SpriteMaterial({ map: spriteTexture2 });

    const  sprite1 = new THREE.Sprite(spriteMaterial1);
    const  sprite2 = new THREE.Sprite(spriteMaterial2);

      sprite1.scale.set(3, 3, 1);
      sprite2.scale.set(2, 2, 1);
      sprite1.position.set(30, 5, 16);
      sprite2.position.set(35, 5, -13);
    

      loader.load('./assets/model/MiddleModel.glb', function (gltf) {
        gltf.scene.scale.set(200, 200, 200);
        gltf.scene.position.set(0, 0, 0);

        scene.add(gltf.scene);
        gltf.scene.traverse((child) => {
          if (child.name === "Foundation") {
            child.material.color.setHex(0xffffff);
          }
        });
      }, undefined, (error) => {
        console.error(error);
      });

      scene.add(sprite1);
      scene.add(sprite2);

      const light = new THREE.AmbientLight(0xffffff, 1.2);
      light.position.set(10, 15, 0);

      const dlight = new THREE.DirectionalLight();
      dlight.position.set(2.5, 2, 2);
      scene.add(dlight);
      scene.add(light);


      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.shadowMap.enabled = false;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.maxPolarAngle = Math.PI / 2.5;
      controls.minDistance = 40;
      controls.enablePan = false;   
      controls.autoRotate = false;
      controls.update();
      stats.dom.style.position = 'absolute';
      stats.dom.style.top = '10px';
      stats.dom.style.left = '10px';
      const raycaster = new THREE.Raycaster();
      let activeObject = null;
      function onMouseMove(event) {
        if(renderer && renderer.domElement) {
            const clientX = event.clientX;
            const clientY = event.clientY;
            const rect = renderer.domElement.getBoundingClientRect();
            const x = ((clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
            const y = -((clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
            raycaster.setFromCamera(
            {
                x: x,
                y: y
            },
            camera
            );
          const intersects = raycaster.intersectObjects(scene.children, true);
          if (intersects.length > 0) {
            if((intersects[0].object.name == "107L") || (intersects[0].object.name == "108L" )) {
                if (activeObject !== intersects[0].object) {
                    if (activeObject) {
                        activeObject.material.color.setHex(0xffffff);
                    }
                    activeObject = intersects[0].object;
                    activeObject.material.color.setHex(0xffb841);
                    document.body.style.cursor = 'pointer';
                    }
            } else {
                document.body.style.cursor = 'auto';
                if (activeObject) {
                activeObject.material.color.setHex(0xffffff);
                activeObject = null;
                }
            }
            } else {
            if (activeObject) {
                activeObject.material.color.setHex(0xffffff);
                activeObject = null;
            }
            }
        }
    }
    document.addEventListener('mousemove', onMouseMove, false);
    const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    stats.update();
    renderer.render(scene, camera);
    };

      animate();
    };
 
    init();

    window.addEventListener('resize', onWindowResize, false);
    
    function onWindowResize() {
        if(renderer) {
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
        }
    }
   
    return () => {
      window.removeEventListener('resize', onWindowResize);
 
       while (scene.children.length > 0) {
         scene.remove(scene.children[0]);
       }
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    
    };
  }, []);

  return <div className='three-js-container' ref={containerRef} id="three-js-container" style={{width: '100%', height: '100%' }} />;
}

export default ThreeScene;