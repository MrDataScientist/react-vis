import React from 'react';

import {setAddon, storiesOf} from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);
import {withKnobs, number, select} from '@storybook/addon-knobs/react';

import {LineSeries, VerticalBarSeries, XAxis, YAxis} from 'react-vis';
import {generateLinearData, getTime, getWord} from './storybook-data.js';

import {SimpleChartWrapperNoAxes, jsxOptions} from './storybook-utils';

storiesOf('Axes and scales/Axis Formatting/Base', module)
  .addDecorator(withKnobs)
  .addWithJSX(
    'Axis orientation',
    () => {
      const XAxisOrientation = select('XAxis.orientation', {bottom: 'bottom', top: 'top'}, 'bottom');
      const YAxisOrientation = select('YAxis.orientation', {left: 'left', right: 'right'}, 'left');
      return (
        <SimpleChartWrapperNoAxes
          margin={{
            ...(XAxisOrientation === 'top' ? {bottom: 20, top: 40} : {}),
            ...(YAxisOrientation === 'right' ? {left: 10, right: 40} : {})
          }}
        >
          <XAxis orientation={XAxisOrientation} />
          <YAxis orientation={YAxisOrientation} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
    jsxOptions
  )
  .addWithJSX(
    'Axis titles',
    () => {
      const XAxisPosition = select('XAxis.position', {start: 'start', middle: 'middle', end: 'end'}, 'end');
      const YAxisPosition = select('YAxis.position', {start: 'start', middle: 'middle', end: 'end'}, 'end');

      return (
        <SimpleChartWrapperNoAxes>
          <XAxis title="x-axis" position={XAxisPosition} />
          <YAxis title="y-axis" position={YAxisPosition} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
    jsxOptions
  )
  .addWithJSX(
    'Tick total',
    () => {
      const xTickTotal = number('XAxis.tickTotal', 10, {max: 20, min: 0, range: true});
      const yTickTotal = number('YAxis.tickTotal', 10, {max: 20, min: 0, range: true});

      return (
        <SimpleChartWrapperNoAxes>
          <XAxis tickTotal={xTickTotal} />
          <YAxis tickTotal={yTickTotal} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
    jsxOptions
  )
  .addWithJSX(
    'Tick Size',
    () => {
      const xTickSize = number('XAxis.tickSize', 6, {max: 10, min: 0, range: true});
      const yTickSize = number('YAxis.tickSize', 6, {max: 10, min: 0, range: true});

      return (
        <SimpleChartWrapperNoAxes noHorizontalGridLines noVerticalGridLines>
          <XAxis tickSize={xTickSize} />
          <YAxis tickSize={yTickSize} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
    jsxOptions
  )
  .addWithJSX(
    'Tick Size (Inner)',
    () => {
      const xTickSize = number('XAxis.tickSizeInner', 6, {max: 10, min: 0, range: true});
      const yTickSize = number('YAxis.tickSizeInner', 6, {max: 10, min: 0, range: true});

      return (
        <SimpleChartWrapperNoAxes noHorizontalGridLines noVerticalGridLines>
          <XAxis tickSizeInner={xTickSize} />
          <YAxis tickSizeInner={yTickSize} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
    jsxOptions
  )
  .addWithJSX(
    'Tick Size (Outer)',
    () => {
      const xTickSize = number('XAxis.tickSizeOuter', 6, {max: 10, min: 0, range: true});
      const yTickSize = number('YAxis.tickSizeOuter', 6, {max: 10, min: 0, range: true});

      return (
        <SimpleChartWrapperNoAxes noHorizontalGridLines noVerticalGridLines>
          <XAxis tickSizeOuter={xTickSize} />
          <YAxis tickSizeOuter={yTickSize} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
    jsxOptions
  )
  .addWithJSX(
    'Tick orientation',
    () => {
      const tickLabelAngle = number('tickLabelAngle', 0, {max: 90, min: -90, range: true});
      return (
        <SimpleChartWrapperNoAxes margin={{bottom: 80}}>
          <XAxis tickFormat={d => new Date(d).toLocaleDateString()} tickLabelAngle={tickLabelAngle} />
          <YAxis />
          <LineSeries
            data={generateLinearData({
              key: 'line-with-time',
              extraParams: [['x', getTime({})]]
            })}
          />
        </SimpleChartWrapperNoAxes>
      );
    },
    jsxOptions
  );
storiesOf('Axes and scales/Scales', module)
  .addDecorator(withKnobs)
  .addWithJSX(
    'time Scale',
    () => {
      return (
        <SimpleChartWrapperNoAxes margin={{right: 20}}>
          <XAxis tickFormat={d => new Date(d).toLocaleDateString()} />
          <YAxis />
          <LineSeries
            data={generateLinearData({
              key: 'line-with-time',
              extraParams: [['x', getTime({})]]
            })}
          />
        </SimpleChartWrapperNoAxes>
      );
    },
    jsxOptions
  )
  .addWithJSX(
    'category scale',
    () => {
      const data = generateLinearData({
        nbPoints: 8,
        changeRatio: 0.4,
        key: 'bar1'
      });
      return (
        <SimpleChartWrapperNoAxes xType="ordinal">
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={data} />
        </SimpleChartWrapperNoAxes>
      );
    },
    jsxOptions
  )
  .addWithJSX(
    'ordinal scale',
    () => {
      const data = generateLinearData({
        nbPoints: 8,
        changeRatio: 0.4,
        key: 'bar-with-words',
        extraParams: [['x', getWord({})]]
      });
      return (
        <SimpleChartWrapperNoAxes xType="ordinal">
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={data} />
        </SimpleChartWrapperNoAxes>
      );
    },
    jsxOptions
  );
