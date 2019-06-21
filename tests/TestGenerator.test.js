/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {StoreTimeGenerator} from "../src/StoreTimeGenerator";
import {TimePickerConfig} from "../src/TimePickerConfig";

const assert = require('assert')

class TestGenerator extends TestCase {
  testTimePickerConfigPeriod() {
    assert.throws(() => new TimePickerConfig().setPeriod("151"), "Period is a number")
    assert.throws(() => new TimePickerConfig().setPeriod(0), "Period > 0")
    assert.throws(() => new TimePickerConfig().setPeriod(-1), "Period > 0")

    let config = new TimePickerConfig().setPeriodHours();
    assert.strictEqual(config.getPeriod(), 60)

    config = new TimePickerConfig().setPeriodHalfHour();
    assert.strictEqual(config.getPeriod(), 30)

    config = new TimePickerConfig().setPeriodMinute();
    assert.strictEqual(config.getPeriod(), 1)
  }

  testPeriodHour() {
    let item
    let store = new StoreTimeGenerator(60).generate()
    let iterator = store.state().data.values()

    assert.strictEqual(store.state().data.size, 24, 'all hours')
    item = iterator.next().value
    assert.strictEqual(item.id(), '0000')
    assert.strictEqual(item.label(), '00:00')
    item = iterator.next().value
    assert.strictEqual(item.id(), '0100')
    assert.strictEqual(item.label(), '01:00')

    store = new StoreTimeGenerator(30).generate()
    assert.strictEqual(store.state().data.size, 24 * 2, 'all half-hours')
    iterator = store.state().data.values()
    item = iterator.next().value
    assert.strictEqual(item.id(), '0000')
    assert.strictEqual(item.label(), '00:00')
    item = iterator.next().value
    assert.strictEqual(item.label(), '00:30')
    assert.strictEqual(item.id(), '0030')

    store = new StoreTimeGenerator(2).generate()
    assert.strictEqual(store.state().data.size, 24 * 30, 'all 2 minutes')
    iterator = store.state().data.values()
    item = iterator.next().value
    assert.strictEqual(item.label(), '00:00')
    assert.strictEqual(item.id(), '0000')
    item = iterator.next().value
    assert.strictEqual(item.id(), '0002')
    assert.strictEqual(item.label(), '00:02')

    store = new StoreTimeGenerator(1).generate()
    assert.strictEqual(store.state().data.size, 24 * 60, 'all minutes')
    iterator = store.state().data.values()
    item = iterator.next().value
    assert.strictEqual(item.label(), '00:00')
    assert.strictEqual(item.id(), '0000')
    item = iterator.next().value
    assert.strictEqual(item.id(), '0001')
    assert.strictEqual(item.label(), '00:01')
  }
}

runTest(TestGenerator)
