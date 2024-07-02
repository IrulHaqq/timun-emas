const { formatterHelpers } = require('@cucumber/cucumber');
const colors = require('colors');

class CustomFormatter {
  constructor(options) {
    options.eventBroadcaster.on('test-case-finished', (event) => {
      const { gherkinDocument, pickle, result } = event;
      const scenario = formatterHelpers.getScenarioDescription(gherkinDocument, pickle);
      console.log(colors.cyan(scenario));
      
      pickle.steps.forEach((step, index) => {
        const stepResult = result.stepResults[index];
        const symbol = stepResult.status === 'PASSED' ? colors.green('✓') : colors.red('✗');
        const stepText = colors.white(`${step.keyword}${step.text}`);
        console.log(`  ${symbol} ${stepText}`);
      });
      
      console.log('');
    });
  }
}

module.exports = CustomFormatter;