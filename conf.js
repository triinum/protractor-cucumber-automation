/*
Basic configuration to run your cucumber
feature files and step definitions with protractor.
**/
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    baseUrl: 'https://vegas.williamhill.com/',

    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: [ 'lang=en-gb', 'disable-infobars' ],
        prefs: {
          'profile.managed_default_content_settings.notifications': 1, 
          'credentials_enable_service': false, 
          'profile': {'password_manager_enabled': false}
        }
        // mobileEmulation: {
        //   deviceName: 'Nexus 5'
        // }
      }
    },

    resultJsonOutputFile: './reports/json/cucumber_report.json',

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    //cucumber command line options
    cucumberOpts: {
      strict: true,
      require: ['./step_definitions/*.js', './support/*.js'],
      format: "pretty",
      //tags: '@search'
      },

      specs: ['./features/*.feature'],

    onPrepare: () => {
      browser.driver.manage().deleteAllCookies();
      browser.manage().window().maximize(); // maximize the browser before executing the feature files
      browser.ignoreSynchronization = true;
      global.expect = chai.expect;
         
    }
  }