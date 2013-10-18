var Main = { 
  //Function to let us see the data store in local storage
  showData : function() {
    //Write data from local storage to the browser
    var movieList = $('#movielist');
    movieList.empty();
    var movies = Data.loadMovies();
    for(var i in movies) {
      var obj = movies[i];
      var movieLi = $('<li>');
      movieList.append(movieLi);
      movieLi.append($('<img>').attr("src", "images/"+ obj.styles[1] +".png"));
      movieLi.append($("<h3>").text(obj.movie[1]));
      movieLi.append($("<p>").text("This movie is rated as a: " + obj.movierating[1]));
      var movieDetailsList = $('<ul>');
      movieLi.append(movieDetailsList);
      for(var n in obj) {
        if (n !== 'key') {
           movieDetailsList.append($('<li>').text(obj[n][0]+" "+obj[n][1]));
        }
      }
      Main.makeItemLinks(obj['key'], movieDetailsList); //Create our edit and delete buttons/link for each item in local storage.
    }
    try {
       movieList.listview('refresh');
    }
    catch (e) {
      // ignoring this exception if it happens
    }
    
  },
  
  //Make Item Links - create the edit and delete links for each stored item when displayed.
  makeItemLinks : function(key, list) {
    //add edit single item link
    var params = {key:key};
    var editLink = $('<a>').setAttribute('href', '#additem').text('Edit Movie').attr('data-role', 'button').attr('data-theme', 'b').bind('tap', params, Data.editItem);
    
    var editLi = $('<p>');
    editLi.append(editLink);
    list.append(editLi);
    
    //add delete single item link
    var deleteLink = $("<a>").attr('href', '#movielib').text('Delete Movie').attr('data-role', 'button').attr('data-theme', 'a').bind('tap', params, Data.deleteItem);

    var deleteLi = $('<p>');
    deleteLi.append(deleteLink);
    list.append(deleteLi);
  },
  
  autoFillMoviesIfNecessary : function() {
  if(localStorage.length === 0) {
      alert("There are no moviesin your library so the default movies have been added.");
      Data.autoFillMovies();
      Main.showData();
    }
  },
  
  onDisplayDataTapped : function() {
    Main.autoFillMoviesIfNecessary();
    Main.showData();
  }
};

// using document.ready() instead of bind('pageinit') so that this code is called only once.
// with bind(pageinit), this was being called every time a button was tapped  
$(document).ready(function() {

  $('#styles-error-message').hide();
  $('#mname-error-message').hide();
  $('#mgenre-error-message').hide();
  $('#myear-error-message').hide();
  $('#mage-error-message').hide();
  $('#comments-error-message').hide();

  //Set link and submit click events
  $("#displayData").bind('click', Main.onDisplayDataTapped);
  $("#clearData").bind('click', Data.deleteData);
  $("#saveData").bind('click', Form.validate);
  
  Main.showData();
});