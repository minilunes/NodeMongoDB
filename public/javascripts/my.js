
$(document).on('pagebeforeshow ', '#home', function () {  
    var info_view = "";     
    $('#tools').empty(); 
    $.getJSON('/toollist/')  
        .done(function (data) {
            $.each(data, function (index, record) {  
                $('#tools').append('<li><a data-parm=' + record.Name + ' href="#details-page">' + record.Name + '</a></li>');
            });
            $("#tools").listview('refresh');
            $("a").on("click", function (event) {  
                var parm = $(this).attr("data-parm");
                $("#detailParmHere").html(parm);

            });

        }); 

});




$(document).on('pagebeforeshow', '#details-page', function () {

    var textString = 'fix me';
    var id = $('#detailParmHere').text();
    $.getJSON('/findtool/' + id)
        .done(function (data) {
            textString = "Name: " + data.Name +
                         "    Category: " + data.Category +
                         "    Description: " + data.Description;
            $('#showdata').html(textString);
        })
        .fail(function (jqXHR, textStatus, err) {
            textString = "could not find";
            $('#showdata').text(textString);
        });



});



$(document).on('pagebeforeshow', '#deletepage', function () {

    $('#deleteToolName').val('');
});

function deleteTool() {
    var tool = $('#deleteToolName').val();
    $.ajax({
        url: '/deleteTool/' + tool,
        type: 'DELETE',
        contentType: "application/json",
        success: function (response) {
            alert("tool successfully deleted in cloud");
        },
        error: function (response) {
            alert("tool NOT deleted in cloud");
        }
    });
}



// clears the fields
$(document).on('pagebeforeshow', '#addpage', function () {
    $('#newName').val("");
    $('#newCategory').val("");
    $('#newDescription').val("");
});

function addTool() {
    var name = $('#newName').val();
    var category = $('#newCategory').val();
    var description = $('#newDescription').val();
    var newTool = { 
        Name: name, 
        Category: category, 
        Description: description };
   
    $.ajax({
        url: '/addTool/',
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(newTool),
        success: function (response) {
            alert("Success")
        }
    }); 
}

$(document).on('pagebeforeshow', '#updatepage', function () {


    var id = $("#detailParmHere").text();
    $.getJSON("/findwork/" + id)
    .done(function(data) {
    $('#updateName').val(tool.Name);
    $('#updateCategory').val(tool.Category);
    $('#updateDescription').val(tool.Description);
    })
});


    function updateTool() {
        var id = $("#detailParmHere").text();

        var updateName = $('#updateName').val();
        var updateCategory = $('#updateCategory').val();
        var updateDescription = $('#updateDescription').val();;
        var updateTool = { 
            Name: updateName, 
            Category: updateCategory, 
            Description: updateDescription };
        $.ajax({
            url: '/updateTool/' + id,
            type: "PUT",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(updateTool),
            success: function (response) {
                alert("Success");
            }
        });
    }




