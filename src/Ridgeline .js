import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3'
import fileData from './traffic.csv'

function Ridgeline() {
  // const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75])
  const svgRef = useRef()
  const [data, setData] = useState([])

  useEffect(() => {
    const margin = { top: 60, right: 30, bottom: 20, left: 110 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      // append the svg object to the body of the page
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv").then(data => {
      setData(data)

      // Get the different categories and count them
      const categories = data.columns
      const n = categories.length // error

      // Add X axis
      const x = d3.scaleLinear()
        .domain([-10, 140])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Create a Y scale for densities
      const y = d3.scaleLinear()
        .domain([0, 0.4])
        .range([height, 0]);

      // Create the Y axis for names
      const yName = d3.scaleBand() // error
        .domain(categories)
        .range([0, height])
        .paddingInner(1)
      svg.append("g")
        .call(d3.axisLeft(yName));

      // Compute kernel density estimation for each column:
      const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
      const allDensity = []
      for (let i = 0; i < n; i++) {
        const key = categories[i]
        const density = kde(data.map(function (d) { return d[key]; }))
        allDensity.push({ key: key, density: density })
      }

      svg.selectAll('areas')
        .data(allDensity)
        .enter()
        .append('path')
        .attr('transform', function (d) { return ("translate(0," + (yName(d.key) - height) + ")") })
        .datum(function (d) { return (d.density) })
        .attr("fill", "#69b3a2")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("d", d3.line()
          .curve(d3.curveBasis)
          .x(function (d) { return x(d[0]); })
          .y(function (d) { return y(d[1]); })
        )
    })

  }, [])

  // This is what I need to compute kernel density estimation
  const kernelDensityEstimator = (kernel, X) => {
    return function (V) {
      return X.map(function (x) {
        return [x, d3.mean(V, function (v) { return kernel(x - v); })];
      });
    };
  }
  const kernelEpanechnikov = (k) => {
    return function (v) {
      return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
  }

  console.log('DISPLAY DATA', data)
  return (
    <React.Fragment>
      <div> Chart </div>
      <svg style={{
        backgroundColor: '#a2a2a2',
        overflow: 'visible',
        width: 600,
        height: 400
      }} ref={svgRef}>
        <g className='x-axis' />
        <g className="y-axis" />
      </svg>
      <br />
      <button onClick={() => setData(data.map(value => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        Filter data
      </button>
      <button onClick={() => setData([...data, Math.round(Math.random() * 100)])}>
        Add data
      </button>
    </React.Fragment>
  );
}

export default Ridgeline;