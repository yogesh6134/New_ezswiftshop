import React from 'react';
import Svg, { Rect, G, Text } from 'react-native-svg';
import JSBarcode from 'jsbarcode';

const merge = (old, replaceObj) => ({ ...old, ...replaceObj });

function getEncodingHeight(encoding, options) {
  return (
    options.height +
    (options.displayValue && encoding.text.length > 0
      ? options.fontSize + options.textMargin
      : 0) +
    options.marginTop +
    options.marginBottom
  );
}

function getBarcodePadding(textWidth, barcodeWidth, options) {
  if (options.displayValue && barcodeWidth < textWidth) {
    if (options.textAlign === 'center') {
      return Math.floor((textWidth - barcodeWidth) / 2);
    } else if (options.textAlign === 'left') {
      return 0;
    } else if (options.textAlign === 'right') {
      return Math.floor(textWidth - barcodeWidth);
    }
  }
  return 0;
}

function calculateEncodingAttributes(encodings, barcodeOptions, context) {
  for (let i = 0; i < encodings.length; i++) {
    const encoding = encodings[i];
    const options = merge(barcodeOptions, encoding.options);

    // Calculate the width of the encoding
    let textWidth;
    if (options.displayValue) {
      textWidth = measureText(encoding.text, options, context);
    } else {
      textWidth = 0;
    }

    const barcodeWidth = encoding.data.length * options.width;
    encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

    encoding.height = getEncodingHeight(encoding, options);

    encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
  }
}

function getTotalWidthOfEncodings(encodings) {
  return encodings.reduce((total, encoding) => total + encoding.width, 0);
}

function getMaximumHeightOfEncodings(encodings) {
  return Math.max(...encodings.map(encoding => encoding.height));
}

function measureText(string, options, context) {
  const ctx = context;
  
  if (!ctx) {
    return 0; // Return 0 if the context is not available
  }
  
  ctx.font = `${options.fontOptions} ${options.fontSize}px ${options.font}`;

  return ctx.measureText(string).width;
}

function Background(props) {
  const { width, height, color } = props;
  return <Rect x={0} y={0} width={width} height={height} fill={color} />;
}

function BarcodeChunk(props) {
  const { binary, padding, options } = props;

  let yFrom = options.textPosition === 'top' ? options.fontSize + options.textMargin : 0;

  let barWidth = 0;
  let bars = [];
  for (let b = 0; b < binary.length; b++) {
    const x = b * options.width + padding;

    if (binary[b] === '1') {
      barWidth++;
    } else if (barWidth > 0) {
      bars.push({
        x: x - options.width * barWidth,
        y: yFrom,
        width: options.width * barWidth,
        height: options.height,
      });
      barWidth = 0;
    }
  }

  if (barWidth > 0) {
    bars.push({
      x: (binary.length - 1) * options.width + padding - options.width * (barWidth - 1),
      y: yFrom,
      width: options.width * barWidth,
      height: options.height,
    });
  }

  return bars.map((bar, i) => (
    <Rect key={i} x={bar.x} y={bar.y} width={bar.width} height={bar.height} fill={options.lineColor} />
  ));
}

function BarcodeText(props) {
  const { text, width, padding, options } = props;

  if (options.displayValue) {
    let x, y, textAnchor;

    y = options.textPosition === 'top' 
      ? options.fontSize - options.textMargin 
      : options.height + options.textMargin + options.fontSize;

    if (options.textAlign === 'left' || padding > 0) {
      x = 0;
      textAnchor = 'start';
    } else if (options.textAlign === 'right') {
      x = width - 1;
      textAnchor = 'end';
    } else {
      x = width / 2;
      textAnchor = 'middle';
    }

    return (
      <Text
        x={x}
        y={y}
        fontFamily={options.font}
        fontSize={options.fontSize}
        fontWeight={'bold'}
        textAnchor={textAnchor}
        fill={options.lineColor}>
        {text}
      </Text>
    );
  }
  return null;
}

function Barcode({ value, options }) {
  const barcode = {};
  JSBarcode(barcode, value, options);
  const encodings = barcode.encodings;

  const defaults = {
    width: 2,
    height: 100,
    displayValue: true,
    fontOptions: 'bold',
    font: 'monospace',
    textAlign: 'center',
    textPosition: 'bottom',
    textMargin: 2,
    fontSize: 20,
    background: '#ffffff',
    lineColor: '#000000',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  };
  const mergedOptions = merge(defaults, options);

  calculateEncodingAttributes(encodings, mergedOptions);
  const totalWidth = getTotalWidthOfEncodings(encodings);
  const maxHeight = getMaximumHeightOfEncodings(encodings);
  const width = totalWidth + mergedOptions.marginLeft + mergedOptions.marginRight;

  const xs = [mergedOptions.marginLeft];
  encodings.forEach(e => xs.push(xs[xs.length - 1] + e.width));

  return (
    <Svg
      x={0}
      y={0}
      width={width}
      height={maxHeight}
      viewBox={`0 0 ${width} ${maxHeight}`}>
      {options.background && (
        <Background width={width} height={maxHeight} color={options.background} />
      )}
      {encodings.map((encoding, i) => {
        const encodingOptions = merge(options, encoding.options);

        return (
          <G key={i} x={xs[i]} y={encodingOptions.marginTop} fill={encodingOptions.lineColor}>
            <BarcodeChunk binary={encoding.data} padding={encoding.barcodePadding} options={encodingOptions} />
            <BarcodeText text={encoding.text} width={encoding.width} padding={encoding.barcodePadding} options={encodingOptions} />
          </G>
        );
      })}
    </Svg>
  );
}

export default Barcode;
