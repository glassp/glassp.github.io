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
      "vehicle": "-",
      "unix": {
        "from": "unix",
        "to": "unix",
      },
      "from": {
        "place": "",
        "date": "01.01.2000",
        "time": "00:00"
      },
      "to": {
        "place": "",
        "date": "31.12.2999",
        "time": "23:59"
      }
    };
  for(var j in lines){
    var keyValuePair = lines[j].split(":");
    if(keyValuePair.length===0)continue;
    switch(keyValuePair[0]){
      case "name": obj.name=keyValuePair[1];break;
      case "fromDate": obj.from.date=keyValuePair[1];break;
      case "fromTime": obj.from.time=keyValuePair[2]===null?keyValuePair[1]+":00":keyValuePair[1]+":"+keyValuePair[2];break;
      case "fromPlace": obj.from.place=keyValuePair[1];break;
      case "toDate": obj.to.date=keyValuePair[1];break;
      case "toTime": obj.to.time=keyValuePair[2]===null?keyValuePair[1]+":00":keyValuePair[1]+":"+keyValuePair[2];break;
      case "toPlace": obj.to.place=keyValuePair[1];break;
      case "vehicle": obj.vehicle=keyValuePair[1];break;
    }
  }
  //seconds of 14 days
  var dateOffset = 14*24*60*60;
  obj.unix.from = convertToUnix(obj.from.date, obj.from.time)-dateOffset;
  obj.unix.to = convertToUnix(obj.to.date,obj.to.time);
  //set $obj.unix.from to $obj.from.date - 2 weeks
  console.log(obj);
  $("#list").append(`
   <div class="text-center">
          <div class="row pt-4">
            <div class="col">
              <p class="mb-0">
                <span class="invisible">invisible</span>
              </p>
              <p class="mb-0">
                <h5>${obj.name}</h5>
              </p>
              <p class="mb-0">
                Transfer with: ${obj.vehicle}
              </p>
            </div>
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
function convertToUnix(dateStr,timeStr){
  var dateArr = dateStr.split(".");
  var timeArr = timeStr.split(":");
  var now = new Date();
  
  var year = dateArr[0]===null?now.getFullYear():dateArr[0];
  var month = dateArr[1]===null?now.getMonth():dateArr[1]-1;
  var day = dateArr[2]===null?now.getDate():dateArr[2];
  var hour = timeArr[0]===null?now.getHours():timeArr[0];
  var minute = timeArr[1]===null?now.getMinutes():timeArr[1];
  
  
  var date = new Date(Date.UTC(year,month,day,hour,minute));
  return date.getTime()/1000;
}

