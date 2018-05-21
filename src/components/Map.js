import React,{Component} from 'react';
import SideBar from './sidebar';
import '../sfmap.css';
import mapboxgl from 'mapbox-gl';
import data from '../data.json';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obm1jb3JvIiwiYSI6ImNqaDQ3MTJsdzA4aG0ycHFrY2dxZXd3Z2UifQ.WcdccA2rEJQIzEayDLWQlg'

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
        
        //Remove Markers from, and add To
        //removeMarkers() && addMarkers(to)
        this.setState({markers:newMarkers})
       
    }
    renderMarkers = () => {
    this.state.markers.forEach(element => {
            element.addTo(this.map)
        });
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
                    return (new mapboxgl.Marker().setLngLat(item.coordinates))
                })
            case 1:
                return data.filter(building => {
                    return building.status === 'Proposed'
                }).map(item => {
                    return (new mapboxgl.Marker().setLngLat(item.coordinates))
                })
            case 2:
                return data.filter(building => {
                    return building.status === 'Completed'
                }).map(item => {
                    return (new mapboxgl.Marker().setLngLat(item.coordinates))
                })
            case 3:
                return data.filter(building => {
                    return building.status === 'Approved'
                }).map(item => {
                    return  (new mapboxgl.Marker().setLngLat(item.coordinates))
                })
            default:
                return []

        }
    }

    render(){
       

        return (
        <div>
            <div ref = {el => this.mapContainer = el} className = "SFmap"/>
            <SideBar handleTabChange = {this.handleTabChange}/>
            </div>
        )
    }
}

