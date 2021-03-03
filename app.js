//variables : 
var objects = [];

//scene
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0f0f0 );

//camera
var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = 1000;



//renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




//adding light
scene.add( new THREE.AmbientLight( 0x0f0f0f ) );
var light = new THREE.SpotLight( 0xffffff, 1 );
light.position.set( 0, 500, 2000 );
scene.add(light);





//controls

const orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
const dragControls = new THREE.DragControls( objects, camera, renderer.domElement );


//fix the window resize problem 
window.addEventListener('resize', function(){
    renderer.setSize(window.innerWidth,window.innerHeight) ; 
    camera.aspect = window.innerWidth / window.innerHeight ; 
    camera.updateProjectionMatrix();
}) ;




//animate 
function animate() {
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
};

//cloning
function createCube () {
	
	var geometry = new THREE.BoxGeometry( 200, 200, 200 );
	var cube = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x00004B } ) );
	scene.add( cube );
	objects.push( cube );
	cube.position.x = 0;
	cube.position.y = 0;
}



function createRockCube() {
	var texture = new THREE.TextureLoader().load( 'rock.jpg' );
	var rock_geometry = new THREE.BoxGeometry( 200, 200, 200 );
	var rock_material = new THREE.MeshBasicMaterial( {map: texture} );
	var rock_cube = new THREE.Mesh( rock_geometry, rock_material );
	scene.add( rock_cube );
	objects.push( rock_cube );
	rock_cube.position.x = -500;
	rock_cube.position.y = 0;
}


function createRobot() {
	var objLoader = new THREE.OBJLoader();
	objLoader.setPath('/examples/3d-obj-loader/assets/') ;
	objLoader.load('r2-d2.obj', function (object) {
		object.position.x = 500 ;
		objects.push( object );
		scene.add(object);
}) ; 
}

function createRobot2() {
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath('/examples/3d-obj-loader/assets/') ; 
	mtlLoader.load('r2-d2.mtl',  (materials)=> {
	materials.preload(); 
		
		var objLoader2 = new THREE.OBJLoader();
		objLoader2.setMaterials(materials);
		objLoader2.setPath('/examples/3d-obj-loader/assets/') ;
		objLoader2.load('r2-d2.obj',  (object2) =>{
		objects.push( object2 );
		scene.add(object2);
		});
})
}

function disableControl(){
	orbitControls.enabled = false;
}

function enableControl(){
	orbitControls.enabled = true;
}






animate();