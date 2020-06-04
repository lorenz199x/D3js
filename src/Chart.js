import React, { useEffect, useRef, useState } from 'react';
import { select, line, curveCardinal } from 'd3'

function Chart() {
  const [ data, setData ] = useState([25, 30, 45, 60, 20, 65, 70])
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)
    const myLine = line()
      .x((value, index) => index * 50)
      .y(value => 150 - value)
      .curve(curveCardinal) // to add shape on curve

      svg.selectAll('path')
      .data([data])
      .join('path')
      .attr('d', value => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'blue')
  }, [data])

  return (
    <React.Fragment>
      <div> Chart </div>
      <svg style={{ backgroundColor: 'white'}} ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data.map(value => value + 8))}>
        update data
      </button>
      <button onClick={() => setData(data.map(value => value <= 35))}>
        filter data
      </button>
    </React.Fragment>

  );
}

export default Chart;


