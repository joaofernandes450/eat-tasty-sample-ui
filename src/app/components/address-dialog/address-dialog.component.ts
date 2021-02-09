import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/** OpenLayers */
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
import { Fill, Icon, Stroke, Style, Text } from 'ol/style';

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
          src: 'assets/marker3.png',
          scale: 0.09
        }),
        text: new Text({
          text: this.data.street + ' ' + this.data.postalCode,
          font: 'bold 10px Times New Roman',
          offsetY: -25,
          fill: new Fill({ color: 'rgb(0,0,0)' }),
          stroke: new Stroke({ color: 'rgb(255,255,255)', width: 1 })
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
  }
}
