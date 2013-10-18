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
      obj['key'] = key;
      movies.push(obj);
	}  
	return movies;
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
    saveDataButton.bind('tap', Form.validate);
  },
  
  editItem : function(evt){
  
    //Grab the data from our item from Local Storage.
    var value = localStorage.getItem(evt.data.key);
    var item = JSON.parse(value);
    
    //Populate the form fields with the current localStorage values.
    $('styles').value = item.entermovie[1];
    $('mname').value = item.mname[1];
    $('mgenre').value = item.mgenre[1];
    $('myear').value = item.myear[1];
    $('mage').value = item.mage[1];
    if (item.favorite[1] == "Yes") {
        $('favorite').setAttribute("checked", "checked");
    }
    $('quality').value = item.quality[1];
        var radios = document.forms[0].quality;
            for (var i = 0, j = radios.length; i < j; i++) {
                if (radios[i].value == "Excellent" && item.quality[1] == "Excellent") {
                    radios[i].setAttribute("checked", "checked");
                } else if (radios[i].value == "Good" && item.quality[1] == "Good") {
                           radios[i].setAttribute("checked", "checked");
                } else if (radios[i].value == "Damaged" && item.quality[1] == "Damaged") {
                           radios[i].setAttribute("checked", "checked");
                }
            }
   $('comments').value = item.comments[1];
    
    //Change submit button value to edit button.
    var saveDataButton = $('#saveData');
    saveDataButton.text("Save Changes");
    saveDataButton.unbind();
    saveDataButton.bind('tap', {key:evt.data.key}, Form.validate);
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
      alert("There is no data to clear.")
    } else {
		var ask = confirm("Are you sure you want to clear the entire library?");
		if(ask){
		   localStorage.clear();
		   alert("All data has been deleted.");
		   $('#movielist').empty();
		} else {
		   alert("Movie Library was not cleared.")
		}
	}
  } 
};