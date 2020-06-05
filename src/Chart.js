import React, { useEffect, useRef, useState } from 'react';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear } from 'd3'

function Chart() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75])
  const svgRef = useRef()

  // will be called initially and on every update
  useEffect(() => {
    const svg = select(svgRef.current)
    const xScale = scaleLinear() //domain is the input values
      // .domain([0, 6]) //static scale
      .domain([0, data.length - 1]) // dynamic scale
      .range([0, 300])

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0])

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index + 1);
    svg
      .select('.x-axis')
      .style('transform', 'tranlateY(50, 150)')
      .call(xAxis)

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);


    //generates the "d" attribute of a path element
    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal) // to add shape on curve

    // renders path element and attaches
    // the 'd' attribute from the line generator above
    // responsible for the visual representation of the chart
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr("class", "line")
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
  }, [data])

  return (
    <React.Fragment>
      <div> Chart </div>
      <svg style={{ backgroundColor: 'black', overflow: 'visible' }} ref={svgRef}>
        <g className='x-axis' />
        <g className="y-axis" />
      </svg>
      <br />
      <button onClick={() => setData(data.map(value => value + 8))}>
        update data
      </button>
      <button onClick={() => setData(data.map(value => value < 35))}>
        filter data
      </button>
    </React.Fragment>

  );
}

export default Chart;


