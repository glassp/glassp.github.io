var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "master.sched", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                var allText = rawFile.responseText;
                render(allText);
            }
        }
    }
    rawFile.send(null);

function render(filecontents){

events = findAndSplit("<<<EVENT", "EVENT;",filecontents);
console.log(events.length);
for(var i in events){
  var lines = events[i].split(/\n/)
  var obj = {
      "name": "STRING",
      "unixstamp": {
        "from": "unix",
        "to": "unix",
      },
      "from": {
        "place": "STRING",
        "date": "dd.mm.yyyy",
        "time": "hh:mm"
      },
      "to": {
        "place": "STRING",
        "date": "dd.mm.yyyy",
        "time": "hh:mm"
      }
    };
  for(var j in lines){
    var keyValuePair = lines[j].split(":");
    if(keyValuePair.length===0)continue;
    switch(keyValuePair[0]){
      case "name": obj.name=keyValuePair[1];break;
      case "fromDate": obj.from.date=keyValuePair[1];break;
      case "fromTime": obj.from.time=keyValuePair[1];break;
      case "fromPlace": obj.from.place=keyValuePair[1];break;
      case "toDate": obj.to.date=keyValuePair[1];break;
      case "toTime": obj.to.time=keyValuePair[1];break;
      case "toPlace": obj.to.place=keyValuePair[1];break;
    }
  }
  //TODO calculate unix timestamps of date.
  //set $obj.unix.from to $obj.from.date - 2 weeks
  console.log(obj);
  $("#list").append(`
   <div class="text-center">
          <h4>${obj.name}</h4>
          <div class="row pt-4">
            <div class="col">
              <p class="mb-0">
                ${obj.from.date}
              </p>
              <p class="mb-0">
                <i class="fa fa-angle-double-down"></i>
              </p>
              <p class="mb-0">
                ${obj.to.date}
              </p>
            </div>
            <div class="col">
              <p class="mb-0">
                ${obj.from.time}
              </p>
              <p class="mb-0">
                <i class="fa fa-angle-double-down"></i>
              </p>
              <p class="mb-0">
                ${obj.to.time}
              </p>
            </div>
            <div class="col">
              <p class="mb-0">
                ${obj.from.place}
              </p>
              <p class="mb-0">
                <i class="fa fa-angle-double-down"></i>
              </p>
              <p class="mb-0">
                ${obj.to.place}
              </p>
            </div>
        </div>
      </div>`);
}


}



function findAndSplit(start,end,str){
  var offset = 0;
  var array = [];
  
  while(true){
    var iStart = str.indexOf(start,offset);
    var iEnd = str.indexOf(end,offset)
    //if start or end is not found return
    if(iStart===-1||iEnd===-1)break;
    
    //index of last char of end
    offset = iEnd+end.length-1;
    array.push(str.substring(iStart,offset));
  }
  return array;
}

