cascade 级联下拉框插件
-
[demo](http://princekin.tjxuechuang.com/projects/xcascade/index.html)

	//依赖jquery
	//xml文件
	$("select[data-cascade=area]").Cascade({
            data:"Area.xml",
            dataType:"xml",
            value:['天津市','天津辖区','南开区'],//默认值
            name:['province','city','county']    //文件中节点值
        });
	//json文件
	$("select[data-cascade=book]").Cascade({
		data:"book.json",
		dataType:"json",
		value:['',''],
		name:['book','price']
	});
	//直接给数据
	$("select[data-cascade=book-json]").Cascade({
		data:{
			"book":[
				{"name":"math","price":[1,2,3]},
				{"name":"physical","price":[4,5,6]}
			]
		},
		value:['',''],
		name:['book','price']
	})