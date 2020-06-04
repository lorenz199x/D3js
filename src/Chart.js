import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3'

// const data = [25, 30, 45, 60, 20]
function Chart() {
  const [ data, setData ] = useState([25, 30, 45, 60, 20])
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)
    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', value => value)
      .attr('cx', value => value * 3)
      .attr('cy', value => value * 2)
      .attr('stroke', 'red')

    //another way of displaying svg circles using callback
    /** .join(
      enter => enter
        .append('circle')
        .attr('r', value => value)
        .attr('cx', value => value * 3)
        .attr('cy', value => value * 2)
        .attr('stroke', 'red'),
      update => update.attr('class', 'updated'),
      exit => exit.remove()
    );
    */
  }, [data])

  return (
    <React.Fragment>
      <div> Chart </div>
      <svg ref={svgRef}></svg>
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


