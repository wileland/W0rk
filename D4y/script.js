// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
$(function () {
    // Display the current date
    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

    // Dynamically generate time blocks for 9AM to 5PM
    const timeBlocksContainer = $('#timeBlocks');
    for (let hour = 9; hour <= 17; hour++) {
        const timeBlock = $('<div>').addClass('row time-block')
            .attr('id', `hour-${hour}`);
        const displayHour = hour <= 12 ? `${hour}AM` : `${hour - 12}PM`;

        timeBlock.append($('<div>').addClass('col-md-1 hour').text(displayHour),
            $('<textarea>').addClass('col-md-10 description'),
            $('<button>').addClass('saveBtn col-md-1').html('<i class="fas fa-save"></i>'));
        timeBlocksContainer.append(timeBlock);
    }

    // Apply past, present, or future class
    $('.time-block').each(function () {
        const blockHour = parseInt($(this).attr('id').split('-')[1]);
        const currentHour = dayjs().hour();

        if (blockHour < currentHour) {
            $(this).addClass('past');
        } else if (blockHour === currentHour) {
            $(this).addClass('present');
        } else {
            $(this).addClass('future');
        }
    });

    // Click event for save button
    $('.saveBtn').click(function () {
        const hourId = $(this).parent().attr('id');
        const textValue = $(this).siblings('.description').val();
        localStorage.setItem(hourId, textValue);
    });

    // Load saved data
    $('.time-block').each(function () {
        const hourId = $(this).attr('id');
        const savedText = localStorage.getItem(hourId);
        if (savedText) {
            $(this).find('.description').val(savedText);
        }
    });
});
});