/*
* @Author: ZZZ
* @Date:   2018-06-05 10:43:20
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-14 09:01:46
*/
import hotgoods from '@/components/hgoodswarn/hotgoods'
import Goodswarn from '@/components/hgoodswarn/goodswarn'
import Productlist from '@/components/goodsControl/product'
import Productedit from '@/components/goodsControl/productEdit'
export default [
	{
    path:'/hotgoods',
    name:'hotgoods',
    component:hotgoods
	},
	{
    path:'/goodswarn',
    name:'goodswarn',
    component:Goodswarn
	},
    {
    path:'/productlist',
    name:'productlist',
    component:Productlist
    },
    {
    path:'/productedit',
    name:'Productedit',
    component:Productedit
    },
]