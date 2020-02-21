let h = 0;
//find biggest image
$("#projects .card .card-img-top").each(function(elem){
  elem.height()>h?h=elem.height():h=h;
})
$("#projects .card .card-img-top").each(function(elem){
  if(elem.height()<h)
    $(this).append(`<div style="height:  ${h-elem.height()}px"`);
})