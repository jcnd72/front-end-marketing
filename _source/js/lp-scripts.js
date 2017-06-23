;
(function($) {


    $(document).ready(function() {
      // newPage('Ontario Soccer', 'https://at.sportsengine.com/Ontario-Soccer.html', 'ontario-soccer.png');

      function newPage(name, link, path) {
          $('.grid').append('<div class="grid-item"><a class="link-block" target="_blank" href="' + link + '"><img alt="Ontario Soccer" title="Ontario Soccer" src="/images/'+ path +'"/></a><div class="details"><h4>'+ name +'</h4><div class="links"><a target="_blank" href="' + link + '">View Page</a></div></div></div>');
      }


      	$('ul.tabs li').click(function(e){
          var current_tab_id = '#' + e.target.parentElement.parentElement.id;
          var current_selected_tab = e.target.className.replace('tab-link ', '.');

      		$(current_tab_id + ' li').removeClass('current');
          $(current_tab_id + ' .tab-content').removeClass('current');

      		$(current_tab_id  + ' .tab-content' + current_selected_tab).addClass('current');
      		$(current_tab_id + ' ' + current_selected_tab).addClass('current');
      	});

        var article = $('.article');

        Countable.once($('.article')[0], function (counter) {
          var wpm = 200,
            estimatedRaw = counter.words / wpm,
            minutes = Math.round(estimatedRaw);

          var effectiveTime = (minutes < 1) ? "a couple of secs" : minutes + " min read";

          //display it
          $('.reading-time').html(effectiveTime);
        });


        var getMax = function(){
            return $(document).height() - $(window).height();
        }

        var getValue = function(){
            return $(window).scrollTop();
        }

        if('max' in document.createElement('progress')){
            // Browser supports progress element
            var progressBar = $('progress');

            // Set the Max attr for the first time
            progressBar.attr({ max: getMax() });

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
            var progressBar = $('.progress-bar'),
                max = getMax(),
                value, width;

            var getWidth = function(){
                // Calculate width in percentage
                value = getValue();
                width = (value/max) * 100;
                width = width + '%';
                return width;
            }

            var setWidth = function(){
                progressBar.css({ width: getWidth() });
            }

            $(document).on('scroll', setWidth);
            $(window).on('resize', function(){
                // Need to reset the Max attr
                max = getMax();
                setWidth();
            });
        }

  });
}(jQuery));
