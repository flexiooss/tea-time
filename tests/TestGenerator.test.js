/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {StoreTimeGenerator} from "../src/StoreTimeGenerator";

const assert = require('assert')

class TestGenerator extends TestCase {

  setUp() {
  }

  testPeriodHour() {
    let store = new StoreTimeGenerator(60).generate()
    let iterator = store.state().data.values()
    assert.strictEqual(store.state().data.size, 24, 'all hours')
    assert.strictEqual(iterator.next().value.label(), '00:00')
    assert.strictEqual(iterator.next().value.label(), '01:00')

    store = new StoreTimeGenerator(30).generate()
    assert.strictEqual(store.state().data.size, 24 * 2, 'all half-hours')
    iterator = store.state().data.values()
    assert.strictEqual(iterator.next().value.label(), '00:00')
    assert.strictEqual(iterator.next().value.label(), '00:30')

    store = new StoreTimeGenerator(2).generate()
    assert.strictEqual(store.state().data.size, 24 * 30, 'all 2 minutes')
    iterator = store.state().data.values()
    assert.strictEqual(iterator.next().value.label(), '00:00')
    assert.strictEqual(iterator.next().value.label(), '00:02')

    store = new StoreTimeGenerator(1).generate()
    assert.strictEqual(store.state().data.size, 24 * 60, 'all minutes')
    iterator = store.state().data.values()
    assert.strictEqual(iterator.next().value.label(), '00:00')
    assert.strictEqual(iterator.next().value.label(), '00:01')
  }
}

runTest(TestGenerator)
