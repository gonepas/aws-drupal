(function(){
  // Vertical Timeline - by CodyHouse.co
	function VerticalTimeline( element ) {
		this.element = element;
		this.blocks = this.element.getElementsByClassName("cd-timeline__block");
		this.images = this.element.getElementsByClassName("cd-timeline__img");
		this.contents = this.element.getElementsByClassName("cd-timeline__content");
		this.offset = 0.8;
		this.hideBlocks();
	};

	VerticalTimeline.prototype.hideBlocks = function() {
		if ( !"classList" in document.documentElement ) {
			return; // no animation on older browsers
		}
		//hide timeline blocks which are outside the viewport
		var self = this;
		for( var i = 0; i < this.blocks.length; i++) {
			(function(i){
				if( self.blocks[i].getBoundingClientRect().top > window.innerHeight*self.offset ) {
					self.images[i].classList.add("cd-timeline__img--hidden");
					self.contents[i].classList.add("cd-timeline__content--hidden");
				}
			})(i);
		}
	};

	VerticalTimeline.prototype.showBlocks = function() {
		if ( ! "classList" in document.documentElement ) {
			return;
		}
		var self = this;
		for( var i = 0; i < this.blocks.length; i++) {
			(function(i){
				if( self.contents[i].classList.contains("cd-timeline__content--hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight*self.offset ) {
					// add bounce-in animation
					self.images[i].classList.add("cd-timeline__img--bounce-in");
					self.contents[i].classList.add("cd-timeline__content--bounce-in");
					self.images[i].classList.remove("cd-timeline__img--hidden");
					self.contents[i].classList.remove("cd-timeline__content--hidden");
				}
			})(i);
		}
	};

	var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
		verticalTimelinesArray = [],
		scrolling = false;
	if( verticalTimelines.length > 0 ) {
		for( var i = 0; i < verticalTimelines.length; i++) {
			(function(i){
				verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
			})(i);
		}

		//show timeline blocks on scrolling
		window.addEventListener("scroll", function(event) {
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
			}
		});
	}

	function checkTimelineScroll() {
		verticalTimelinesArray.forEach(function(timeline){
			timeline.showBlocks();
		});
		scrolling = false;
	};
})();

jQuery(document).ready(function($){
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);


	//on scolling, show/animate timeline blocks when enter the viewport
	$('section.cd-timeline').on('scroll', function() {
		console.log('section scroll');
		if(  !window.requestAnimationFrame  ) {
			console.log("1")
			setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
		} else {
			console.log("2")
			window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
		}
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function() {
			if (    $(this).offset().top > $(window).scrollTop() + $(window).height() *offset ) {
				$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
			}
		});
	}




	function showBlocks(blocks, offset) {
		console.log('blocks', blocks);
		blocks.each(function(){
			if( $(this).offset().top < $(window).scrollTop() + $(window).height() * offset ) {
				if(  $(this).find('.cd-timeline-img').hasClass('is-hidden')   ) {
					$(this).find('  .cd-timeline-img, .cd-timeline-content  ').removeClass('is-hidden').addClass('bounce-in');
				}
			}
		});
	}



});