/**
 * @file
 * The admonition dialog definition.
 *
 */
(function () {

  "use strict";
  /**
   * @todo: Localize titles and labels.
   *
   * @todo: Create styles from CSS file names.
   */
  CKEDITOR.dialog.add('admonitionDialog', function (editor) {
    // var lang = editor.lang.admonition;

    return {

      // Basic properties of the dialog window: title, minimum size.
      title: "Admonition", //lang.dialogTitle,
      minWidth: 400,
      minHeight: 400,

      // Dialog window contents definition.
      contents: [
        {
          // Definition of the dialog tab.
          //@todo Need to define when have one tab?
          //@todo Change the alert() error call to something fancier?
          id: 'tab-basic',
          label: 'Basic Settings',

          // The tab contents.
          elements: [

            {
              //Radio buttons for the style of the admonition.
              type: 'radio',
              id: 'admonitionStyle',
              label: 'Admonition style',
              items: [
                ['Extra', 'extra'],
                ['Hint', 'hint'],
                ['Note', 'note'],
                ['Troubleshoot', 'troubleshoot'],
                ['Warning', 'warning']
              ],
              default: 'note',
              setup: function( widget ) {
                //Called during dialog init.
                //Set the radio's value to the data on the widget.
                if ( ! widget.data.style ) {
                  this.setValue( this.default )
                }
                else {
                  this.setValue(widget.data.style);
                }
              },
              commit: function( widget ) {
                //Called when saving changes.
                //Set the widget's style value, depending on the radio button's value.
                widget.setData( 'style', this.getValue() );
              }
            },
            {
              type: 'text',
              id: 'admonitionWidth',
              label: 'Width (%)',
              default: '50',
              setup: function( widget ) {
                if ( ! widget.data.width ) {
                  this.setValue( this.default )
                }
                else {
                  this.setValue(widget.data.width);
                }
              },
              validate: function() {
                var value = this.getValue();
                var dataOk = true;
                if ( ! value || isNaN( value ) || value < 1 || value > 100 ) {
                  alert('Sorry, width should be from 1 to 100.');
                  return false;
                }
              }, //End validate
              commit: function( widget ) {
                widget.setData( 'width', this.getValue() );
              }
            }, //End width field
            {
              type: 'radio',
              id: 'admonitionAlignment',
              label: 'Alignment',
              items: [
                ['Left', 'left'],
                ['Center', 'center'],
                ['Right', 'right']
              ],
              default: 'center',
              setup: function( widget ) {
                if ( ! widget.data.align ) {
                  this.setValue( this.default )
                }
                else {
                  this.setValue(widget.data.align);
                }
              },
              commit: function( widget ) {
                widget.setData( 'align', this.getValue() );
              }
            } //End alignment field
          ], //End elements
        }
      ]

    };
  });

})();