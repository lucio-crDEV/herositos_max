import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


interface MarcadorColor { 
  color: string;
  marker: mapboxgl.Marker;
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    li{
      cursor: pointer;
      user-select:none;
    }

    .mapa-container{
      height:100%;
      width:100%;
    }
    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
    }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  
  @ViewChild('marcadores') divMarcadores!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 16;
  centro: [number, number] = [-71.59644627307146, -33.03741510991351]
  
  // Arreglo de marcadores
  markers: MarcadorColor[] = [];


  constructor(){}
  
  ngAfterViewInit(): void {

    // instancia mapa
    this.mapa = new mapboxgl.Map({
      container: this.divMarcadores.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centro,
      zoom: this.zoomLevel
    })

    // marcador
    // const marker = new mapboxgl.Marker()
      // .setLngLat( this.centro )
      // .addTo( this.mapa )

      // como personalizar
      // const markerHtml: HTMLElement = document.createElement('div');
      // // ejemplo
      // markerHtml.innerHTML = 'Mi Marcador'
      
    //   new mapboxgl.Marker({
    //     element: markerHtml
    //   })
    //     .setLngLat( this.centro )
    //     .addTo( this.mapa )
  }
  
  nuevoMarcador(){
    // color aleatorio en hex
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({ 
      draggable: true,
      color
    })
    .setLngLat( this.centro )
    .addTo( this.mapa )

    this.markers.push( {color , marker: nuevoMarcador} )
  } 
 
  irMarcador( marker: mapboxgl.Marker ){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })

  }
}
