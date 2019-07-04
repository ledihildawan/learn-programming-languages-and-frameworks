$('ul').on('click', 'li', function() {
  $(this).toggleClass('completed');
});

$('ul').on('click', 'span', function(e) {
  $(this).parent().fadeOut(500, function() {
    $(this).remove();
  });
  e.stopPropagation();
});

$('input[type="text"]').on('keypress', function(e) {
  if (e.which === 13) {
    var todoText = $(this).val();
    
    if (todoText) {
      $(this).val('');
      $('ul').append('<li><span><i class="fa fa-trash"></i></span> ' + todoText + '</li>')
      $(this).removeClass('error')
    } else {
      $(this).addClass('error')
    }
  }
});

$('.fa-plus').click(function() {
  $('input[type="text"]').fadeToggle();
})