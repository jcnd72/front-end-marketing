;
(function($) {


    $(document).ready(function() {

      // Tabs
      //--------------------------------------------------
      	$('ul.tabs li').click(function(e){
          var current_tab_id = '#' + e.target.parentElement.parentElement.id;
          var current_selected_tab = e.target.className.replace('tab-link ', '.');

      		$(current_tab_id + ' li').removeClass('current');
          $(current_tab_id + ' .tab-content').removeClass('current');

      		$(current_tab_id  + ' .tab-content' + current_selected_tab).addClass('current');
      		$(current_tab_id + ' ' + current_selected_tab).addClass('current');
      	});


        // Get Article Reading Time
        //--------------------------------------------------
        var article = $('.article');

        Countable.once($('.article')[0], function (counter) {
          var wpm = 200,
            estimatedRaw = counter.words / wpm,
            minutes = Math.round(estimatedRaw);

          var effectiveTime = (minutes < 1) ? "a couple of secs" : minutes + " min read";

          //display it
          $('.reading-time').html(effectiveTime);
        });


        // Clone popup
        // -------------------------------------------------
        $('.template a').on('click', function (e) {
          e.preventDefault();
          $('.popup').addClass('inactive').removeClass('active').css({
            'display': 'none',
            'top': 'auto',
            'left': 'auto'
          });
          var clickedElementTop = e.currentTarget.offsetTop;
          var clickedElementHeight = e.currentTarget.parentElement.offsetHeight;
          var clickedElementLeft = e.currentTarget.offsetLeft;
          var clickedElementWidth = e.currentTarget.parentElement.offsetWidth;
          var popupWidth = $('.popup').width();
          var difference = popupWidth - clickedElementWidth;

          var popupTop = clickedElementTop + clickedElementHeight + 10;
          var popupLeft = clickedElementLeft - difference / 2;
          $('.popup').addClass('active').removeClass('inactive').css({
            'display': 'block',
            'top': popupTop,
            'left': popupLeft
          });
        });




        // Progress Bar
        //--------------------------------------------------
        var getMax = function(){
            return $(document).height() - $(window).height();
        };

        var getValue = function(){
            return $(window).scrollTop();
        };

        if('max' in document.createElement('progress')){
            // Browser supports progress element
            var progressBar = $('progress');

            // Set the Max attr for the first time
            progressBar.attr({ max: getMax() });
            console.log(getMax());
            console.log(getValue());

            $(document).on('scroll', function(){
                // On scroll only Value attr needs to be calculated
                progressBar.attr({ value: getValue() });
            });

            $(window).resize(function(){
                // On resize, both Max/Value attr needs to be calculated
                progressBar.attr({ max: getMax(), value: getValue() });
            });
        }
        else {
          /// This is for older browsers
            var progressBar = $('.progress-bar'),
                max = getMax(),
                value, width;

            var getWidth = function(){
                // Calculate width in percentage
                value = getValue();
                width = (value/max) * 100;
                width = width + '%';
                return width;
            };

            var setWidth = function(){
                progressBar.css({ width: getWidth() });
            };

            $(document).on('scroll', setWidth);
            $(window).on('resize', function(){
                // Need to reset the Max attr
                max = getMax();
                setWidth();
            });
        }

  });
}(jQuery));
