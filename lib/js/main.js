$(document).ready(function () {

    const base_url = window.location.href;
    var config = {};
    //lsit ade opciones para buscar
    var network_list = [];
    //lista de resultados
    var result_stations = [];

    function get_config() {
        var request = $.ajax({
            url: base_url + "get_config",
            method: "POST",
            data: {},
            dataType: "json"
        });
        request.done(function (response) {
            config = response;
            console.log(config)
        });
        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        })

    }
    //
    //function search_data_stations(){
    //   
    //   event.preventDefault();
    //   $('#loader-json').show();
    //   $('#container-json-viewer').hide();
    //
    //   var id_net     = $("#networks_stations").val();
    //   var id_station = $("#station_" + id_net).val()+"";
    //
    //   var data_search ={
    //   	"id_net_station": id_net,
    //	"id_station"    : id_station,   
    //	"network_list" : network_list
    //	};
    //
    //   var request = $.ajax({
    //   	url: base_url + "search_data_stations",
    //   	type: "POST",
    //    contentType: "application/json",
    //   	data: JSON.stringify(data_search),
    //   	dataType: "json"
    //   });
    //
    //   request.done(function( response ) {
    //     
    //     $('#container-json-viewer').show();
    //     $('#loader-json').hide();
    //     result_stations = response['networks_stations'];
    //	 $('#json-renderer').jsonBrowse(result_stations,{collapsed:false});
    //
    //     console.log(result_stations)
    //     localStorage.setItem('gameStorage', JSON.stringify(result_stations));
    //
    //
    //  });
    //   
    //  request.fail(function( jqXHR, textStatus ) {
    //    alert( "Request failed: " + textStatus );
    //  })
    //
    //	
    //}
    //
    //function get_networks_stations(callback){
    //  //var menuId = $( "ul.nav" ).first().attr( "id" );
    //  var networks = $("#networks_stations");
    //  networks.html("");
    //
    //  var request = $.ajax({
    //    url: base_url + "get_networks_stations",
    //    method: "POST",
    //    contentType: "text/html; charset=utf-8",
    //    data: {},
    //    dataType: "json"
    //  });
    //   
    //  request.done(function( response ) {
    //    network_list = response['networks_stations'];
    //    console.log(network_list);
    //    //Completar lista de estaciones
    //    for (var i = 0; i < network_list.length; ++i) {
    //    	var option='<option value="'+network_list[i][0]+'">'+network_list[i][1]+'</option>';
    //    	networks.append(option);
    //   		// Se saltea la opcion TODAS (0) SIEMPRE
    //    	if(i > 0){
    //	    	//Agregar lista de cada red de estaciones
    //	    	var station_list = '<select class="station_class" name="station_'+ network_list[i][0] +'" id="station_'+ network_list[i][0] +'" ></select>';
    //	    	
    //	    	if(network_list[i][4].length >0){
    //	    	  $("#station-container").append(station_list);
    //	    	  for (var j = 0; j < network_list[i][4].length; j++) {
    //	    		$('#station_'+ network_list[i][0]).append('<option value="'+network_list[i][4][j][0]+'">'+network_list[i][4][j][1]+'</option>');
    //	    	  }
    //	    	}
    //    	}
    //
    //    }
    //    //EJECUTAR FUNCION PASADA
    //    callback();
    //
    //  });
    //   
    //  request.fail(function( jqXHR, textStatus ) {
    //    alert( "Request failed: " + textStatus );
    //  })
    //
    //}
    //
    //function saveJson(){
    //    let id_net = $("#networks_stations").val();
    //	let current_datetime = new Date();
    //	let formatted_date =  current_datetime.getDate() + "-" +(current_datetime.getMonth() + 1) + "-"
    //					   + current_datetime.getFullYear(); 
    //	formatted_date     = formatted_date + "_Net_"+ id_net + "_Station_"+ $("#station_" + id_net).val()+"";
    //	
    //	$("<a />", {
    //	  "download": formatted_date + ".json",
    //	  "href" : "data:application/json," + encodeURIComponent(JSON.stringify(result_stations))
    //	}).appendTo("body")
    //	.click(function() {
    //	   $(this).remove()
    //	})[0].click()
    //
    //
    //} 


    function fixNavbarIssue() {
        //https://gist.github.com/ivos/4055810
        function setNewOnClick(originalOnClick, hash) {
            anchorsList[i].onclick = function () {
                $(originalOnClick);
                //Agrego correcion de 5 px extra paa mi caso
                //    $(document).scrollTop(($(hash).offset().top) - $(".navbar-fixed-top").height());
                $(document).scrollTop(($(hash).offset().top) - ($(".sticky-top").height()));
                return false;
            };
        }
        if ($(document).width() > 979) { // Required if "viewport" content is "width=device-width, initial-scale=1.0": navbar is not fixed on lower widths.
            var hash = window.location.hash;
            // Code below fixes the issue if you land directly onto a page section (http://domain/page.html#section1)

            if (hash != "") {
                //    $(document).scrollTop(($(hash).offset().top) - $(".navbar-fixed-top").height());
                $(document).scrollTop(($(hash).offset().top) - ($(".sticky-top").height() + 100));
            }
            // Here's the fix, if any <a> element points to a page section an offset function is called
            var locationHref = window.location.protocol + '//' + window.location.host + $(window.location).attr('pathname');
            var anchorsList = $('a').get();

            for (i = 0; i < anchorsList.length; i++) {
                var hash = anchorsList[i].href.replace(locationHref, '');
                if (hash[0] == "#" && hash != "#") {
                    var originalOnClick = anchorsList[i].onclick; // Retain your pre-defined onClick functions
                    setNewOnClick(originalOnClick, hash);
                }
            }
        }

    }

    function setconfigStoneTypes() {
        //Types Stones animations
        document.querySelectorAll(".icon-type-stone").forEach(function (typeStone) {
            let stoneAnimation = gsap.to(typeStone, {
                duration: 0.3,
                backgroundColor: "#000000",
                borderRadius: "10%",
                fill: "#ffffff",
                borderBottom: "4px solid #ff4b4b",
                paused: true
            });
            //configurar eventos
            typeStone.addEventListener("mouseenter", function () {
                if (!typeStone.classList.contains("stone-active")) {
                    stoneAnimation.play();
                }
            });
            typeStone.addEventListener("mouseleave", function () {

                if (!typeStone.classList.contains("stone-active")) {
                    stoneAnimation.reverse();
                }
            });

            typeStone.addEventListener("click", function (element, index) {
                //Desactivar todos los botones
                typeStone.closest(".container-carousel").querySelectorAll(".icon-type-stone").forEach(function (typeStone2) {
                    typeStone2.classList.remove("stone-active");
                    typeStone2.removeAttribute("style");
                });
                typeStone.closest(".container-carousel").querySelectorAll(".carousel-item").forEach(function (itemCarousel, index) {
                    //Desactivar todos los items de galeria de tipo de piedra
                    itemCarousel.classList.remove("active");
                });
                //desactivar animacion boton actual
                if (!typeStone.classList.contains("stone-active")) {
                    stoneAnimation.reverse();
                    gsap.to(typeStone, {
                        duration: 0.3,
                        backgroundColor: "#ff4b4b",
                        borderRadius: "10%",
                        fill: "#ffffff",
                        borderTop: "4px solid #000000"
                    });

                    var idIcon = typeStone.getAttribute('data-stone').replace('icon-', '');
                    //Existen imagenes de esa galeria?
                    var existImgTypeStone = typeStone.closest(".container-carousel").querySelectorAll('[data-stone="' + idIcon + '"]');

                    if (existImgTypeStone.length) {
                        //activar boton
                        typeStone.classList.add("stone-active");

                        //activar item de galeria
                        typeStone.closest(".container-carousel").querySelectorAll('[data-stone="' + idIcon + '"]')[0].classList.add("active");


                    } else {
                        typeStone.classList.remove("stone-active");
                        typeStone.removeAttribute("style");
                        typeStone.closest(".wrap-buttons-stone").querySelectorAll('.icon-type-stone')[0].classList.add("stone-active");
                        typeStone.closest(".wrap-buttons-stone").querySelectorAll('.icon-type-stone')[0].removeAttribute("style");
                        typeStone.closest(".container-carousel").querySelectorAll('[data-stone]')[0].classList.add("active");
                    }


                }
            });

            //

        });

        //Detectar cambio de fotos entre un tipo de piedra y otra
        //Se actualiza seleccion de boton de tipo de piedra
        $('.carousel-stone').on('slid.bs.carousel', function (e) {
            //detect change in type Stones images

            //detectar reinicio de galeria
            var previousType = "";
            if (e.direction == "left") {
                var previousType = e.currentTarget.getElementsByClassName('carousel-item active').item(0).previousElementSibling;
            } else {
                var previousType = e.currentTarget.getElementsByClassName('carousel-item active').item(0).nextElementSibling;
            }
            if (previousType) {
                previousType = previousType.getAttribute('data-stone');
            }
            else {
                previousType = "galleryReset"
            }

            var currentTypeStone = e.currentTarget.getElementsByClassName('carousel-item active').item(0).getAttribute('data-stone');
            var reverseSlideStart = (e.from == 0 && e.direction == "right");
            if (currentTypeStone != previousType || reverseSlideStart) {
                //desactivar boton seleccionado anterior
                e.currentTarget.closest('.carousel-stone').parentElement.querySelector('.wrap-buttons-stone').querySelectorAll('[data-stone]').forEach(function (typeStoneButton) {
                    typeStoneButton.classList.remove('stone-active');
                    typeStoneButton.removeAttribute("style");
                });
                //
                e.currentTarget.closest('.carousel-stone').parentElement.querySelector('[data-stone="icon-' + currentTypeStone + '"]').classList.add('stone-active');

            }

        });
    }

    function setAnimations() {
        //logo animation
        gsap.from(".logo", {
            duration: 1,
            y: +70,
            opacity: 0
        });
        //Init type stone animations, 
        gsap.from(".icon-type-stone", {
            duration: 0.5,
            scale: 0.5,
            opacity: 0,
            delay: 0.5,
            stagger: 0.2,
            ease: "elastic"
        });
        //config galeria y botones de tipo de piedra
        setconfigStoneTypes();

        //config animacion de secciones  con scrolltrigger
        let proxy = { skew: 0 },
            skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
            clamp = gsap.utils.clamp(-1, 1); // don't let the skew go beyond 20 degrees. 

        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -300);
                // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
                }
            }
        });
        // make the right edge "stick" to the scroll bar. force3D: true improves performance
        gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });


    }

    function scrollFixes() {
        //FIX BOOTSTRAP STICKY BAR 
        fixNavbarIssue();
        //FIX Logo-bar activate
        function logoScrollRezise() {
            var heightHeader = document.getElementById('header').offsetHeight;
            if (window.innerWidth > 768) {
                if (window.scrollY > heightHeader) {
                    document.getElementById('logo-nav').setAttribute("class", " show mr-auto w-20");

                } else {
                    document.getElementById('logo-nav').setAttribute("class", "d-md-none hide");
                }

            } else {
                document.getElementById('logo-nav').setAttribute("class", "d-md-none pr-2 pr-2 mr-auto w-50");
            }
        }
        window.addEventListener('scroll', function () { logoScrollRezise(); });

        window.addEventListener('resize', function () { logoScrollRezise(); });

    }

    function stoneFullscreen() {
        //init galleries
        var i = 1;
        for (var galleryStone of document.getElementsByClassName('stone-gallery')) {
            lightGallery(galleryStone, {
                mode: 'lg-slide-skew-only',
                subHtmlSelectorRelative: true,
                thumbnail: true,
                galleryId: i
            });

        }
        //zoom para la imagen que contiene lso tipos de piedra
        for (var galleryStone of document.getElementsByClassName('sizes-gallery')) {
            lightGallery(galleryStone, {
                thumbnail: true
            });

        }



    }

    function init() {
        //SET TOOLTIP from types-stone
        $('[data-toggle="tooltip"]').tooltip();
        scrollFixes();
        setAnimations();
        stoneFullscreen();




    }

    /*=============================================
    =          EJECUCION        =
    =============================================*/

    init();
    /*=====  End of Section comment block  ======*/

});
