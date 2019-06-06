import {InMemoryParams, StoreBuilder} from "@flexio-oss/hotballoon/src/js/Store/StoreBuilder";
import {StoreTypeParam} from "@flexio-oss/hotballoon";
import {ItemList, ItemListBuilder} from "@flexio-oss/hidenburg";

const HOUR_MINUTES_SEPARATOR = ':'

export class StoreTimeGenerator {
  /**
   * @param period
   */
  constructor(period) {
    this.__period = period
  }

  /**
   * @return {Store<ItemList>}
   */
  generate() {
    let data = this.__generateData()
    return this.__generateStore(data)
  }

  __generateData() {
    let builder = new ItemListBuilder()
    let minutes = 0
    while (minutes <= 1440 - 1) {
      builder.addItem(this.__generateId(minutes), this.__generateValue(minutes), this.__generateLabel(minutes))
      minutes += this.__period
    }

    return builder.build()
  }

  __generateId(minutes) {
    let hours = this.__getHours(minutes)
    hours = (hours.length > 1) ? hours : '0' + hours
    return hours + '' + this.__getMinutes(minutes)
  }

  __generateValue(minutes) {
    return '' + this.__getHours(minutes) + '' + this.__getMinutes(minutes)
  }

  __generateLabel(minutes) {
    let hours = this.__getHours(minutes)
    hours = (hours.length > 1) ? hours : '0' + hours

    return hours + HOUR_MINUTES_SEPARATOR + this.__getMinutes(minutes)
  }

  __getHours(minutes) {
    return '' + (minutes / 60 | 0)
  }

  __getMinutes(minutes) {
    let str = '' + (minutes % 60)
    return (str.length > 1) ? str : '0' + str
  }

  __generateStore(data) {
    return StoreBuilder.InMemory(
      new InMemoryParams(
        new StoreTypeParam(
          ItemList,
          () => {
          },
          () => true,
          o => o
        ),
        data
      )
    )
  }
}
