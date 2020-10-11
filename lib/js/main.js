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

        //if ($(document).width() > 979) { // Required if "viewport" content is "width=device-width, initial-scale=1.0": navbar is not fixed on lower widths.
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

        // }

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
        //Init type stone animations, 
        gsap.from(".icon-type-stone", {
            duration: 0.5,
            scale: 0.5,
            opacity: 0,
            delay: 0.5,
            stagger: 0.2,
            ease: "elastic"
        });
        //-----------------------------------------
        //Config galeria y botones de tipo de piedra
        setconfigStoneTypes();


        var logoAnimation = anime.timeline({
            direction: 'alternate',
            loop: false
        });
        //-----------------------------------------
        //Animacion de Encabezado de pagina, usa libreria de "Anime.js", ubicada en intro.js (logoAnimation)
        logoAnimation.add([
            {
                targets: '.stripes path',
                translateX: [-1000, 0],
                opacity: {
                    value: 1,
                    duration: 100
                },
                fill: '#F9C100',
                delay: (el, i) => 2200 + (i * 75),
                duration: 400,
                easing: 'easeOutExpo',
                offset: 0
            }, {
                targets: '.katakana-red path',
                d: (el) => el.getAttribute('data-d'),
                opacity: {
                    value: [0, 1],
                    duration: 100
                },
                fill: '#FF0000',
                delay: (el, i) => 2400 + (i * 120),
                duration: 1200,
                easing: 'easeOutCirc',
                offset: 0
            },
            {
                targets: '.katakana-black path',
                d: (el) => el.getAttribute('data-d'),
                opacity: {
                    value: [0, 1],
                    duration: 100
                },
                fill: '#000000',
                delay: (el, i) => 2400 + (i * 120),
                duration: 1200,
                easing: 'easeOutCirc',
                offset: 0
            }, {
                targets: '.text-fills path',
                opacity: [0, 1],
                fill: '#000000',
                easing: 'easeOutExpo',
                duration: 200,
                delay: (t, i) => 3300 + (anime.random(0, 450)),
                offset: 0
            }, {
                targets: '.line',
                translateX: (target) => {
                    let x = 1200;
                    let translate;
                    if (target.classList.contains('hori')) translate = anime.random(0, 1) ? x : -x;
                    if (target.classList.contains('diag-right') || target.classList.contains('diag-left')) translate = x / 3;
                    return [translate, 0];
                },
                translateY: (target) => {
                    let y = 1200;
                    let translate;
                    if (target.classList.contains('vert')) translate = anime.random(0, 1) ? y : -y;
                    if (target.classList.contains('diag-right')) translate = -y / 3;
                    if (target.classList.contains('diag-left')) translate = y / 3;
                    return [translate, 0];
                },
                scale: {
                    value: [6, 1],
                    duration: 500,
                },
                stroke: '#333333',
                opacity: {
                    value: [0, 1],
                    duration: 100,
                },
                delay: (t, i) => (i * 25),
                duration: 500,
                easing: 'easeOutQuart',
                offset: 0
            }
        ]);

        logoAnimation.finished.then(function () {
            setTimeout(
                function () {
                    gsap.to("#logo-intro", {
                        duration: 1,
                        opacity: 0,
                        onComplete: function () {
                            document.getElementById('logo-intro').classList.add("d-none");
                            document.getElementById("nosotros").style.backgroundImage = "url('images/cantera_3.jpeg')";
                            document.getElementById("header").style.backgroundImage = "url('images/cantera_3.jpeg')";
                            document.getElementById("nosotros-text").classList.remove("d-none");
                            gsap.from("#nosotros-text", {
                                duration: 1,
                                opacity: 0
                            });

                            document.getElementById('logo-header').style.visibility = "visible";
                            gsap.from("#logo-header", {
                                duration: 1,
                                y: +70,
                                opacity: 0
                            });
                        }
                    });
                }
                , 4000);

        });

        //----------------------------------------------------------
        //Animacion de secciones con gsap
        function animateFrom(elem, direction) {
            direction = direction | 1;
            
            var x = 0,
                y = direction * 100;
            if(elem.classList.contains("gs_reveal_fromLeft")) {
              x = -100;
              y = 0;
            } else if(elem.classList.contains("gs_reveal_fromRight")) {
              x = 100;
              y = 0;
            }
            gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
              duration: 1.25, 
              x: 0,
              y: 0, 
              autoAlpha: 1, 
              ease: "expo", 
              overwrite: "auto"
            });
          }
          
          function hide(elem) {
            gsap.set(elem, {autoAlpha: 0});
          }
          
        
            gsap.registerPlugin(ScrollTrigger);
            
            var reveals = gsap.utils.toArray(".gs_reveal");
            gsap.set(reveals, {willChange: "transform, opacity"});
            for(var i = 0; i < reveals.length; i++) {
              (function () {
                var elem = reveals[i];
                hide(elem); // assure that the element is hidden when scrolled into view
              
                ScrollTrigger.create({
                  trigger: elem,
                  onEnter: function() { animateFrom(elem) }, 
                  once:true
                //   onEnterBack: function() { animateFrom(elem, -1) },
                //   onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
                });
              })();
            }
          





        // //config animacion de secciones  con scrolltrigger
        // let proxy = { skew: 0 },
        //     skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
        //     clamp = gsap.utils.clamp(-1, 1); // don't let the skew go beyond 20 degrees. 

        // ScrollTrigger.create({
        //     onUpdate: (self) => {
        //         let skew = clamp(self.getVelocity() / -300);
        //         // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
        //         if (Math.abs(skew) > Math.abs(proxy.skew)) {
        //             proxy.skew = skew;
        //             gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
        //         }
        //     }
        // });
        // // make the right edge "stick" to the scroll bar. force3D: true improves performance
        // gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });


    }

    function scrollFixes() {
        //FIX BOOTSTRAP STICKY BAR 
        fixNavbarIssue();
        //FIX Logo-bar activate
        function logoScrollRezise() {
            var heightHeader = document.getElementById('header').offsetHeight;
            if (window.innerWidth > 768) {
                if (window.scrollY > heightHeader) {
                    document.getElementById('logo-nav').setAttribute("class", " show mr-auto w-15");

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
                thumbnail: false,
                hash:true,
                galleryId: i
            });
            ++i;

        }
        //zoom para la imagen que contiene lso tipos de piedra
        for (var galleryStone of document.getElementsByClassName('sizes-gallery')) {
            lightGallery(galleryStone, {
                thumbnail: true,
                galleryId: i
            });
            ++i;

        }
    }

    function autoCloseMenu() {
        //Para cerrar automaticamente lista de links cuando hace click en un enlace, cuando
        //la pantall es pequeña, si no la lista permanece abierta ocupando espacio innecesario
        document.querySelectorAll("#nav-site .nav-link").forEach(function (link) {
            //configurar eventos
            link.addEventListener("click", function () {
                var isDropdownList = document.getElementById("button-colapse").classList.contains("collapsed");
                if (!link.classList.contains("dropdown-toggle")) {
                    if (!isDropdownList) {
                        document.getElementById("button-colapse").click();
                    }
                }
            });
        });
        //Sublista de enlaces de tipo de piedra
        document.querySelectorAll("#nav-site .dropdown-item").forEach(function (link) {
            //configurar eventos
            link.addEventListener("click", function () {
                var isDropdownList = document.getElementById("button-colapse").classList.contains("collapsed");
                if (!isDropdownList) {
                    document.getElementById("button-colapse").click();
                }
            });
        });

    }
    function init() {
        //SET TOOLTIP from types-stone
        $('[data-toggle="tooltip"]').tooltip();
        scrollFixes();
        setAnimations();
        stoneFullscreen();
        autoCloseMenu();
    }

    /*=============================================
    =          EJECUCION        =
    =============================================*/

    init();
    /*=====  End of Section comment block  ======*/

});




 
