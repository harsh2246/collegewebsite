$(document).ready(function () {
    $.get("/faculty/fetchallstates", function (data) {
        data.map((item) => {
            if ($('#fst').text() != item.statename) { $('#state').append($('<option>').text(item.statename).val(item.stateid)); }
        })

    })
    $.get("/faculty/fetchallsem", function (data) {
        data.map((item) => {
            $('#sem').append($('<option>').text(item.sem_name).val(item.semid));
        })
    })

    $.get("/faculty/fetchallmarks", function (data) {
        data.map((item) => {
            $('#mark').append($('<option>').text(item.markstitle).val(item.marksid));
        })
    })
    $.get("/faculty/fetchallclass", function (data) {
        data.map((item) => {
            $('#subj').append($('<option>').text(item.coursecode).val(item.classid));
        })
    })
    $('#subj').change(function () {
        $('#mytable').empty()
        
        $.get("/student/fetchallst", { cls: $('#subj').val() }, function (data) {
            var e="<input type='hidden' name='mid' value="+$('#mark').val()+">";
            e+="<input type='hidden' name='classid' value="+$('#subj').val()+">";
            e+="<input type='hidden' name='coursecode' value="+$('#subj').val()+">";
            $('#mydiv').append(e);
              var d="";
              d+="<th>Student Id</th>";
              d+="<th>Student Name</th>";
              d+="<th>Current Year</th>";
              d+="<th>Department</th>";
              d+="<th>Picture</th>";
              d+="<th>Marks</th>";
              
              
               $('#mytable').append("<tr>" + d + "</tr>")
              
            data.map((item) => {
                var c= "<input type='hidden' name='sid' value="+item.studentid+">";
                 c += "<td>" + item.studentid + "</td>";
                c += "<td>" + item.firstname +" "+ item.lastname +  "</td>";
                c += "<td>" + item.currentyear + "</td>";
                c += "<td>" + item.department + "</td>";
                c += "<td>" + "<img src=/images/"+item.image+" width='70'>" + "</td>";
                c += "<td>" + "<input type='text' class='form-control' placeholder='Enter marks' name='smarks'>" + "</td>";
                $('#mytable').append("<tr>" + c + "</tr>")
            })
        })
    })
    /* $('#sem').change(function(){
         $.get("/faculty/fetchallmarks",function(data){
             data.map((item)=>{
                 $('#mark').append($('<option>').text(item.markstitle).val(item.marksid));
             })
         })
     })*/
    //marks edit insert 

    //$('#zipcode').val($('#city').val())
    $('#state').change(function () {
        $('#city').empty()
        $.get("/faculty/fetchallcities", { stateid: $('#state').val() }, function (data) {
            data.map((item) => {
                if ($('#fct').text() != item.cityname) { $('#city').append($('<option>').text(item.cityname).val(item.zipcode)) }

            })
            /*$('#city').change(function(){
                data.map((item)=>{
                    if(item.cityname==$('city').val()) {
                        $('#zipcode').val(item.zipcode)
                    }
                })
            })*/
        })
    })
    $('#city').change(function () {
        $('#zipcode').val($('#city').val())
    })

})