$(document).ready(function(){
    
    $.get("/faculty/fetchallstates",function(data){
        data.map((item)=>{
            if( $('#fst').text()!=item.statename)
            {$('#state').append($('<option>').text(item.statename).val(item.stateid));}
        })
      
    })
    $.get("/faculty/fetchallsem",function(data){
        data.map((item)=>{
            
            $('#sem').append($('<option>').text(item.sem_name).val(item.semid));
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
    $('#mark').change(function(){
        $.get("/faculty/showallstudents")
    })
    //$('#zipcode').val($('#city').val())
    $('#state').change(function(){
        $('#city').empty()
        $.get("/faculty/fetchallcities",{stateid:$('#state').val()},function(data){
            data.map((item)=>{
                if($('#fct').text()!=item.cityname)
                {$('#city').append($('<option>').text(item.cityname).val(item.zipcode))}
               
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
    $('#city').change(function(){
        $('#zipcode').val($('#city').val())
    })
    
})