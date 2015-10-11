$(document).on('storageLoaded', function(){
  console.log(plokerLocalStorage)
});

$(document).ready(function(){
  var $overlay = $('.overlay');

  $(document).on('click', '.item', function(){
    var number  = $('span.number', this).html(),
        text    = $('span.text', this).html();

        $('span.number', $overlay).html(number);
        $('span.text', $overlay).html(text);

        $overlay.show();
  });

  $(document).on('click', '.overlay', function(){
    $overlay.hide();
  });
});
