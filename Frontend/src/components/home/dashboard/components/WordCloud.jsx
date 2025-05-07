import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

export function WordCloud({ data }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Process data
    const words = Object.entries(data)
      .filter(([text, value]) => text && value > 0)
      .map(([text, value]) => ({
        text: String(text),
        size: Math.sqrt(Number(value)) * 10 + 10, // Scale font size
        value: Number(value)
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    // Set up dimensions
    const width = 400;
    const height = 300;

    // Create layout
    const layout = cloud()
      .size([width, height])
      .words(words)
      .padding(3)
      .rotate(0)
      .font('Inter')
      .fontSize(d => d.size)
      .on('end', draw);

    // Draw function
    function draw(words) {
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      const g = svg.append('g')
        .attr('transform', `translate(${width/2},${height/2})`);
      g.selectAll('text')
        .data(words)
        .join('text')
        .style('font-size', d => `${d.size}px`)
        .style('font-family', 'Inter')
        .style('fill', (d, i) => {
          // shadcn color palette
          const colors = [
            '#3b82f6', // blue
            '#10b981', // emerald
            '#6366f1', // indigo
            '#8b5cf6', // violet
            '#ec4899', // pink
            '#f59e0b', // amber
            '#84cc16', // lime
            '#14b8a6', // teal
            '#f43f5e', // rose
            '#a855f7'  // purple
          ];
          return colors[i % colors.length];
        })
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text(d => d.text)
        .append('title')
        .text(d => `${d.text}: ${d.value} responses`);
    }

    layout.start();
  }, [data]);

  return (
    <div className="bg-white p-4 rounded-lg shadow h-[300px]">
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
