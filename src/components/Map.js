import React,{Component} from 'react';
import SideBar from './sidebar';
import '../sfmap.css';
import mapboxgl from 'mapbox-gl';
import data from '../data.json';
import MAPBOX_KEY from '../config';

mapboxgl.accessToken = MAPBOX_KEY

export default class Map extends Component {
    constructor(props){
        super(props)
        this.state = {
            markers:this.addMarkers(0)
          
        } 
    }

    componentDidMount(){
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center:[-122.40,37.77],
            zoom: 12
        })
        this.renderMarkers();
    }

    componentDidUpdate(){
        this.renderMarkers();
    }

    componentWillUnmount(){
        this.map.remove();
    }
    handleTabChange = (to,from) => {
        this.removeMarkers()
        let newMarkers = this.addMarkers(to);
        this.setState({markers:newMarkers})
       
    }
    renderMarkers = () => {
    this.state.markers.forEach(element => {
            element.addTo(this.map)
        });
    }

    reCenter = (coordinates,i) => {
        this.map.flyTo({center:coordinates,zoom:15})
        this.state.markers[i].togglePopup()
    }

    removeMarkers = () => {
        this.state.markers.forEach(element => {
            element.remove()
        })
    }
    addMarkers = (i) => {
        switch(i){
            case 0:
                return data.filter(building => {
                    return building.status === 'Under Construction'
                }).map(item => {
                    let popup = this.makePopup(item)
                    return (new mapboxgl.Marker().setLngLat(item.coordinates).setPopup(popup))
                })
            case 1:
                return data.filter(building => {
                    return building.status === 'Proposed'
                }).map(item => {
                    let popup = this.makePopup(item)
                    return (new mapboxgl.Marker().setLngLat(item.coordinates).setPopup(popup))
                })
            case 2:
                return data.filter(building => {
                    return building.status === 'Completed'
                }).map(item => {
                    let popup = this.makePopup(item)
                    return (new mapboxgl.Marker().setLngLat(item.coordinates).setPopup(popup))
                })
            case 3:
                return data.filter(building => {
                    return building.status === 'Approved'
                }).map(item => {
                    let popup = this.makePopup(item)
                    return  (new mapboxgl.Marker().setLngLat(item.coordinates).setPopup(popup))
                })
            default:
                return []
        }
    }

    makePopup = building => {
        return (new mapboxgl.Popup({offset:25}).setHTML('<h3>' + building.name + '</h3>'))
    }

    render(){
       

        return (
        <div>
            <div ref = {el => this.mapContainer = el} className = "SFmap"/>
            <SideBar handleRecenter = {this.reCenter} handleTabChange = {this.handleTabChange}/>
            </div>
        )
    }
}

