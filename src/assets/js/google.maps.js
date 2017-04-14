function initAutocomplete() {

    let autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('txtAddress')), {
            types: ['geocode']
        });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        let lat = autocomplete.getPlace().geometry.location.lat();
        let lng = autocomplete.getPlace().geometry.location.lng();

        let map = new google.maps.Map(document.getElementById('mapRenderer'), {
            zoom: 15,
            draggable: true,
            center: new google.maps.LatLng(lat, lng),
            zoomControl: true,
            scrollwheel: false
        });

        let marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map
        });

        document.getElementById('mapRenderer').style.display = 'block';

    });
}    

google.maps.event.addDomListener(window, 'load', initAutocomplete);
