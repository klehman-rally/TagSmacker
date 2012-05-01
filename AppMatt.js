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
    		itemId: 'target'	
		}
    	
    ],
  

    launch: function() {
        //Write app code here
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
                            change: {
                     			fn:
                     			function(fileInputField, value){
                     				var file = fileInputField.fileInputEl.dom.files[0];
														console.log('user chose: ' + file.name);

														var reader = new FileReader();
														reader.onload = function(e) {
                                                            alert("Hello");
															console.log(e.target.result);

														};

														reader.readAsText(file);
                     			}
                 			}
                }
    		}],

    		_importTags: function(evt){
    			alert("Hello World");
    			var tag_file = evt.target.files[0];
    			var reader = new FileReader();
    			alert(tag_file.name);
    		}
        })

    }
        
});

Rally.launchApp('CustomApp', {
name: 'filetest'
});

