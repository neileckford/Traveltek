$(document).ready (function(){
    init();
});

function init(){
    $.ajax({
        dataType: "json",
        url: 'fakepeople.json',
        success:function(data){
            greenEyes(data);
            surnames(data);
            eifel(data);
            blueEyes(data);
            companyAge(data);
        }
    });
}

function greenEyes(data){
    var greenEyes = 0;
    $.each(data, function(key, value){
        if(value.eyeColor==="green"){
            greenEyes += 1;
        }
    });

    $("#greenEyes").html(greenEyes);
}

function surnames(data){

    var counter, i = 0;

    var countObject = [];
    var obj;
    var people;

    var list = $("#surnames");

    var distinctSurnames = distinctList(data);

    // count each occurrence of surname
    $.each(distinctSurnames, function(key, nameVal){
        counter=0;
        $.each(data, function(key, value){
            if(value.name.last === nameVal){
                counter ++;
            }
        });

        obj = {};
        obj["lastName"] = nameVal;
        obj["number"] = counter;
        countObject.push(obj);
    });

    people = sortDesc(countObject, 'number');

    var list = $("#surnames");
    list.empty();

    for(i=0;i<10;i++) {
        list.append(formatList(people[i]));
    }

    list.listview("refresh");
}

function eifel(data){
    var latitude = 48.858093;
    var longitude = 2.294694;
    var diffLat;
    var diffLng;
    var distance;

    var nearObject = [];

    var nameString = "";

    $.each(data, function(key, value){
        diffLat = latitude - value.latitude;
        diffLng = longitude - value.longitude;
        // calculate distance using Pythagorus
        distance = Math.sqrt(Math.pow(diffLat,2) + Math.pow(diffLng,2));

        obj = {};
        obj["_id"] = value._id;
        obj["distance"] = distance;
        nearObject.push(obj);
    });

    nearest = sortAsc(nearObject, 'distance');

    $.each(data, function(key, value){
       if(value._id === nearest[0]._id){
           nameString = (value.name.first + " " + value.name.last + "  - " + value.address);
       }
    });

    $("#eifelTower").html(nameString);
}

function blueEyes(data){
    var blueEyes = 0;
    var totalAge = 0;
    var averageAge = 0;

    $.each(data, function(key, value){
        if(value.eyeColor==="blue"){
            blueEyes += 1;
            totalAge += value.age;
        }
    });

    averageAge = Math.round (totalAge/blueEyes);

    $("#blueEyes").html(averageAge);
}

function companyAge(data){
    var distinctCompany = [];
    var counter=0;

    var averageObject = [];
    var obj;
    var age;

    // create distinct company array
    $.each(data, function(key, value){
        if(distinctCompany.indexOf(value.company) < 0) {
            distinctCompany.push(value.company);
        }
    });

    // count each occurrence of company
    $.each(distinctCompany, function(key, compVal){
        counter=0;
        age=0;
        $.each(data, function(key, value){
            if(value.company === compVal){
                counter ++;
                age += value.age;
            }
        });

        obj = {};
        obj["company"] = compVal;
        obj["averageAge"] = age/counter;
        averageObject.push(obj);
    });

    sortAsc(averageObject, 'averageAge');
    $("#lowestAge").html(averageObject[0].company + " - " + Math.round(averageObject[0].averageAge));

    sortDesc(averageObject, 'averageAge');
    $("#highestAge").html(averageObject[0].company + " - " + Math.round(averageObject[0].averageAge));
}