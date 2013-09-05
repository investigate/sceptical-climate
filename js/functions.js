// Remap jQuery to $
(function($){

    $(document).ready(function() {

        // Smooth scrolling
        $('.scroll').click(function(event){
            // event.preventDefault();
            $('html, body').animate({scrollTop:$(this.hash).offset().top}, 300);
        });

        // Create select menu to switch between table views
        var selectMenuHTML = '<div><label class="toggle-label">Show:</label><select class="table-toggle"><option selected="" value="totals-col">Total sample</option><option value="2012-col">2012 sample</option><option value="2011-col">2011 sample</option></select></div>';

        // Prepend to figure
        $('.switchable table').before(selectMenuHTML);

        $('.switchable table').addClass('filtered');

        // Add corresponding IDs and onchange functions to generated select objects
        var i = 0

        $('.switchable select').each(function() {

            i++

            $(this).attr('id', i);

            $(this).attr("onchange", "switchTableView('"+i+"')");

        });

        // Hide 2011 and 2012 views by adding .hide-from-view
        $('.switchable td.2012-col, .switchable th.2012-col, .switchable td.2011-col, .switchable th.2011-col, .switchable colgroup.2011-col, .switchable colgroup.2012-col').addClass('hide-from-view');

    });

    // $(window).load(function() {

    //     // Hide img object on larger screens
    //     enquire.register("screen and (min-width: 64em)", {
    //         match : function() {
    //             resizeDiv();
    //             $('.photo').css({'background-position': 'center center'});
    //             $('.photo img').addClass('visuallyhidden');
    //         },
    //         unmatch : function() {
    //             $('.photo').css({'height': 'auto'});
    //             $('.photo img').removeClass('visuallyhidden');
    //         }
    //     });

    // });

    // $(window).resize(function() {

    //     // Hide img object on larger screens
    //     enquire.register("screen and (min-width: 64em)", {
    //         match : function() {
    //             resizeDiv();
    //             $('.photo').css({'background-position': 'center center'});
    //             $('.photo img').addClass('visuallyhidden');
    //         },
    //         unmatch : function() {
    //             $('.photo').css({'height': 'auto'});
    //             $('.photo img').removeClass('visuallyhidden');
    //         }
    //     });

    // });

})(window.jQuery);

var tableView = [];

function switchTableView(tableID){

    if (typeof tableView[tableID] == 'undefined') {
        tableView[tableID] = 'totals-col';
    }

    var figureID = $('#'+tableID).closest('figure').attr('id');

    $('#'+figureID+' td.'+tableView[tableID]+', #'+figureID+' th.'+tableView[tableID]+', #'+figureID+' colgroup.'+tableView[tableID]).addClass('hide-from-view');

    tableView[tableID] = $('#'+figureID+' select').val();

    $('#'+figureID+' td.'+tableView[tableID]+', #'+figureID+' th.'+tableView[tableID]+', #'+figureID+' colgroup.'+tableView[tableID]).removeClass('hide-from-view');

}

// Add custom tablesorter parser
$.tablesorter.addParser({
    id: 'removeThe',
    is: function(s) {
        return false;
    },
    format: function(s) {
        var name = s
        s = name.replace('The ','');
        return s;
    },
    type: 'text'
});
// Call tablesorter function
$(function() {
    $(".part-1 .sortable").tablesorter({
        cancelSelection: false,
        sortList: [[0,0]],
        headers: {
            0: {
                sorter:'removeThe'
            }
        }
    });
    $(".part-2 .sortable").tablesorter({
        cancelSelection: false,
        headers: {
            0: {
                sorter:'removeThe'
            }
        }
    });
});
