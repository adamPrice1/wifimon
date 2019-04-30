import React from 'react';
import { LineChart, Line ,XAxis,YAxis,AreaChart, Area, Tooltip} from 'recharts';
import './App.css';
import * as moment from 'moment';
import axios from 'axios'



class App extends React.Component {

  state = {
    fastSpeeds :[],
    mySpeeds :[],
    stSpeeds :[]
  }

  componentDidMount(){
      this.getFiles()
      this.interval = setInterval(this.getFiles, 60000);
    };

     formatXAxis = (tickItem) =>{
      return moment(tickItem).format("hh:mm");
    }

     getFiles = (tickItem) =>{

      axios.get('fastspeeds.json')
        .then(response => {
          this.setState({
            fastSpeeds: response.data
            })
          })

      axios.get('myspeeds.json')
        .then(response => {
          this.setState({
            mySpeeds: response.data
            })
        })

      axios.get('stspeeds.json')
        .then(response => {
          this.setState({
            stSpeeds: response.data
            })
        })
    }

    render() {
  return (
    <div className="App">
    <label> Fast speed test (netflix) </label>
      <AreaChart width={1000} height={500} data={this.state.fastSpeeds}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="time"
        name="date"
        tickFormatter={this.formatXAxis}
      />
      <YAxis
        name="Download(Mbps)"
      />
      <Tooltip />
      <Area type="monotone" dataKey="download"  stroke="#8884d8" />
      </AreaChart>

      <label> MySpeed library </label>
        <LineChart width={1000} height={500} data={this.state.mySpeeds}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="time"
          name="date"
          tickFormatter={this.formatXAxis}
        />
        <YAxis/>
        <Tooltip />
        <Line type="monotone" dataKey="download" label="download" stroke="#8884d8" />
        <Line type="monotone" dataKey="upload" label="download" stroke="#f4b642" />
        </LineChart>

        <label> Speedtest.net </label>
          <LineChart width={1000} height={500} data={this.state.stSpeeds}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="time"
            name="date"
            tickFormatter={this.formatXAxis}
          />
          <YAxis/>
          <Tooltip />
          <Line type="monotone" dataKey="download" label="download" stroke="#8884d8" />
          <Line type="monotone" dataKey="upload" label="upload" stroke="#f4b642" />
          </LineChart>

    </div>
  )
}
}

export default App;
