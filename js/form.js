var Form = {
	getMovie : function() {
		var movie = {};
		movie.platforms = ["Movie Platform:", $('#platforms').val() ];
		movie.movie = ["Movie Title:", $("#movie").val()];
		movie.date = ["Date movie made:", $("#date").val()];
		movie.fav = ["Favorite:", Form.getFavValue()];
		movie.score = ["How would you rate this movie? (On a scale of 1 to 10):", $("#score").val()];
		movie.comments = ["Soooo...How was it?", $("#comments").val()];
		return movie;
	},

	//Find value of a checkbox
    getFavValue : function(){
        if($('#fav').is(':checked')){
            favValue = $('#fav').val();
        } else {
           favValue = "No"
        }
        return favValue;
    },
    
    validate : function(evt){
	    //Define the elements we want to check.
	    var getPlats = $('#platforms');
	    var getTitle = $('#movie');

	    var pem = $('#platform-error-message');
	    var tem = $('#title-error-message');

	    //Reset Error Messages
	    getPlats.removeClass('error');
	    getTitle.removeClass('error');
	    pem.hide();
	    tem.hide();

	    var hasErrors = false;

	    //Platform validation
	    if(getPlats.val() === "--Choose a Platform--") {
	      var platsError = "Please choose a movie platform";
	      getPlats.addClass('error');
	      pem.show();
	      hasErrors = true;
	    }

	    //Movie Title validation
	    if(getTitle.val() === "") {
	      var titleError = "Please enter a movie title.";
	      getTitle.addClass('error');
	      tem.show();
	      hasErrors = true;
	    }
    
	    //If there were errors, display them on the screen.
	    if(hasErrors){
	      evt.preventDefault();
	      scroll(0,0);
	      return false;
	    } else {
	      //If all is okay, store data. Send the key value (which came from the editData function).
	      //Remember this key value was passed through the editSubmit event listener as a property.

	      var key;
	      if (evt.data && evt.data.key) {
		      key = evt.data.key;
	      }
	      else {
		      key = null;
	      }
	      Data.storeData(key);
	    }
	},

	reset : function() {
	    $('#platform-error-message').hide();
	    $('#title-error-message').hide();

		$('#platforms').val('--Choose a Platform--').selectmenu('refresh', true);
	    $('#movie').val('');
	    Form.setDefaultDate();
        $('#fav').attr("checked", "checked");
    
	    $('#additem').page(); //Was having problems getting the slider value fill in, this worked for some reason. Found here: http://bit.ly/PfrFIq
	    $('#score').val(5).slider('refresh');
	    $('#comments').val('');  
	},

	setDefaultDate : function() {
		//Sets default date to current day.
		var now = new Date();
	    var month = (now.getMonth() + 1);               
	    var day = now.getDate();
	    if(month < 10) 
	        month = "0" + month;
	    if(day < 10) 
	        day = "0" + day;
	    var today = now.getFullYear() + '-' + month + '-' + day;
	    $('#date').val(today);
	}
}