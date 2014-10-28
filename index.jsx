/** @jsx React.DOM */
"use strict";

var React = require('react/addons');
var moment = require('moment-range');
var RangePicker = require('../dist/range-picker');

var DatePickerRange = React.createClass({
  getInitialState: function() {
    return {
      start: null,
      end: null,
    };
  },
  handleSelect: function(range) {
    this.setState({
      start: range.start,
      end: range.end
    });
  },
  render: function() {
    var range;

    if (this.state.start && this.state.end) {
      range = moment().range(this.state.start, this.state.end);
    }

    return (
      <div>
        {this.transferPropsTo(
          RangePicker({
            onSelect: this.handleSelect,
            value: range
          })
        )}
        <div>
          <input type="text"
            value={this.state.start ?  this.state.start.format('LL') : null}
            readOnly={true}
            placeholder="Start date"/>
          <input type="text"
            value={this.state.end ? this.state.end.format('LL') : null}
            readOnly={true}
            placeholder="End date" />
        </div>
      </div>
    );
  }
});

var DatePickerSingle = React.createClass({
  getInitialState: function() {
    return {
      value: null,
    };
  },
  handleSelect: function(value) {
    this.setState({
      value: value,
    });
  },
  render: function() {
    return React.DOM.div({},
      this.transferPropsTo(
        RangePicker({
          onSelect: this.handleSelect,
          value: this.state.value
        })
      ),
      React.DOM.div(null,
        React.DOM.input({
          type: 'text',
          value: this.state.value ? this.state.value.format('LL') : null,
          readOnly: true
        }, null)
      )
    );
  }
});

// CODE_EXAMPLE
var CODE_EXAMPLE = function() {
var RangePicker = require('react-daterange-picker');

var dateStates = [
  {
    state: 'available',
    range: moment().range(moment(), moment().add(2, 'weeks')),
    selectable: true
  },
  {
    state: 'enquire',
    range: moment().range(moment().add(2, 'weeks'), moment().add(3, 'weeks')),
    selectable: true
  },
  {
    state: 'unavailable',
    range: moment().range(moment().add(3, 'weeks'), moment().add(3, 'weeks').add(5, 'days')),
    selectable: false
  },
  {
    state: 'available',
    range: moment().range(moment().add(3, 'weeks').add(5, 'days'), moment().add(5, 'weeks')),
    selectable: true
  }
];

var DatePicker = React.createClass({
  getInitialState: function() {
    return {
        value: null
    };
  },
  handleSelect: function(range) {
    // range is a moment-range object
    this.setState({
        value: range
    });
  },
  render: function() {
    return RangePicker({
      numberOfCalendars: 2,
      dateStates: dateStates,
      value: this.state.value,
      onSelect: this.handleSelect
    });
  }
});
}.toString();

// remove function declarations
var lines = CODE_EXAMPLE.split('\n');
lines.splice(0, 1);
lines.splice(lines.length - 1, 1);
CODE_EXAMPLE = lines.join('\n');

var Homepage = React.createClass({
  getDefaultProps: function() {
    return {};
  },

  render: function() {
    var dateRanges = [
      {
        range: moment().range(
          moment().startOf('day'),
          moment().add(2, 'weeks')
        ),
        state: 'available',
        selectable: true
      },
      {
        range: moment().range(
          moment().add(2, 'weeks'),
          moment().add(3, 'weeks')
        ),
        state: 'enquire',
        selectable: true
      },
      {
        range: moment().range(
          moment().add(3, 'weeks'),
          moment().add(3, 'weeks').add(5, 'days')
        ),
        state: 'unavailable',
        selectable: false
      },
      {
        range: moment().range(
          moment().add(3, 'weeks').add(5, 'days'),
          moment().add(5, 'weeks')
        ),
        state: 'available',
        selectable: true
      },
    ];

    return (
      <html>
        <head>
          <title>React Daterange Picker Demo</title>
          <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300' rel='stylesheet' type='text/css'></link>
          <link href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/styles/docco.min.css' rel='stylesheet' type='text/css'></link>
          <link href="css/react-calendar.css" rel="stylesheet"></link>
          <link href="css/example.css" rel="stylesheet"></link>
        </head>
        <body>
          <Header />
          <GithubRibbon />

          <div className="content">
            <div id="range-picker" className="example">
              <DatePickerRange
                numberOfCalendars={2}
                selectionType='range'
                earliestDate={new Date()}
                dateStates={dateRanges} />
            </div>
            <div className="code-example">
              <pre id="code-snippet">
                <code className="javascript">
                  {CODE_EXAMPLE}
                </code>
              </pre>
            </div>

            <div className="examples">
              <div className="example">
                <h4>Range with no date states</h4>
                <DatePickerRange
                  numberOfCalendars={2}
                  selectionType="range"
                  earliestDate={new Date()} />
              </div>

              <div className="example">
                <h4>Single with no date states</h4>
                <DatePickerSingle
                  numberOfCalendars={2}
                  selectionType="single"
                  earliestDate={new Date()} />
              </div>
            </div>
          </div>

          <Footer />

          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js" charSet="utf-8"></script>
          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/languages/javascript.min.js" charSet="utf-8"></script>
          <script src="build/index.js"></script>
        </body>
      </html>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
      <header className="header">
        <img src="img/logo.png" className="header__logo" />
        <h1 className="header__title">React Daterange Picker</h1>
      </header>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="footer">
        <a href="http://www.onefinestay.com/" className="footer__link">onefinestay</a>
        <a href="https://github.com/onefinestay" className="footer__link">Github</a>
        <a href="https://twitter.com/buildingOFS" className="footer__link">Twitter</a>
      </footer>
    );
  }
});

var GithubRibbon = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      top: 0,
      right: 0,
      border: 0
    };

    return (
      <a href="https://github.com/onefinestay/react-daterange-picker">
        <img style={style} src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" />
      </a>
    );
  }
});

module.exports = Homepage;