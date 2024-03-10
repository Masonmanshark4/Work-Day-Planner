var currentHour = dayjs().hour();

$(document).ready(function() {
    $('.saveBtn').on('click', function() {
        var description = $(this).siblings('.description').val().trim();
        var timeBlockID = $(this).parent().attr('id');
        localStorage.setItem(timeBlockID, description);
    });
    
    $('.time-block').each(function() {
        var blockHour = parseInt($(this).attr('id').split('-')[1]);

        if (blockHour < currentHour) {
            $(this).addClass('past').removeClass('present future');
        } else if (blockHour === currentHour) {
            $(this).addClass('present').removeClass('past future')
        }else {
            $(this).addClass('future').removeClass('past present')
        }

        var savedDescription = localStorage.getItem($(this).attr('id'));
        if (savedDescription) {
        $(this).find('.description').val(savedDescription);
        }
        // after realizing that the code below only saves it to the console
        // TILL midnight, this code above ^ should get it to display in the time slot text boxes
        // then I figured out I needed to move the savedDescription into the time-block function
        });
    });
        
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text('today is ' + currentDate);

    // this code below should hold any information enterd in 
    //within the day will stay till midnight or the next day 
    var now = dayjs();
    var midnight = now.endOf('day');
    var lastsecTilMidnight = midnight.diff(now);
    setTimeout(function() {
        localStorage.clear();
    }, lastsecTilMidnight);

    
  