// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
// @ts-nocheck
import { ElButton,ElButtonGroup, ElInput, ElScrollbar, ElCard,  ElMenu, ElMenuItem, ElRadio, 
  ElIcon,ElForm,ElFormItem,ElCol,ElRow,ElTable,ElTableColumn,ElAside,ElDropdown,ElSelect,
  ElOption,ElLoading,ElInputNumber,ElPopover,ElDialog,ElTabs,ElTabPane,ElCheckboxGroup,ElCheckbox,ElCollapse,ElCollapseItem
} from 'element-plus'
// import 'element-plus/lib/theme-chalk/el-button.css'
const plugins = [ElButton, ElInput, ElInputNumber, ElScrollbar, ElCard,ElMenu,ElMenuItem,ElRadio,ElIcon,ElForm,ElFormItem,ElCol,ElRow,ElAside,ElDropdown,
  ElOption,ElSelect, ElTable, ElTableColumn, ElLoading, ElButtonGroup, ElPopover, ElDialog,ElTabs,ElTabPane,ElCheckboxGroup,ElCheckbox,ElCollapse,ElCollapseItem ]

export default app => {
  // app.use(ElementPlus)
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
