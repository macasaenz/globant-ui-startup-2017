class apiCalls{
	genSearch(type, q, callback){
	 $.ajax({
          url: 'https://api.spotify.com/v1/search?q=' + q + "&type=" + type,
          success: function (response) {
          	//por ej mostrar todos los artistas (o lo que sea, depende del type?) encontrados
              console.log(response);
              callback(response);
          }
      });
	}

	getArtistAlbum(idArtista, callback){
	$.ajax({
		url: "https://api.spotify.com/v1/artists/"+idArtista+"/albums";
		success: function(response){
			//mostrar el listado de albums
			console.log(response);
			callback(response);
		}
		});
	}

	getInfoAlbum(idAlbum, callback){
	$.ajax({
		url: 'https://api.spotify.com/v1/albums/' + idAlbum,
		success: function(response){
			callback(response);	
		}
	})

	//response.name
	//response.images[i]    0 la mas grande, 1 mas chica.....
	//response.tracks.items[i].name
	//response.tracks.items[i].preview_url
		//audioObject = new Audio(data.tracks.items[0].preview_url);
		//audioObject.play();
	
	}

//favoritos
//guardar id del track 

	getFavorites(favSongsIDs){
	$.ajax({
		url: 'https://api.spotify.com/v1/tracks?ids='+favSongsIDs,
		success: 
	})
	}

}




