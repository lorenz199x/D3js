 // const overlap = 8
    // const height = 646
    // const width = 300
    // const margin = ({ top: 40, right: 20, bottom: 30, left: 120 })
    // height = data.series.length * 17

    // svg
    //   .append("g")
    //   .call(xAxis);

    // svg
    //   .append("g")
    //   .call(yAxis);

    // const group = svg
    //   .append("g")
    //   .selectAll("g")
    //   .data(data.series)
    //   .join("g")
    //   .attr("transform", d => `translate(0)`);

    // group
    //   .append("path")
    //   .attr("fill", "#ddd")
    //   .attr("d", d => d3.area(d.values));

    // group
    //   .append("path")
    //   .attr("fill", "none")
    //   .attr("stroke", "black")
    //   .attr("d", d => line(d.values));


    // const area = d3.area()
    //   .curve(d3.curveBasis)
    //   .defined(d => !isNaN(d))
    //   .x((d, i) => x(data.dates[i]))
    //   .y0(0)
    //   .y1(d => z(d))

    // const line = area.lineY1()


    // const x = d3.scaleTime()
    //   .domain(d3.extent(data.dates))
    //   .range([margin.left, width - margin.right])

    // const y = d3.scalePoint()
    //   .domain(data.series.map(d => d.name))
    //   .range([margin.top, height - margin.bottom])

    // const z = d3.scaleLinear()
    //   .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    //   .range([0, -overlap * y.step()])

    // const xAxis = g => g
    //   .attr("transform", `translate(0)`)
    //   .call(d3.axisBottom(x)
    //     .ticks(width / 80)
    //     .tickSizeOuter(0)) 

    // const yAxis = g => g
    //   .attr("transform", `translate(0)`)
    //   .call(d3.axisLeft(y).tickSize(0).tickPadding(4))
    //   .call(g => g.select(".domain").remove())