import React, { useEffect, useRef, useState } from 'react';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3'

function Chart() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75])
  const svgRef = useRef()

  // will be called initially and on every update
  useEffect(() => {
    const svg = select(svgRef.current)
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5)

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0])

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true)

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
    svg
      .select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis)

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .attr('x', (value, index) => xScale(index))
      .attr('y', -150)
      .attr('width', xScale.bandwidth())
      .on('mouseenter', (value, index) => {
        svg
        .selectAll('.tooltip')
        .data([value])
        .join(enter => enter.append("text").attr("y", yScale(value) - 4))
        .attr('class', 'tooltip')
        .text(value)
        .attr('x', xScale(index) + xScale.bandwidth() / 2)
        .attr('text-anchor', 'middle')
        .transition()
        .attr('y', yScale(value) - 8)
        .attr('opacity', 1)
      })
      .on('mouseleave', () => svg.select('.tooltip').remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', value => 150 - yScale(value))
  }, [data])

  return (
    <React.Fragment>
      <div> Chart </div>
      <svg style={{ backgroundColor: 'white', overflow: 'visible' }} ref={svgRef}>
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

export default Chart;