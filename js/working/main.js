var Main = { 
  //Function to let us see the data store in local storage
  showData : function() {
    //Write data from local storage to the browser
    var gameList = $('#gamelist');
    gameList.empty();
    var games = Data.loadGames();
    for(var i in games) {
      var obj = games[i];
      var gameLi = $('<li>');
      gameList.append(gameLi);
      gameLi.append($('<img>').attr("src", "images/"+ obj.platforms[1] +".png"));
      gameLi.append($("<h3>").text(obj.game[1]));
      gameLi.append($("<p>").text("Score: " + obj.score[1]));
      var gameDetailsList = $('<ul>');
      gameLi.append(gameDetailsList);
      for(var n in obj) {
        if (n !== 'key') {
           gameDetailsList.append($('<li>').text(obj[n][0]+" "+obj[n][1]));
        }
      }
      Main.makeItemLinks(obj['key'], gameDetailsList); //Create our edit and delete buttons/link for each item in local storage.
    }
    try {
       gameList.listview('refresh');
    }
    catch (e) {
      // ignoring this exception if it happens
    }
    
  },
  
  //Make Item Links - create the edit and delete links for each stored item when displayed.
  makeItemLinks : function(key, list) {
    //add edit single item link
    var params = {key:key};
    var editLink = $('<a>').attr('href', '#additem').text('Edit Movie').attr('data-role', 'button').attr('data-theme', 'b').bind('tap', params, Data.editItem);
    
    var editLi = $('<p>');
    editLi.append(editLink);
    list.append(editLi);
    
    //add delete single item link
    var deleteLink = $("<a>").attr('href', '#gamelib').text('Delete Movie').attr('data-role', 'button').attr('data-theme', 'a').bind('tap', params, Data.deleteItem);

    var deleteLi = $('<p>');
    deleteLi.append(deleteLink);
    list.append(deleteLi);
  },
  
  autoFillGamesIfNecessary : function() {
  if(localStorage.length === 0) {
      alert("There are no movies in your library so the default movies have been added.");
      Data.autoFillGames();
      Main.showData();
    }
  },
  
  onDisplayDataTapped : function() {
    Main.autoFillGamesIfNecessary();
    Main.showData();
  }
};

// using document.ready() instead of bind('pageinit') so that this code is called only once.
// with bind(pageinit), this was being called every time a button was tapped  
$(document).ready(function() {

  $('#platform-error-message').hide();
  $('#title-error-message').hide();
  Form.setDefaultDate();

  //Set link and submit click events
  $("#displayData").bind('click', Main.onDisplayDataTapped);
  $("#clearData").bind('click', Data.deleteData);
  $("#saveData").bind('click', Form.validate);
  
  Main.showData();
});