;
(function($) {
    $(document).ready(function() {
      // newPage('Ontario Soccer', 'https://at.sportsengine.com/Ontario-Soccer.html', 'ontario-soccer.png');

      function newPage(name, link, path) {
          $('.grid').append('<div class="grid-item"><a class="link-block" target="_blank" href="' + link + '"><img alt="Ontario Soccer" title="Ontario Soccer" src="/images/'+ path +'"/></a><div class="details"><h4>'+ name +'</h4><div class="links"><a target="_blank" href="' + link + '">View Page</a></div></div></div>');
      }


      $(document).ready(function(){

      	$('ul.tabs li').click(function(e){
          var current_tab_id = '#' + e.target.parentElement.parentElement.id;
          var current_selected_tab = e.target.className.replace('tab-link ', '.');

      		$(current_tab_id + ' li').removeClass('current');
          $(current_tab_id + ' .tab-content').removeClass('current');

      		$(current_tab_id  + ' .tab-content' + current_selected_tab).addClass('current');
      		$(current_tab_id + ' ' + current_selected_tab).addClass('current');
      	})

      })


  });
}(jQuery));
