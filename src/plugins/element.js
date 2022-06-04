import Vue from 'vue'
import {
  Form,
  Button,
  Input,
  Message,
  FormItem,
  Header,
  Link,
  Container,
  Main,
  Aside,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Pagination,
  Row,
  Col,
  Switch,
  Tooltip,
  Dialog,
  MessageBox,
  Tag,
} from "element-ui";
Vue.use(Form)
Vue.use(Button)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Header)
Vue.use(Link)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Col)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Tag)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;