/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {TimePickerConfig} from "../src/TimePickerConfig";
import {TimePicker} from "../src/TimePicker";
import {Dispatcher, HotBalloonApplication} from "@flexio-oss/hotballoon";
import {PrivateActionSelectItemPayloadBuilder} from "@flexio-oss/hidenburg/generated/io/flexio/hidenburg/actions/PrivateActionSelectItemPayload";

const assert = require('assert')

class TestGenerator extends TestCase {

  setUp() {
    this.__APP = new HotBalloonApplication('TestHidenburg', new Dispatcher())

    let cc = this.__APP.addComponentContext()

    let config = new TimePickerConfig()
      .withComponentContext(cc)
      .withLayersManager({})
      .setPeriodHours()

    this.timePicker = new TimePicker(config)
  }

  testTimePicker() {
    let v = this.timePicker.getSelectedItemsId()
    assert.strictEqual(this.timePicker.getSelectedItemsId().length, 0, 'No selected item')

    let item = this.timePicker.__select.__store.state().data.values().next().value

    this.timePicker.getPublicActionSelect().listenWithCallback((action) => {
      assert.strictEqual(action.itemId(), item.id())
    })

    this.timePicker.getPublicActionSelected().listenWithCallback((action) => {
      assert.strictEqual(action.itemId(), item.id())
    })

    this.timePicker.__select.__privateActionSelect.dispatch(
      new PrivateActionSelectItemPayloadBuilder().item(item).build()
    )
  }
}

runTest(TestGenerator)
