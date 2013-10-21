var Data = {
  
  //Auto populate local storage
  autoFillMovies : function(){
    for(var n in json){
      var id = Data.getNextKey();
      localStorage.setItem(id, JSON.stringify(json[n]));
    }
  },
  
  //Load local storage data
  loadMovies : function(){
    var movies = [];
	  for(var i=0, len=localStorage.length; i<len;i++) {
	      var key = localStorage.key(i);
	      var value = localStorage.getItem(key);
	      var obj = JSON.parse(value);
	      obj['key'] = parseInt(key);
	      movies.push(obj);
	  }  
	  movies.sort(Data.newsStreamSort);
	  return movies;
  },  
  
  newsStreamSort : function(a, b) {
	  var aKey = parseInt(a['key']);
	  var bKey = parseInt(b['key']);
	  if (aKey < bKey) {
		  return 1;
	  }  
	  else if (aKey > bKey) {
		  return -1;
	  }
	  else {
		  return 0;
	  }
  },

  getNextKey : function(){
  return localStorage.length;
  },
  
  storeData : function(key){
    var dataId = key;
    if (!dataId) {
      dataId = Data.getNextKey();
    }
    var movie = Form.getMovie();
    localStorage.setItem(dataId, JSON.stringify(movie));
    alert("Movie Saved!");
    Main.showData();
    Form.reset();
    
    //Change edit button value to submit button.
    var saveDataButton = $('#saveData');
    saveDataButton.text("Add A Movie");
    saveDataButton.unbind();
    saveDataButton.bind('click', Form.validate);
    Main.showData();

  },
  
  editItem : function(evt){
  
    //Grab the data from our item from Local Storage.
    var value = localStorage.getItem(evt.data.key);
    var item = JSON.parse(value);
    
    //Populate the form fields with the current localStorage values.
    $('#platforms').val(item.platforms[1]);
    $('#movie').val(item.movie[1]);
    $('#date').val(item.date[1]);
    
    if(item.fav[1] == "Yes"){
      $('#fav').attr("checked", "checked");
    }
    
    $('#additem').page(); //Was having problems getting the slider value fill in, this worked for some reason. Found here: http://bit.ly/PfrFIq
    $('#score').val(parseInt(item.score[1])).slider('refresh');
    $('#comments').val(item.comments[1]);  
    
    //Change submit button value to edit button.
    var saveDataButton = $('#saveData');
    saveDataButton.text("Save Changes");
    saveDataButton.unbind();
    saveDataButton.bind('click', {key:evt.data.key}, Form.validate);
    Main.showData();

  },
  
  deleteItem : function(evt){
    var ask = confirm("Are you sure you want to delete this movie?");
    if(ask){
      localStorage.removeItem(evt.data.key);
      alert("The movie was deleted.");
      Main.showData();
    } else {
      alert("The movie was not deleted.");
    }
  },
 
  //Function to let us erase all data in local storage
  deleteData : function(){
    if(localStorage.length === 0){
      alert("There are no movies to clear.")
    } else {
    var ask = confirm("Are you sure you want to clear the entire library?");
    if(ask){
       localStorage.clear();
       alert("All movies have been deleted.");
       $('#movielist').empty();
    } else {
       alert("The Movie library was not cleared.")
    }
  }
  }
  
};