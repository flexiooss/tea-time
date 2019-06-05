import {ComponentSelect, ComponentSelectConfig} from "@flexio-oss/hidenburg";
import {StoreTimeGenerator} from "./StoreTimeGenerator";
import {Component} from "@flexio-oss/hotballoon/src/js/Component/Component";

export class TimePicker extends Component{
  /**
   * @param {TimePickerConfig} config
   */
  constructor(config){
    super()
    let storeGenerator = new StoreTimeGenerator(config.getPeriod())

    let configSelect = new ComponentSelectConfig()
      .withComponentContext(config.getComponentContext())
      .withStore(storeGenerator.generate())
      .withLayersManager(config.getLayersManager())
      .withProperties({
        multiple: false,
        search: true,
        autoUpdateItems: true,
        pagination: false,
        autoCloseListNotMultiple: true,
        placeholder: 'Choisir une heure'
      })

    this.__select = new ComponentSelect(configSelect)
  }

  /**
   * @param {Element} node
   */
  mountView(node){
    return this.__select.mountView(node)
  }

  /**
   * @return {String[]}
   */
  getSelectedItemsId() {
    return this.__select.getSelectedItemsId()
  }

  /**
   * @return {Item[]}
   */
  getSelectedItems() {
    return this.__select.getSelectedItems()
  }

  /**
   * @return {Action<PublicActionSelectItemPayload>}
   */
  getPublicActionSelect() {
    return this.__select.getPublicActionSelect()
  }

  /**
   * @return {Action<PublicActionSelectedItemPayload>}
   */
  getPublicActionSelected() {
    return this.__select.getPublicActionSelected()
  }

  /**
   * @return {Action<PublicActionUnselectedItemPayload>}
   */
  getPublicActionUnselected() {
    return this.__select.getPublicActionUnselected()
  }
}
