$(document).ready(function(){

  var GaCrimes = function(){

  };

  // Callback function
  var successFunction = function(response){
      var html = '';

      response.reverse().forEach(function(object){
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
        html +=     '<button type="button" class="btn btn-warning editCrime" data-id="'
        html +=       object["_id"] + '">'
        html +=       'Edit'
        html +=     '</button>'
        html +=     '<button type="button" class="btn btn-danger deleteCrime" data-id="'
        html +=       object["_id"] + '">'
        html +=       'Delete'
        html +=     '</button>'
        html +=   '</td>'
        html += '</tr>'
      });

      $('#listCrimes').html(html);
  };

  //GET ALL POSTS
  GaCrimes.prototype.list = function(){

    $.ajax({
      type: "GET",
      url: "http://ga-wdi-api.meteor.com/api/posts",
      dataType: "JSON",
      success: successFunction
    });
  };

  //CREATE A POST
  GaCrimes.prototype.report = function(crimeOffender, crimeTitle, crimeDetails){

    $.ajax({
      context: this,
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
      success: function(response){
        this.list();
      }
    });
  };

  //DELETE A POST
  GaCrimes.prototype.delete = function(crimeId){

    $.ajax({
      context: this,
      type: 'DELETE',
        url: 'http://ga-wdi-api.meteor.com/api/posts/' + crimeId,
      success: function(response){
        this.list();
      }
    });
  };

  //UPDATE A POST
  GaCrimes.prototype.update = function(crimeId, crimeOffender, crimeTitle, crimeDetails){

    var successFunction = function(response){
      console.log('Crime updated', response);
      GaCrimes.prototype.list();
    };

    $.ajax({
      type: 'PUT',
        url: 'http://ga-wdi-api.meteor.com/api/posts/' + crimeId,
      data: {
        user: crimeOffender,
        title: crimeTitle,
        text: crimeDetails,
        dateModified: new Date()
      },
      dataType: 'json',
      success: successFunction
    });
  };

  //SEARCH POST
  GaCrimes.prototype.search = function(crimeOffender){

    $.ajax({
      type: "GET",
      url: "http://ga-wdi-api.meteor.com/api/posts/search/" + crimeOffender,
      dataType: "JSON",
      success: successFunction
    });
  };

//-------------------------------

  var gaCrimes =  new GaCrimes();

  gaCrimes.list();

  $('#reportCrime').submit(function(){
    event.preventDefault();

    var crimeOffender = $('#crimeOffender').val();
    var crimeTitle = $('#crimeTitle').val();
    var crimeDetails = $('#crimeDetails').val();

    gaCrimes.report(crimeOffender, crimeTitle, crimeDetails);
    $('#reportCrime > div > input[type="text"]').val('');
  });

  $(document).on('click','.deleteCrime',function(){
    var crimeId = $(this).data('id');

    gaCrimes.delete(crimeId);
  });

  $(document).on('click','.editCrime',function(){
    var crimeRow = $(this).parent().parent();
    var crimeId = $(($(this).parent().parent().children())[0]).text();
    var crimeOffender = $(($(this).parent().parent().children())[1]).text();
    var crimeTitle = $(($(this).parent().parent().children())[2]).text();
    var crimeDetails = $(($(this).parent().parent().children())[3]).text();

    var constructHtml = function(){
      var html = '';
        html += '<tr>'
        html +=   '<td>'
        html +=     crimeId
        html +=   '</td>'
        html +=   '<td>'
        html +=     '<input type="text" class="form-control" value="' + crimeOffender + '">'
        html +=   '</td>'
        html +=   '<td>'
        html +=     '<input type="text" class="form-control" value="' + crimeTitle + '">'
        html +=   '</td>'
        html +=   '<td>'
        html +=     '<input type="text" class="form-control" value="' + crimeDetails + '">'
        html +=   '</td>'
        html +=   '<td>'
        html +=     '<button type="button" class="btn btn-primary updateCrime">'
        html +=       'Save'
        html +=     '</button>'
        html +=     '<button type="button" class="btn btn-warning editCrime">'
        html +=       'Edit'
        html +=     '</button>'
        html +=     '<button type="button" class="btn btn-danger deleteCrime">'
        html +=       'Delete'
        html +=     '</button>'
        html +=   '</td>'
        html += '</tr>'

      return html;
    };

    var editHtml = constructHtml();
    
    crimeRow.replaceWith(editHtml);

  });

  $(document).on('click','.updateCrime',function(){
    console.log('click update');
    
    var crimeId = $(this).parent().parent().children().first().text();
    var crimeOffender = $(($(this).parent().parent().children())[1]).children().val();
    var crimeTitle = $(($(this).parent().parent().children())[2]).children().val();
    var crimeDetails = $(($(this).parent().parent().children())[3]).children().val();
        
    gaCrimes.update(crimeId, crimeOffender, crimeTitle, crimeDetails);

  });

  $('#searchCrime').submit(function(){
    event.preventDefault();

    var crimeOffender = $('#searchOffender').val();

    gaCrimes.search(crimeOffender);
    $('#searchCrime > div > input[type="text"]').val('');
  });






})
