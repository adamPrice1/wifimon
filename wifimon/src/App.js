import React from 'react';
import { LineChart, Line ,XAxis,YAxis,AreaChart, Area, Tooltip} from 'recharts';
import './App.css';
import fastSpeeds from "./fastspeeds.json"
import mySpeeds from "./myspeeds.json"
import stSpeeds from "./stspeeds.json"
import * as moment from 'moment';

function formatXAxis(tickItem) {
  return moment(tickItem).format("hh:mm")
}
function App() {
  return (
    <div className="App">
    <label> Fast speed test (netflix) </label>
      <AreaChart width={1000} height={500} data={fastSpeeds}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="time"
        name="date"
        tickFormatter={formatXAxis}
      />
      <YAxis
        name="Download(Mbps)"
      />
      <Tooltip />
      <Area type="monotone" dataKey="download"  stroke="#8884d8" />
      </AreaChart>

      <label> MySpeed library </label>
        <LineChart width={1000} height={500} data={mySpeeds}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="time"
          name="date"
          tickFormatter={formatXAxis}
        />
        <YAxis/>
        <Tooltip />
        <Line type="monotone" dataKey="download" label="download" stroke="#8884d8" />
        <Line type="monotone" dataKey="upload" label="download" stroke="#f4b642" />
        </LineChart>

        <label> Speedtest.net </label>
          <LineChart width={1000} height={500} data={stSpeeds}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="time"
            name="date"
            tickFormatter={formatXAxis}
          />
          <YAxis/>
          <Tooltip />
          <Line type="monotone" dataKey="download" label="download" stroke="#8884d8" />
          <Line type="monotone" dataKey="upload" label="upload" stroke="#f4b642" />
          </LineChart>

    </div>
  );
}

export default App;
