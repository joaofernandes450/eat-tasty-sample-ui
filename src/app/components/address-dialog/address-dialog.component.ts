import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
import { Icon, Style } from 'ol/style';
import TileJSON from 'ol/source/TileJSON';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.css']
})
export class AddressDialogComponent implements AfterViewInit {

  map: Map;

  constructor(public dialogRef: MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngAfterViewInit(): void {
    const convertedWebMercator = fromLonLat([this.data.longitude, this.data.latitude]);

    const address = new Feature({
      geometry: new Point(convertedWebMercator),
      name: 'teste',
    })
    address.setStyle(
      new Style({
        image: new Icon({
          crossOrigin: 'anonymous',
          // For Internet Explorer 11
          src: 'assets/marker3.png',
          scale: 0.09
        })
      })
    )
    var vectorSource = new VectorSource({
      features: [address],
    });
    var vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    var rasterLayer = new TileLayer({
      source: new OSM(),
    });

    this.map = new Map({
      layers: [rasterLayer, vectorLayer],
      target: 'map',
      view: new View({
        center: convertedWebMercator,
        zoom: 15
      }),
    });

    // const markerSource = new VectorSource();
    // const markerStyle = new Style({
    //   image: new Icon({
    //     anchor: [0.5, 46],

    //     src: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    //   }),
    // });

    // this.map = new Map({
    //   view: new View({
    //     center: convertedWebMercator,
    //     zoom: 15
    //   }),
    //   layers: [
    //     new TileLayer({
    //       source: new OSM()
    //     }),
    //     new VectorLayer({
    //       source: markerSource,
    //     })
    //   ],
    //   target: 'map'
    // });


    // const address = new Feature({
    //   geometry: new Point(convertedWebMercator),
    //   name: 'teste',
    // })
    // address.setStyle(
    //   new Style({
    //     image: new Icon({
    //       color: '#BADA55',
    //       crossOrigin: 'anonymous',
    //       // For Internet Explorer 11
    //       imgSize: [20, 20],
    //       src: 'assets/1.jpg',
    //     })
    //   })
    // )

    // markerSource.addFeature(iconFeature);

  }
}
