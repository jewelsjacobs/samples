/**
 * grid_elements.js
 *
 * User: jjacobs
 * Date: 4/16/13
 * Time: 3:10 PM
 *
 * Elements dynamically created by api data for grid layout
 */

poc.GridElements = {};

poc.GridElements.objects = [];

poc.GridElements.playing = false;

poc.GridElements.debugData = function () {
    if ($("#video_container").length > 0) {
           return {"window height" : window.innerHeight,
            "window width" : window.innerWidth,
            "camera z pos" : Math.abs(
                parseInt(
                    $("#video_container")
                        .children("div")
                        .eq(0)
                        .children()[0]
                        .attributes.style.nodeValue
                        .split(': ')[4]
                        .split(') ')[1]
                        .split(', ')[14]
                )
            )
        };
    };
};

poc.GridElements.elements = function (resultsObj) {

    var orgObjPosition = {};

    _.each(resultsObj, function (data, index) {

        var providerDetails = $("<div id='video_element_id_"
            + index
            + "' class='video_element video_element_size'><span>"
            + data.provider
            + "</span></div>");

        _.each(data.items, function (item, i) {

            // video info data
            var videoDetails = {
                title: item.title,
                description: item.description,
                category: item.category
            };

            // player button attribute values
            var buttonSrc = 'data:image/png;base64,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';
            var buttonLeftPos = ( ( 480 - 86 ) / 2 ) + 'px';
            var buttonTopPos = ( ( 360 - 61 ) / 2 ) + 'px';

            // Create dynamic elements for 'flip card' effect

            // parent element
            var element = $("<div id='video_element_id_" + i + "' class='video_element smaller'></div>");

            // flip element
            var flip = $("<div id='flip_element_id_" + i + "' class='flip smaller'></div>");

            // child card element
            var card = $("<div id='card_element_id_" + i + "' class='card smaller'></div>");

            // front face of card
            var faceFront = $("<div id='front_element_" + i + "' class='face front smaller'></div>");

            // poster image for front
            var frontPoster = $("<img id='front_poster_" + i + "' src='" + item.poster + "' class='front_poster smaller'></img>");

            // back face of card
            var faceBack = $("<div id='back_element_" + i + "' class='face back smaller'></div>");

            // container for back poster and button
            var backPosterContainer = $("<div class='backposter'></div>");

            // poster image for back
            var backPoster = $("<img id='back_poster_" + i + "' src='" + item.poster + "' class='back_poster'></img>");

            // play button on backface detail poster
            var button = $("<img id='button_element_" + i
                + "' src='"
                + buttonSrc
                + "' class='playerButton' style='left: "
                + buttonLeftPos
                + "; top: "
                + buttonTopPos
                + ";'></img>");

            // details markup
            var videoDetailsMarkup = "<div class='video_detail_content'><dl>";
            _.each(videoDetails, function (value, key) {
                videoDetailsMarkup += "<dt>" + key + "</dt><dd>" + value + "</dd>"
            });
            videoDetailsMarkup += "</dl></div>";

            var player = data.player;

            $(element).append(flip);
            $(flip).append(card);
            $(card).prepend(faceFront).append(faceBack);
            $(faceFront).append(frontPoster);
            $(faceBack).prepend(backPosterContainer).append($(videoDetailsMarkup));
            $(backPosterContainer).append(backPoster);
            $(backPosterContainer).append(button);

            $(document).on("click", function (event) {
                if(
                    !$(event.target).is("#search_box")
                    && !$(event.target).hasClass('video_element')
                    && !$(event.target).hasClass('larger')
                )
                {
                    if (poc.GridElements.playing === true) {
                        player.remove();
                    }

                    if (orgObjPosition != poc.GridElements.objects[i].position) {
                        new TWEEN.Tween(poc.GridElements.objects[i].position)
                            .to( orgObjPosition , 2000)
                            .easing(TWEEN.Easing.Exponential.Out)
                            .start();
                    }

                    // return camera to org position
                    new TWEEN.Tween(poc.GridLayout.sceneElements.camera.position)
                        .to({ x: 0, y: 0 }, 1500)
                        .easing(TWEEN.Easing.Exponential.Out)
                        .start();

                    new TWEEN.Tween(this)
                        .to({}, 4000)
                        .onUpdate(poc.GridLayout.render)
                        .start();
                }

                return false;
            });

            // toggle zoom, rotate and pan navigation with 'z', 'r', and 'p' keys
            // unless in the search text box
            $(document).on("keyup", function (event) {
                if(!$(event.target).is("#search_box") || !$(event.target).is($("#search_box").find("*")))  {
                    // 'z' key
                    if (event.keyCode === 90) {
                        if (poc.GridLayout.sceneElements.controls.noZoom == false) {
                            poc.GridLayout.sceneElements.controls.noZoom = true
                            poc.GridLayout.sceneElements.controls.zoomSpeed = 0.1;
                            alert('zoom disabled');
                        } else {
                            poc.GridLayout.sceneElements.controls.noZoom = false;
                            alert('zoom enabled');
                        }
                    }

                    // 'p' key
                    if (event.keyCode === 80) {
                        if (poc.GridLayout.sceneElements.controls.noPan == false) {
                            poc.GridLayout.sceneElements.controls.noPan = true
                            this.poc.GridLayout.sceneElements.controls.panSpeed = 0.1;
                            alert('pan disabled');
                        } else {
                            poc.GridLayout.sceneElements.controls.noPan = false;
                            alert('pan enabled');
                        }
                    }

                    // 'r' key
                    if (event.keyCode === 82) {
                        if (poc.GridLayout.sceneElements.controls.noRotate == false) {
                            poc.GridLayout.sceneElements.controls.noRotate = true
                            poc.GridLayout.sceneElements.controls.rotateSpeed = 0.1;
                            alert('rotate disabled');
                        } else {
                            poc.GridLayout.sceneElements.controls.noRotate = false;
                            alert('rotate enabled');
                        }
                    }
                }

                return false;

            });

            // resize everything when browser window size changes
            $(window).resize(function () {
                $('#providers').find('img').css('-webkit-transform', '');
                poc.GridLayout.sceneElements.camera.aspect = $(window).width() / $(window).height();
                poc.GridLayout.sceneElements.camera.updateProjectionMatrix();

                poc.GridLayout.sceneElements.renderer.setSize($(window).width(), $(window).height());
            });


            // video player
            $(button).on("click", function () {
                console.log("I clicked the button");
                $(element).append($(player));
                poc.GridElements.playing = true;
            });

            var object = new THREE.CSS3DObject($(element)[0]);

            this.poc.GridElements.objects.push(object);

            // 'flip' effect
            $(flip).on("click", function () {

                if (poc.GridElements.objects[i].position.z >= 1500) {

                    if (poc.GridElements.objects[i].position.z != 2300) {
                        orgObjPosition =  poc.GridElements.objects[i].position;
                        console.log('orgObjPosition before upfront', orgObjPosition);
                    }

                    $(card).toggleClass('flipped');

                    if ($(card).hasClass('flipped')) {
                        new TWEEN.Tween(poc.GridElements.objects[i].position)
                            .to({
                                x: poc.GridLayout.sceneElements.camera.position.x,
                                y: poc.GridLayout.sceneElements.camera.position.y,
                                z: poc.GridLayout.sceneElements.camera.position.z - 500
                            }, 1500)
                            .easing(TWEEN.Easing.Exponential.Out)
                            .start();
                    } else {
                        new TWEEN.Tween(poc.GridElements.objects[i].position)
                            .to( orgObjPosition , 2000)
                            .easing(TWEEN.Easing.Exponential.Out)
                            .start();
                    }

                }

                new TWEEN.Tween(this)
                    .to({}, 4000)
                    .onUpdate(poc.GridLayout.render)
                    .start();

                if ($(element).hasClass('smaller')){
                    $(element).removeClass('smaller').addClass('larger');
                    $(element).find('.smaller').removeClass('smaller').addClass('larger');
                } else {
                    $(element).removeClass('larger').addClass('smaller');
                    $(element).find('.larger').removeClass('larger').addClass('smaller');
                }

            });

        });

    });
};
