Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    layout: {
    	type: 'hbox'
    },

    items:[
    	{
    		xtype: 'container',
    		itemId: 'selector',
    		width: 300,
		},

		{
    		xtype: 'container',
    		itemId: 'grid',
            width: 500	
		}
    	
    ],
  

    launch: function() {
        //Write app code here
        var me = this;
        this.down('#selector').add({
        	items: [{
        		xtype: 'filefield',
        		name: 'Tags',
        		fieldLabel: 'Tags',
        		labelWidth: 137,
        		msgTarget: 'side',
        		allowBlank: false,
        		anchor: '100%',
        		buttonText: 'Select Tag File...',
        		listeners: {
                            //change: this._importTags,
                            //scope: this
                            change: {
                     			fn:
                                function(fileInputField, value) {
                     				var file = fileInputField.fileInputEl.dom.files[0];
                                    me = this;
									var reader = new FileReader();
									reader.onload = function(e) {
										me._importTags(e.target.result);
                                    }
                                    
							 		reader.readAsText(file);
                                }
                            }		
                        },
                _importTags: function(content){
                    alert(content);
                    var lines = content.split('\n');
                    console.log(lines.length);

                    Ext.define('Tag', {
                        extend: 'Ext.data.Model',
                        fields: [
                            {name: 'name', type: 'string'}
                        ]
                    });

                    var records = [];
                    for(var i = 0; i < lines.length; i++){
                        records.push({Name: lines[i]});
                    }
                    console.log(me);
                    me.down('#grid').add({
                        xtype: 'rallygrid',
                        store: Ext.create('Rally.data.custom.Store', {
                            data: records,
                            pageSize: 5
                        }),
                        columnCfgs: [
                            {
                                text: 'Name', dataIndex: 'Name', flex: 1
                            }
                        ]
                    });
                }
            },
            {
                xtype: 'panel',
                title: 'Selection Control',
                width: 150,
                frame: false,
                items: [{

                    xtype: 'fieldcontainer',
                    defaultType: 'checkboxfield',
                    items: [
                        {
                            boxLabel  : 'Select Tags',
                            inputValue: '1',
                            id        : 'checkbox1'
                        }
                    ]
                }]
            },

            {
                xtype: ''
            }
            ]


        })
    }
});

/*function(evt){
                                    evt.preventDefault();
                                    var tag_file = evt.target.files[0];
                                    alert(tag_file.name);
                                    console.log(tag_file);                      
                                    
                                    var reader = new FileReader();
                                    
                                    var contents;
                                    reader.onload = function(e){
                                        contents = e.target.result; 
                                    };
                                    reader.readAsText(tag_file);
                                    alert(contents);
                                    
                                }*/
