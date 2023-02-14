import * as myTest from '@/utils/myTest'
const {propMocker, propFinder, propsMocker, propsFinder, factory, createWrapper} = myTest.default

import { mount, createLocalVue } from '@vue/test-utils'
import {cloneDeep} from 'lodash'
import {hardResume} from '@/assets/resume.js'
import Start from '@/views/Start'
import Vue from 'vue'
import Vuex from 'vuex'

describe('test.utils', () => {

    const component = {}
    const mountOptions = {
      propsData: {},
      localVue: {},
    mocks: {},
    store: {},
    context: {}, // only for functional components
    router: {},
    computed: {},
    stubs: {},
    slots: {},
    scopedSlots: {},
    attrs: {},
    attachToDocument: false,
    attachTo: null, //HTML Element or String
    listeners: {},
    parentComponent: {},
    provide: {}
  }

  describe('propMocker', () => {
    it("returns a propsData object mocked in the format prop: sample prop", () => {
      const testProp = 'testProp'
      const output = propMocker(testProp)
      const propsData = {
        propsData: {
          testProp: 'sample testProp'
        }
      }
      expect(output).toMatchObject(propsData)
    })
  })

  describe('propFinder', () => {
    it("returns a propsData object retrieved from hardResume", () => {
      const testProp = 'name'
      const output = propFinder(testProp)
      const propsData = {
        propsData: {
          [`${testProp}`]: hardResume[`${testProp}`]
        }
      }
      expect(output).toMatchObject(propsData)
    })
  })
  describe('propsMocker', () => {
    it("returns multiple propsData object mocked in the format prop: sample prop from array input", () => {
      const testProps = ['testProp', 'sampleProp']
      const output = propsMocker(testProps)
      const propsData = {
        propsData: {
          testProp: 'sample testProp',
          sampleProp: 'sample sampleProp'
        }
      }
      expect(output).toMatchObject(propsData)
    })
    it("returns multiple propsData object mocked in the format prop: sample prop from object input", () => {
      const testProps =  {
        propKey: ['testProp', 'sampleProp', '2']
      }  
      const output = propsMocker(testProps)
      const propsData = {
        propsData: {
          propKey: [
            {testProp: 'sample testProp',sampleProp: 'sample sampleProp'},
            {testProp: 'sample testProp',sampleProp: 'sample sampleProp'}
          ]
        }    
      }
      expect(output).toMatchObject(propsData)
    })
  })

  describe('propsFinder', () => {
    it("returns multiple propsData object retrieved from hardResume from array input", () => {
      const testProps = ['name', 'surname']
      const output = propsFinder(testProps)
      const propsData = {
        propsData: {
          [`${testProps[0]}`]: hardResume[`${testProps[0]}`],
          [`${testProps[1]}`]: hardResume[`${testProps[1]}`]
        }
      }
      expect(output).toMatchObject(propsData)
    })
  })


})
