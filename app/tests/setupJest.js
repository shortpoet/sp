// for document
// https://stackoverflow.com/questions/58951689/mocking-window-document-in-jest-and-vue-test-utilss
import { JSDOM } from "jsdom"

// for jquery
// import { config } from '@vue/test-utils'
// import $ from 'jquery'

// for document
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

// for jquery
// global.$ = global.jquery = $
// console.log($)

// config.mocks['$'] = $


// https://github.com/LinusBorg/portal-vue/blob/develop/tests/unit/setup.js
// workaround for an issues with vue-test-utils
const _proxy = window.Proxy
window.Proxy = undefined
const Vue = require('vue')
window.Proxy = _proxy

// import Vue from 'vue'

Vue.config.productionTip = false


// Object.defineProperty(window, '$', {value: $});
// Object.defineProperty(global, '$', {value: $});
// Object.defineProperty(global, 'jQuery', {value: $});

// global.window = window
// global.$ = require('jquery');

// window.$ = require('jquery');

// global['$'] = global['jQuery'] = $