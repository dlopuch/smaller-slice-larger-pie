var d3 = require('d3');

window.onload = function() {
  var Chart = require('./Chart');

  window.chart = new Chart('svg');

  console.log('heydan success!');


  // flux
  var RoundStore = window._RoundStore = require('stores/RoundStore');
  var ChartStore = window._ChartStore = require('stores/ChartStore');


  var dispatcher = require('dispatcher');
  var ACTIONS = require('actions/actionsEnum');
  var roundActions = window.roundActions = require('actions/roundActions');
  window.chartActions = require('actions/chartActions');


  var EquityStake = window.EquityStake = require('models/EquityStake');
  var Round       = window.Round = require('models/Round');
  var Investment  = window.Investment = require('models/Investment');


  window.scenario = require('../../test/unit/_scenarios/foundingSeedSeriesA')();

  roundActions.setScenario(window.scenario.seriesARound);

  // Add a demo b round at 30M pre
  var bRound = new Round('B round', window.scenario.seriesARound, 30000000, {type: 'post', percent: 0.05});
  var bInvestment1 = new Investment(bRound, 20000000, {name: 'b investment 1'});
  window.bRound = bRound;


  var toggleIsPercent = true;
  d3.select('#toggle_measure').on('click', function() {
    toggleIsPercent = !toggleIsPercent;

    window.chartActions.selectMeasure(toggleIsPercent ? 'percentages' : 'values');
  });

  var toggleBRound = false;
  d3.select('#toggle_b_round').on('click', function() {
    toggleBRound = !toggleBRound;

    window.roundActions.setScenario( toggleBRound ? bRound : window.scenario.seriesARound );
  });

};
