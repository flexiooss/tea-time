import {assert, isNull, isNumber} from "@flexio-oss/assert";

export class TimePickerConfig {
  constructor() {
    this.__componentContext = null
    this.__layersManager = null
    this.__period = 1
  }

  /**
   * @param {ComponentContext} componentContext
   * @returns {TimePickerConfig}
   */
  withComponentContext(componentContext) {
    this.__componentContext = componentContext
    return this
  }

  /**
   * @param {ComponentAtmosphereLayersPublicHandler} layersManager
   * @return {TimePickerConfig}
   */
  withLayersManager(layersManager) {
    this.__layersManager = layersManager
    return this
  }

  /**
   * @return {TimePickerConfig}
   */
  setPeriodHours() {
    this.__period = 60
    return this
  }

  /**
   * @return {TimePickerConfig}
   */
  setPeriodHalfHour() {
    this.__period = 30
    return this
  }

  /**
   * @return {TimePickerConfig}
   */
  setPeriodMinute() {
    this.__period = 1
    return this
  }

  /**
   * @param {number} period
   * @return {TimePickerConfig}
   */
  setPeriod(period) {
    assert(isNumber(period), 'Period must be a number')
    this.__period = period
    return this
  }

  /**
   * @return {ComponentContext}
   */
  getComponentContext() {
    assert(!isNull(this.__componentContext), 'Component context not set')
    return this.__componentContext;
  }

  /**
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  getLayersManager() {
    assert(!isNull(this.__layersManager), 'Layers manager not set')
    return this.__layersManager
  }

  /**
   * @return {number}
   */
  getPeriod() {
    return this.__period
  }
}
