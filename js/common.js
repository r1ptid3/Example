"use strict";

document.addEventListener('click', function (event) {
	copyRefferal(event);
	anchors(event);
	mobileMenu(event);
}, false);

window.onload = function() {
	initProgressBar();
	intoViewAnimation();
	additionaCounters();
}

/**
 * Init progress bar & counter up scripts
 *
 * @since    1.0.0
 */
function initProgressBar() {
	let allRanges = document.querySelectorAll('.progress');
	let offset = window.innerWidth < 768 ? '90%' : '80%';

	allRanges.forEach( function(el, i) {

		// Progress bar script
		let finish = el.parentNode.getAttribute('data-finish');
		let duration = null !== el.parentNode.getAttribute('data-duration') ? el.parentNode.getAttribute('data-duration') : 1000;

		// CounterUp script
		let number;
		let numberNode;
		let numberElements = Array.from(el.parentNode.previousElementSibling.children);

		numberElements.forEach(function (el, i) {
			if ( el.classList.contains('number') ) {
				numberNode = el;
				number = Number(el.getAttribute('data-number')).toFixed(2);
			}
		});

		// Run scripts if block into view
		let waypoint = new Waypoint({
			element: el,
			handler: function() {
				animate( el, 'left', '%', 0, finish, duration );
				counterAnimation( numberNode, 0, number, 1100, 2 );
				this.destroy();
			},
			offset: offset
		});

	});
}

/**
 * Custom counterUp script
 *
 * @since    1.0.0
 */
function counterAnimation( counterNum, start, end, duration, toFixed ) {
    let startTimestamp = null;

    function step( timestamp ) {
        if ( !startTimestamp ){
            startTimestamp = timestamp;
        }
        let progress = Math.min( ( timestamp - startTimestamp ) / duration, 1 );
        counterNum.innerText = ( progress * ( end - start ) + start ).toFixed(toFixed);

        if( progress < 1 ){
            window.requestAnimationFrame( step );
        }
    }
    window.requestAnimationFrame( step );
}

/**
 * Custom progress bar animation script
 *
 * @since    1.0.0
 */
function animate( elem, style, unit, from, to, time) {
    if ( !elem ) return;

    let start = new Date().getTime();
    let timer = setInterval(function() {
		let step = Math.min( 1, ( new Date().getTime() - start ) / time );
		let state = from + step * ( to - from );

        elem.style[style] = ( state ) + unit;

        if ( state > 10 && state < 30 ) {
        	elem.classList.add('color-1');
        } else if ( state > 30 && state < 60 ) {
        	elem.classList.add('color-2');
        } else if ( state > 60 ) {
        	elem.classList.add('color-3');
        }

        if ( step == 1 ) clearInterval( timer );

    }, 25 );

    elem.style[style] = from + unit;
}

/**
 * Copy refferal link script
 *
 * @since    1.0.0
 */
function copyRefferal( event ) {
	if ( 'copy_refferal' === event.target.getAttribute('id') ) {
		let text = event.target.previousElementSibling.value;
		let success = document.getElementById('success-copy');

		event.target.previousElementSibling.select();
        try {
            return document.execCommand( "copy" );
        }
        catch (ex) {
            console.warn( "Copy to clipboard failed.", ex );
            return prompt( "Copy to clipboard: Ctrl+C, Enter", text );
        }
        finally {
            success.classList.add('active');
            event.target.classList.add('disabled');
        	window.getSelection().removeAllRanges();

            setTimeout(function() {
            	success.classList.remove('active');
            	event.target.classList.remove('disabled');
            }, 2500);
        }
	}
}

/**
 * Anchor links script
 *
 * @since    1.0.0
 */
function anchors( event ) {
	if ( 
		null !== event.target.getAttribute('href') &&
		'#' === event.target.getAttribute('href').charAt(0) 
	) {
		event.preventDefault();

        let id = event.target.getAttribute('href').substring(1);
        let target = document.getElementById(id);
        let offsetPosition = window.innerWidth < 768 ? target.offsetTop - 50 : target.offsetTop + 100;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
	}
}

/**
 * FadeIn animation script
 *
 * @since    1.0.0
 */
function intoViewAnimation() {
	let animations = document.querySelectorAll('.r1-animation');

	animations.forEach( function(el, i) {

		let waypoint = new Waypoint({
			element: el,
			handler: function() {
				el.classList.add('animated');
				this.destroy();
			},
			offset: '75%'
		});

	});
}

/**
 * Animate all counters except those which in active staking section
 *
 * @since    1.0.0
 */
function additionaCounters() {
	let counters = document.querySelectorAll('.animated-counter');
	let offset = window.innerWidth < 768 ? '90%' : '80%';

	counters.forEach( function(el, i) {
		let number;
		let toFixed = null !== el.getAttribute('data-to-fixed') ? Number(el.getAttribute('data-to-fixed')) : 4;

		number = Number(el.getAttribute('data-number')).toFixed(toFixed);

		// Run scripts if block into view
		let waypoint = new Waypoint({
			element: el,
			handler: function() {
				counterAnimation(el, 0, number, 800, toFixed);
				this.destroy();
			},
			offset: offset
		});
	});
}

/**
 * Trigger mobile menu 
 *
 * @since    1.0.0
 */
function mobileMenu() {

	if ( 
		window.innerWidth < 768 &&
		'mobile-menu-trigger' === event.target.getAttribute('id')
	) {

		let header = document.getElementById('header');

		event.target.classList.toggle('active');
		header.classList.toggle('active');
		document.body.classList.toggle('disable-scroll');

	}

}