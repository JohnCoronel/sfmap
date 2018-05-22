import React from 'react';
 import 'react-tabs/style/react-tabs.css';
import {Tab,Tabs,TabList,TabPanel} from 'react-tabs';
import '../tabs.css';
import data from '../data';

const Sidebar = (props) => {

     const style = {
         borderRadius: '10px',
         position:'absolute',
         width: '450px',
         top: '1rem',
         height: '90vh',
         right:'5rem',
         background:'#F8F8F8',
         overflow:'scroll'
     }
    return (
        <Tabs style = {style}  onSelect ={(from,to) => props.handleTabChange(from,to)} selectedTabClassName = "tab--selected">
            <TabList className = "tablist">
                <Tab> Under Construction </Tab>
                <Tab> Proposed </Tab>
                <Tab> Completed </Tab>
                <Tab> Approved </Tab>
            </TabList>
            <TabPanel> {renderPanel('Under Construction')}</TabPanel>
            <TabPanel> {renderPanel('Proposed')} </TabPanel>
            <TabPanel> {renderPanel('Completed')} </TabPanel>
            <TabPanel> {renderPanel('Approved')} </TabPanel>
         </Tabs>
    )

}

const renderPanel = (status) => {
      return (data.filter( building => building.status === status)
    .map(building => { 
        return <PanelSection key = {building.name} building = {building}/>
    }))

}

const PanelSection = (props) => {
    return (
        <div className = "panel-section">
            
           <img  height = "200px" width = "200px" src = {props.building.image}/>
           <ul className = "panel-info">
           <h2>{props.building.name} </h2>
            Height : 500ft
            Sq Ft : 500,000
            Est - 2018
            </ul>
            
            
        </div>
    )
}

export default Sidebar;