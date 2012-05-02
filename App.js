Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    layout: {
    	type: 'hbox'
    },

    items:[
    	{
    		xtype: 'container',
    		itemId: 'tagFileUploadDialog',
    		width: 500,
		},

		{
    		xtype: 'container',
    		itemId: 'tagGrid',
            width: 500	
		}
    	
    ],
  

    launch: function() {
        this.down('#tagFileUploadDialog').add({
            xtype:      'filefield',
            itemId:     'fileuploadfield',
            name:       'tagFileUpload',
            msgTarget:  'side',
            anchor:     '100%',
            width:       400,
            buttonText: 'Upload Tag File',
            listeners:  {
                change: this._readUploadFile,
                scope:  this
            }
        }) 
    },

    _readUploadFile: function(fileInputField, value){
        var file = fileInputField.fileInputEl.dom.files[0];
        me = this;
        var reader = new FileReader();
        reader.onload = function(e) {
            me._onDataUploaded(e.target.result);
        }
        reader.readAsText(file);
    },

    _onDataUploaded: function(fileContent){
        var tagNameLine = fileContent.split('\n');
        console.log(tagNameLine.length);
        meTwo = this;

        var records = [];
        for(var i = 0; i < tagNameLine.length; i++){
            records.push({Name: tagNameLine[i]});
        }
        console.log(me);
        meTwo.down('#tagGrid').add({
            xtype: 'rallygrid',
            store: Ext.create('Rally.data.custom.Store', {
                data: records,
                pageSize: 5
            }),
            columnCfgs: [{
                text: 'Tag Name', dataIndex: 'Name', flex: 1
            }]
        });
    }
});
