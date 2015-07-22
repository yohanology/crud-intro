$(document).ready(function(){

  var GaCrimes = function(){

  }

  GaCrimes.prototype.list = function(){

    var constructHtml = function(response){
      var html = '';

      response.forEach(function(object){
        html += '<tr>'
        html +=   '<td>'
        html +=     object["_id"]
        html +=   '</td>'
        html +=   '<td>'
        html +=     object["user"]
        html +=   '</td>'
        html +=   '<td>'
        html +=     object["title"]
        html +=   '</td>'
        html +=   '<td>'
        html +=     object["text"]
        html +=   '</td>'
        html +=   '<td>'
        html +=     '<button type="button" class="btn btn-warning">Edit</button>'
        html +=     '<button type="button" class="btn btn-danger deleteCrime">Delete</button>'
        html +=   '</td>'
        html += '</tr>'
      });

      return html;
    };

    var successFunction = function(response){
      var html = constructHtml(response);

      $('#listCrimes').html(html);
    };

    $.ajax({
      type: "GET",
      url: "http://ga-wdi-api.meteor.com/api/posts",
      dataType: "JSON",
      success: successFunction
    });

  };

  GaCrimes.prototype.report = function(crimeOffender, crimeTitle, crimeDetails){

    var successFunction = function(response){
      console.log('Crime reported', response);
      GaCrimes.prototype.list();
    };

    $.ajax({
      type: 'POST',
        url: 'http://ga-wdi-api.meteor.com/api/posts/',
      data: {
        user: crimeOffender,
        title: crimeTitle,
        text: crimeDetails,
        x: Date.parse("2011-02-10"),
        dateCreated: new Date()
      },
      dataType: 'json',
      success: successFunction
    });

  };

  GaCrimes.prototype.delete = function(crimeId){

    var successFunction = function(response){
      console.log('Crime deleted', response);
      GaCrimes.prototype.list();
    };

    $.ajax({
      type: 'DELETE',
        url: 'http://ga-wdi-api.meteor.com/api/posts/' + crimeId,
      success: successFunction
    });

  };


//--------

  var gaCrimes =  new GaCrimes();

  gaCrimes.list();

  $('#reportCrime').submit(function(){
    event.preventDefault();

    var crimeOffender = $('#crimeOffender').val();
    var crimeTitle = $('#crimeTitle').val();
    var crimeDetails = $('#crimeDetails').val();

    gaCrimes.report(crimeOffender, crimeTitle, crimeDetails);
    // gaCrimes.list();
  });

  $(document).on('click','.deleteCrime',function(){
    var crimeId = $(this).parent().parent().children().first().text();

    gaCrimes.delete(crimeId);
  });






})
