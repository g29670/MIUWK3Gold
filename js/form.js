var Form = {
	getMovie : function() {
		var movie = {};
		movie.styles = ["Movie Style:", $('#styles').value() ];
		movie.mname = ["Movie Name: ", $('#mname').value() ];
        movie.mgenre = ["Movie Genre:", $('#mgenre').value() ];
        movie.myear = ["Year movie made: ", $('#myear').value() ];
        movie.mage = ["Suitable viewing age:", $('#mage').value() ];
        movie.favorite = ["Favorite: ", Form.favoriteValue() ];
        movie.movierating = ["This movie is rated as a: ", $('#movierating').value() ];
        movie.quality = ["The movie quality is : ",  Form.qualityValue() ];
        movie.comments = ["This is what I think about this movie: ", $('#comments').value() ];
		return movie;
	},

	//Find value of a checkbox
    getFavoriteValue : function(){
        if($('#favorite').is(':checked')){
            favoriteValue = $('#favorite').value();
        } else {
           favoriteValue = "No"
        }
        return favoriteValue;
    },

    //Find value of radio //
    getQualityValue : function(){
    	for (var i = 0, j = radios.length; i < j; i++) {
    	    if ($(radios[i].value == "#Excellent" && item.quality[1] == "#Excellent")) {
                radios[i].setAttribute("checked", "checked");
            } else if ($(radios[i].value == "#Good" && item.quality[1] == "#Good")) {
                radios[i].setAttribute("checked", "checked");
            } else if ($(radios[i].value == "#Damaged" && item.quality[1] == "#Damaged")) {
                radios[i].setAttribute("checked", "checked"); 
            }       
        }
        return qualityValue;     
    };
    
    validate : function(evt){
	    //Define the elements we want to check.
	    var getStyle = $('styles');
        var getMname = $('mname');
        var getMgenre = $('mgenre');
        var getMyear = $('myear');
        var getMage = $('mage');
        var getComments = $('comments');
        var errMsg = $('#errors');

	    //Reset Error Messages
	    errMsg.empty();
	    getStyle.removeClass('error');
	    getMname.removeClass('error');
	    getMyear.removeClass('error');
	    getMage.removeClass('error');
	    getComments.removeClass('error');


	    //Get Error Messages
	    var messageArray = [];

	    //Style validation
	    if (getStyle.value() === "*Choose A Style*") {
	      var styleError = "Please choose a style.";
            getStyle.style.border = "1px solid red";
            messageAry.push(styleError);
	    }

	    // Movie name validation //
        if (getMname.value() === "") {
            var mNameError = "Please enter a movie name.";
            getMname.style.border = "1px solid red";
            messageAry.push(mNameError);
        }
        // Movie genre validation //
        if (getMgenre.value() === "") {
            var mGenreError = "Please enter a movie genre.";
            getMgenre.style.border = "1px solid red";
            messageAry.push(mGenreError);
        }
        // Year movie made validation //
        if (getMyear.value() === "") {
            var mYearError = "Please enter date movie was made.";
            getMyear.style.border = "1px solid red";
            messageAry.push(mYearError);
        }
        // Suitable viewing age validation //
        if (getMage.value() === "") {
            var mAgeError = "Please enter a suitable viewing age.";
            getMage.style.border = "1px solid red";
            messageAry.push(mAgeError);
        }
        //Comments validation //
        if (getComments.value() === "") {
            var commentsError = "Tell me about the movie.";
            getComments.style.border = "1px solid red";
            messageAry.push(commentsError);
	    }
    
	    //Display error messages//
	    if(messageArray.length >= 1){
	      for (var i=0, j = messageArray.length; i <j; i++) {
	        var txt = $('<li>').text(messageArray[i]);
	        errMsg.append(txt);
	      }
	      // If errors found, stop the form from submitting and alert the user //
	      evt.preventDefault();
	      scroll(0,0);
	      return false;
	    } else {
	      //If all is okay, store data.. Send key value (which came from the editData function).
	      //Remember this key value was passed through the editSubmit event listener as a property.

	      var key;
	      if (evt.data && evt.data.key) {
		      key = evt.data.key;
	      }
	      else {
		      key = null;
	      }
	      Data.saveData(key);
	    }
	},

	reset : function() {

		$('#styles').value('--Choose a Movie Style--').selectmenu('refresh', true);
	    $('#mname').value();
	    $('mgenre').value();
	    $('myear').value();
	    $('mage').value();
	    Form.favorite.value();
        $('#favorite').attr("checked", "checked");
        $('movierating').value().slider('refresh');
        Form.qualityValue();
        $('quality').attr("checked", "checked");
	    $('#comments').value(); 
	    $('#additem').page();   
	},
}