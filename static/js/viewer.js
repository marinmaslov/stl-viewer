var camera, scene, renderer, container;

function STLViewer(object, id) {

  container = document.getElementById(id)

  scene = new THREE.Scene();
  scene.add( new THREE.AmbientLight( 0x999999 ) );

  camera = new THREE.PerspectiveCamera( 70, container.clientWidth / container.clientHeight, 1, 1000 );

  // Z is up for objects intended to be 3D printed.

  camera.up.set( 0, 0, 1 );
  camera.position.set( 0, -9, 6 );

  camera.add( new THREE.PointLight( 0xffffff, 0.8 ) );

  scene.add( camera );

  //var grid = new THREE.GridHelper( 25, 50, 0xffffff, 0x555555 );
  //grid.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), 90 * ( Math.PI/180 ) );
  //scene.add( grid ); 

  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  //renderer.setClearColor( 0x999999 );
  renderer.setPixelRatio( container.devicePixelRatio );
  renderer.setSize( container.clientWidth, container.clientHeight );
  container.appendChild( renderer.domElement );

  var loader = new THREE.STLLoader();
  
  // Binary files

  var material = new THREE.MeshPhongMaterial( { color: 0xe6e6e6, specular: 0x111111, shininess: 200 } );
  loader.load(object, function ( geometry ) {
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set( 0, 0, 0 );
    mesh.rotation.set( 0, 0, 0 );
    mesh.scale.set( .07, .07, .07 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );
   
    var middle = new THREE.Vector3();
    geometry.center(middle);
    mesh.position.x = -1 * middle.x;
    mesh.position.y = -1 * middle.y;
    mesh.position.z = -1 * middle.z;

    camera.position = mesh.position;
    render();
  });

  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  controls.target.set( 0, 1.2, 2 );
  controls.update();
  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

  render();

}

function render() {

  renderer.render( scene, camera );

}