import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import MarkerClusterer from '@google/markerclusterer';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 4.1420002;
  lng = -73.6266403;
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  markers = []

  locations = [

    {lat: 4.128208, lng: -73.638240},
    {lat: 4.129567, lng: -73.640209},
    {lat: 4.134222, lng: -73.637902},
    {lat: 4.147267, lng: -73.638598},
    {lat: 4.145922, lng: -73.631567},
    {lat: 4.114920, lng: -73.649543},
    {lat: 4.089117, lng: -73.669685},
    {lat: 4.117119, lng: -73.625030},
    {lat: 4.154574, lng: -73.629466},
    {lat: 4.180581, lng: -73.611462},
    {lat: 4.159213, lng: -73.645176},
    {lat: 4.137879, lng: -73.648751},
    {lat: 4.152132, lng: -73.636287},

  ]
    

  //Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 12
  };

  //Default Marker
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: "Hello World!"
  });

  constructor(){
    this.markers = this.locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location
      });
    });
    console.log(this.markers)
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    //Adding Click event to default marker
    this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    //Adding default marker to map
    this.marker.setMap(this.map);

    //Adding other markers
    this.loadAllMarkers();

    
  }

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
     // marker.setMap(this.map);

    });
    new MarkerClusterer(this.map, this.markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'})

  }
}