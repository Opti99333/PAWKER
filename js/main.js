

$(function() {

    "use strict";


    const options = {
        containers: ['#swupMain', '#swupPerson', '#swupBg', '#swupSkills', '#swupMenu'],
        animateHistoryBrowsing: true,
        linkSelector: 'a:not([data-no-swup])',
        plugins: [new SwupBodyClassPlugin()]
    };
    const swup = new Swup(options);

    const bodyClassPlugin = new SwupBodyClassPlugin({
        prefix: '.mil-fw-page'
    });


    gsap.registerPlugin(ScrollTrigger);


document.body.classList.add('lock-scroll'); 


var splashIntro = gsap.timeline();
splashIntro.to(".mil-preloader-content", {
  ease: "sine",
  y: 0,
  duration: 0.4,
  scale: 1,
  opacity: 1,
  delay: .2
});


function playSplashExit(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const splashExit = gsap.timeline({
    onComplete: function(){

      $('.mil-preloader-frame').addClass('is-hidden');
      $('html').removeClass('is-animating');
      document.body.classList.remove('lock-scroll');
    }
  });


  $('.mil-preloader-frame').addClass('is-exiting');


  splashExit
    .to(".mil-preloader-content", {
      ease: "sine",
      y: -200,
      duration: prefersReduced ? 0.1 : 0.4,
      scale: .6,
      opacity: 0
    }, 0)
    .to(".mil-preloader-frame", {
      ease: "sine",
      duration: prefersReduced ? 0.1 : 0.4,
      height: 0
    }, prefersReduced ? 0 : 0.4);
}


(function(){
  const btn = document.getElementById('splashEnter');
  if(!btn) return;

  btn.addEventListener('click', function(){

const fiestaMusic = document.getElementById('fiestaMusic');
if (fiestaMusic) { fiestaMusic.play().catch(()=>{}); }

sessionStorage.setItem('pp_splash_seen', '1');

    playSplashExit();
  });
})();

    gsap.to('.mil-progress', {
        height: '100%',
        ease: 'linear',
        scrollTrigger: {
            scrub: 1
        }
    });

    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene, {
        limitY: 15,
    });

    $(document).on('click', 'a[href^="#"]', function(event) {
        event.preventDefault();

        var target = $($.attr(this, 'href'));
        var offset = 90;

        $('html, body').animate({
            scrollTop: target.offset().top - offset
        }, 400);
    });

    const btt = document.querySelector(".mil-back-to-top .mil-link");

    gsap.set(btt, {
        opacity: .5,
    });

    gsap.to(btt, {
        opacity: 1,
        ease: 'sine',
        scrollTrigger: {
            trigger: "body",
            start: "top -20%",
            end: "top -20%",
            toggleActions: "play none reverse none"
        }
    });


    const appearance = document.querySelectorAll(".mil-up");

    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 50,
            ease: 'sine',
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const rotate = document.querySelectorAll(".mil-rotate");

    rotate.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,

        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });


    const progGo = document.querySelectorAll(".mil-circular-progress");

    progGo.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            "--p": '0',
            ease: 'sine',
        }, {
            "--p": value,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });


    const number = $(".mil-counter");
    number.each(function(index, element) {
        var count = $(this),
            zero = {
                val: 0
            },
            num = count.data("number"),
            split = (num + "").split("."), 
            decimals = split.length > 1 ? split[1].length : 0;

        gsap.to(zero, {
            val: num,
            duration: 2,
            scrollTrigger: {
                trigger: element,
                toggleActions: 'play none none reverse',
            },
            onUpdate: function() {
                count.text(zero.val.toFixed(decimals));
            }
        });
    });

   
    const width = document.querySelectorAll(".mil-bar");

    width.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            width: 0,
            duration: 5000,
            ease: 'sine',
        }, {
            width: value,
            scrollTrigger: {
                trigger: section,
                toggleClass: 'mil-active',
                toggleActions: 'play none none reverse',
            }
        });
    });


    $(".mil-menu-btn").on("click", function() {
        $(this).toggleClass('mil-active');
        $('.mil-navigation').toggleClass('mil-active');
    });


    var swiper = new Swiper('.mil-reviews-slider', {
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.mil-reviews-next',
            prevEl: '.mil-reviews-prev',
        },
        pagination: {
            el: '.swiper-reviews-pagination',
            clickable: true,
        },
    });

  
    var swiper = new Swiper('.mil-portfolio-carousel', {
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        mousewheel: {
            enable: true
        },
        navigation: {
            nextEl: '.mil-portfolio-next',
            prevEl: '.mil-portfolio-prev',
        },
        pagination: {
            el: '.mil-portfolio-pagination',
            type: 'fraction',
        },
        breakpoints: {
            1200: {
                spaceBetween: 90,
            },
        },
    });



    let groups = gsap.utils.toArray(".mil-accordion-group");
    let menus = gsap.utils.toArray(".mil-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".mil-accordion-menu");
        let title = element.querySelector(".mil-accordion-menu h6");
        let box = element.querySelector(".mil-accordion-content");
        let minusElement = element.querySelector(".mil-minus");
        let plusElement = element.querySelector(".mil-plus");

        gsap.set(box, {
            height: "auto",
        });

        let animation = gsap
            .timeline()
            .from(box, {
                height: 0,
                duration: 0.5,
                ease: "sine"
            })
            .from(minusElement, {
                duration: 0.2,
                autoAlpha: 0,
                color: '#BCFF00',
                ease: "none",
            }, 0)
            .to(plusElement, {
                duration: 0.2,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .from(title, {
                color: '#fff',
                duration: 0.2,
                ease: "sine",
            }, 0)
            .to(title, {
                duration: 0.2,
                color: '#BCFF00',
                ease: "sine",
            }, 0)
            .reverse();

        return function(clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
            } else {
                animation.reverse();
            }
        };
    }


    document.addEventListener("swup:contentReplaced", function() {

        $(".mil-navigation , .mil-menu-btn").removeClass('mil-active');

        window.scrollTo({
            top: 0,
        });

        ScrollTrigger.refresh();


        const btt = document.querySelector(".mil-back-to-top .mil-link");

        gsap.set(btt, {
            opacity: .5,
        });

        gsap.to(btt, {
            opacity: 1,
            ease: 'sine',
            scrollTrigger: {
                trigger: "body",
                start: "top -20%",
                end: "top -20%",
                toggleActions: "play none reverse none"
            }
        });


        const appearance = document.querySelectorAll(".mil-up");

        appearance.forEach((section) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 50,
                ease: 'sine',
            }, {
                y: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const rotate = document.querySelectorAll(".mil-rotate");

        rotate.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,

            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });


        const progGo = document.querySelectorAll(".mil-circular-progress");

        progGo.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                "--p": '0',
                ease: 'sine',
            }, {
                "--p": value,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });


        const number = $(".mil-counter");
        number.each(function(index, element) {
            var count = $(this),
                zero = {
                    val: 0
                },
                num = count.data("number"),
                split = (num + "").split("."), 
                decimals = split.length > 1 ? split[1].length : 0;

            gsap.to(zero, {
                val: num,
                duration: 2,
                scrollTrigger: {
                    trigger: element,
                    toggleActions: 'play none none reverse',
                },
                onUpdate: function() {
                    count.text(zero.val.toFixed(decimals));
                }
            });
        });


        const width = document.querySelectorAll(".mil-bar");

        width.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                width: 0,
                duration: 5000,
                ease: 'sine',
            }, {
                width: value,
                scrollTrigger: {
                    trigger: section,
                    toggleClass: 'mil-active',
                    toggleActions: 'play none none reverse',
                }
            });
        });


        var swiper = new Swiper('.mil-reviews-slider', {
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.mil-reviews-next',
                prevEl: '.mil-reviews-prev',
            },
            pagination: {
                el: '.swiper-reviews-pagination',
                clickable: true,
            },
        });


        var swiper = new Swiper('.mil-portfolio-carousel', {
            spaceBetween: 90,
            speed: 800,
            parallax: true,
            mousewheel: {
                enable: true
            },
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.mil-portfolio-pagination',
                type: 'fraction',
            },
        });


        let groups = gsap.utils.toArray(".mil-accordion-group");
        let menus = gsap.utils.toArray(".mil-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".mil-accordion-menu");
            let title = element.querySelector(".mil-accordion-menu h6");
            let box = element.querySelector(".mil-accordion-content");
            let minusElement = element.querySelector(".mil-minus");
            let plusElement = element.querySelector(".mil-plus");

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.5,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.2,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.2,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .from(title, {
                    duration: 0.2,
                    ease: "sine",
                }, 0)
                .to(title, {
                    duration: 0.2,
                    ease: "sine",
                }, 0)
                .reverse();

            return function(clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }

    });

});
(function(){
const section = document.getElementById('about');
const video = document.getElementById('spidercatVideo');
const wrap = video.parentElement;
const overlay = document.getElementById('pauseOverlay');
const hintHide = ()=> wrap.classList.add('mil-paused');


let userPaused = false;


const io = new IntersectionObserver(entries => {
entries.forEach(entry => {
if(entry.isIntersecting && entry.intersectionRatio > 0.5){
if(!userPaused){ video.play().catch(()=>{}); }
} else {
video.pause();
wrap.classList.remove('is-paused-user');
}
});
}, { threshold: [0, 0.5, 1] });
io.observe(section);


video.addEventListener('play', ()=> {
wrap.classList.remove('mil-paused');
if(!userPaused){ wrap.classList.remove('is-paused-user'); }
});


video.addEventListener('click', () => {
if(video.paused){
userPaused = false;
video.play().catch(()=>{});
wrap.classList.remove('is-paused-user');
} else {
video.pause();
userPaused = true;
wrap.classList.add('is-paused-user');
}
});


overlay.addEventListener('click', () => {
userPaused = false;
video.play().catch(()=>{});
wrap.classList.remove('is-paused-user');
});


video.addEventListener('playing', hintHide, { once: true });


section.addEventListener('keydown', (e)=>{
if(e.code === 'Space'){
e.preventDefault();
if(video.paused){ overlay.click(); } else { video.click(); }
}
});


video.addEventListener('ended', () => {
video.currentTime = 0;
userPaused = false;
video.play().catch(()=>{});
});
})();

function copyAddress() {
    const text = document.getElementById("wallet-address").innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Address copied: " + text);
    });
}

(function () {
  const btn = document.getElementById('copy-btn');
  const addrEl = document.getElementById('wallet-address');
  const toast = document.getElementById('copy-toast');

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch {
        document.body.removeChild(ta);
        return false;
      }
    }
  }

  function showToast(msg = 'Скопировано!') {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 1600);
  }

  btn.addEventListener('click', async () => {
    const text = (addrEl.textContent || '').trim();
    if (!text) return;

    const ok = await copyText(text);
    if (ok) {
      showToast('Скопировано');
      btn.classList.add('success');
      const textEl = btn.querySelector('.copy-btn__text');
      const old = textEl.textContent;
      textEl.textContent = 'Готово';
      setTimeout(() => {
        btn.classList.remove('success');
        textEl.textContent = old;
      }, 1200);
    } else {
      showToast('Не удалось скопировать');
    }
  });
})();
(function () {
  function attachFly(sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        var dx = (Math.random() * 220 - 110).toFixed(0) + 'px';
        var dy = (Math.random() * 220 - 110).toFixed(0) + 'px';
        el.style.setProperty('--dx', dx);
        el.style.setProperty('--dy', dy);
        el.classList.add('fly-away');
        el.addEventListener('animationend', function handler() {
          el.classList.remove('fly-away');
          el.style.removeProperty('--dx');
          el.style.removeProperty('--dy');
          el.style.opacity = 1;
          el.style.transform = 'translate(0,0) rotate(0)';
          el.removeEventListener('animationend', handler);
        });
      });
    });
  }

  attachFly('.icon-x.shake-fly, .icon-telegram.shake-fly, .icon-dexscreener.shake-fly');

  if (window.Swup) {
    document.addEventListener('swup:contentReplaced', function () {
      attachFly('.icon-x.shake-fly, .icon-telegram.shake-fly, .icon-dexscreener.shake-fly');
    });
  }
})();
