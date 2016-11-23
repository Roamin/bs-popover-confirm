!function(t){function n(o){if(r[o])return r[o].exports;var e=r[o]={exports:{},id:o,loaded:!1};return t[o].call(e.exports,e,e.exports,n),e.loaded=!0,e.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(module,exports,__webpack_require__){eval("var PopoverConfirm = __webpack_require__( 1 );\r\n\r\nvar vm = null, \r\n    URL = null,\r\n    main = null,\r\n    Status = null;\r\n\r\n// ajax 地址\r\nURL = {\r\n    changeStatus: '/api/subActivity/changeSubActivityStatus' // 更改启用、禁用状态 POST\r\n};\r\n\r\n// avalon vm\r\nvm = avalon.define({\r\n    $id: 'main',\r\n    data: [\r\n        {\r\n            Kind: '抽奖活动',\r\n            Name: '捕鱼达人单次抽奖',\r\n            Id: 1,\r\n            Status: true\r\n        }, {\r\n            Kind: '每日签到',\r\n            Name: '欢乐斗地主',\r\n            Id: 2,\r\n            Status: false\r\n        }\r\n    ],\r\n    showUpdateStatusConfirm: function( e, index, data ) {\r\n        e.stopPropagation();\r\n        Status.show( $(this), index, data );\r\n    }\r\n});\r\n\r\n// 状态\r\nStatus = {\r\n    show: function( $trigger, index, data ) {\r\n        var _this = this;\r\n        \r\n        PopoverConfirm.init({\r\n            UID: data.id + 'status', // 数据中唯一标识符，比如 ID，UserID 等，以确保重复点击显示、隐藏不会闪烁\r\n            title: '确定'+ (data.status ? '启用' : '禁用') +'？',\r\n            loadingContent: (data.status ? '启用生效' : '禁用生效') + '中.........', // Popover 加载中提示文字\r\n            $trigger: $trigger, // 触发者\r\n            ajax: {\r\n                config: {\r\n                    type: 'post',\r\n                    url: URL.changeStatus,\r\n                    data: data,\r\n                },\r\n                callback: function( res ) {\r\n                    if ( res.Status ) {\r\n                        avalon.vmodels.main.data[ index ].Status = data.status; // 更改数据状态\r\n                        PopoverConfirm.destroy(); // 销毁\r\n                    } else {\r\n                        // 错误信息提示\r\n                        PopoverConfirm.setContent({\r\n                            title: '<span class=\"text-danger\">操作失败</span>',\r\n                            content: '<span class=\"text-danger\">'+ res.Message +'</span>'\r\n                        });\r\n                    }\r\n                }\r\n            }\r\n        });\r\n    }\r\n};\r\n\r\n// 主函数\r\nmain = {\r\n    init: function() {\r\n        avalon.scan();\r\n    }\r\n};\r\n\r\nmain.init();\n\n//////////////////\n// WEBPACK FOOTER\n// ./example.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./example.js?")},function(module,exports,__webpack_require__){eval("var __WEBPACK_AMD_DEFINE_RESULT__;/**\r\n * @Author:\t  Live\r\n * @Email:       ivill@live.com\r\n * @DateTime:\t2016-11-03 13:59:03\r\n * @Description: popover 二次确认框\r\n * @Require: [JQuery, Bootstrap]\r\n */\r\n\r\n!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {\r\n\t'use strict';\r\n\r\n\tvar _options = {\r\n\t\t\tUID: '', // 唯一识别符，比如 ID，UserID 等，以确保重复点击显示、隐藏不会闪烁\r\n\t\t\ttitle: '提示', // 标题\r\n\t\t\tloadingContent: '努力加载中...', // ajax 加载中提示语\r\n\t\t\tajax: { // ajax 配置项\r\n\t\t\t\tconfig: {\r\n\t\t            type: 'GET', // ajax 请求类型\r\n\t\t            url: '', // ajax 请求地址\r\n\t\t            data: {} // ajax 参数\r\n\t\t            // ... other\r\n\t\t        },\r\n\t\t        callback: function( res ) {} // ajax success 回调函数\r\n\t\t\t},\r\n\t\t\t$trigger: null // popover 触发者\r\n\t\t},\r\n\t\t_popoverSelector = '', // 当前弹出的 popover 的选择器\r\n\t\t_timestamp = (new Date()).getTime(); // 使用时间戳作为 确定、取消按钮 的 id 名称后缀\r\n\t\t\r\n\tvar CONFIRM_TPL = '<div class=\"btn-group\">' +\r\n\t\t\t\t '<button type=\"button\" id=\"' + _getIDName( 'J_Confirm' ) + '\" class=\"btn btn-xs btn-primary\"><i class=\"glyphicon glyphicon-ok-sign\">&ensp;</i>确定</button>' +\r\n\t\t\t\t '<button type=\"button\" id=\"' + _getIDName( 'J_Cancel' ) + '\" class=\"btn btn-xs btn-default\"><i class=\"glyphicon glyphicon-remove-sign\">&ensp;</i>取消</button>' +\r\n\t\t\t  '</div>';\r\n\r\n\r\n\t/**\r\n     * 切换按钮的禁用属性\r\n     */\r\n    function _toggleBtnDisableAttr( $btn ) {\r\n\t\t$btn.prop('disabled', function (_, val) { return ! val; });\r\n    }\r\n\r\n    /**\r\n     * 生成页面唯一的 id\r\n     * @param  {String} idName\r\n     * @return {String}        idName + postfix\r\n     */\r\n\tfunction _getIDName( idName ) {\r\n\t\treturn idName + _timestamp;\r\n\t}\r\n\r\n\t// 需要在模块引用的时候会自动执行（保证执行一次）\r\n\tfunction _bind() {\r\n\t\t// 点击 popover 以外的区域，隐藏 popover\r\n\t\t$( document ).on('click', function() {\r\n\t\t\tdestroy();\r\n\t\t});\r\n\r\n\t\t// 启用、禁用 Popover 取消、确定点击绑定\r\n\t\t$( document ).on('click', '#' + _getIDName( 'J_Confirm' ), function() {\r\n\t\t\t_confirm( $(this) );\r\n\t\t});\r\n\t\t$( document ).on('click', '#' + _getIDName( 'J_Cancel' ), function() {\r\n\t\t\tdestroy();\r\n\t\t});\r\n\t}\r\n\t\r\n\t/**\r\n\t * 确认操作\r\n\t */\r\n\tfunction _confirm() {\r\n\t\tvar ajaxConfig = { // ajax 配置项\r\n\t\t\t\ttype: _options.ajax.type,\r\n\t\t\t\turl: _options.ajax.url,\r\n\t\t\t\tdata: _options.ajax.data,\r\n\t\t\t\tcache: false,\r\n\t\t\t\tcomplete: function() {\r\n\t\t\t\t\t_toggleBtnDisableAttr( _options.$trigger );\r\n\t\t\t\t},\r\n\t\t\t\tsuccess: function( res ) {\r\n\t\t\t\t\t_options.ajax.callback( res );\r\n\t\t\t\t},\r\n\t\t\t\terror: function( error ) {\r\n\t\t\t\t\tsetContent({\r\n\t\t\t\t\t\ttitle: '<span class=\"text-danger\">操作失败</span>',\r\n\t\t\t\t\t\tcontent: '<span class=\"text-danger\">网络错误，请刷新后重试！</span>'\r\n\t\t\t\t\t});\r\n\t\t\t\t}\r\n\t\t\t};\r\n\r\n\t\t$.extend( ajaxConfig, _options.ajax.config );\r\n\r\n\t\t_toggleBtnDisableAttr( _options.$trigger );\r\n\r\n\t\tsetContent({\r\n\t\t\tcontent: _options.loadingContent\r\n\t\t});\r\n\r\n\t\t$.ajax( ajaxConfig );\r\n\t}\r\n\r\n\t/**\r\n\t * 获取 popover 的 selector\r\n\t * @return { Selector }\r\n\t */\r\n\tfunction _getSelector() {\r\n\t\treturn '#' + _options.$trigger.attr( 'aria-describedby' );\r\n\t}\r\n\r\n\r\n\t/**\r\n\t * 阻止点击 popover 冒泡事件\r\n\t */\r\n\tfunction _stopPropagation( selector ) {\r\n\t\t$( document ).on('click', selector, function( e ) {\r\n\t\t\te.stopPropagation();\r\n\t\t});\r\n\t}\r\n\r\n\t/**\r\n\t * 初始化\r\n\t * @param  {Object} options 配置项，详见开头 _options 的说明\r\n\t */\r\n\tfunction init( options ) {\r\n\t\tvar isNewUID = (_options.UID !== options.UID);\r\n\r\n\t\tdestroy();\r\n\r\n\t\tif ( isNewUID ) { // 点击的如果不是同一个按钮，则切换显示、隐藏\r\n\t\t\t$.extend( _options, options );\r\n\r\n\t\t\t_options.$trigger.popover({\r\n\t\t\t\thtml: true,\r\n\t\t\t\tplacement: 'left',\r\n\t\t\t\ttrigger: 'manual',\r\n\t\t\t\ttitle: _options.title,\r\n\t\t\t\tcontent: CONFIRM_TPL\r\n\t\t\t});\r\n\r\n\t\t\tshow();\r\n\t\t\t_popoverSelector = _getSelector();\r\n\t\t\t_stopPropagation( _popoverSelector ); // 必须先 show popover 才能获取到 selector\r\n\t\t}\r\n\t}\r\n\r\n\t/**\r\n\t * 显示\r\n\t */\r\n\tfunction show() {\r\n\t\tif ( _options.$trigger !== null ) {\r\n\t\t\t_options.$trigger.popover( 'show' );\r\n\t\t}\r\n\t}\r\n\r\n\t/**\r\n\t * 隐藏\r\n\t */\r\n\tfunction hide() {\r\n\t\tif ( _options.$trigger !== null ) {\r\n\t\t\t_options.$trigger.popover( 'hide' );\r\n\t\t}\r\n\t}\r\n\r\n\t/**\r\n\t * 销毁\r\n\t */\r\n\tfunction destroy() {\r\n\t\tif ( _options.$trigger !== null ) {\r\n\t\t\t_options.UID = ''; // 清空 uid\r\n\t\t\t_options.$trigger.popover( 'destroy' ); // 销毁 popover\r\n\t\t\t_options.$trigger.attr( \"data-content\", '' ); // 清空 content，防止影响后面配置 content\r\n\t\t\t_options.$trigger.attr( \"data-original-title\", '' ); // 清空 title，防止影响后面配置 title\r\n\t\t}\r\n\t}\r\n\r\n\t/**\r\n\t * 设置 popover 的内容\r\n\t * @param {Object} options 设置的内容对象\r\n\t * {\r\n\t *     title: '这是标题',\r\n\t *     content: '这是内容'\r\n\t * }\r\n\t */\r\n\tfunction setContent( options ) {\r\n\t\tvar title = options.title,\r\n\t\t\tcontent = options.content;\r\n\r\n\t\tif ( typeof title !== 'undefined' ) {\r\n\t\t\t_options.$trigger.attr( \"data-original-title\", title );\r\n\t\t}\r\n\r\n\t\tif ( typeof content !== 'undefined' ) {\r\n\t\t\t_options.$trigger.attr( \"data-content\", content );\r\n\t\t}\r\n\r\n\t\t_options.$trigger.popover( 'show' );\r\n\t}\r\n\r\n\t_bind();\r\n\treturn {\r\n\t\tinit: init,\r\n\t\tshow: show,\r\n\t\thide: hide,\r\n\t\tdestroy: destroy,\r\n\t\tsetContent: setContent\r\n\t};\r\n}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//////////////////\n// WEBPACK FOOTER\n// ./bs-popover-confirm.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./bs-popover-confirm.js?")}]);