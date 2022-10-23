import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    // kakita
    `.mapa-container{
      height:100%;
      width:100%;
    }

    .row {
      width: 400px;
      background-color: #fff;
      border-radius: 5px;
      position: fixed;
      padding: 10px;
      bottom: 50px;
      left: 40px;
      z-index: 9999;
    }`
  ]
})

export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('mapa') divMapa!: ElementRef;
  // mapa como referencia local referenciada por angular para evitar conflictos en caso de tener más de un mapa o id similar en la rederizaición
  mapa!: mapboxgl.Map;
  // nivel de zoom default
  zoomLevel: number = 12;
  // latitud / longitud 
  centro: [number, number] = [-71.59644627307146, -33.03741510991351]
  
  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      // longitud, latitud  =/= google: latitud, longitud  OJITO!!
      center: this.centro,
      zoom: this.zoomLevel
    })
    
    this.mapa.on('zoom', ( e )=>{
      const zoomActual = this.mapa.getZoom();
      this.zoomLevel = zoomActual;
    })
    
    this.mapa.on('zoomend', ( e ) => {
      
      if( this.mapa.getZoom() > 19 ){
        this.mapa.zoomTo( 19 )
      }
    });

    this.mapa.on('move', ( e ) => {
      const target = e.target
      // devuelve objeto con lng y lat
      // console.log(target.getCenter())
      const { lng, lat } = target.getCenter()
      this.centro = [lng, lat]
    })

  };

  // hay q destruir los listener para optimizar uso de memoria. En Angular, ngOnDestroy
  ngOnDestroy(): void {
    // 3 listener en 1 mapa
    this.mapa.off('zoom' ,()=>{})
    this.mapa.off('zoomend' ,()=>{})
    this.mapa.off('move' ,()=>{})
  };
  
  zoomIn(){ this.mapa.zoomIn() };
  
  zoomOut(){ this.mapa.zoomOut() };
  
  zoomCambio( valor: string ){ this.mapa.zoomTo( Number( valor )) };

}
