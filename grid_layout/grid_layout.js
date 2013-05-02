/**
 * grid.js
 *
 * User: jacobs
 * Date: 4/8/13
 * Time: 11:42 AM
 *
 * Module to organize video search result posters into a CSS3D grid that can be navigated on the z-plane via
 * gestures and trackball / track wheel.
 * Uses three.js - http://threejs.org/
 * three.js' CSS3D Renderer - https://raw.github.com/mrdoob/three.js/master/examples/js/renderers/CSS3DRenderer.js
 * three.js' Trackball Controls - https://raw.github.com/mrdoob/three.js/master/examples/js/controls/TrackballControls.js
 * Uses code from
 * three.js' periodic table example - http://mrdoob.github.io/three.js/examples/css3d_periodictable.html
 * three.js' YouTube example - http://mrdoob.github.io/three.js/examples/css3d_youtube.html#cats
 */

poc.GridLayout = {};

poc.GridLayout.runGrid = function () {
    poc.GridLayout.init();
    poc.GridLayout.animate();
};

poc.GridLayout.orgObjectsPosition = [];

poc.GridLayout.sceneElements = {};

poc.GridLayout.numObjAcross = Math.round((window.innerWidth - 100) / 250);

poc.GridLayout.numObjDown = Math.round((window.innerHeight - 80) / 190) - 1;

poc.GridLayout.init = function () {
    var camera, scene, renderer, controls;

    var fov = 75;
    var aspect = window.innerWidth / window.innerHeight;
    var near = 0.1;
    var far = 5000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // camera is center & 'front' or screen
    camera.position.z = (poc.GridLayout.numObjDown * 1000) * 2000;    // lower the number 'closer' to objects
    camera.position.x = -25;  // lower the number more to the grid goes to the right
    camera.position.y = 0; // lower the number the more the grid goes up

    scene = new THREE.Scene();

    // CSS3D renderer
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    document.getElementById('video_container').appendChild(renderer.domElement);

    // TrackballControls also handles gestures
    controls = new THREE.TrackballControls(camera, renderer.domElement);

    // zoom, rotate and pan navigation is enabled by default
    controls.rotateSpeed = 0.1;
    controls.panSpeed = 0.1;
    controls.zoomSpeed = 0.1;

    controls.addEventListener('change', poc.GridLayout.render);

    poc.GridLayout.sceneElements = poc.GridModel.getGridData({
        camera: camera,
        scene: scene,
        renderer: renderer,
        controls: controls
    });
};

poc.GridLayout.render = function () {
    poc.GridLayout.sceneElements.renderer.render(poc.GridLayout.sceneElements.scene, poc.GridLayout.sceneElements.camera);
};

poc.GridLayout.animate = function () {
    requestAnimationFrame(poc.GridLayout.animate);
    TWEEN.update();
    poc.GridLayout.sceneElements.controls.update();
};

poc.GridLayout.createGrid = function (data) {
    var grid = [];
    poc.GridElements.elements(data);
    var objects = poc.GridElements.objects;

    _.each(poc.GridElements.objects, function (object) {

        var delay = Math.random() * 1000;

        new TWEEN.Tween(object.position)
            .to({ y: -3000 }, 1000)
            .delay(delay)
            .easing(TWEEN.Easing.Exponential.In)
            .start();

        new TWEEN.Tween(object)
            .to({}, 2000)
            .delay(delay)
            .onComplete(function () {

                poc.GridLayout.sceneElements.scene.remove(this);
                poc.GridLayout.sceneElements.cameraElement.removeChild(this.element);

                var index = this.objects.indexOf(this);
                this.objects.splice(index, 1);
            })
            .start();
    });

    _.each(poc.GridElements.objects, function (object, i) {
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;

        this.poc.GridLayout.sceneElements.scene.add(object);

        var object = new THREE.Object3D();

        object.position.x = ( ( i % poc.GridLayout.numObjAcross ) * 800 ) - Math.round(((poc.GridLayout.numObjAcross - 1) / 2)) * 800;
        object.position.y = ( -( Math.floor(i / poc.GridLayout.numObjDown) % poc.GridLayout.numObjDown ) * 800 ) + 800;
        object.position.z = ( Math.floor(i / (poc.GridLayout.numObjAcross * poc.GridLayout.numObjDown) )) * 1000;

        grid.push(object);
    });

    var duration = 2000;

    TWEEN.removeAll();

    _.each(poc.GridElements.objects, function (object, i) {
        var object = objects[ i ];
        var target = grid[ i ];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        poc.GridLayout.orgObjectsPosition.push(object.position);
    });

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(poc.GridLayout.render)
        .start();

};
